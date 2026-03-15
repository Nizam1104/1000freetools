import jwt from '@tsndr/cloudflare-worker-jwt';

export interface Env {
	TURNSTILE_SECRET_KEY: string;
	JWT_SECRET: string;
}

const ALLOWED_ORIGIN = 'https://1000freetools.com';

const isLocalHost = (origin: string) => {
	const url = new URL(origin)
	return url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1';
}

function isAllowedOrigin(origin: string | null): boolean {
	if (!origin) return false;
	if (origin === ALLOWED_ORIGIN) return true;
	try {
		const url = new URL(origin);
		return url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1';
	} catch {
		return false;
	}
}

function corsHeaders(origin: string | null) {
	const allowed = isAllowedOrigin(origin) ? origin : ALLOWED_ORIGIN;
	return {
		'Access-Control-Allow-Origin': allowed ?? '',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Authorization, Content-Type, x-turnstile-token',
		'Access-Control-Expose-Headers': 'x-final-url, x-status-code, x-content-type',
		'Vary': 'Origin',
		'Content-Type': 'application/json',
	};
}

export default {
	async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
		const requestStartTime = Date.now();
		const url = new URL(request.url);
		const origin = request.headers.get('Origin');
		const clientIp = request.headers.get('CF-Connecting-IP') || '';

		if (!env.JWT_SECRET) {
			return new Response(JSON.stringify({ error: 'Server misconfiguration: JWT_SECRET not set' }), {
				status: 500,
				headers: corsHeaders(origin),
			});
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders(origin) });
		}

		if (url.pathname === '/verify-turnstile-token' && request.method === 'POST') {
			const turnstileToken = request.headers.get('x-turnstile-token');
			if (!turnstileToken) {
				return new Response(JSON.stringify({ error: 'Missing Turnstile token' }), {
					status: 403,
					headers: corsHeaders(origin),
				});
			}

			const formData = new FormData();
			formData.append('secret', env.TURNSTILE_SECRET_KEY);
			formData.append('response', turnstileToken);
			formData.append('remoteip', clientIp);

			const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				method: 'POST',
				body: formData,
			});

			const turnstileData = (await turnstileRes.json()) as any;

			const isDevelopment = origin && isLocalHost(origin)
			const expectedHostname = isDevelopment ? 'localhost' : new URL(ALLOWED_ORIGIN).hostname;

			if (!turnstileData.success || turnstileData.hostname !== expectedHostname) {
				console.log('Turnstile failed:', {
					success: turnstileData.success,
					expectedHostname,
					actualHostname: turnstileData.hostname,
					isDevelopment
				});
				return new Response(JSON.stringify({
					error: 'Turnstile verification failed',
					details: turnstileData['error-codes'],
				}), {
					status: 403,
					headers: corsHeaders(origin),
				});
			}

			const now = Math.floor(Date.now() / 1000);
			const token = await jwt.sign({
				iat: now,
				exp: now + (5 * 60),
				ip: clientIp,
			}, env.JWT_SECRET);

			return new Response(JSON.stringify({ success: true, token }), {
				status: 200,
				headers: corsHeaders(origin),
			});
		}

		async function verifySessionToken(req: Request): Promise<{ valid: boolean; error?: string; errorCode?: string }> {
			const authHeader = req.headers.get('Authorization') || '';
			const sessionToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

			if (!sessionToken) {
				return { valid: false, error: 'Missing session token', errorCode: 'AUTH_MISSING' };
			}

			let payload: any;
			try {
				const jwtResult = await jwt.verify(sessionToken, env.JWT_SECRET);
				if (!jwtResult) return { valid: false, error: 'Invalid or expired session token', errorCode: 'AUTH_INVALID' };
				payload = jwt.decode(sessionToken);
			} catch {
				return { valid: false, error: 'Invalid or expired session token', errorCode: 'AUTH_INVALID' };
			}

			const tokenIp = payload?.payload?.ip;
			if (!tokenIp || tokenIp !== clientIp) {
				return { valid: false, error: 'Token IP mismatch — possible token theft', errorCode: 'AUTH_IP_MISMATCH' };
			}

			return { valid: true };
		}

		if (url.pathname === '/get-html-page' && (request.method === 'GET' || request.method === 'POST')) {
			const auth = await verifySessionToken(request);
			if (!auth.valid) {
				return new Response(JSON.stringify({ error: auth.error, errorCode: auth.errorCode }), {
					status: 401,
					headers: corsHeaders(origin),
				});
			}

			let urls: string[] = [];
			if (request.method === 'POST') {
				const body = await request.json() as { urls?: string[] };
				if (!body.urls || !Array.isArray(body.urls) || body.urls.length === 0) {
					return new Response(JSON.stringify({ error: 'Missing or invalid "urls" array in request body' }), {
						status: 400,
						headers: corsHeaders(origin),
					});
				}
				urls = body.urls;
			} else {
				const singleUrl = url.searchParams.get('url');
				if (!singleUrl) {
					return new Response(JSON.stringify({ error: 'Missing required query parameter: url' }), {
						status: 400,
						headers: corsHeaders(origin),
					});
				}
				urls = [singleUrl];
			}

			const safeUrls = urls.filter(u => {
				try {
					const parsed = new URL(u);
					return parsed.protocol === 'https:' || parsed.protocol === 'http:';
				} catch {
					return false;
				}
			});

			if (safeUrls.length === 0) {
				return new Response(JSON.stringify({ error: 'No valid URLs provided' }), {
					status: 400,
					headers: corsHeaders(origin),
				});
			}

			const isLocalhost = safeUrls.some(u => {
				try {
					const parsed = new URL(u);
					return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname === '::1';
				} catch {
					return false;
				}
			});

			try {
				const fetchPromises = safeUrls.map(async (targetUrl) => {
					const targetResponse = await fetch(targetUrl, {
						headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditTool/1.0)' },
						redirect: 'follow',
					});

					return {
						url: targetUrl,
						finalUrl: targetResponse.url,
						statusCode: targetResponse.status,
						contentType: targetResponse.headers.get('content-type') || '',
						html: await targetResponse.text(),
					};
				});

				const results = await Promise.all(fetchPromises);

				return new Response(JSON.stringify({
					success: true,
					timeTakenMs: Date.now() - requestStartTime,
					isLocalhost,
					results,
				}), {
					status: 200,
					headers: {
						'Cache-Control': 'no-cache, no-store',
						...corsHeaders(origin),
					},
				});
			} catch (error: any) {
				return new Response(JSON.stringify({ error: 'Failed to fetch HTML content', message: error.message }), {
					status: 500,
					headers: corsHeaders(origin),
				});
			}
		}

		return new Response('Not Found', { status: 404, headers: corsHeaders(origin) });
	},
};

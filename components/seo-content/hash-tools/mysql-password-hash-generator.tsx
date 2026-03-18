import React from "react"

export default function MysqlPasswordHashGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How MySQL Password Hashing Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            MySQL has used different password hashing schemes throughout its history. The OLD_PASSWORD() function (pre-MySQL 4.1) used a simple 16-character hash, while PASSWORD() introduced a more secure 41-character format prefixed with '*'.
          </p>

          <p>
            This tool generates both legacy MySQL hash formats for compatibility testing and migration purposes. The OLD_PASSWORD uses a two-round algorithm producing 16 hex characters, while the newer PASSWORD uses SHA-1 based hashing.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>OLD_PASSWORD: Two-pass hash producing 16-character result</li>
              <li>PASSWORD: SHA-1 hash with '*' prefix (41 characters total)</li>
              <li>Both formats are generated from the same input password</li>
              <li>Output can be used directly in MySQL user tables</li>
            </ol>
          </div>

          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-600">
              <strong>Security warning:</strong> MySQL's native password hashing is weak by modern standards. Use external authentication (PAM, LDAP) or upgrade to mysql_native_password or caching_sha2_password plugins.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy MySQL migration</h3>
            <p className="text-sm text-muted-foreground">
              Migrate users from old MySQL versions (pre-4.1) to modern versions. Generate OLD_PASSWORD hashes to maintain compatibility during phased migration projects.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database recovery</h3>
            <p className="text-sm text-muted-foreground">
              Recover access to legacy MySQL databases when user tables are corrupted. Regenerate known passwords to restore user access without resetting all credentials.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing authentication systems</h3>
            <p className="text-sm text-muted-foreground">
              Test MySQL authentication code with known hash values. Verify your application correctly handles both old and new MySQL password formats during login.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security auditing</h3>
            <p className="text-sm text-muted-foreground">
              Identify accounts using weak OLD_PASSWORD hashing. Audit your MySQL user table to find legacy accounts that need password upgrades for security compliance.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Educational demonstrations</h3>
            <p className="text-sm text-muted-foreground">
              Show evolution of password security. Compare OLD_PASSWORD (weak) vs modern hashing to demonstrate why security practices evolve and legacy systems need updates.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-version compatibility testing</h3>
            <p className="text-sm text-muted-foreground">
              Test applications against multiple MySQL versions. Ensure your software handles authentication correctly across MySQL 4.1, 5.x, and 8.x password formats.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About MySQL Password Hashes</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm">
              <strong className="text-foreground text-red-600">OLD_PASSWORD is critically weak.</strong> The 16-character hash can be cracked instantly. It uses no salt and a simple algorithm. Never use for new systems.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PASSWORD() format changed over versions.</strong> MySQL 4.1+ uses 41-character '*' prefixed hashes. MySQL 8.0+ uses caching_sha2_password by default, which is incompatible with these formats.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No salt in legacy formats.</strong> Both OLD_PASSWORD and PASSWORD() lack salt. Same password = same hash across all databases, enabling rainbow table attacks.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Modern MySQL uses different authentication.</strong> MySQL 8.0 defaults to caching_sha2_password plugin. These legacy hash formats may not work without configuration changes.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> If you're still using OLD_PASSWORD in production, prioritize immediate migration. These hashes provide essentially no security against determined attackers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between OLD_PASSWORD and PASSWORD?</h3>
            <p className="text-sm text-muted-foreground">
              OLD_PASSWORD produces a 16-character hex hash using a weak two-round algorithm. PASSWORD produces a 41-character hash (with '*' prefix) using SHA-1. PASSWORD is more secure but still outdated.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can these hashes be cracked?</h3>
            <p className="text-sm text-muted-foreground">
              OLD_PASSWORD hashes crack instantly—rainbow tables exist for all common passwords. PASSWORD() hashes are stronger but still vulnerable to modern GPU cracking. Neither should be trusted for security.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I upgrade MySQL password security?</h3>
            <p className="text-sm text-muted-foreground">
              Set password_authentication plugin to caching_sha2_password (MySQL 8.0+) or mysql_native_password (MySQL 5.7). Force password resets for all users to generate new secure hashes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does PASSWORD hash start with '*'?</h3>
            <p className="text-sm text-muted-foreground">
              The '*' prefix indicates the hash format. MySQL uses this to distinguish between OLD_PASSWORD (no prefix, 16 chars) and PASSWORD ('*' prefix, 41 chars) formats.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use these hashes in MySQL 8.0?</h3>
            <p className="text-sm text-muted-foreground">
              MySQL 8.0 defaults to caching_sha2_password. To use legacy hashes, you must configure the user account to use mysql_native_password authentication plugin explicitly.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool safe for production passwords?</h3>
            <p className="text-sm text-muted-foreground">
              Processing happens locally in your browser. However, never paste real production passwords into any web tool. Use test credentials and change passwords after testing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I insert these hashes into MySQL?</h3>
            <p className="text-sm text-muted-foreground">
              Use: UPDATE mysql.user SET authentication_string='*HASH' WHERE User='username'; Then: FLUSH PRIVILEGES; Replace HASH with your generated 40-character hash (including the *).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, FileText, Plus, Trash2 } from "lucide-react";

interface ClaimTemplate {
  id: string;
  name: string;
  value: string;
  type: "string" | "number" | "boolean" | "array";
}

export default function JwtTokenBuilderTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<"basic" | "oauth" | "api" | "microservice" | "">("");
  const [issuer, setIssuer] = useState("");
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState("");
  const [expiresIn, setExpiresIn] = useState("3600");
  const [customClaims, setCustomClaims] = useState<ClaimTemplate[]>([]);
  const [generatedToken, setGeneratedToken] = useState("");
  const [copied, setCopied] = useState(false);

  const templates = {
    basic: {
      issuer: "your-app",
      subject: "user123",
      audience: "your-api",
      expiresIn: "3600",
      customClaims: [] as ClaimTemplate[],
    },
    oauth: {
      issuer: "https://auth.example.com",
      subject: "user@example.com",
      audience: "https://api.example.com",
      expiresIn: "7200",
      customClaims: [
        { id: "1", name: "scope", value: "read write", type: "string" },
        { id: "2", name: "azp", value: "client-app", type: "string" },
      ] as ClaimTemplate[],
    },
    api: {
      issuer: "api-gateway",
      subject: "service-account",
      audience: "backend-service",
      expiresIn: "900",
      customClaims: [
        { id: "1", name: "permissions", value: '["read", "write"]', type: "array" },
        { id: "2", name: "rate_limit", value: "1000", type: "number" },
      ] as ClaimTemplate[],
    },
    microservice: {
      issuer: "auth-service",
      subject: "user-id",
      audience: "service-mesh",
      expiresIn: "1800",
      customClaims: [
        { id: "1", name: "roles", value: '["admin", "user"]', type: "array" },
        { id: "2", name: "tenant_id", value: "tenant-123", type: "string" },
        { id: "3", name: "is_active", value: "true", type: "boolean" },
      ] as ClaimTemplate[],
    },
  };

  const loadTemplate = useCallback((template: keyof typeof templates) => {
    const t = templates[template];
    setIssuer(t.issuer);
    setSubject(t.subject);
    setAudience(t.audience);
    setExpiresIn(t.expiresIn);
    setCustomClaims(t.customClaims);
    setSelectedTemplate(template);
  }, []);

  const addCustomClaim = useCallback(() => {
    const newClaim: ClaimTemplate = {
      id: Date.now().toString(),
      name: "custom_claim",
      value: "value",
      type: "string",
    };
    setCustomClaims([...customClaims, newClaim]);
  }, [customClaims]);

  const removeCustomClaim = useCallback((id: string) => {
    setCustomClaims(customClaims.filter((c) => c.id !== id));
  }, [customClaims]);

  const updateCustomClaim = useCallback((id: string, field: keyof ClaimTemplate, value: string) => {
    setCustomClaims(customClaims.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  }, [customClaims]);

  const buildToken = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);
    
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload: Record<string, unknown> = {
      iss: issuer,
      sub: subject,
      aud: audience,
      iat: now,
      exp: now + parseInt(expiresIn),
    };

    customClaims.forEach((claim) => {
      let value: unknown = claim.value;
      if (claim.type === "number") {
        value = parseFloat(claim.value);
      } else if (claim.type === "boolean") {
        value = claim.value.toLowerCase() === "true";
      } else if (claim.type === "array") {
        try {
          value = JSON.parse(claim.value);
        } catch {
          value = claim.value;
        }
      }
      payload[claim.name] = value;
    });

    const headerEncoded = btoa(JSON.stringify(header))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const payloadEncoded = btoa(JSON.stringify(payload))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const signature = btoa(`${headerEncoded}.${payloadEncoded}.SECRET_KEY`)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    setGeneratedToken(`${headerEncoded}.${payloadEncoded}.${signature}`);
  }, [issuer, subject, audience, expiresIn, customClaims]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generatedToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Token Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedTemplate === "basic" ? "default" : "outline"}
              onClick={() => loadTemplate("basic")}
            >
              Basic Auth
            </Button>
            <Button
              size="sm"
              variant={selectedTemplate === "oauth" ? "default" : "outline"}
              onClick={() => loadTemplate("oauth")}
            >
              OAuth 2.0
            </Button>
            <Button
              size="sm"
              variant={selectedTemplate === "api" ? "default" : "outline"}
              onClick={() => loadTemplate("api")}
            >
              API Access
            </Button>
            <Button
              size="sm"
              variant={selectedTemplate === "microservice" ? "default" : "outline"}
              onClick={() => loadTemplate("microservice")}
            >
              Microservice
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Issuer (iss)</Label>
              <Input
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="your-app"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Subject (sub)</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="user123"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Audience (aud)</Label>
              <Input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="your-api"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Expires In (seconds)</Label>
              <Input
                type="number"
                value={expiresIn}
                onChange={(e) => setExpiresIn(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Custom Claims</Label>
              <Button size="sm" variant="outline" onClick={addCustomClaim}>
                <Plus className="w-4 h-4 mr-1" /> Add Claim
              </Button>
            </div>
            <div className="space-y-2">
              {customClaims.map((claim) => (
                <div key={claim.id} className="flex gap-2 items-center">
                  <Input
                    value={claim.name}
                    onChange={(e) => updateCustomClaim(claim.id, "name", e.target.value)}
                    placeholder="claim_name"
                    className="flex-1"
                  />
                  <Input
                    value={claim.value}
                    onChange={(e) => updateCustomClaim(claim.id, "value", e.target.value)}
                    placeholder="value"
                    className="flex-1"
                  />
                  <select
                    value={claim.type}
                    onChange={(e) => updateCustomClaim(claim.id, "type", e.target.value)}
                    className="p-2 border rounded-md"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="array">Array</option>
                  </select>
                  <Button size="sm" variant="ghost" onClick={() => removeCustomClaim(claim.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={buildToken} className="w-full">
            Build Token
          </Button>
        </CardContent>
      </Card>

      {generatedToken && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Token</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                value={generatedToken}
                readOnly
                className="h-24 font-mono text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

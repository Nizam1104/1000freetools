"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Hash, RefreshCw } from "lucide-react";

const UuidVersionConverter: React.FC = () => {
  const [inputUuid, setInputUuid] = useState("");
  const [targetVersion, setTargetVersion] = useState<"v1" | "v3" | "v4" | "v5">("v4");
  const [namespace, setNamespace] = useState("6ba7b810-9dad-11d1-80b4-00c04fd430c8");
  const [name, setName] = useState("");
  const [converted, setConverted] = useState("");
  const [uuidInfo, setUuidInfo] = useState<{
    version: number | null;
    variant: string;
    isValid: boolean;
    format: string;
  } | null>(null);

  const uuidVersions = [
    { value: "v1", label: "Version 1 (Time-based)" },
    { value: "v3", label: "Version 3 (MD5 hash)" },
    { value: "v4", label: "Version 4 (Random)" },
    { value: "v5", label: "Version 5 (SHA-1 hash)" },
  ];

  const namespaces = [
    { value: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", label: "DNS (6ba7b810...)" },
    { value: "6ba7b811-9dad-11d1-80b4-00c04fd430c8", label: "URL (6ba7b811...)" },
    { value: "6ba7b812-9dad-11d1-80b4-00c04fd430c8", label: "OID (6ba7b812...)" },
    { value: "6ba7b814-9dad-11d1-80b4-00c04fd430c8", label: "X.500 (6ba7b814...)" },
  ];

  const validateUuid = (uuid: string): { version: number | null; variant: string; isValid: boolean; format: string } => {
    const cleanUuid = uuid.replace(/[-]/g, "").toLowerCase();
    
    // Check basic format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isValid = uuidRegex.test(uuid);
    
    // Extract version
    const versionMatch = cleanUuid.match(/^[0-9a-f]{8}[0-9a-f]{4}([0-9])/);
    const version = versionMatch ? parseInt(versionMatch[1], 10) : null;
    
    // Extract variant
    const variantChar = cleanUuid[16];
    let variant = "Unknown";
    if (["0", "1", "2", "3"].includes(variantChar)) variant = "NCS";
    else if (["4", "5", "6", "7"].includes(variantChar)) variant = "RFC 4122";
    else if (["8", "9"].includes(variantChar)) variant = "Microsoft";
    else if (["a", "b"].includes(variantChar)) variant = "Future";
    
    // Determine format
    let format = "standard";
    if (!uuid.includes("-")) format = "no-dashes";
    else if (uuid.startsWith("urn:uuid:")) format = "URN";
    else if (uuid.includes("{") && uuid.includes("}")) format = "braced";
    
    return { version, variant, isValid, format };
  };

  const generateV4Uuid = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateV3V5Uuid = async (version: 3 | 5, namespace: string, name: string): Promise<string> => {
    const encoder = new TextEncoder();
    const nsBytes = new Uint8Array(namespace.replace(/-/g, "").match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const nameBytes = encoder.encode(name);
    const data = new Uint8Array(nsBytes.length + nameBytes.length);
    data.set(nsBytes);
    data.set(nameBytes, nsBytes.length);

    const hashBuffer = await crypto.subtle.digest(version === 3 ? "MD5" : "SHA-1", data);
    const hashArray = new Uint8Array(hashBuffer);
    
    // Set version
    hashArray[6] = (hashArray[6] & 0x0f) | (version << 4);
    // Set variant
    hashArray[8] = (hashArray[8] & 0x3f) | 0x80;

    const hex = Array.from(hashArray).map(b => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  };

  const handleAnalyze = useCallback(() => {
    if (!inputUuid.trim()) return;
    
    const info = validateUuid(inputUuid.trim());
    setUuidInfo(info);
  }, [inputUuid]);

  const handleConvert = useCallback(async () => {
    if (targetVersion === "v4") {
      setConverted(generateV4Uuid());
    } else if (targetVersion === "v3" || targetVersion === "v5") {
      if (!name) {
        setConverted("Please enter a name for name-based UUID");
        return;
      }
      try {
        const uuid = await generateV3V5Uuid(targetVersion === "v3" ? 3 : 5, namespace, name);
        setConverted(uuid);
      } catch (error) {
        setConverted("Error generating UUID");
      }
    } else if (targetVersion === "v1") {
      // Simplified v1 generation (not truly RFC compliant)
      const now = Date.now();
      const timeHex = now.toString(16).padStart(12, "0");
      setConverted(`${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-1xxx-xxxx-xxxxxxxxxxxx`.replace(/x/g, () => 
        Math.floor(Math.random() * 16).toString(16)
      ));
    }
  }, [targetVersion, namespace, name]);

  const handleClear = useCallback(() => {
    setInputUuid("");
    setConverted("");
    setUuidInfo(null);
    setName("");
  }, []);

  const handleCopy = useCallback(() => {
    const text = converted || (uuidInfo ? inputUuid : "");
    if (text) {
      navigator.clipboard.writeText(text);
    }
  }, [converted, uuidInfo, inputUuid]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            UUID Version Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="inputUuid">Input UUID (for analysis)</Label>
              <Input
                id="inputUuid"
                value={inputUuid}
                onChange={(e) => setInputUuid(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              />
              <div className="flex gap-2">
                <Button onClick={handleAnalyze} disabled={!inputUuid} size="sm" variant="outline">
                  Analyze UUID
                </Button>
                <Button 
                  onClick={() => setInputUuid(generateV4Uuid())} 
                  size="sm" 
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Generate V4
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Conversion Options</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="targetVersion" className="text-xs">Target Version</Label>
                  <select
                    id="targetVersion"
                    value={targetVersion}
                    onChange={(e) => setTargetVersion(e.target.value as typeof targetVersion)}
                    className="w-full p-2 border rounded-md"
                  >
                    {uuidVersions.map((v) => (
                      <option key={v.value} value={v.value}>{v.label}</option>
                    ))}
                  </select>
                </div>

                {(targetVersion === "v3" || targetVersion === "v5") && (
                  <>
                    <div>
                      <Label htmlFor="namespace" className="text-xs">Namespace</Label>
                      <select
                        id="namespace"
                        value={namespace}
                        onChange={(e) => setNamespace(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        {namespaces.map((ns) => (
                          <option key={ns.value} value={ns.value}>{ns.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-xs">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., example.com"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate/Convert
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!converted && !uuidInfo}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {uuidInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">UUID Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Valid</p>
                    <p className={`text-lg font-semibold ${uuidInfo.isValid ? "text-green-600" : "text-red-600"}`}>
                      {uuidInfo.isValid ? "✓ Yes" : "✗ No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Version</p>
                    <p className="text-lg font-semibold">
                      {uuidInfo.version ? `v${uuidInfo.version}` : "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Variant</p>
                    <p className="text-lg font-semibold">{uuidInfo.variant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Format</p>
                    <p className="text-lg font-semibold capitalize">{uuidInfo.format}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {converted && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generated UUID</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-mono break-all">{converted}</p>
              </CardContent>
            </Card>
          )}

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-semibold mb-2">UUID Version Reference:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>v1:</strong> Time-based (uses MAC address and timestamp)</li>
              <li>• <strong>v3:</strong> MD5 hash-based (namespace + name)</li>
              <li>• <strong>v4:</strong> Random/pseudo-random</li>
              <li>• <strong>v5:</strong> SHA-1 hash-based (namespace + name)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UuidVersionConverter;

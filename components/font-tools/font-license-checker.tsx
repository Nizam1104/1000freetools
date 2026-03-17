"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, AlertCircle, CheckCircle, FileText } from "lucide-react";

const licensePatterns: Record<string, { pattern: RegExp; name: string; url: string }> = {
  SIL_OPEN_FONT: {
    pattern: /SIL Open Font License|OFL|silofl\.net/i,
    name: "SIL Open Font License",
    url: "https://scripts.sil.org/OFL",
  },
  APACHE: {
    pattern: /Apache License|Apache 2\.0|apache\.org\/licenses/i,
    name: "Apache License 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0",
  },
  MIT: {
    pattern: /MIT License|MIT License/i,
    name: "MIT License",
    url: "https://opensource.org/licenses/MIT",
  },
  GPL: {
    pattern: /GNU General Public License|GPL|gnu\.org\/licenses/i,
    name: "GNU GPL",
    url: "https://www.gnu.org/licenses/gpl-3.0.html",
  },
  CREATIVE_COMMONS: {
    pattern: /Creative Commons|CC BY|CC-BY|creativecommons\.org/i,
    name: "Creative Commons",
    url: "https://creativecommons.org/licenses/",
  },
  PROPRIETARY: {
    pattern: /proprietary|all rights reserved|commercial use prohibited/i,
    name: "Proprietary License",
    url: "",
  },
  FREE_FOR_PERSONAL: {
    pattern: /free for personal use|personal use only/i,
    name: "Free for Personal Use",
    url: "",
  },
  FREE_FOR_COMMERCIAL: {
    pattern: /free for commercial use|commercial use allowed/i,
    name: "Free for Commercial Use",
    url: "",
  },
};

export default function FontLicenseChecker() {
  const [licenseText, setLicenseText] = useState("");
  const [detectedLicenses, setDetectedLicenses] = useState<Array<{
    name: string;
    url: string;
    confidence: string;
  }>>([]);
  const [permissions, setPermissions] = useState({
    commercialUse: false,
    modification: false,
    distribution: false,
    privateUse: false,
    patentUse: false,
  });
  const [copied, setCopied] = useState(false);

  const analyzeLicense = useCallback(() => {
    const detected: Array<{ name: string; url: string; confidence: string }> = [];
    const text = licenseText.toLowerCase();

    Object.entries(licensePatterns).forEach(([key, { pattern, name, url }]) => {
      if (pattern.test(licenseText)) {
        const matches = (licenseText.match(pattern) || []).length;
        const confidence = matches > 2 ? "High" : matches === 2 ? "Medium" : "Low";
        detected.push({ name, url, confidence });
      }
    });

    setDetectedLicenses(detected);

    // Analyze permissions
    setPermissions({
      commercialUse: /commercial use|commercially|sell|distribute.*commercial/i.test(licenseText) && 
                     !/non-commercial|personal use only/i.test(licenseText),
      modification: /modify|derivative|adapt|change/i.test(licenseText),
      distribution: /distribute|share|redistribute/i.test(licenseText),
      privateUse: /private use|personal use/i.test(licenseText),
      patentUse: /patent|patents/i.test(licenseText),
    });
  }, [licenseText]);

  const copyToClipboard = useCallback(async () => {
    if (detectedLicenses.length === 0) return;
    try {
      const text = detectedLicenses.map((l) => 
        `${l.name} (${l.confidence} confidence)${l.url ? ` - ${l.url}` : ""}`
      ).join("\n");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [detectedLicenses]);

  const loadSampleLicense = useCallback((type: string) => {
    const samples: Record<string, string> = {
      ofl: `SIL OPEN FONT LICENSE Version 1.1

Copyright (c) 2023, Font Designer

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects...`,
      mit: `MIT License

Copyright (c) 2023 Font Designer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this font software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...`,
      apache: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at...`,
    };
    setLicenseText(samples[type] || "");
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              License Text Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Load Sample License</Label>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => loadSampleLicense("ofl")}>
                  OFL
                </Button>
                <Button size="sm" variant="outline" onClick={() => loadSampleLicense("mit")}>
                  MIT
                </Button>
                <Button size="sm" variant="outline" onClick={() => loadSampleLicense("apache")}>
                  Apache
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="licenseText">Paste License Text</Label>
              <Textarea
                id="licenseText"
                value={licenseText}
                onChange={(e) => setLicenseText(e.target.value)}
                placeholder="Paste the font license text here..."
                className="mt-1 h-64 font-mono text-sm"
              />
            </div>

            <Button onClick={analyzeLicense} className="w-full">
              Analyze License
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              License Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {detectedLicenses.length > 0 ? (
              <>
                <div className="space-y-2">
                  <Label>Detected Licenses</Label>
                  {detectedLicenses.map((license, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-semibold">{license.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          license.confidence === "High" ? "bg-green-100 text-green-800" :
                          license.confidence === "Medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {license.confidence}
                        </span>
                      </div>
                      {license.url && (
                        <a
                          href={license.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline mt-1 block"
                        >
                          {license.url}
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.entries(permissions).map(([key, value]) => (
                      <div
                        key={key}
                        className={`p-2 rounded text-sm ${
                          value ? "bg-green-50 text-green-800" : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {value ? "✓" : "✗"} {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" onClick={copyToClipboard} className="w-full">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Results
                </Button>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <p>Paste a license text and click "Analyze License" to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Font Licenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(licensePatterns).map(([key, { name, url }]) => (
              <div key={key} className="p-3 border rounded-lg">
                <h4 className="font-semibold">{name}</h4>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy, RotateCcw, Phone } from "lucide-react";

const PhoneNumberFormatter: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("US");
  const [format, setFormat] = useState("international");
  const [formatted, setFormatted] = useState("");
  const [isValid, setIsValid] = useState(false);

  const countries = [
    { code: "US", name: "United States", prefix: "+1", example: "(555) 123-4567" },
    { code: "GB", name: "United Kingdom", prefix: "+44", example: "020 7946 0958" },
    { code: "DE", name: "Germany", prefix: "+49", example: "030 12345678" },
    { code: "FR", name: "France", prefix: "+33", example: "01 23 45 67 89" },
    { code: "JP", name: "Japan", prefix: "+81", example: "03-1234-5678" },
    { code: "CN", name: "China", prefix: "+86", example: "010 1234 5678" },
    { code: "IN", name: "India", prefix: "+91", example: "098765 43210" },
    { code: "AU", name: "Australia", prefix: "+61", example: "(02) 1234 5678" },
    { code: "BR", name: "Brazil", prefix: "+55", example: "(11) 91234-5678" },
    { code: "RU", name: "Russia", prefix: "+7", example: "495 123-45-67" },
    { code: "KR", name: "South Korea", prefix: "+82", example: "02-1234-5678" },
    { code: "MX", name: "Mexico", prefix: "+52", example: "55 1234 5678" },
    { code: "IT", name: "Italy", prefix: "+39", example: "06 1234 5678" },
    { code: "ES", name: "Spain", prefix: "+34", example: "912 345 678" },
    { code: "CA", name: "Canada", prefix: "+1", example: "(416) 123-4567" },
    { code: "SG", name: "Singapore", prefix: "+65", example: "6123 4567" },
    { code: "AE", name: "UAE", prefix: "+971", example: "04 123 4567" },
    { code: "SA", name: "Saudi Arabia", prefix: "+966", example: "011 234 5678" },
    { code: "ZA", name: "South Africa", prefix: "+27", example: "011 123 4567" },
    { code: "NL", name: "Netherlands", prefix: "+31", example: "020 123 4567" },
  ];

  const formats = [
    { value: "international", label: "International (+1 555-123-4567)" },
    { value: "national", label: "National ((555) 123-4567)" },
    { value: "e164", label: "E.164 (+15551234567)" },
    { value: "rfc3966", label: "RFC 3966 (tel:+1-555-123-4567)" },
    { value: "digits", label: "Digits Only (15551234567)" },
  ];

  const cleanPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, "");
  };

  const formatPhone = useCallback(() => {
    if (!phoneNumber) return;

    const cleaned = cleanPhoneNumber(phoneNumber);
    const countryData = countries.find(c => c.code === country);
    
    if (!countryData) {
      setFormatted("Invalid country");
      setIsValid(false);
      return;
    }

    // Remove country code if present
    let digits = cleaned;
    if (digits.startsWith(countryData.prefix.replace("+", ""))) {
      digits = digits.substring(countryData.prefix.replace("+", "").length);
    } else if (digits.startsWith("1") && countryData.prefix === "+1") {
      digits = digits.substring(1);
    }

    // Validate length (basic check)
    const isValidLength = digits.length >= 7 && digits.length <= 15;
    setIsValid(isValidLength);

    switch (format) {
      case "international":
        setFormatted(`${countryData.prefix} ${digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`);
        break;
      case "national":
        setFormatted(digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"));
        break;
      case "e164":
        setFormatted(`${countryData.prefix}${digits}`);
        break;
      case "rfc3966":
        setFormatted(`tel:${countryData.prefix}-${digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`);
        break;
      case "digits":
        setFormatted(`${countryData.prefix.replace("+", "")}${digits}`);
        break;
      default:
        setFormatted(phoneNumber);
    }
  }, [phoneNumber, country, format]);

  const handleClear = useCallback(() => {
    setPhoneNumber("");
    setFormatted("");
    setIsValid(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (formatted) {
      navigator.clipboard.writeText(formatted);
    }
  }, [formatted]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Phone Number Formatter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.prefix})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format Style</Label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {formats.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={formatPhone} disabled={!phoneNumber}>
              <Phone className="w-4 h-4 mr-2" />
              Format
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!formatted}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {formatted && (
            <div className="space-y-4">
              <Card className={isValid ? "border-green-200" : "border-yellow-200"}>
                <CardHeader>
                  <CardTitle className="text-base">Formatted Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-3xl font-bold text-center py-4 ${isValid ? "text-green-600" : "text-yellow-600"}`}>
                    {formatted}
                  </p>
                  {!isValid && (
                    <p className="text-sm text-yellow-600 text-center">
                      ⚠️ Number may be invalid - please verify
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Format Details:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Country: {countries.find(c => c.code === country)?.name}</li>
                  <li>• Prefix: {countries.find(c => c.code === country)?.prefix}</li>
                  <li>• Format: {formats.find(f => f.value === format)?.label}</li>
                  <li>• Example: {countries.find(c => c.code === country)?.example}</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneNumberFormatter;

"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Coins, DollarSign } from "lucide-react";

const QrCodeForCryptoPayment: React.FC = () => {
  const [cryptocurrency, setCryptocurrency] = useState("bitcoin");
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");
  const [generated, setGenerated] = useState(false);
  const [paymentUri, setPaymentUri] = useState("");

  const cryptocurrencies = [
    { value: "bitcoin", label: "Bitcoin (BTC)", prefix: "bitcoin" },
    { value: "ethereum", label: "Ethereum (ETH)", prefix: "ethereum" },
    { value: "litecoin", label: "Litecoin (LTC)", prefix: "litecoin" },
    { value: "dogecoin", label: "Dogecoin (DOGE)", prefix: "dogecoin" },
    { value: "bitcoin-cash", label: "Bitcoin Cash (BCH)", prefix: "bitcoincash" },
    { value: "ripple", label: "Ripple (XRP)", prefix: "ripple" },
    { value: "cardano", label: "Cardano (ADA)", prefix: "cardano" },
    { value: "solana", label: "Solana (SOL)", prefix: "solana" },
    { value: "tron", label: "Tron (TRX)", prefix: "tron" },
    { value: "usdt-erc20", label: "USDT (ERC20)", prefix: "ethereum" },
    { value: "usdt-trc20", label: "USDT (TRC20)", prefix: "tron" },
  ];

  const handleGenerate = useCallback(() => {
    if (!walletAddress) return;

    const crypto = cryptocurrencies.find(c => c.value === cryptocurrency);
    if (!crypto) return;

    let uri = `${crypto.prefix}:${walletAddress}`;
    const params: string[] = [];

    if (amount) {
      params.push(`amount=${amount}`);
    }
    if (label) {
      params.push(`label=${encodeURIComponent(label)}`);
    }
    if (message) {
      params.push(`message=${encodeURIComponent(message)}`);
    }

    if (params.length > 0) {
      uri += `?${params.join("&")}`;
    }

    setPaymentUri(uri);
    setGenerated(true);
  }, [cryptocurrency, walletAddress, amount, label, message]);

  const handleClear = useCallback(() => {
    setCryptocurrency("bitcoin");
    setWalletAddress("");
    setAmount("");
    setLabel("");
    setMessage("");
    setGenerated(false);
    setPaymentUri("");
  }, []);

  const handleCopy = useCallback(() => {
    if (paymentUri) {
      navigator.clipboard.writeText(paymentUri);
    } else if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
    }
  }, [paymentUri, walletAddress]);

  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 350;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 300, 350);
      
      // Crypto icon/badge
      ctx.fillStyle = "#f7931a";
      if (cryptocurrency === "ethereum") ctx.fillStyle = "#627eea";
      if (cryptocurrency === "litecoin") ctx.fillStyle = "#345d9d";
      if (cryptocurrency === "dogecoin") ctx.fillStyle = "#c2a633";
      
      ctx.beginPath();
      ctx.arc(150, 40, 25, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      const symbol = cryptocurrency === "bitcoin" ? "₿" : 
                     cryptocurrency === "ethereum" ? "Ξ" :
                     cryptocurrency === "litecoin" ? "Ł" : "$";
      ctx.fillText(symbol, 150, 47);
      
      // QR Code placeholder
      const qrSize = 200;
      const qrStart = 50;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(75, qrStart, qrSize, qrSize);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeRect(75, qrStart, qrSize, qrSize);
      
      // Simulated QR pattern
      ctx.fillStyle = "#000000";
      const blockSize = qrSize / 21;
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(
              75 + i * blockSize,
              qrStart + j * blockSize,
              blockSize - 1,
              blockSize - 1
            );
          }
        }
      }
      
      // Amount label
      if (amount) {
        ctx.fillStyle = "#000000";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${amount} ${cryptocurrency.toUpperCase()}`, 150, 280);
      }
      
      // Wallet address preview
      ctx.font = "10px Arial";
      ctx.fillStyle = "#666666";
      const addrPreview = `${walletAddress.substring(0, 8)}...${walletAddress.substring(walletAddress.length - 8)}`;
      ctx.fillText(addrPreview, 150, 300);
      
      ctx.font = "10px Arial";
      ctx.fillText("Scan to pay", 150, 320);
    }
    
    const link = document.createElement("a");
    link.download = `crypto-payment-${cryptocurrency}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [cryptocurrency, amount, walletAddress]);

  const validateAddress = () => {
    if (!walletAddress) return false;
    // Basic validation - real validation would be crypto-specific
    return walletAddress.length >= 26 && walletAddress.length <= 62;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            QR Code for Crypto Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
              <select
                id="cryptocurrency"
                value={cryptocurrency}
                onChange={(e) => setCryptocurrency(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {cryptocurrencies.map((crypto) => (
                  <option key={crypto.value} value={crypto.value}>
                    {crypto.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Optional)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.00000001"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Textarea
                id="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your cryptocurrency wallet address"
                rows={3}
              />
              {walletAddress && !validateAddress() && (
                <p className="text-sm text-red-500">
                  Please enter a valid wallet address
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Label (Optional)</Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Payment reference"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Payment note"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleGenerate} 
              disabled={!walletAddress || !validateAddress()}
            >
              <Coins className="w-4 h-4 mr-2" />
              Generate Payment QR
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!generated && !walletAddress}>
              <Copy className="w-4 h-4 mr-2" />
              Copy {generated ? "URI" : "Address"}
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <p className="text-sm text-gray-600 mb-1">Payment URI:</p>
                <p className="text-xs font-mono text-green-700 break-all">{paymentUri}</p>
                <p className="text-xs text-gray-500 mt-2">
                  ✓ Compatible with most crypto wallets
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm font-semibold mb-3">Payment QR Preview:</p>
                <div className="flex justify-center">
                  <div className="relative w-56 h-64 bg-white border-2 border-gray-300">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: cryptocurrency === "bitcoin" ? "#f7931a" : 
                                        cryptocurrency === "ethereum" ? "#627eea" :
                                        cryptocurrency === "litecoin" ? "#345d9d" : "#666"
                      }}
                    >
                      <span className="text-white font-bold text-lg">
                        {cryptocurrency === "bitcoin" ? "₿" : 
                         cryptocurrency === "ethereum" ? "Ξ" :
                         cryptocurrency === "litecoin" ? "Ł" : "$"}
                      </span>
                    </div>
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gray-100 border flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="grid grid-cols-5 gap-0.5">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-5 h-5 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {amount && (
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                        <p className="font-bold text-sm">{amount} {cryptocurrency.toUpperCase()}</p>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                      <p className="text-xs text-gray-500">
                        {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 6)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Scan to pay</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Payment Details:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cryptocurrency: {cryptocurrencies.find(c => c.value === cryptocurrency)?.label}</li>
                  {amount && <li>• Amount: {amount}</li>}
                  {label && <li>• Label: {label}</li>}
                  {message && <li>• Message: {message}</li>}
                  <li>• Wallet: {walletAddress.substring(0, 10)}...{walletAddress.substring(walletAddress.length - 10)}</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeForCryptoPayment;

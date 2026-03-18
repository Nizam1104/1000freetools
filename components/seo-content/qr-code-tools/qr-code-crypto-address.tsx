import React from "react"

export default function QrCodeCryptoAddressSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code for Crypto Payment Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select the cryptocurrency you want to receive: Bitcoin, Ethereum, Litecoin, Dogecoin, USDT, or BNB. Each has its own address format.
          </p>
          <p>
            Enter your wallet address carefully. Double-check every character - crypto transactions are irreversible. Copy from your wallet app.
          </p>
          <p>
            Optionally specify an amount for fixed-price payments. The QR code will suggest this amount when scanned.
          </p>
          <p>
            Add a label to identify the payment purpose. This appears in the payer's wallet for their records.
          </p>
          <p>
            Include an optional message or invoice number. The payer sees this when scanning. Generate the payment QR code.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Freelancer payments</h3>
            <p className="text-sm text-muted-foreground">
              Accept crypto from international clients. No bank transfer fees. Faster settlement than traditional methods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">E-commerce checkout</h3>
            <p className="text-sm text-muted-foreground">
              Display QR codes at crypto checkout. Customers scan to pay from mobile wallets. Streamlines crypto payments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Donation collection</h3>
            <p className="text-sm text-muted-foreground">
              Nonprofits accept crypto donations. Display QR codes on websites and materials. Global donor accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">In-person sales</h3>
            <p className="text-sm text-muted-foreground">
              Market vendors accept crypto payments. Display QR code at booth. Tap-to-pay alternative.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Invoice payments</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes on crypto invoices. Clients scan to pay instantly. Reduces payment friction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tip jars</h3>
            <p className="text-sm text-muted-foreground">
              Content creators display crypto tip jars. Fans scan to send small amounts. Micro-payment friendly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Always verify wallet addresses.</strong>
              Crypto addresses are long and complex. Copy-paste to avoid errors. Verify first and last few characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Network compatibility matters.</strong>
              Ensure sender uses the correct network. USDT exists on multiple chains. Wrong network = lost funds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transactions are irreversible.</strong>
              Crypto payments can't be undone. Verify amount and address before sharing QR codes. Double-check everything.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Price volatility affects value.</strong>
              Crypto values fluctuate. Fixed amounts may change value quickly. Consider stablecoins for price stability.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security warning:</strong> Never share private keys or seed phrases. QR codes should only contain public receiving addresses. Guard your private information.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a crypto payment URI?</h3>
            <p className="text-sm text-muted-foreground">
              A formatted string like bitcoin:address?amount=1.0&label=Payment. Wallets recognize this format and pre-fill payment details.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I request exact amounts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, include amount in the QR code. Payers see suggested amount. They can usually modify it before sending.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if sender uses wrong network?</h3>
            <p className="text-sm text-muted-foreground">
              Funds may be lost permanently. Clearly specify the network. Use network-specific addresses. Educate payers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I verify payment received?</h3>
            <p className="text-sm text-muted-foreground">
              Check your wallet or use a block explorer. Enter your address to see transactions. Wait for confirmations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track QR code payments?</h3>
            <p className="text-sm text-muted-foreground">
              Use unique addresses for different purposes. Or include unique labels/messages. Track on the blockchain.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about transaction fees?</h3>
            <p className="text-sm text-muted-foreground">
              Payers pay network fees. You receive the full amount sent. Fees vary by network congestion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use stablecoins?</h3>
            <p className="text-sm text-muted-foreground">
              Stablecoins reduce volatility risk. USDT and USDC maintain dollar value. Good for business transactions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function CryptoAddressValidatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This cryptocurrency address validator checks if wallet addresses are properly formatted
            and have valid checksums. Different cryptocurrencies use different address formats
            and encoding schemes, and this tool validates them before you send funds.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> Identifies the address type by prefix and length (Bitcoin Legacy starts with 1/3, SegWit with bc1, Ethereum with 0x).</li>
            <li><strong className="text-foreground">Character validation:</strong> Checks that only valid characters are used (Base58 for Bitcoin, hex for Ethereum, Bech32 for SegWit).</li>
            <li><strong className="text-foreground">Checksum verification:</strong> Decodes the address and verifies the embedded checksum matches the calculated value.</li>
            <li><strong className="text-foreground">Network identification:</strong> Determines if the address is for mainnet or testnet based on version bytes.</li>
          </ol>
          <p className="text-muted-foreground">
            A valid checksum catches most typos, preventing costly mistakes like sending Bitcoin
            to an invalid address where it would be lost forever.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Before Sending Cryptocurrency",
              description: "Verify the recipient address is valid before transferring funds to prevent permanent loss."
            },
            {
              title: "Checking Copied Addresses",
              description: "Validate addresses copied from emails, websites, or messages to ensure they weren't corrupted."
            },
            {
              title: "Development and Testing",
              description: "Validate test addresses when building cryptocurrency applications or smart contracts."
            },
            {
              title: "Customer Support",
              description: "Help users troubleshoot failed transactions by checking if their address was valid."
            },
            {
              title: "Exchange Withdrawal Setup",
              description: "Verify your personal wallet address before adding it to an exchange withdrawal whitelist."
            },
            {
              title: "Learning Address Formats",
              description: "Understand how different cryptocurrencies encode addresses and validate them."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Valid doesn't mean owned by recipient",
              explanation: "Validation only checks format and checksum. It doesn't verify the address belongs to who you think. Always confirm through a trusted channel."
            },
            {
              caveat: "Different networks have different addresses",
              explanation: "Bitcoin, Ethereum, and other chains use incompatible address formats. Sending BTC to an ETH address will lose your funds."
            },
            {
              caveat: "Checksum catches typos, not all errors",
              explanation: "About 96% of random typos are caught. But swapping entire sections or using a different valid address won't be detected."
            },
            {
              caveat: "Testnet vs mainnet addresses differ",
              explanation: "Testnet addresses look similar but work only on test networks. Sending mainnet funds to a testnet address loses them."
            },
            {
              caveat: "Some addresses can't be validated offline",
              explanation: "Newer address types or tokens on smart contract platforms may have validation rules that require network data."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What happens if I send to an invalid address?",
              answer: "If the address fails checksum validation, most wallets will reject it. If it's valid but wrong, the funds are permanently lost - cryptocurrency transactions are irreversible."
            },
            {
              question: "Why do Bitcoin addresses start with different numbers?",
              answer: "Different prefixes indicate different formats: 1 = Legacy (P2PKH), 3 = SegWit-compatible (P2SH), bc1 = Native SegWit (Bech32). All are valid Bitcoin addresses."
            },
            {
              question: "Can two people have the same address?",
              answer: "Theoretically possible but astronomically unlikely. Bitcoin addresses are 160 bits - that's 1.46 septillion possible addresses. Collision probability is essentially zero."
            },
            {
              question: "What's the difference between Base58 and Bech32?",
              answer: "Base58 removes similar-looking characters (0/O, I/l) to prevent typos. Bech32 is newer, has better error detection, and is case-insensitive. Used for SegWit addresses."
            },
            {
              question: "Why do Ethereum addresses start with 0x?",
              answer: "0x indicates hexadecimal notation. Ethereum addresses are 20-byte values displayed as 40 hex characters. The 0x prefix is a programming convention for hex numbers."
            },
            {
              question: "Can I recover funds sent to a wrong but valid address?",
              answer: "No. Cryptocurrency transactions are irreversible. If the address is valid (even if you made a mistake), the funds are gone unless you control that address."
            },
            {
              question: "What's a vanity address?",
              answer: "A custom address starting with chosen characters (like 1Love...). Generated by trying random keys until one produces the desired prefix. Purely cosmetic, no security benefit."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

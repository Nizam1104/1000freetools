import React from "react"

export default function ManchesterCodeEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Manchester Code Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter binary data to encode as Manchester code, or input Manchester-encoded signal to decode. Visualize the waveform transitions as you work.
          </p>
          <p>
            Manchester encoding represents each bit with a transition. Logic 0: low-to-high transition. Logic 1: high-to-low transition. Each bit period has exactly one transition in the middle.
          </p>
          <p>
            The encoder generates the Manchester waveform from binary input. The decoder samples the transitions to recover the original data. Clock recovery is inherent in the encoding.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding Ethernet physical layer</h3>
            <p className="text-sm text-muted-foreground">
              10BASE-T Ethernet uses Manchester encoding. Understand how data is transmitted over the wire. Essential for network engineering studies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with RFID systems</h3>
            <p className="text-sm text-muted-foreground">
              Many RFID standards use Manchester encoding. Decode tag transmissions. Understand the physical layer of contactless communication.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing IR remote protocols</h3>
            <p className="text-sm text-muted-foreground">
              Some IR remotes use Manchester coding. Decode remote control signals. Reverse engineer IR protocols for home automation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Studying digital communications</h3>
            <p className="text-sm text-muted-foreground">
              Manchester code is taught in communications courses. Work through examples to understand line coding. Visual learning for engineering students.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging serial protocols</h3>
            <p className="text-sm text-muted-foreground">
              Some custom serial protocols use Manchester. Decode captured waveforms. Verify correct encoding in embedded systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing clock recovery circuits</h3>
            <p className="text-sm text-muted-foreground">
              Manchester encoding embeds clock in data. Study how transitions enable clock recovery. Design PLL circuits for data recovery.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">50% duty cycle is guaranteed.</strong>
              Each bit has equal high and low time. This DC balance enables transformer coupling. Important for Ethernet and other isolated links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bandwidth is doubled.</strong>
              Manchester needs twice the bandwidth of raw binary. Each bit requires a transition. Trade bandwidth for clock recovery.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transition polarity varies.</strong>
              IEEE 802.3: 0 = low-high, 1 = high-low. G.E. Thomas: opposite convention. Know which standard your system uses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Clock is embedded in data.</strong>
              No separate clock line needed. Receiver extracts clock from transitions. Simplifies cabling but requires more complex decoding.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When analyzing Manchester signals, look for the mid-bit transitions. Edge transitions (at bit boundaries) may or may not occur. Mid-bit transitions are the data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is Manchester encoding?</h3>
            <p className="text-sm text-muted-foreground">
              Line code where each bit has a transition in the middle. 0 and 1 are distinguished by transition direction. Self-clocking and DC-balanced.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use Manchester coding?</h3>
            <p className="text-sm text-muted-foreground">
              Embeds clock in data stream. No separate clock needed. DC balanced for transformer coupling. Error detection from missing transitions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the bandwidth overhead?</h3>
            <p className="text-sm text-muted-foreground">
              100% overhead - needs twice the bandwidth of NRZ. Each bit requires a full cycle. Trade-off for self-clocking capability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where is it used?</h3>
            <p className="text-sm text-muted-foreground">
              10BASE-T Ethernet, RFID (ISO 14443), some IR protocols, industrial buses. Less common in modern high-speed links but still relevant.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do you decode Manchester?</h3>
            <p className="text-sm text-muted-foreground">
              Sample at bit center. Compare to previous sample. Transition direction determines bit value. Requires bit timing recovery first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's differential Manchester?</h3>
            <p className="text-sm text-muted-foreground">
              Variant where 0 has transition at bit start, 1 doesn't. Always has mid-bit transition. Used in token ring and some RFID.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can errors be detected?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, missing mid-bit transitions indicate errors. Multiple transitions in one bit period also indicate errors. Basic error detection built-in.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

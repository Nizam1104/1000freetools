import React from "react"

export default function SampleSizeCalculatorSurveysSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Sample Size Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select whether you're estimating a proportion (percentage) or a mean (average). For proportions, enter your expected proportion (use 0.5 if unknown for maximum sample size). For means, enter the estimated standard deviation.
          </p>
          <p>
            Input your desired confidence level (typically 95%) and margin of error (precision). The margin of error is the half-width of your confidence interval - how close you want your estimate to be to the true value. Enter population size if known for finite population correction.
          </p>
          <p>
            The calculator uses the appropriate formula: for proportions n = (Z² × p × (1-p)) / E², for means n = (Z² × σ²) / E². Results adjust for finite populations when specified. The required sample size displays with explanation of what it achieves.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Political polling design</h3>
            <p className="text-sm text-muted-foreground">
              Determine how many voters to survey for ±3% margin of error at 95% confidence. Balance precision with budget constraints for election polling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer satisfaction surveys</h3>
            <p className="text-sm text-muted-foreground">
              Calculate respondents needed to estimate satisfaction rate within 5%. Ensure your survey results reliably represent the entire customer base.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Market research studies</h3>
            <p className="text-sm text-muted-foreground">
              Plan sample size for product preference studies. Determine how many consumers to interview to make reliable claims about market preferences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Employee engagement surveys</h3>
            <p className="text-sm text-muted-foreground">
              Find how many employees must respond to get accurate engagement scores. Account for expected response rate when distributing surveys.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Public health surveys</h3>
            <p className="text-sm text-muted-foreground">
              Calculate sample size for prevalence studies. Estimate disease prevalence or health behavior rates with specified precision for public health planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic research projects</h3>
            <p className="text-sm text-muted-foreground">
              Justify sample size in research proposals. Show reviewers your survey will produce estimates with acceptable precision for your research questions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Margin of error is half the confidence interval width.</strong>
              A 5% margin of error means your estimate is within ±5% of the true value. Smaller margins require larger samples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">95% confidence is standard but not mandatory.</strong>
              Higher confidence (99%) needs larger samples. Lower confidence (90%) needs fewer. Match confidence level to your decision's importance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Use 0.5 for proportions when uncertain.</strong>
              p = 0.5 gives the maximum (most conservative) sample size. If you know the proportion is around 0.1 or 0.9, use that for smaller samples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Finite population correction reduces sample size.</strong>
              When sampling a large fraction of a small population, you need fewer responses. The correction matters when n/N {">"} 5%.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always inflate your calculated sample size for expected non-response. If you need 400 responses and expect 40% response rate, send 400/0.40 = 1000 invitations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does 50% give the largest sample?</h3>
            <p className="text-sm text-muted-foreground">
              The formula includes p × (1-p), which is maximized at p = 0.5. This represents maximum uncertainty - equal chance of either outcome.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does population size affect sample size?</h3>
            <p className="text-sm text-muted-foreground">
              For large populations (&gt;100,000), it barely matters. For smaller populations, you need proportionally more. Sampling 100 from 200 is very different than 100 from 1,000,000.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a typical margin of error?</h3>
            <p className="text-sm text-muted-foreground">
              Political polls use ±3%. Market research often accepts ±5%. Internal surveys might use ±7-10%. Tighter margins cost more in sample size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for stratified sampling?</h3>
            <p className="text-sm text-muted-foreground">
              This calculates total sample size. For stratified sampling, allocate this total across strata proportionally or optimally based on stratum variance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my sample is smaller than calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Your margin of error will be larger than planned. You can calculate the actual margin achieved with your obtained sample size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I estimate standard deviation for means?</h3>
            <p className="text-sm text-muted-foreground">
              Use pilot data, previous studies, or rule of thumb: SD ≈ range/4. If unsure, run a small pilot study to estimate variability before the main survey.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this for hypothesis testing?</h3>
            <p className="text-sm text-muted-foreground">
              No, this is for estimation (confidence intervals). For hypothesis testing power calculations, use a statistical power calculator instead.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

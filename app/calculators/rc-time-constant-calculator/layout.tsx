import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
  description: "Calculate the time constant for RC circuits. τ = R × C determines charging and discharging rates.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rc-time-constant-calculator",
  },
};

const tools = [
  {
    "name": "Rl Time Constant Calculator",
    "description": "RL Time Constant Calculator – Calculate RL Circuit Time Constant",
    "href": "/calculators/rl-time-constant-calculator"
  },
  {
    "name": "Rlc Resonance Calculator",
    "description": "RLC Resonance Calculator – Calculate Resonant Frequency",
    "href": "/calculators/rlc-resonance-calculator"
  },
  {
    "name": "Inductor Calculations",
    "description": "Inductor Calculator – Inductance and Inductive Reactance Calculator",
    "href": "/calculators/inductor-calculations"
  },
  {
    "name": "Series Parallel Capacitor Calculator",
    "description": "Capacitor Calculator – Series and Parallel Capacitance Calculator",
    "href": "/calculators/series-parallel-capacitor-calculator"
  },
  {
    "name": "Duty Cycle Calculator",
    "description": "Duty Cycle Calculator – Calculate PWM Duty Cycle",
    "href": "/calculators/duty-cycle-calculator"
  },
  {
    "name": "Pwm Frequency Calculator",
    "description": "PWM Frequency Calculator – Calculate PWM Output Frequency",
    "href": "/calculators/pwm-frequency-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/calculators/rc-time-constant-calculator">Rc Time Constant Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">RC Time Constant Calculator – Calculate RC Circuit Time Constant</h1>
        <p className="text-muted-foreground">Calculate the time constant for RC circuits. τ = R × C determines charging and discharging rates.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}

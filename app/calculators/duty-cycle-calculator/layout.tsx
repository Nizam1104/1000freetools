import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Duty Cycle Calculator – Calculate PWM Duty Cycle",
  description: "Calculate duty cycle, on-time, and off-time for PWM signals. Essential for motor control and power regulation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/duty-cycle-calculator",
  },
};

const tools = [
  {
    "name": "Pwm Frequency Calculator",
    "description": "PWM Frequency Calculator – Calculate PWM Output Frequency",
    "href": "/pwm-frequency-calculator"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/frequency-calculator"
  },
  {
    "name": "Rc Time Constant Calculator",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
    "href": "/rc-time-constant-calculator"
  },
  {
    "name": "Rl Time Constant Calculator",
    "description": "RL Time Constant Calculator – Calculate RL Circuit Time Constant",
    "href": "/rl-time-constant-calculator"
  },
  {
    "name": "Rlc Resonance Calculator",
    "description": "RLC Resonance Calculator – Calculate Resonant Frequency",
    "href": "/rlc-resonance-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Duty Cycle Calculator – Calculate PWM Duty Cycle</h1>
        <p className="text-muted-foreground">Calculate duty cycle, on-time, and off-time for PWM signals. Essential for motor control and power regulation.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}

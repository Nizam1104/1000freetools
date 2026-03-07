import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "PWM Frequency Calculator – Calculate PWM Output Frequency",
  description: "Calculate PWM frequency based on clock speed, prescaler, and resolution. Essential for motor control and power electronics.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pwm-frequency-calculator",
  },
};

const tools = [
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/calculators/frequency-calculator"
  },
  {
    "name": "Duty Cycle Calculator",
    "description": "Duty Cycle Calculator – Calculate PWM Duty Cycle",
    "href": "/calculators/duty-cycle-calculator"
  },
  {
    "name": "Rc Time Constant Calculator",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
    "href": "/calculators/rc-time-constant-calculator"
  },
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
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">PWM Frequency Calculator – Calculate PWM Output Frequency</h1>
        <p className="text-muted-foreground">Calculate PWM frequency based on clock speed, prescaler, and resolution. Essential for motor control and power electronics.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const calculators = [
  // Health & Fitness
  { name: "BMI Calculator", slug: "bmi-calculator", category: "health" },
  { name: "Body Fat Calculator", slug: "body-fat-calculator", category: "health" },
  { name: "BMR Calculator", slug: "bmr-calculator", category: "health" },
  { name: "TDEE Calculator", slug: "tdee-calculator", category: "health" },
  { name: "Macro Calculator", slug: "macro-calculator", category: "health" },
  { name: "Daily Calorie Needs Calculator", slug: "daily-calorie-needs-calculator", category: "health" },
  { name: "Protein Intake Calculator", slug: "protein-intake-calculator", category: "health" },
  { name: "Carb Intake Calculator", slug: "carb-intake-calculator", category: "health" },
  { name: "Fat Intake Calculator", slug: "fat-intake-calculator", category: "health" },
  { name: "Water Requirement Calculator", slug: "water-requirement-calculator", category: "health" },
  { name: "Ideal Weight Calculator", slug: "ideal-weight-calculator", category: "health" },
  { name: "Lean Body Mass Calculator", slug: "lean-body-mass-calculator", category: "health" },
  { name: "Body Surface Area Calculator", slug: "body-surface-area-calculator", category: "health" },
  { name: "Waist-to-Height Ratio Calculator", slug: "waist-to-height-ratio-calculator", category: "health" },
  { name: "Waist-to-Hip Ratio Calculator", slug: "waist-to-hip-ratio-calculator", category: "health" },
  { name: "Calorie Deficit Calculator", slug: "calorie-deficit-calculator", category: "health" },
  { name: "Weight Loss Time Calculator", slug: "weight-loss-time-calculator", category: "health" },
  { name: "Walking Calorie Calculator", slug: "walking-calorie-calculator", category: "health" },
  { name: "Running Calorie Calculator", slug: "running-pace-calculator", category: "health" },
  { name: "Cycling Calorie Calculator", slug: "cycling-calorie-calculator", category: "health" },
  { name: "Swimming Calorie Calculator", slug: "swimming-calorie-calculator", category: "health" },
  { name: "Activity Calorie Calculator", slug: "activity-calorie-calculator", category: "health" },
  { name: "MET Calorie Calculator", slug: "met-calorie-calculator", category: "health" },
  { name: "Steps to Calories Calculator", slug: "steps-to-calories-calculator", category: "health" },
  { name: "Heart Rate Zones Calculator", slug: "heart-rate-zones-calculator", category: "health" },
  { name: "VO2 Max Calculator", slug: "vo2-max-calculator", category: "health" },
  { name: "Cooper Test Calculator", slug: "cooper-test-calculator", category: "health" },
  { name: "Running Pace Calculator", slug: "running-pace-calculator", category: "health" },
  { name: "Marathon Pace Calculator", slug: "marathon-pace-calculator", category: "health" },
  { name: "Running Split Calculator", slug: "running-split-calculator", category: "health" },
  { name: "Pace to Speed Converter", slug: "pace-to-speed-converter", category: "health" },
  { name: "Speed to Pace Converter", slug: "speed-to-pace-converter", category: "health" },
  { name: "1RM Calculator", slug: "1rm-calculator", category: "health" },
  { name: "Workout Volume Calculator", slug: "workout-volume-calculator", category: "health" },
  { name: "Workout Rest Timer", slug: "workout-rest-timer", category: "health" },
  { name: "Warm-Up Calculator", slug: "warm-up-calculator", category: "health" },
  { name: "Workout Max Reps Estimator", slug: "workout-max-reps-estimator", category: "health" },
  { name: "Load Progression Calculator", slug: "load-progression-calculator", category: "health" },
  { name: "Sleep Cycle Calculator", slug: "sleep-cycle-calculator", category: "health" },
  { name: "Ideal Bedtime Calculator", slug: "ideal-bedtime-calculator", category: "health" },
  { name: "Sleep Debt Calculator", slug: "sleep-debt-calculator", category: "health" },
  { name: "Deep Sleep Cycle Planner", slug: "deep-sleep-cycle-planner", category: "health" },
  { name: "Protein Distribution Calculator", slug: "protein-distribution-calculator", category: "health" },
  { name: "Protein Absorption Calculator", slug: "protein-absorption-calculator", category: "health" },
  { name: "Glycemic Index Calculator", slug: "glycemic-index-calculator", category: "health" },
  { name: "Glycemic Load Calculator", slug: "glycemic-load-calculator", category: "health" },
  { name: "Ketogenic Macro Calculator", slug: "ketogenic-macro-calculator", category: "health" },
  { name: "Lactate Threshold Calculator", slug: "lactate-threshold-calculator", category: "health" },
  { name: "Heart Rate Recovery Calculator", slug: "heart-rate-recovery-calculator", category: "health" },
  { name: "Blood Alcohol Calculator", slug: "blood-alcohol-calculator", category: "health" },
  { name: "Pregnancy Due Date Calculator", slug: "pregnancy-due-date-calculator", category: "health" },
  { name: "Pregnancy Week Calculator", slug: "pregnancy-week-calculator", category: "health" },
  { name: "Pregnancy Weight Gain Calculator", slug: "pregnancy-weight-gain-calculator", category: "health" },
  { name: "Ovulation Calculator", slug: "ovulation-calculator", category: "health" },
  { name: "Baby Age Calculator", slug: "baby-age-calculator", category: "health" },
  { name: "Child Height Predictor", slug: "child-height-predictor", category: "health" },
  { name: "Cholesterol Ratio Calculator", slug: "cholesterol-ratio-calculator", category: "health" },
  { name: "Blood Sugar Converter", slug: "blood-sugar-converter", category: "health" },
  { name: "Kidney Function (eGFR) Calculator", slug: "kidney-function-egfr-calculator", category: "health" },

  // Date & Time
  { name: "Age Calculator", slug: "age-calculator", category: "date" },
  { name: "Date Difference Calculator", slug: "date-difference-calculator", category: "date" },
  { name: "Date Add/Subtract Calculator", slug: "date-add-subtract-calculator", category: "date" },
  { name: "Business Days Calculator", slug: "business-days-calculator", category: "date" },
  { name: "Week Number Calculator", slug: "week-number-calculator", category: "date" },
  { name: "UNIX Timestamp Converter", slug: "unix-timestamp-converter", category: "date" },
  { name: "Countdown Calculator", slug: "countdown-calculator", category: "date" },
  { name: "Work Hours Calculator", slug: "work-hours-calculator", category: "date" },
  { name: "Time Duration Calculator", slug: "time-duration-calculator", category: "date" },
  { name: "Anniversary Calculator", slug: "anniversary-calculator", category: "date" },
  { name: "Retirement Age Calculator", slug: "retirement-age-calculator", category: "date" },
  { name: "Zodiac Sign Calculator", slug: "zodiac-sign-calculator", category: "date" },

  // Physics
  { name: "Speed Calculator", slug: "speed-calculator", category: "physics" },
  { name: "Velocity Calculator", slug: "velocity-calculator", category: "physics" },
  { name: "Acceleration Calculator", slug: "acceleration-calculator", category: "physics" },
  { name: "Force Calculator", slug: "force-calculator", category: "physics" },
  { name: "Work Calculator", slug: "work-calculator", category: "physics" },
  { name: "Energy Calculator", slug: "energy-calculator", category: "physics" },
  { name: "Power Calculator", slug: "power-calculator", category: "physics" },
  { name: "Torque Calculator", slug: "torque-calculator", category: "physics" },
  { name: "Momentum Calculator", slug: "momentum-calculator", category: "physics" },
  { name: "Kinetic Energy Calculator", slug: "kinetic-energy-calculator", category: "physics" },
  { name: "Potential Energy Calculator", slug: "potential-energy-calculator", category: "physics" },
  { name: "Density Calculator", slug: "density-calculator", category: "physics" },
  { name: "Pressure Calculator", slug: "pressure-calculator", category: "physics" },
  { name: "Gravitational Force Calculator", slug: "gravitational-force-calculator", category: "physics" },
  { name: "Gravitational Field Calculator", slug: "gravitational-field-calculator", category: "physics" },
  { name: "Escape Velocity Calculator", slug: "escape-velocity-calculator", category: "physics" },
  { name: "Orbital Period Calculator", slug: "orbital-period-calculator", category: "physics" },
  { name: "Spring Force (Hooke's Law) Calculator", slug: "spring-force-hookes-law-calculator", category: "physics" },
  { name: "Thermal Expansion Calculator", slug: "thermal-expansion-calculator", category: "physics" },
  { name: "Heat Transfer Calculator", slug: "heat-transfer-calculator", category: "physics" },
  { name: "Ideal Gas Law Calculator", slug: "ideal-gas-law-calculator", category: "physics" },
  { name: "Doppler Effect Calculator", slug: "doppler-effect-calculator", category: "physics" },
  { name: "Photon Energy Calculator", slug: "photon-energy-calculator", category: "physics" },
  { name: "Relativistic Energy Calculator", slug: "relativistic-energy-calculator", category: "physics" },
  { name: "Frequency Calculator", slug: "frequency-calculator", category: "physics" },
  { name: "Wavelength Calculator", slug: "wavelength-calculator", category: "physics" },
  { name: "Sound Speed Calculator", slug: "sound-speed-calculator", category: "physics" },
  { name: "Acoustic Impedance Calculator", slug: "acoustic-impedance-calculator", category: "physics" },
  { name: "Radiation Dose Calculator", slug: "radiation-dose-calculator", category: "physics" },
  { name: "Nuclear Decay Half-Life Calculator", slug: "nuclear-decay-half-life-calculator", category: "physics" },
  { name: "Lens Equation Calculator", slug: "lens-equation-calculator", category: "physics" },
  { name: "Mirror Equation Calculator", slug: "mirror-equation-calculator", category: "physics" },
  { name: "Focal Length Calculator", slug: "focal-length-calculator", category: "physics" },
  { name: "Snell's Law Calculator", slug: "snells-law-calculator", category: "physics" },
  { name: "Brewster Angle Calculator", slug: "brewster-angle-calculator", category: "physics" },
  { name: "Refraction Index Calculator", slug: "refraction-index-calculator", category: "physics" },

  // Electrical & Electronics
  { name: "Ohm's Law Calculator", slug: "ohms-law-calculator", category: "electrical" },
  { name: "Voltage Calculator", slug: "voltage-calculator", category: "electrical" },
  { name: "Current Calculator", slug: "current-calculator", category: "electrical" },
  { name: "Resistance Calculator", slug: "resistance-calculator", category: "electrical" },
  { name: "Electric Power Calculator", slug: "electric-power-calculator", category: "electrical" },
  { name: "Series/Parallel Resistor Calculator", slug: "series-parallel-resistor-calculator", category: "electrical" },
  { name: "Series/Parallel Capacitor Calculator", slug: "series-parallel-capacitor-calculator", category: "electrical" },
  { name: "Inductor Calculations", slug: "inductor-calculations", category: "electrical" },
  { name: "AC Impedance Calculator", slug: "ac-impedance-calculator", category: "electrical" },
  { name: "RLC Resonance Calculator", slug: "rlc-resonance-calculator", category: "electrical" },
  { name: "RC Time Constant Calculator", slug: "rc-time-constant-calculator", category: "electrical" },
  { name: "RL Time Constant Calculator", slug: "rl-time-constant-calculator", category: "electrical" },
  { name: "dB Calculator", slug: "db-calculator", category: "electrical" },
  { name: "RMS Value Calculator", slug: "rms-value-calculator", category: "electrical" },
  { name: "Peak-to-Peak Voltage Calculator", slug: "peak-to-peak-voltage-calculator", category: "electrical" },
  { name: "Power Factor Calculator", slug: "power-factor-calculator", category: "electrical" },
  { name: "LED Resistor Calculator", slug: "led-resistor-calculator", category: "electrical" },
  { name: "Wire Gauge Calculator", slug: "wire-gauge-calculator", category: "electrical" },
  { name: "Battery Life Calculator", slug: "battery-life-calculator", category: "electrical" },
  { name: "Battery C-Rate Calculator", slug: "battery-c-rate-calculator", category: "electrical" },
  { name: "Solar Panel Requirement Calculator", slug: "solar-panel-requirement-calculator", category: "electrical" },
  { name: "Inverter Capacity Calculator", slug: "inverter-capacity-calculator", category: "electrical" },
  { name: "Electrical Load Calculator", slug: "electrical-load-calculator", category: "electrical" },
  { name: "PCB Trace Width Calculator", slug: "pcb-trace-width-calculator", category: "electrical" },
  { name: "Signal-to-Noise Ratio Calculator", slug: "signal-to-noise-ratio-calculator", category: "electrical" },
  { name: "ADC Resolution Calculator", slug: "adc-resolution-calculator", category: "electrical" },
  { name: "DAC Resolution Calculator", slug: "dac-resolution-calculator", category: "electrical" },
  { name: "PWM Frequency Calculator", slug: "pwm-frequency-calculator", category: "electrical" },
  { name: "Duty Cycle Calculator", slug: "duty-cycle-calculator", category: "electrical" },
  { name: "Noise Level Calculator", slug: "noise-level-calculator", category: "electrical" },

  // Engineering & Mechanical
  { name: "Stress/Strain Calculator", slug: "stress-strain-calculator", category: "engineering" },
  { name: "Safety Factor Calculator", slug: "safety-factor-calculator", category: "engineering" },
  { name: "RPM Calculator", slug: "rpm-calculator", category: "engineering" },
  { name: "Gear Ratio Calculator", slug: "gear-ratio-calculator", category: "engineering" },
  { name: "Gear Train Efficiency Calculator", slug: "gear-train-efficiency-calculator", category: "engineering" },
  { name: "Belt Length Calculator", slug: "belt-length-calculator", category: "engineering" },
  { name: "Belt Tension Calculator", slug: "belt-tension-calculator", category: "engineering" },
  { name: "Pulley System Calculator", slug: "pulley-system-calculator", category: "engineering" },
  { name: "Shaft Torque Calculator", slug: "shaft-torque-calculator", category: "engineering" },
  { name: "Beam Bending Calculator", slug: "beam-bending-calculator", category: "engineering" },
  { name: "Column Buckling Calculator", slug: "column-buckling-calculator", category: "engineering" },
  { name: "Welding Strength Calculator", slug: "welding-strength-calculator", category: "engineering" },
  { name: "Bolt Torque Calculator", slug: "bolt-torque-calculator", category: "engineering" },
  { name: "Fastener Load Calculator", slug: "fastener-load-calculator", category: "engineering" },
  { name: "Rivet Strength Calculator", slug: "rivet-strength-calculator", category: "engineering" },
  { name: "Screw Thread Pitch Calculator", slug: "screw-thread-pitch-calculator", category: "engineering" },

  // Construction & Building
  { name: "Concrete Volume Calculator", slug: "concrete-volume-calculator", category: "construction" },
  { name: "Concrete Mix Ratio Calculator", slug: "concrete-mix-ratio-calculator", category: "construction" },
  { name: "Foundation Volume Calculator", slug: "foundation-volume-calculator", category: "construction" },
  { name: "Steel Weight Calculator", slug: "steel-weight-calculator", category: "construction" },
  { name: "Tile Calculator", slug: "tile-calculator", category: "construction" },
  { name: "Brick Calculator", slug: "brick-calculator", category: "construction" },
  { name: "Paint Coverage Calculator", slug: "paint-coverage-calculator", category: "construction" },
  { name: "Plastering Calculator", slug: "plastering-calculator", category: "construction" },
  { name: "Flooring Calculator", slug: "flooring-calculator", category: "construction" },
  { name: "Roofing Sheets Calculator", slug: "roofing-sheets-calculator", category: "construction" },

  // HVAC & Fluid Mechanics
  { name: "HVAC BTU Calculator", slug: "hvac-btu-calculator", category: "hvac" },
  { name: "HVAC Airflow Calculator", slug: "hvac-airflow-calculator", category: "hvac" },
  { name: "Heat Pump COP Calculator", slug: "heat-pump-cop-calculator", category: "hvac" },
  { name: "Boiler Efficiency Calculator", slug: "boiler-efficiency-calculator", category: "hvac" },
  { name: "Chiller Tonnage Calculator", slug: "chiller-tonnage-calculator", category: "hvac" },
  { name: "Pipe Friction Loss Calculator", slug: "pipe-friction-loss-calculator", category: "hvac" },
  { name: "Head Loss (Darcy-Weisbach) Calculator", slug: "head-loss-darcy-weisbach-calculator", category: "hvac" },
  { name: "Water Flow Rate Calculator", slug: "water-flow-rate-calculator", category: "hvac" },
  { name: "Pump Horsepower Calculator", slug: "pump-horsepower-calculator", category: "hvac" },
  { name: "Reynolds Number Calculator", slug: "pipe-flow-reynolds-number-calculator", category: "hvac" },
  { name: "Laminar/Turbulent Flow Calculator", slug: "laminar-turbulent-flow-calculator", category: "hvac" },
  { name: "Manning Equation Calculator", slug: "manning-equation-calculator", category: "hvac" },

  // Math
  { name: "Addition Calculator", slug: "addition-calculator", category: "math" },
  { name: "Subtraction Calculator", slug: "subtraction-calculator", category: "math" },
  { name: "Multiplication Calculator", slug: "multiplication-calculator", category: "math" },
  { name: "Division Calculator", slug: "division-calculator", category: "math" },
  { name: "Percentage Calculator", slug: "percentage-calculator", category: "math" },
  { name: "Percentage Change Calculator", slug: "percentage-change-calculator", category: "math" },
  { name: "Average Calculator", slug: "average-calculator", category: "math" },
  { name: "Median Calculator", slug: "median-calculator", category: "math" },
  { name: "Mode Calculator", slug: "mode-calculator", category: "math" },
  { name: "Range Calculator", slug: "range-calculator", category: "math" },
  { name: "Standard Deviation Calculator", slug: "standard-deviation-calculator", category: "math" },
  { name: "Variance Calculator", slug: "variance-calculator", category: "math" },
  { name: "Weighted Average Calculator", slug: "weighted-average-calculator", category: "math" },
  { name: "GCD Calculator", slug: "gcd-calculator", category: "math" },
  { name: "LCM Calculator", slug: "lcm-calculator", category: "math" },
  { name: "Prime Factorization Calculator", slug: "prime-factorization-calculator", category: "math" },
  { name: "Prime Checker", slug: "prime-checker", category: "math" },
  { name: "Factorial Calculator", slug: "factorial-calculator", category: "math" },
  { name: "Fibonacci Generator", slug: "fibonacci-generator", category: "math" },
  { name: "Random Number Generator", slug: "random-number-generator", category: "math" },
  { name: "Base Converter Calculator", slug: "base-converter-calculator", category: "math" },
  { name: "Roman Numerals Converter", slug: "roman-numerals-converter", category: "math" },
  { name: "Number to Words Converter", slug: "number-to-words-converter", category: "math" },
  { name: "Decimal to Fraction Calculator", slug: "decimal-to-fraction-calculator", category: "math" },
  { name: "Fraction to Decimal Calculator", slug: "fraction-to-decimal-calculator", category: "math" },
  { name: "Simplify Fraction Calculator", slug: "simplify-fraction-calculator", category: "math" },
  { name: "Rounding Calculator", slug: "rounding-calculator", category: "math" },
  { name: "Modulo Calculator", slug: "modulo-calculator", category: "math" },
  { name: "Exponent Calculator", slug: "exponent-calculator", category: "math" },
  { name: "Root Calculator", slug: "root-calculator", category: "math" },
  { name: "Logarithm Calculator", slug: "logarithm-calculator", category: "math" },
  { name: "Antilog Calculator", slug: "antilog-calculator", category: "math" },
  { name: "Scientific Notation Calculator", slug: "scientific-notation-calculator", category: "math" },
  { name: "Quadratic Equation Solver", slug: "quadratic-equation-solver", category: "math" },
  { name: "Linear Equation Solver", slug: "linear-equation-solver", category: "math" },
  { name: "Expression Evaluator", slug: "expression-evaluator", category: "math" },
  { name: "Pythagorean Theorem Calculator", slug: "pythagorean-theorem-calculator", category: "math" },
  { name: "Law of Sines Calculator", slug: "law-of-sines-calculator", category: "math" },
  { name: "Law of Cosines Calculator", slug: "law-of-cosines-calculator", category: "math" },
  { name: "Slope Calculator", slug: "slope-calculator", category: "math" },
  { name: "Distance Formula Calculator", slug: "distance-formula-calculator", category: "math" },
  { name: "Arithmetic Sequence Calculator", slug: "arithmetic-sequence-calculator", category: "math" },
  { name: "Geometric Sequence Calculator", slug: "geometric-sequence-calculator", category: "math" },
  { name: "Golden Ratio Calculator", slug: "golden-ratio-calculator", category: "math" },
  { name: "Pascal's Triangle Calculator", slug: "pascals-triangle-calculator", category: "math" },
  { name: "Combination Calculator", slug: "combination-calculator", category: "math" },
  { name: "Permutation Calculator", slug: "permutation-calculator", category: "math" },
  { name: "Matrix Addition Calculator", slug: "matrix-addition-calculator", category: "math" },
  { name: "Matrix Multiplication Calculator", slug: "matrix-multiplication-calculator", category: "math" },
  { name: "Determinant Calculator", slug: "determinant-calculator", category: "math" },
  { name: "Inverse Matrix Calculator", slug: "inverse-matrix-calculator", category: "math" },
  { name: "Z-Score Calculator", slug: "z-score-calculator", category: "math" },

  // Geometry
  { name: "Circle Area Calculator", slug: "circle-area-calculator", category: "geometry" },
  { name: "Triangle Area Calculator", slug: "triangle-area-calculator", category: "geometry" },
  { name: "Rectangle Area Calculator", slug: "rectangle-area-calculator", category: "geometry" },
  { name: "Square Area Calculator", slug: "square-area-calculator", category: "geometry" },
  { name: "Trapezoid Area Calculator", slug: "trapezoid-area-calculator", category: "geometry" },
  { name: "Parallelogram Area Calculator", slug: "parallelogram-area-calculator", category: "geometry" },
  { name: "Rhombus Area Calculator", slug: "rhombus-area-calculator", category: "geometry" },
  { name: "Ellipse Area Calculator", slug: "ellipse-area-calculator", category: "geometry" },
  { name: "Sector Area Calculator", slug: "sector-area-calculator", category: "geometry" },
  { name: "Volume of Cube Calculator", slug: "volume-of-cube-calculator", category: "geometry" },
  { name: "Volume of Cuboid Calculator", slug: "volume-of-cuboid-calculator", category: "geometry" },
  { name: "Volume of Cylinder Calculator", slug: "volume-of-cylinder-calculator", category: "geometry" },
  { name: "Volume of Cone Calculator", slug: "volume-of-cone-calculator", category: "geometry" },
  { name: "Volume of Pyramid Calculator", slug: "volume-of-pyramid-calculator", category: "geometry" },
  { name: "Volume of Sphere Calculator", slug: "volume-of-sphere-calculator", category: "geometry" },

  // Finance
  { name: "Loan EMI Calculator", slug: "loan-emi-calculator", category: "finance" },
  { name: "Business Loan EMI Calculator", slug: "business-loan-emi-calculator", category: "finance" },
  { name: "Car Loan Calculator", slug: "car-loan-calculator", category: "finance" },
  { name: "Mortgage Calculator", slug: "mortgage-calculator", category: "finance" },
  { name: "Simple Interest Calculator", slug: "simple-interest-calculator", category: "finance" },
  { name: "Compound Interest Calculator", slug: "compound-interest-calculator", category: "finance" },
  { name: "Fixed Deposit Interest Calculator", slug: "fixed-deposit-interest-calculator", category: "finance" },
  { name: "Recurring Deposit Calculator", slug: "recurring-deposit-calculator", category: "finance" },
  { name: "SIP Calculator", slug: "sip-calculator", category: "finance" },
  { name: "SIP Step Up Calculator", slug: "sip-step-up-calculator", category: "finance" },
  { name: "Step Down SIP Calculator", slug: "step-down-sip-calculator", category: "finance" },
  { name: "SWP Calculator", slug: "swp-calculator", category: "finance" },
  { name: "Future Value Calculator", slug: "future-value-calculator", category: "finance" },
  { name: "Present Value Calculator", slug: "present-value-calculator", category: "finance" },
  { name: "NPV Calculator", slug: "npv-calculator", category: "finance" },
  { name: "IRR Calculator", slug: "irr-calculator", category: "finance" },
  { name: "ROI Calculator", slug: "roi-calculator", category: "finance" },
  { name: "Rule of 72 Calculator", slug: "rule-of-72-calculator", category: "finance" },
  { name: "Payback Period Calculator", slug: "payback-period-calculator", category: "finance" },
  { name: "Break-Even Point Calculator", slug: "break-even-point-calculator", category: "finance" },
  { name: "Break-Even Discount Calculator", slug: "break-even-discount-calculator", category: "finance" },
  { name: "Discount Calculator", slug: "discount-calculator", category: "finance" },
  { name: "Markup Calculator", slug: "markup-calculator", category: "finance" },
  { name: "Margin Calculator", slug: "margin-calculator", category: "finance" },
  { name: "Net Profit Margin Calculator", slug: "net-profit-margin-calculator", category: "finance" },
  { name: "Operating Margin Calculator", slug: "operating-margin-calculator", category: "finance" },
  { name: "EBITDA Calculator", slug: "ebitda-calculator", category: "finance" },
  { name: "WACC Calculator", slug: "wacc-calculator", category: "finance" },
  { name: "Cost of Capital Calculator", slug: "cost-of-capital-calculator", category: "finance" },
  { name: "Bond Price Calculator", slug: "bond-price-calculator", category: "finance" },
  { name: "Bond Yield Calculator", slug: "bond-yield-calculator", category: "finance" },
  { name: "Bond Duration Calculator", slug: "bond-duration-calculator", category: "finance" },
  { name: "Bond Convexity Calculator", slug: "bond-convexity-calculator", category: "finance" },
  { name: "Yield to Maturity Calculator", slug: "yield-to-maturity-calculator", category: "finance" },
  { name: "Stock CAGR Calculator", slug: "stock-cagr-calculator", category: "finance" },
  { name: "Stock Split Calculator", slug: "stock-split-calculator", category: "finance" },
  { name: "Reverse Stock Split Calculator", slug: "reverse-stock-split-calculator", category: "finance" },
  { name: "Dividend Payout Calculator", slug: "dividend-payout-calculator", category: "finance" },
  { name: "Dividend Reinvestment Calculator", slug: "dividend-reinvestment-calculator", category: "finance" },
  { name: "Rental Yield Calculator", slug: "rental-yield-calculator", category: "finance" },
  { name: "Housing Affordability Calculator", slug: "housing-affordability-calculator", category: "finance" },
  { name: "Buy vs Rent Calculator", slug: "buy-vs-rent-calculator", category: "finance" },
  { name: "Mortgage Amortization Schedule", slug: "mortgage-amortization-schedule", category: "finance" },
  { name: "Loan Amortization Visualizer", slug: "loan-amortization-visualizer", category: "finance" },
  { name: "EMI Breakup Visualizer", slug: "emi-breakup-visualizer", category: "finance" },
  { name: "Interest vs Principal Split Calculator", slug: "interest-vs-principal-split-calculator", category: "finance" },
  { name: "Loan Prepayment Impact Calculator", slug: "loan-prepayment-impact-calculator", category: "finance" },
  { name: "Loan Refinancing Calculator", slug: "loan-refinancing-calculator", category: "finance" },
  { name: "Loan Payoff Time Calculator", slug: "loan-payoff-time-calculator", category: "finance" },
  { name: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator", category: "finance" },
  { name: "Minimum Payment Calculator", slug: "minimum-payment-calculator", category: "finance" },
  { name: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-ratio-calculator", category: "finance" },
  { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator", category: "finance" },
  { name: "Savings Goal Calculator", slug: "savings-goal-calculator", category: "finance" },
  { name: "Retirement Corpus Calculator", slug: "retirement-corpus-calculator", category: "finance" },
  { name: "4 Percent Rule Retirement Calculator", slug: "4-percent-rule-retirement-calculator", category: "finance" },
  { name: "Retirement Withdrawal Rate Calculator", slug: "retirement-withdrawal-rate-calculator", category: "finance" },
  { name: "FIRE Number Calculator", slug: "fire-number-calculator", category: "finance" },
  { name: "50/30/20 Budget Rule Calculator", slug: "50-30-20-budget-rule-calculator", category: "finance" },
  { name: "Monthly Budget Breakdown Calculator", slug: "monthly-budget-breakdown-calculator", category: "finance" },
  { name: "Wealth Growth Projection Calculator", slug: "wealth-growth-projection-calculator", category: "finance" },
  { name: "Compounding Frequency Comparison", slug: "compounding-frequency-comparison", category: "finance" },
  { name: "Lump Sum vs SIP Analyzer", slug: "lump-sum-vs-sip-analyzer", category: "finance" },
  { name: "Savings vs Investment Comparison", slug: "savings-vs-investment-comparison", category: "finance" },
  { name: "Dollar Cost Averaging Calculator", slug: "dollar-cost-averaging-calculator", category: "finance" },
  { name: "Investment Return Rate Calculator", slug: "investment-return-rate-calculator", category: "finance" },
  { name: "Startup Equity Calculator", slug: "startup-equity-calculator", category: "finance" },
  { name: "Valuation Cap Calculator", slug: "valuation-cap-calculator", category: "finance" },
  { name: "RSU Vesting Calculator", slug: "rsu-vesting-calculator", category: "finance" },
  { name: "Subscription Profit Calculator", slug: "subscription-profit-calculator", category: "finance" },
  { name: "Royalty Calculator", slug: "royalty-calculator", category: "finance" },
  { name: "Working Capital Calculator", slug: "working-capital-calculator", category: "finance" },
  { name: "Depreciation Calculator", slug: "depreciation-calculator", category: "finance" },
  { name: "Unit Price Calculator", slug: "unit-price-calculator", category: "finance" },
  { name: "Price Per Unit Comparison Calculator", slug: "price-per-unit-comparison-calculator", category: "finance" },
  { name: "Hourly Wage to Salary Calculator", slug: "hourly-wage-to-salary-calculator", category: "finance" },
  { name: "Salary to Hourly Calculator", slug: "salary-to-hourly-calculator", category: "finance" },
  { name: "Freelance Effective Hourly Rate Calculator", slug: "freelance-effective-hourly-rate-calculator", category: "finance" },
  { name: "Gross vs Net Income Calculator", slug: "gross-vs-net-income-calculator", category: "finance" },
  { name: "Interest Rate Finder Calculator", slug: "interest-rate-finder-calculator", category: "finance" },
  { name: "Mortgage Refinance Break-Even Calculator", slug: "mortgage-refinance-break-even-calculator", category: "finance" },
];

const categories = [
  { id: "all", name: "All" },
  { id: "health", name: "Health & Fitness" },
  { id: "date", name: "Date & Time" },
  { id: "physics", name: "Physics" },
  { id: "electrical", name: "Electrical" },
  { id: "engineering", name: "Engineering" },
  { id: "construction", name: "Construction" },
  { id: "hvac", name: "HVAC & Fluid" },
  { id: "math", name: "Math" },
  { id: "geometry", name: "Geometry" },
  { id: "finance", name: "Finance" },
];

export default function CalculatorsLandingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch = calc.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || calc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Free Online Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access {calculators.length}+ free calculators for health, finance, math, physics, engineering, and more. 
            Fast, accurate, and easy to use.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <Input
            placeholder="Search calculators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCalculators.map((calc) => (
            <Card key={calc.slug} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <CardTitle className="text-base font-medium">
                  <a href={`/calculators/${calc.slug}`} className="hover:text-primary transition-colors">
                    {calc.name}
                  </a>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No calculators found matching your search.</p>
            <Button variant="link" onClick={() => { setSearch(""); setActiveCategory("all"); }}>
              Clear filters
            </Button>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Total: {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? "s" : ""} available</p>
        </div>
      </div>
    </div>
  );
}

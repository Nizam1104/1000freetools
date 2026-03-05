"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const calculators = [
  {
    "name": "0–100 Acceleration Estimator",
    "slug": "0-100-acceleration-estimator",
    "category": "automotive",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time"
  },
  {
    "name": "1RM Calculator",
    "slug": "1rm-calculator",
    "category": "health",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "slug": "4-percent-rule-retirement-calculator",
    "category": "finance",
    "description": "4% Rule Retirement Calculator"
  },
  {
    "name": "50/30/20 Budget Rule Calculator",
    "slug": "50-30-20-budget-rule-calculator",
    "category": "finance",
    "description": "50/30/20 Budget Rule Calculator"
  },
  {
    "name": "A/B Test Significance Calculator",
    "slug": "a-b-test-significance-calculator",
    "category": "utilities",
    "description": "A/B Test Significance Calculator – Check If Your Test Results Are Statistically Valid"
  },
  {
    "name": "AC Impedance Calculator",
    "slug": "ac-impedance-calculator",
    "category": "electrical",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits"
  },
  {
    "name": "ADC Resolution Calculator",
    "slug": "adc-resolution-calculator",
    "category": "electrical",
    "description": "ADC Resolution Calculator – Calculate ADC LSB Size"
  },
  {
    "name": "AES Key Size Estimator",
    "slug": "aes-key-size-estimator",
    "category": "security",
    "description": "AES Key Size Estimator – Understand Encryption Key Strength"
  },
  {
    "name": "Acceleration Calculator",
    "slug": "acceleration-calculator",
    "category": "physics",
    "description": "Acceleration Calculator"
  },
  {
    "name": "Acoustic Impedance Calculator",
    "slug": "acoustic-impedance-calculator",
    "category": "physics",
    "description": "Acoustic Impedance Calculator – Calculate Z"
  },
  {
    "name": "Activity Calorie Calculator",
    "slug": "activity-calorie-calculator",
    "category": "health",
    "description": "Activity Calorie Burn Calculator – Calories Burned by Activity & Duration"
  },
  {
    "name": "Addition Calculator",
    "slug": "addition-calculator",
    "category": "math",
    "description": "Addition Calculator"
  },
  {
    "name": "Age Calculator",
    "slug": "age-calculator",
    "category": "date",
    "description": "Age Calculator – Calculate Your Exact Age in Years, Months & Days"
  },
  {
    "name": "Air Conditioner Tonnage Calculator",
    "slug": "air-conditioner-tonnage-calculator",
    "category": "home",
    "description": "AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room"
  },
  {
    "name": "Air Density Calculator",
    "slug": "air-density-calculator",
    "category": "weather",
    "description": "Air Density Calculator – Calculate Air Density by Temperature & Pressure"
  },
  {
    "name": "Alcohol Dilution Calculator",
    "slug": "alcohol-dilution-calculator",
    "category": "food",
    "description": "Alcohol Dilution Calculator – Calculate Water to Add for Target ABV"
  },
  {
    "name": "Altitude Sickness Risk Calculator",
    "slug": "altitude-sickness-risk-calculator",
    "category": "utilities",
    "description": "Altitude Sickness Risk Calculator – Assess Your Risk of AMS Before Climbing"
  },
  {
    "name": "Anniversary Calculator",
    "slug": "anniversary-calculator",
    "category": "date",
    "description": "Anniversary Calculator – Free Anniversary Date Counter"
  },
  {
    "name": "Antilog Calculator",
    "slug": "antilog-calculator",
    "category": "math",
    "description": "Antilog Calculator"
  },
  {
    "name": "Aperture Depth-of-Field Calculator",
    "slug": "aperture-depth-of-field-calculator",
    "category": "photography",
    "description": "Depth of Field Calculator – Calculate DOF from Aperture, Focal Length & Distance"
  },
  {
    "name": "Aquarium CO₂ Calculator",
    "slug": "aquarium-co-calculator",
    "category": "pets",
    "description": "Aquarium CO₂ Calculator – Calculate CO₂ Injection Rate for Planted Tanks"
  },
  {
    "name": "Aquarium Filtration Calculator",
    "slug": "aquarium-filtration-calculator",
    "category": "pets",
    "description": "Aquarium Filtration Calculator – Find the Right Filter Size for Your Fish Tank"
  },
  {
    "name": "Aquarium Volume Calculator",
    "slug": "aquarium-volume-calculator",
    "category": "pets",
    "description": "Aquarium Volume Calculator – Calculate Fish Tank Water Capacity"
  },
  {
    "name": "Arithmetic Sequence Calculator",
    "slug": "arithmetic-sequence-calculator",
    "category": "math",
    "description": "Arithmetic Sequence Calculator"
  },
  {
    "name": "Asphalt Quantity Calculator",
    "slug": "asphalt-quantity-calculator",
    "category": "construction",
    "description": "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways"
  },
  {
    "name": "Attendance Percentage Calculator",
    "slug": "attendance-percentage-calculator",
    "category": "education",
    "description": "Attendance Percentage Calculator – Check If You Meet the Minimum Attendance Requirement"
  },
  {
    "name": "Audio Dynamic Range Calculator",
    "slug": "audio-dynamic-range-calculator",
    "category": "automotive",
    "description": "Audio Dynamic Range Calculator – Calculate dB Dynamic Range of Audio Signals"
  },
  {
    "name": "Average Calculator",
    "slug": "average-calculator",
    "category": "math",
    "description": "Average Calculator – Calculate Mean, Median & More"
  },
  {
    "name": "BMI Calculator",
    "slug": "bmi-calculator",
    "category": "health",
    "description": "BMI Calculator – Free Body Mass Index Calculator Online"
  },
  {
    "name": "BMR Calculator",
    "slug": "bmr-calculator",
    "category": "health",
    "description": "BMR Calculator"
  },
  {
    "name": "Baby Age Calculator",
    "slug": "baby-age-calculator",
    "category": "health",
    "description": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months"
  },
  {
    "name": "Baby Feeding Chart Calculator",
    "slug": "baby-feeding-chart-calculator",
    "category": "parenting",
    "description": "Baby Feeding Chart Calculator – How Much & How Often to Feed Your Baby"
  },
  {
    "name": "Baby Sleep Schedule Calculator",
    "slug": "baby-sleep-schedule-calculator",
    "category": "parenting",
    "description": "Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby"
  },
  {
    "name": "Backpack Load Calculator",
    "slug": "backpack-load-calculator",
    "category": "outdoor",
    "description": "Backpack Load Calculator – Find Your Safe Maximum Pack Weight"
  },
  {
    "name": "Bacterial Growth Calculator",
    "slug": "bacterial-growth-calculator",
    "category": "science",
    "description": "Bacterial Growth Calculator – Model Microbial Population Growth"
  },
  {
    "name": "Baking Time Adjustment Calculator",
    "slug": "baking-time-adjustment-calculator",
    "category": "food",
    "description": "Baking Time Adjustment Calculator – Adjust Oven Time When Changing Pan Sizes"
  },
  {
    "name": "Base Converter Calculator",
    "slug": "base-converter-calculator",
    "category": "math",
    "description": "Base Converter Calculator"
  },
  {
    "name": "Basketball Shooting Percentage Calculator",
    "slug": "basketball-shooting-percentage-calculator",
    "category": "gaming",
    "description": "Basketball Shooting Percentage Calculator – Calculate FG%, 3P% & FT%"
  },
  {
    "name": "Battery Backup Time Calculator",
    "slug": "battery-backup-time-calculator",
    "category": "utilities",
    "description": "Battery Backup Time Calculator – How Long Will Your Battery Last?"
  },
  {
    "name": "Battery C-Rate Calculator",
    "slug": "battery-c-rate-calculator",
    "category": "electrical",
    "description": "Battery C-Rate Calculator – Calculate Charge/Discharge Rate"
  },
  {
    "name": "Battery Life Calculator",
    "slug": "battery-life-calculator",
    "category": "electrical",
    "description": "Battery Life Calculator – Calculate Battery Runtime"
  },
  {
    "name": "Beam Bending Calculator",
    "slug": "beam-bending-calculator",
    "category": "engineering",
    "description": "Beam Bending Calculator – Stress & Deflection for Structural Beams"
  },
  {
    "name": "Beer ABV Calculator",
    "slug": "beer-abv-calculator",
    "category": "food",
    "description": "Beer ABV Calculator – Calculate Alcohol Content of Your Home Brew"
  },
  {
    "name": "Belt Length Calculator",
    "slug": "belt-length-calculator",
    "category": "engineering",
    "description": "Belt Length Calculator – Calculate V-Belt Length"
  },
  {
    "name": "Belt Tension Calculator",
    "slug": "belt-tension-calculator",
    "category": "engineering",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension"
  },
  {
    "name": "Biorhythm Calculator",
    "slug": "biorhythm-calculator",
    "category": "lifestyle",
    "description": "Biorhythm Calculator – Track Your Physical, Emotional & Intellectual Cycles"
  },
  {
    "name": "Bird Cage Size Calculator",
    "slug": "bird-cage-size-calculator",
    "category": "pets",
    "description": "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird"
  },
  {
    "name": "Blood Alcohol Calculator",
    "slug": "blood-alcohol-calculator",
    "category": "health",
    "description": "Blood Alcohol Content Calculator – Estimate Your BAC Level"
  },
  {
    "name": "Blood Sugar Converter",
    "slug": "blood-sugar-converter",
    "category": "health",
    "description": "Blood Sugar Converter – Free Glucose Unit Converter mg/dL to mmol/L"
  },
  {
    "name": "Boat Speed Calculator",
    "slug": "boat-speed-calculator",
    "category": "outdoor",
    "description": "Boat Speed Calculator – Calculate Maximum Hull Speed for Any Boat"
  },
  {
    "name": "Body Fat Calculator",
    "slug": "body-fat-calculator",
    "category": "health",
    "description": "Body Fat Percentage Calculator – Estimate Your Body Fat Instantly"
  },
  {
    "name": "Body Surface Area Calculator",
    "slug": "body-surface-area-calculator",
    "category": "health",
    "description": "Body Surface Area Calculator – BSA Calculation for Medical Use"
  },
  {
    "name": "Boiler Efficiency Calculator",
    "slug": "boiler-efficiency-calculator",
    "category": "hvac",
    "description": "Boiler Efficiency Calculator – Calculate Boiler Efficiency"
  },
  {
    "name": "Bolt Torque Calculator",
    "slug": "bolt-torque-calculator",
    "category": "engineering",
    "description": "Bolt Torque Calculator – Calculate Bolt Tightening Torque"
  },
  {
    "name": "Bond Convexity Calculator",
    "slug": "bond-convexity-calculator",
    "category": "finance",
    "description": "Bond Convexity Calculator"
  },
  {
    "name": "Bond Duration Calculator",
    "slug": "bond-duration-calculator",
    "category": "finance",
    "description": "Bond Duration Calculator"
  },
  {
    "name": "Bond Price Calculator",
    "slug": "bond-price-calculator",
    "category": "finance",
    "description": "Bond Price Calculator"
  },
  {
    "name": "Bond Yield Calculator",
    "slug": "bond-yield-calculator",
    "category": "finance",
    "description": "Bond Yield Calculator"
  },
  {
    "name": "Break-Even Discount Calculator",
    "slug": "break-even-discount-calculator",
    "category": "finance",
    "description": "Break-Even Discount Calculator"
  },
  {
    "name": "Break-Even Point Calculator",
    "slug": "break-even-point-calculator",
    "category": "finance",
    "description": "Break-Even Point Calculator"
  },
  {
    "name": "Breathing Exercise Timer",
    "slug": "breathing-exercise-timer",
    "category": "lifestyle",
    "description": "Breathing Exercise Timer – Guided Timer for Box Breathing, 4-7-8 & More"
  },
  {
    "name": "Brewster Angle Calculator",
    "slug": "brewster-angle-calculator",
    "category": "physics",
    "description": "Brewster Angle Calculator – Polarization Angle Calculator"
  },
  {
    "name": "Brick Bond Calculator",
    "slug": "brick-bond-calculator",
    "category": "construction",
    "description": "Brick Bond Calculator – Calculate Bricks Needed for Any Wall Pattern"
  },
  {
    "name": "Brick Calculator",
    "slug": "brick-calculator",
    "category": "construction",
    "description": "Brick Calculator"
  },
  {
    "name": "Business Days Calculator",
    "slug": "business-days-calculator",
    "category": "date",
    "description": "Business Days Calculator – Count Working Days Between Dates"
  },
  {
    "name": "Business Loan EMI Calculator",
    "slug": "business-loan-emi-calculator",
    "category": "finance",
    "description": "Business Loan EMI Calculator"
  },
  {
    "name": "Buy vs Rent Calculator",
    "slug": "buy-vs-rent-calculator",
    "category": "finance",
    "description": "Buy vs Rent Calculator"
  },
  {
    "name": "CGPA Calculator",
    "slug": "cgpa-calculator",
    "category": "education",
    "description": "CGPA Calculator – Calculate Your Cumulative GPA Across All Semesters"
  },
  {
    "name": "CO₂ Emissions Calculator",
    "slug": "co-emissions-calculator",
    "category": "science",
    "description": "CO₂ Emissions Calculator – Calculate Carbon Dioxide Emissions from Any Activity"
  },
  {
    "name": "CPC/CPM/CTR Calculator",
    "slug": "cpc-cpm-ctr-calculator",
    "category": "business",
    "description": "CPC, CPM & CTR Calculator – Measure Your Digital Ad Campaign Performance"
  },
  {
    "name": "Calorie Deficit Calculator",
    "slug": "calorie-deficit-calculator",
    "category": "health",
    "description": "Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?"
  },
  {
    "name": "Calories Per Serving Calculator",
    "slug": "calories-per-serving-calculator",
    "category": "food",
    "description": "Calories Per Serving Calculator – Calculate Nutrition Calories in Any Recipe"
  },
  {
    "name": "Camera Exposure Calculator",
    "slug": "camera-exposure-calculator",
    "category": "gaming",
    "description": "Camera Exposure Calculator – Find the Perfect Aperture, Shutter Speed & ISO"
  },
  {
    "name": "Camping Gear Weight Calculator",
    "slug": "camping-gear-weight-calculator",
    "category": "outdoor",
    "description": "Camping Gear Weight Calculator – Plan Your Pack Weight for Any Trip"
  },
  {
    "name": "Canvas Aspect Ratio Calculator",
    "slug": "canvas-aspect-ratio-calculator",
    "category": "design",
    "description": "Canvas Aspect Ratio Calculator – Resize Canvas While Keeping Proportions"
  },
  {
    "name": "Car Loan Affordability Calculator",
    "slug": "car-loan-affordability-calculator",
    "category": "automotive",
    "description": "Car Loan Affordability Calculator – Find Out What Car You Can Afford"
  },
  {
    "name": "Car Loan Calculator",
    "slug": "car-loan-calculator",
    "category": "finance",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments"
  },
  {
    "name": "Carb Intake Calculator",
    "slug": "carb-intake-calculator",
    "category": "health",
    "description": "Carb Intake Calculator – Daily Carbohydrate Needs Calculator"
  },
  {
    "name": "Carbon Footprint Calculator",
    "slug": "carbon-footprint-calculator",
    "category": "science",
    "description": "Carbon Footprint Calculator – Calculate Your Personal Annual CO₂ Footprint"
  },
  {
    "name": "Cargo Volume Calculator",
    "slug": "cargo-volume-calculator",
    "category": "shipping",
    "description": "Cargo Volume Calculator – Calculate Total Shipment Volume & Chargeable Weight"
  },
  {
    "name": "Carpet Area Calculator",
    "slug": "carpet-area-calculator",
    "category": "construction",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area"
  },
  {
    "name": "Cat Calorie Calculator",
    "slug": "cat-calorie-calculator",
    "category": "pets",
    "description": "Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements"
  },
  {
    "name": "Ceiling Tile Calculator",
    "slug": "ceiling-tile-calculator",
    "category": "construction",
    "description": "Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?"
  },
  {
    "name": "Charging Cost (EV) Calculator",
    "slug": "charging-cost-ev-calculator",
    "category": "automotive",
    "description": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car"
  },
  {
    "name": "Child Height Predictor",
    "slug": "child-height-predictor",
    "category": "health",
    "description": "Child Height Predictor – Free Adult Height Calculator"
  },
  {
    "name": "Chiller Tonnage Calculator",
    "slug": "chiller-tonnage-calculator",
    "category": "hvac",
    "description": "Chiller Tonnage Calculator – Calculate Cooling Capacity"
  },
  {
    "name": "Cholesterol Ratio Calculator",
    "slug": "cholesterol-ratio-calculator",
    "category": "health",
    "description": "Cholesterol Ratio Calculator – Free Heart Health Risk Assessment"
  },
  {
    "name": "Chord Progression Generator",
    "slug": "chord-progression-generator",
    "category": "music",
    "description": "Chord Progression Generator – Create Chord Progressions in Any Key & Scale"
  },
  {
    "name": "Circle Area Calculator",
    "slug": "circle-area-calculator",
    "category": "geometry",
    "description": "Circle Area Calculator"
  },
  {
    "name": "Clothing Shrinkage Estimator",
    "slug": "clothing-shrinkage-estimator",
    "category": "utilities",
    "description": "Clothing Shrinkage Estimator – Predict How Much Your Clothes Will Shrink"
  },
  {
    "name": "Cocktail ABV Calculator",
    "slug": "cocktail-abv-calculator",
    "category": "food",
    "description": "Cocktail ABV Calculator – Calculate the Alcohol Content of Any Mixed Drink"
  },
  {
    "name": "Coffee-to-Water Ratio Calculator",
    "slug": "coffee-to-water-ratio-calculator",
    "category": "food",
    "description": "Coffee to Water Ratio Calculator – Perfect Coffee Every Time"
  },
  {
    "name": "Combination Calculator",
    "slug": "combination-calculator",
    "category": "math",
    "description": "Combination Calculator"
  },
  {
    "name": "Compound Interest Calculator",
    "slug": "compound-interest-calculator",
    "category": "finance",
    "description": "Compound Interest Calculator"
  },
  {
    "name": "Compounding Frequency Comparison",
    "slug": "compounding-frequency-comparison",
    "category": "finance",
    "description": "Compounding Frequency Comparison Calculator"
  },
  {
    "name": "Concentration Calculator",
    "slug": "concentration-calculator",
    "category": "science",
    "description": "Concentration Calculator – Convert Solution Concentration Units"
  },
  {
    "name": "Concrete Mix Ratio Calculator",
    "slug": "concrete-mix-ratio-calculator",
    "category": "construction",
    "description": "Concrete Mix Ratio Calculator – Calculate Material Quantities"
  },
  {
    "name": "Concrete Volume Calculator",
    "slug": "concrete-volume-calculator",
    "category": "construction",
    "description": "Concrete Volume Calculator – How Much Concrete Do You Need?"
  },
  {
    "name": "Container Load Calculator",
    "slug": "container-load-calculator",
    "category": "shipping",
    "description": "Container Load Calculator – How Many Boxes Fit in a 20ft or 40ft Container?"
  },
  {
    "name": "Cost of Capital Calculator",
    "slug": "cost-of-capital-calculator",
    "category": "finance",
    "description": "Cost of Capital Calculator"
  },
  {
    "name": "Credit Card Payoff Calculator",
    "slug": "credit-card-payoff-calculator",
    "category": "finance",
    "description": "Credit Card Payoff Calculator"
  },
  {
    "name": "Cricket Economy Rate Calculator",
    "slug": "cricket-economy-rate-calculator",
    "category": "gaming",
    "description": "Cricket Economy Rate Calculator – Calculate Bowling Economy Rate"
  },
  {
    "name": "Cricket Strike Rate Calculator",
    "slug": "cricket-strike-rate-calculator",
    "category": "gaming",
    "description": "Cricket Strike Rate Calculator – Calculate Batting Strike Rate Instantly"
  },
  {
    "name": "Crop Yield Estimator",
    "slug": "crop-yield-estimator",
    "category": "agriculture",
    "description": "Crop Yield Estimator – Predict Your Farm's Harvest Before It Happens"
  },
  {
    "name": "Current Calculator",
    "slug": "current-calculator",
    "category": "electrical",
    "description": "Current Calculator – Calculate Electrical Current (Amps)"
  },
  {
    "name": "Curtain Length Calculator",
    "slug": "curtain-length-calculator",
    "category": "home",
    "description": "Curtain Length Calculator – Find the Perfect Curtain Size for Your Windows"
  },
  {
    "name": "Customer Acquisition Cost Calculator",
    "slug": "customer-acquisition-cost-calculator",
    "category": "business",
    "description": "Customer Acquisition Cost (CAC) Calculator – Find Out How Much Each New Customer Costs"
  },
  {
    "name": "Customer Lifetime Value Calculator",
    "slug": "customer-lifetime-value-calculator",
    "category": "business",
    "description": "Customer Lifetime Value (CLV) Calculator – Measure Customer Worth"
  },
  {
    "name": "Cycling Calorie Calculator",
    "slug": "cycling-calorie-calculator",
    "category": "health",
    "description": "Cycling Calorie Calculator – Calories Burned Biking Calculator"
  },
  {
    "name": "DAC Resolution Calculator",
    "slug": "dac-resolution-calculator",
    "category": "electrical",
    "description": "DAC Resolution Calculator – Calculate DAC Output Step Size"
  },
  {
    "name": "DNA Base Count Calculator",
    "slug": "dna-base-count-calculator",
    "category": "science",
    "description": "DNA Base Count Calculator – Count Nucleotides and GC Content"
  },
  {
    "name": "Daily Calorie Needs Calculator",
    "slug": "daily-calorie-needs-calculator",
    "category": "health",
    "description": "Daily Calorie Needs Calculator – How Many Calories Should You Eat?"
  },
  {
    "name": "Daily Habit Streak Calculator",
    "slug": "daily-habit-streak-calculator",
    "category": "lifestyle",
    "description": "Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks"
  },
  {
    "name": "Date Add/Subtract Calculator",
    "slug": "date-add-subtract-calculator",
    "category": "date",
    "description": "Date Calculator – Add or Subtract Days, Weeks & Months from a Date"
  },
  {
    "name": "Date Difference Calculator",
    "slug": "date-difference-calculator",
    "category": "date",
    "description": "Date Difference Calculator – Days Between Two Dates"
  },
  {
    "name": "Debt-to-Income Ratio Calculator",
    "slug": "debt-to-income-ratio-calculator",
    "category": "finance",
    "description": "Debt-to-Income Ratio Calculator"
  },
  {
    "name": "Decibel-to-Power Converter",
    "slug": "decibel-to-power-converter",
    "category": "science",
    "description": "Decibel to Power Converter – Convert dB to Watts & Sound Pressure Level"
  },
  {
    "name": "Decimal to Fraction Calculator",
    "slug": "decimal-to-fraction-calculator",
    "category": "math",
    "description": "Decimal to Fraction Calculator"
  },
  {
    "name": "Deep Sleep Cycle Planner",
    "slug": "deep-sleep-cycle-planner",
    "category": "health",
    "description": "Deep Sleep Planner – Optimize Your Sleep Schedule for Deep Rest"
  },
  {
    "name": "Depreciation Calculator",
    "slug": "depreciation-calculator",
    "category": "finance",
    "description": "Depreciation Calculator"
  },
  {
    "name": "Determinant Calculator",
    "slug": "determinant-calculator",
    "category": "math",
    "description": "Determinant Calculator"
  },
  {
    "name": "Dew Point Calculator",
    "slug": "dew-point-calculator",
    "category": "weather",
    "description": "Dew Point Calculator – Calculate Dew Point from Temperature & Humidity"
  },
  {
    "name": "Diaper Usage Estimator",
    "slug": "diaper-usage-estimator",
    "category": "parenting",
    "description": "Diaper Usage Estimator – Calculate Monthly Diaper Costs for Your Baby"
  },
  {
    "name": "Dilution Calculator",
    "slug": "dilution-calculator",
    "category": "science",
    "description": "Dilution Calculator – C1V1 = C2V2 Solution Dilution Tool"
  },
  {
    "name": "Dimensional Weight Calculator",
    "slug": "dimensional-weight-calculator",
    "category": "shipping",
    "description": "Dimensional Weight Calculator – Calculate DIM Weight for FedEx, UPS & DHL"
  },
  {
    "name": "Discount Calculator",
    "slug": "discount-calculator",
    "category": "finance",
    "description": "Discount Calculator – Calculate Sale Price & Savings"
  },
  {
    "name": "Discount Stacking Calculator",
    "slug": "discount-stacking-calculator",
    "category": "business",
    "description": "Discount Stacking Calculator – Calculate Final Price After Multiple Discounts"
  },
  {
    "name": "Distance Formula Calculator",
    "slug": "distance-formula-calculator",
    "category": "math",
    "description": "Distance Formula Calculator – Find Distance Between Two Points"
  },
  {
    "name": "Dividend Payout Calculator",
    "slug": "dividend-payout-calculator",
    "category": "finance",
    "description": "Dividend Payout Calculator"
  },
  {
    "name": "Dividend Reinvestment Calculator",
    "slug": "dividend-reinvestment-calculator",
    "category": "finance",
    "description": "Dividend Reinvestment (DRIP) Calculator"
  },
  {
    "name": "Division Calculator",
    "slug": "division-calculator",
    "category": "math",
    "description": "Division Calculator"
  },
  {
    "name": "Dog Calorie Calculator",
    "slug": "dog-calorie-calculator",
    "category": "pets",
    "description": "Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day"
  },
  {
    "name": "Dollar Cost Averaging Calculator",
    "slug": "dollar-cost-averaging-calculator",
    "category": "finance",
    "description": "Dollar-Cost Averaging (DCA) Calculator"
  },
  {
    "name": "Door Frame Calculator",
    "slug": "door-frame-calculator",
    "category": "construction",
    "description": "Door Frame Calculator – Calculate Door Frame Dimensions & Material Quantities"
  },
  {
    "name": "Dopamine Detox Planner",
    "slug": "dopamine-detox-planner",
    "category": "lifestyle",
    "description": "Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels"
  },
  {
    "name": "Doppler Effect Calculator",
    "slug": "doppler-effect-calculator",
    "category": "physics",
    "description": "Doppler Effect Calculator – Calculate Frequency Shift"
  },
  {
    "name": "Drone Flight Time Estimator",
    "slug": "drone-flight-time-estimator",
    "category": "science",
    "description": "Drone Flight Time Estimator – Calculate How Long Your Drone Can Fly"
  },
  {
    "name": "Drywall Area Calculator",
    "slug": "drywall-area-calculator",
    "category": "construction",
    "description": "Drywall Calculator – Calculate How Many Drywall Sheets You Need"
  },
  {
    "name": "Duty Cycle Calculator",
    "slug": "duty-cycle-calculator",
    "category": "electrical",
    "description": "Duty Cycle Calculator – Calculate PWM Duty Cycle"
  },
  {
    "name": "Dynamic Pricing Calculator",
    "slug": "dynamic-pricing-calculator",
    "category": "business",
    "description": "Dynamic Pricing Calculator – Optimize Your Prices Based on Demand & Market Conditions"
  },
  {
    "name": "EBITDA Calculator",
    "slug": "ebitda-calculator",
    "category": "finance",
    "description": "EBITDA Calculator"
  },
  {
    "name": "EMI Breakup Visualizer",
    "slug": "emi-breakup-visualizer",
    "category": "finance",
    "description": "EMI Breakup Visualizer"
  },
  {
    "name": "EMI For Home Loan Calculator",
    "slug": "emi-for-home-loan-calculator",
    "category": "finance",
    "description": "Home Loan EMI Calculator – Calculate Monthly EMI and Interest"
  },
  {
    "name": "EV Battery Capacity Estimator",
    "slug": "ev-battery-capacity-estimator",
    "category": "automotive",
    "description": "EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life"
  },
  {
    "name": "Electric Power Calculator",
    "slug": "electric-power-calculator",
    "category": "electrical",
    "description": "Electric Power Calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "slug": "electrical-load-calculator",
    "category": "electrical",
    "description": "Electrical Load Calculator – Calculate Circuit Load"
  },
  {
    "name": "Electricity Appliance Wattage Calculator",
    "slug": "electricity-appliance-wattage-calculator",
    "category": "business",
    "description": "Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill"
  },
  {
    "name": "Electrochemical Cell Potential Calculator",
    "slug": "electrochemical-cell-potential-calculator",
    "category": "science",
    "description": "Electrochemical Cell Potential Calculator – Calculate EMF of Galvanic Cells"
  },
  {
    "name": "Ellipse Area Calculator",
    "slug": "ellipse-area-calculator",
    "category": "geometry",
    "description": "Ellipse Area Calculator"
  },
  {
    "name": "Emergency Fund Calculator",
    "slug": "emergency-fund-calculator",
    "category": "finance",
    "description": "Emergency Fund Calculator"
  },
  {
    "name": "Empirical Formula Calculator",
    "slug": "empirical-formula-calculator",
    "category": "science",
    "description": "Empirical Formula Calculator – Find Empirical Formula from Percent Composition"
  },
  {
    "name": "Energy Calculator",
    "slug": "energy-calculator",
    "category": "physics",
    "description": "Energy Calculator"
  },
  {
    "name": "Energy Consumption Breakdown Calculator",
    "slug": "energy-consumption-breakdown-calculator",
    "category": "utilities",
    "description": "Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used"
  },
  {
    "name": "Engine Displacement Calculator",
    "slug": "engine-displacement-calculator",
    "category": "automotive",
    "description": "Engine Displacement Calculator – Calculate CC & Liter Capacity from Bore & Stroke"
  },
  {
    "name": "Entropy Calculator",
    "slug": "entropy-calculator",
    "category": "security",
    "description": "Entropy Calculator – Calculate Password & Data Entropy in Bits"
  },
  {
    "name": "Escape Velocity Calculator",
    "slug": "escape-velocity-calculator",
    "category": "physics",
    "description": "Escape Velocity Calculator – Calculate Escape Velocity"
  },
  {
    "name": "Exam Correction Curve Calculator",
    "slug": "exam-correction-curve-calculator",
    "category": "education",
    "description": "Exam Correction Curve Calculator – Apply Grade Curves to Exam Scores"
  },
  {
    "name": "Exam Scoring Calculator",
    "slug": "exam-scoring-calculator",
    "category": "education",
    "description": "Exam Scoring Calculator – Calculate Weighted Exam Scores & Final Grades"
  },
  {
    "name": "Exponent Calculator",
    "slug": "exponent-calculator",
    "category": "math",
    "description": "Exponent Calculator"
  },
  {
    "name": "Expression Evaluator",
    "slug": "expression-evaluator",
    "category": "math",
    "description": "Expression Evaluator"
  },
  {
    "name": "FIRE Number Calculator",
    "slug": "fire-number-calculator",
    "category": "finance",
    "description": "FIRE Number Calculator – Financial Independence"
  },
  {
    "name": "Factorial Calculator",
    "slug": "factorial-calculator",
    "category": "math",
    "description": "Factorial Calculator"
  },
  {
    "name": "Fastener Load Calculator",
    "slug": "fastener-load-calculator",
    "category": "engineering",
    "description": "Fastener Load Calculator – Calculate Fastener Capacity"
  },
  {
    "name": "Fat Intake Calculator",
    "slug": "fat-intake-calculator",
    "category": "health",
    "description": "Fat Intake Calculator – How Much Fat Should You Eat Daily?"
  },
  {
    "name": "Fertilizer Requirement Calculator",
    "slug": "fertilizer-requirement-calculator",
    "category": "agriculture",
    "description": "Fertilizer Requirement Calculator – Calculate NPK Fertilizer Dose Per Acre"
  },
  {
    "name": "Fibonacci Generator",
    "slug": "fibonacci-generator",
    "category": "math",
    "description": "Fibonacci Generator"
  },
  {
    "name": "Fixed Deposit Interest Calculator",
    "slug": "fixed-deposit-interest-calculator",
    "category": "finance",
    "description": "Fixed Deposit (FD) Interest Calculator"
  },
  {
    "name": "Flooring Calculator",
    "slug": "flooring-calculator",
    "category": "construction",
    "description": "Flooring Calculator – How Much Flooring Do You Need?"
  },
  {
    "name": "Focal Length Calculator",
    "slug": "focal-length-calculator",
    "category": "physics",
    "description": "Focal Length Calculator – Lensmaker's Equation"
  },
  {
    "name": "Football Goal Conversion Calculator",
    "slug": "football-goal-conversion-calculator",
    "category": "business",
    "description": "Football Goal Conversion Rate Calculator – Measure Shooting Efficiency"
  },
  {
    "name": "Foundation Volume Calculator",
    "slug": "foundation-volume-calculator",
    "category": "construction",
    "description": "Foundation Volume Calculator – Calculate Concrete for Footings"
  },
  {
    "name": "Fraction to Decimal Calculator",
    "slug": "fraction-to-decimal-calculator",
    "category": "math",
    "description": "Fraction to Decimal Calculator"
  },
  {
    "name": "Freelance Effective Hourly Rate Calculator",
    "slug": "freelance-effective-hourly-rate-calculator",
    "category": "finance",
    "description": "Freelance Effective Hourly Rate Calculator"
  },
  {
    "name": "Frequency Calculator",
    "slug": "frequency-calculator",
    "category": "physics",
    "description": "Frequency Calculator – Calculate Frequency from Period and More"
  },
  {
    "name": "Fuel Cost Calculator",
    "slug": "fuel-cost-calculator",
    "category": "automotive",
    "description": "Fuel Cost Calculator – Estimate Your Trip Fuel Expenses Instantly"
  },
  {
    "name": "Fuel Efficiency Comparison Calculator",
    "slug": "fuel-efficiency-comparison-calculator",
    "category": "automotive",
    "description": "Fuel Efficiency Comparison Calculator – Compare Cars by MPG & Running Cost"
  },
  {
    "name": "Funnel Drop-off Calculator",
    "slug": "funnel-drop-off-calculator",
    "category": "business",
    "description": "Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel"
  },
  {
    "name": "Future Value Calculator",
    "slug": "future-value-calculator",
    "category": "finance",
    "description": "Future Value Calculator"
  },
  {
    "name": "GCD Calculator",
    "slug": "gcd-calculator",
    "category": "math",
    "description": "GCD / HCF Calculator"
  },
  {
    "name": "GPA Calculator",
    "slug": "gpa-calculator",
    "category": "education",
    "description": "GPA Calculator – Calculate Your Grade Point Average Instantly"
  },
  {
    "name": "GPA Weight Distribution Calculator",
    "slug": "gpa-weight-distribution-calculator",
    "category": "education",
    "description": "GPA Weight Distribution Calculator – See How Each Course Impacts Your GPA"
  },
  {
    "name": "Gacha Pull Probability Calculator",
    "slug": "gacha-pull-probability-calculator",
    "category": "gaming",
    "description": "Gacha Pull Probability Calculator – Calculate Your Odds in Gacha Games"
  },
  {
    "name": "Gear Ratio Calculator",
    "slug": "gear-ratio-calculator",
    "category": "engineering",
    "description": "Gear Ratio Calculator – Calculate Gear Train Ratio"
  },
  {
    "name": "Gear Shifting RPMs Calculator",
    "slug": "gear-shifting-rpms-calculator",
    "category": "automotive",
    "description": "Gear Shifting RPMs Calculator – Find the Perfect RPM to Shift Gears"
  },
  {
    "name": "Gear Train Efficiency Calculator",
    "slug": "gear-train-efficiency-calculator",
    "category": "engineering",
    "description": "Gear Train Efficiency Calculator – Calculate Power Loss"
  },
  {
    "name": "Geometric Sequence Calculator",
    "slug": "geometric-sequence-calculator",
    "category": "math",
    "description": "Geometric Sequence Calculator"
  },
  {
    "name": "Glycemic Index Calculator",
    "slug": "glycemic-index-calculator",
    "category": "health",
    "description": "Glycemic Index Calculator – Find the GI of Any Food"
  },
  {
    "name": "Glycemic Load Calculator",
    "slug": "glycemic-load-calculator",
    "category": "health",
    "description": "Glycemic Load Calculator – Calculate GL of Foods and Meals"
  },
  {
    "name": "Goal Tracker Calculator",
    "slug": "goal-tracker-calculator",
    "category": "lifestyle",
    "description": "Goal Tracker Calculator – Track Your Progress Toward Any Goal"
  },
  {
    "name": "Golden Ratio Calculator",
    "slug": "golden-ratio-calculator",
    "category": "math",
    "description": "Golden Ratio Calculator"
  },
  {
    "name": "Golden Ratio Layout Generator",
    "slug": "golden-ratio-layout-generator",
    "category": "design",
    "description": "Golden Ratio Layout Generator – Design Perfectly Proportioned Layouts"
  },
  {
    "name": "Golf Handicap Calculator",
    "slug": "golf-handicap-calculator",
    "category": "gaming",
    "description": "Golf Handicap Calculator – Calculate Your Official Golf Handicap Index"
  },
  {
    "name": "Grade Percentage Calculator",
    "slug": "grade-percentage-calculator",
    "category": "education",
    "description": "Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade"
  },
  {
    "name": "Gravel Quantity Calculator",
    "slug": "gravel-quantity-calculator",
    "category": "construction",
    "description": "Gravel Quantity Calculator – Calculate Gravel Needed for Driveways & Landscaping"
  },
  {
    "name": "Gravitational Field Calculator",
    "slug": "gravitational-field-calculator",
    "category": "physics",
    "description": "Gravitational Field Calculator – Calculate Gravitational Field Strength"
  },
  {
    "name": "Gravitational Force Calculator",
    "slug": "gravitational-force-calculator",
    "category": "physics",
    "description": "Gravitational Force Calculator – Newton's Law of Gravitation"
  },
  {
    "name": "Greenhouse Ventilation Calculator",
    "slug": "greenhouse-ventilation-calculator",
    "category": "agriculture",
    "description": "Greenhouse Ventilation Calculator – Calculate Fan Size & Airflow for Your Greenhouse"
  },
  {
    "name": "Grid Layout Calculator",
    "slug": "grid-layout-calculator",
    "category": "design",
    "description": "Grid Layout Calculator – Calculate Column Widths, Gutters & Margins for Web Design"
  },
  {
    "name": "Gross vs Net Income Calculator",
    "slug": "gross-vs-net-income-calculator",
    "category": "finance",
    "description": "Gross vs Net Income Calculator"
  },
  {
    "name": "HVAC Airflow Calculator",
    "slug": "hvac-airflow-calculator",
    "category": "hvac",
    "description": "HVAC Airflow Calculator – Calculate Required CFM"
  },
  {
    "name": "HVAC BTU Calculator",
    "slug": "hvac-btu-calculator",
    "category": "hvac",
    "description": "HVAC BTU Calculator – What Size Air Conditioner Do You Need?"
  },
  {
    "name": "Hash Brute-Force Time Estimator",
    "slug": "hash-brute-force-time-estimator",
    "category": "security",
    "description": "Hash Brute-Force Time Estimator – How Long to Crack a Password Hash?"
  },
  {
    "name": "Head Loss (Darcy-Weisbach) Calculator",
    "slug": "head-loss-darcy-weisbach-calculator",
    "category": "hvac",
    "description": "Head Loss (Darcy-Weisbach) Calculator – Pipe Friction Loss"
  },
  {
    "name": "Heart Rate Recovery Calculator",
    "slug": "heart-rate-recovery-calculator",
    "category": "health",
    "description": "Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness"
  },
  {
    "name": "Heart Rate Zones Calculator",
    "slug": "heart-rate-zones-calculator",
    "category": "health",
    "description": "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones"
  },
  {
    "name": "Heat Index Calculator",
    "slug": "heat-index-calculator",
    "category": "weather",
    "description": "Heat Index Calculator – Calculate the 'Feels Like' Temperature"
  },
  {
    "name": "Heat Pump COP Calculator",
    "slug": "heat-pump-cop-calculator",
    "category": "hvac",
    "description": "Heat Pump COP Calculator – Coefficient of Performance"
  },
  {
    "name": "Heat Transfer Calculator",
    "slug": "heat-transfer-calculator",
    "category": "physics",
    "description": "Heat Transfer Calculator – Conduction, Convection & Radiation"
  },
  {
    "name": "Henderson-Hasselbalch Calculator",
    "slug": "henderson-hasselbalch-calculator",
    "category": "science",
    "description": "Henderson-Hasselbalch Calculator – Buffer pH Made Easy"
  },
  {
    "name": "Hiking Pace Calculator",
    "slug": "hiking-pace-calculator",
    "category": "outdoor",
    "description": "Hiking Pace Calculator – Estimate Trail Time with Naismith's Rule"
  },
  {
    "name": "Horse Feed Calculator",
    "slug": "horse-feed-calculator",
    "category": "pets",
    "description": "Horse Feed Calculator – Calculate Daily Feed Requirements for Your Horse"
  },
  {
    "name": "Horsepower to kW Converter",
    "slug": "horsepower-to-kw-converter",
    "category": "automotive",
    "description": "Horsepower to kW Converter – Instantly Convert HP to Kilowatts"
  },
  {
    "name": "Hourly Wage to Salary Calculator",
    "slug": "hourly-wage-to-salary-calculator",
    "category": "finance",
    "description": "Hourly Wage to Annual Salary Calculator"
  },
  {
    "name": "Housing Affordability Calculator",
    "slug": "housing-affordability-calculator",
    "category": "finance",
    "description": "Housing Affordability Calculator"
  },
  {
    "name": "Humidity Calculator",
    "slug": "humidity-calculator",
    "category": "weather",
    "description": "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity"
  },
  {
    "name": "IRR Calculator",
    "slug": "irr-calculator",
    "category": "finance",
    "description": "IRR Calculator – Internal Rate of Return"
  },
  {
    "name": "ISO Noise Predictor",
    "slug": "iso-noise-predictor",
    "category": "science",
    "description": "ISO Noise Predictor – Estimate Image Noise Level for Any Camera ISO Setting"
  },
  {
    "name": "Ideal Bedtime Calculator",
    "slug": "ideal-bedtime-calculator",
    "category": "health",
    "description": "Ideal Bedtime Calculator – What Time Should You Go to Sleep?"
  },
  {
    "name": "Ideal Gas Law Calculator",
    "slug": "ideal-gas-law-calculator",
    "category": "physics",
    "description": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable"
  },
  {
    "name": "Ideal Weight Calculator",
    "slug": "ideal-weight-calculator",
    "category": "health",
    "description": "Ideal Weight Calculator – What Is Your Ideal Body Weight?"
  },
  {
    "name": "Indoor CO₂ Level Estimator",
    "slug": "indoor-co-level-estimator",
    "category": "construction",
    "description": "Indoor CO₂ Level Estimator – Calculate CO₂ Concentration in Any Room"
  },
  {
    "name": "Inductor Calculations",
    "slug": "inductor-calculations",
    "category": "electrical",
    "description": "Inductor Calculator – Inductance and Inductive Reactance Calculator"
  },
  {
    "name": "Interest Rate Finder Calculator",
    "slug": "interest-rate-finder-calculator",
    "category": "finance",
    "description": "Interest Rate Finder Calculator"
  },
  {
    "name": "Interest vs Principal Split Calculator",
    "slug": "interest-vs-principal-split-calculator",
    "category": "finance",
    "description": "Interest vs Principal Split Calculator"
  },
  {
    "name": "Inverse Matrix Calculator",
    "slug": "inverse-matrix-calculator",
    "category": "math",
    "description": "Inverse Matrix Calculator"
  },
  {
    "name": "Inverter Capacity Calculator",
    "slug": "inverter-capacity-calculator",
    "category": "electrical",
    "description": "Inverter Capacity Calculator – Size Your Inverter"
  },
  {
    "name": "Investment Return Rate Calculator",
    "slug": "investment-return-rate-calculator",
    "category": "finance",
    "description": "Investment Return Rate Calculator"
  },
  {
    "name": "Irrigation Water Calculator",
    "slug": "irrigation-water-calculator",
    "category": "agriculture",
    "description": "Irrigation Water Calculator – Calculate Water Needed for Crop Irrigation"
  },
  {
    "name": "K/D Ratio Calculator",
    "slug": "k-d-ratio-calculator",
    "category": "gaming",
    "description": "K/D Ratio Calculator – Calculate Your Kill/Death Ratio in Any Game"
  },
  {
    "name": "Ketogenic Macro Calculator",
    "slug": "ketogenic-macro-calculator",
    "category": "health",
    "description": "Keto Macro Calculator – Perfect Macros for a Ketogenic Diet"
  },
  {
    "name": "Kidney Function (eGFR) Calculator",
    "slug": "kidney-function-egfr-calculator",
    "category": "health",
    "description": "Kidney Function eGFR Calculator – Free CKD-EPI Calculator"
  },
  {
    "name": "Kinetic Energy Calculator",
    "slug": "kinetic-energy-calculator",
    "category": "physics",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion"
  },
  {
    "name": "Kitchen Measurement Converter",
    "slug": "kitchen-measurement-converter",
    "category": "utilities",
    "description": "Kitchen Measurement Converter – Convert Cooking Units Instantly"
  },
  {
    "name": "LCM Calculator",
    "slug": "lcm-calculator",
    "category": "math",
    "description": "LCM Calculator – Find Least Common Multiple Online"
  },
  {
    "name": "LED Resistor Calculator",
    "slug": "led-resistor-calculator",
    "category": "electrical",
    "description": "LED Resistor Calculator – Calculate Current Limiting Resistor"
  },
  {
    "name": "Lactate Threshold Calculator",
    "slug": "lactate-threshold-calculator",
    "category": "health",
    "description": "Lactate Threshold Calculator – Find Your Anaerobic Threshold"
  },
  {
    "name": "Laminar/Turbulent Flow Calculator",
    "slug": "laminar-turbulent-flow-calculator",
    "category": "hvac",
    "description": "Laminar/Turbulent Flow Calculator – Flow Regime Calculator"
  },
  {
    "name": "Land Area Converter",
    "slug": "land-area-converter",
    "category": "construction",
    "description": "Land Area Converter – Convert Acres, Hectares, Sq Ft, and Bigha"
  },
  {
    "name": "Laundry Detergent Calculator",
    "slug": "laundry-detergent-calculator",
    "category": "home",
    "description": "Laundry Detergent Calculator – How Much Detergent Should You Use Per Wash?"
  },
  {
    "name": "Law of Cosines Calculator",
    "slug": "law-of-cosines-calculator",
    "category": "math",
    "description": "Law of Cosines Calculator"
  },
  {
    "name": "Law of Sines Calculator",
    "slug": "law-of-sines-calculator",
    "category": "math",
    "description": "Law of Sines Calculator"
  },
  {
    "name": "Lead Conversion Calculator",
    "slug": "lead-conversion-calculator",
    "category": "business",
    "description": "Lead Conversion Calculator – Calculate Your Sales Conversion Rate & Cost Per Lead"
  },
  {
    "name": "Lean Body Mass Calculator",
    "slug": "lean-body-mass-calculator",
    "category": "health",
    "description": "Lean Body Mass Calculator – Find Your Fat-Free Mass Instantly"
  },
  {
    "name": "Lens Equation Calculator",
    "slug": "lens-equation-calculator",
    "category": "physics",
    "description": "Lens Equation Calculator – Thin Lens Formula Calculator"
  },
  {
    "name": "Line-Height Calculator",
    "slug": "line-height-calculator",
    "category": "design",
    "description": "Line-Height Calculator – Find the Optimal Line Spacing for Your Typography"
  },
  {
    "name": "Linear Equation Solver",
    "slug": "linear-equation-solver",
    "category": "math",
    "description": "Linear Equation Solver – Solve ax + b = 0"
  },
  {
    "name": "Livestock Feed Calculator",
    "slug": "livestock-feed-calculator",
    "category": "agriculture",
    "description": "Livestock Feed Calculator – Calculate Daily Feed Requirements for Farm Animals"
  },
  {
    "name": "Loan Amortization Visualizer",
    "slug": "loan-amortization-visualizer",
    "category": "finance",
    "description": "Loan Amortization Visualizer"
  },
  {
    "name": "Loan EMI Calculator",
    "slug": "loan-emi-calculator",
    "category": "finance",
    "description": "Loan EMI Calculator – Calculate Monthly Loan Payments"
  },
  {
    "name": "Loan Payoff Time Calculator",
    "slug": "loan-payoff-time-calculator",
    "category": "finance",
    "description": "Loan Payoff Time Calculator"
  },
  {
    "name": "Loan Prepayment Impact Calculator",
    "slug": "loan-prepayment-impact-calculator",
    "category": "finance",
    "description": "Loan Prepayment Impact Calculator"
  },
  {
    "name": "Loan Refinancing Calculator",
    "slug": "loan-refinancing-calculator",
    "category": "finance",
    "description": "Loan Refinancing Calculator"
  },
  {
    "name": "Logarithm Calculator",
    "slug": "logarithm-calculator",
    "category": "math",
    "description": "Logarithm Calculator"
  },
  {
    "name": "Loot Probability Calculator",
    "slug": "loot-probability-calculator",
    "category": "gaming",
    "description": "Loot Drop Probability Calculator – Calculate Your Chances of Getting Rare Items"
  },
  {
    "name": "Lump Sum vs SIP Analyzer",
    "slug": "lump-sum-vs-sip-analyzer",
    "category": "finance",
    "description": "Lump Sum vs SIP Analyzer"
  },
  {
    "name": "Macro Calculator",
    "slug": "macro-calculator",
    "category": "health",
    "description": "Macro Calculator – Calculate Your Daily Macros for Any Goal"
  },
  {
    "name": "Manning Equation Calculator",
    "slug": "manning-equation-calculator",
    "category": "hvac",
    "description": "Manning Equation Calculator – Open Channel Flow"
  },
  {
    "name": "Map Scale Calculator",
    "slug": "map-scale-calculator",
    "category": "music",
    "description": "Map Scale Calculator – Convert Map Distances to Real-World Measurements"
  },
  {
    "name": "Marathon Pace Calculator",
    "slug": "marathon-pace-calculator",
    "category": "health",
    "description": "Marathon Pace Calculator – Calculate Your Target Running Pace"
  },
  {
    "name": "Margin Calculator",
    "slug": "margin-calculator",
    "category": "finance",
    "description": "Profit Margin Calculator"
  },
  {
    "name": "Mark-to-Grade Converter",
    "slug": "mark-to-grade-converter",
    "category": "education",
    "description": "Mark to Grade Converter – Convert Exam Marks to Letter Grades Instantly"
  },
  {
    "name": "Markup Calculator",
    "slug": "markup-calculator",
    "category": "finance",
    "description": "Markup Calculator"
  },
  {
    "name": "Matrix Addition Calculator",
    "slug": "matrix-addition-calculator",
    "category": "math",
    "description": "Matrix Addition Calculator"
  },
  {
    "name": "Matrix Multiplication Calculator",
    "slug": "matrix-multiplication-calculator",
    "category": "math",
    "description": "Matrix Multiplication Calculator"
  },
  {
    "name": "Median Calculator",
    "slug": "median-calculator",
    "category": "math",
    "description": "Median Calculator"
  },
  {
    "name": "Meditation Timer Scheduler",
    "slug": "meditation-timer-scheduler",
    "category": "lifestyle",
    "description": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions"
  },
  {
    "name": "Mileage Calculator",
    "slug": "mileage-calculator",
    "category": "automotive",
    "description": "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)"
  },
  {
    "name": "Minimum Payment Calculator",
    "slug": "minimum-payment-calculator",
    "category": "finance",
    "description": "Credit Card Minimum Payment Calculator"
  },
  {
    "name": "Mirror Equation Calculator",
    "slug": "mirror-equation-calculator",
    "category": "physics",
    "description": "Mirror Equation Calculator – Spherical Mirror Formula"
  },
  {
    "name": "Mobile Charging Time Calculator",
    "slug": "mobile-charging-time-calculator",
    "category": "automotive",
    "description": "Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?"
  },
  {
    "name": "Mode Calculator",
    "slug": "mode-calculator",
    "category": "math",
    "description": "Mode Calculator"
  },
  {
    "name": "Modulo Calculator",
    "slug": "modulo-calculator",
    "category": "math",
    "description": "Modulo Calculator"
  },
  {
    "name": "Molality Calculator",
    "slug": "molality-calculator",
    "category": "science",
    "description": "Molality Calculator – Find Molality of Any Solution"
  },
  {
    "name": "Molarity Calculator",
    "slug": "molarity-calculator",
    "category": "science",
    "description": "Molarity Calculator – Calculate Molar Concentration Instantly"
  },
  {
    "name": "Molecular Mass Calculator",
    "slug": "molecular-mass-calculator",
    "category": "science",
    "description": "Molecular Mass Calculator – Calculate Molar Mass of Any Compound"
  },
  {
    "name": "Moles to Volume Converter",
    "slug": "moles-to-volume-converter",
    "category": "science",
    "description": "Moles to Volume Calculator for Gas – STP and Custom Conditions"
  },
  {
    "name": "Momentum Calculator",
    "slug": "momentum-calculator",
    "category": "physics",
    "description": "Momentum Calculator"
  },
  {
    "name": "Money-Saving Challenge Calculator",
    "slug": "money-saving-challenge-calculator",
    "category": "lifestyle",
    "description": "Money-Saving Challenge Calculator – Track Your 52-Week or Custom Savings Challenge"
  },
  {
    "name": "Monthly Budget Breakdown Calculator",
    "slug": "monthly-budget-breakdown-calculator",
    "category": "finance",
    "description": "Monthly Budget Breakdown Calculator"
  },
  {
    "name": "Mortar Volume Calculator",
    "slug": "mortar-volume-calculator",
    "category": "construction",
    "description": "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling"
  },
  {
    "name": "Mortgage Amortization Schedule",
    "slug": "mortgage-amortization-schedule",
    "category": "finance",
    "description": "Mortgage Amortization Schedule Calculator"
  },
  {
    "name": "Mortgage Calculator",
    "slug": "mortgage-calculator",
    "category": "finance",
    "description": "Mortgage Calculator – Calculate Monthly Home Loan Payments"
  },
  {
    "name": "Mortgage Refinance Break-Even Calculator",
    "slug": "mortgage-refinance-break-even-calculator",
    "category": "finance",
    "description": "Mortgage Refinance Break-Even Calculator"
  },
  {
    "name": "Mountain Oxygen Calculator",
    "slug": "mountain-oxygen-calculator",
    "category": "utilities",
    "description": "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude"
  },
  {
    "name": "Multiplication Calculator",
    "slug": "multiplication-calculator",
    "category": "math",
    "description": "Multiplication Calculator"
  },
  {
    "name": "NPS Score Calculator",
    "slug": "nps-score-calculator",
    "category": "business",
    "description": "NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results"
  },
  {
    "name": "NPV Calculator",
    "slug": "npv-calculator",
    "category": "finance",
    "description": "NPV Calculator – Net Present Value"
  },
  {
    "name": "Net Profit Margin Calculator",
    "slug": "net-profit-margin-calculator",
    "category": "finance",
    "description": "Net Profit Margin Calculator"
  },
  {
    "name": "Noise Exposure Calculator",
    "slug": "noise-exposure-calculator",
    "category": "gaming",
    "description": "Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits"
  },
  {
    "name": "Noise Level Calculator",
    "slug": "noise-level-calculator",
    "category": "electrical",
    "description": "Noise Level Calculator – Combine Multiple Sound Sources"
  },
  {
    "name": "Note Frequency Calculator",
    "slug": "note-frequency-calculator",
    "category": "music",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note"
  },
  {
    "name": "Nuclear Decay Half-Life Calculator",
    "slug": "nuclear-decay-half-life-calculator",
    "category": "physics",
    "description": "Nuclear Decay Half-Life Calculator – Radioactive Decay"
  },
  {
    "name": "Number to Words Converter",
    "slug": "number-to-words-converter",
    "category": "math",
    "description": "Number to Words Converter"
  },
  {
    "name": "Office Space Per Employee Calculator",
    "slug": "office-space-per-employee-calculator",
    "category": "shipping",
    "description": "Office Space Per Employee Calculator – How Much Office Space Do You Need?"
  },
  {
    "name": "Ohm's Law Calculator",
    "slug": "ohms-law-calculator",
    "category": "electrical",
    "description": "Ohm's Law Calculator"
  },
  {
    "name": "Online Seller Profit Calculator",
    "slug": "online-seller-profit-calculator",
    "category": "business",
    "description": "Online Seller Profit Calculator – Calculate Net Profit on Amazon, eBay & More"
  },
  {
    "name": "Operating Margin Calculator",
    "slug": "operating-margin-calculator",
    "category": "finance",
    "description": "Operating Margin Calculator"
  },
  {
    "name": "Orbital Period Calculator",
    "slug": "orbital-period-calculator",
    "category": "physics",
    "description": "Orbital Period Calculator – Calculate Orbital Period"
  },
  {
    "name": "Oven Temperature Converter",
    "slug": "oven-temperature-converter",
    "category": "food",
    "description": "Oven Temperature Converter – Convert Celsius, Fahrenheit & Gas Mark Instantly"
  },
  {
    "name": "Ovulation Calculator",
    "slug": "ovulation-calculator",
    "category": "health",
    "description": "Ovulation Calculator – Find Your Most Fertile Days"
  },
  {
    "name": "PCB Trace Width Calculator",
    "slug": "pcb-trace-width-calculator",
    "category": "electrical",
    "description": "PCB Trace Width Calculator – Calculate Copper Trace Width"
  },
  {
    "name": "PWM Frequency Calculator",
    "slug": "pwm-frequency-calculator",
    "category": "electrical",
    "description": "PWM Frequency Calculator – Calculate PWM Output Frequency"
  },
  {
    "name": "Pace to Speed Converter",
    "slug": "pace-to-speed-converter",
    "category": "health",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly"
  },
  {
    "name": "Paint Cost Estimate Calculator",
    "slug": "paint-cost-estimate-calculator",
    "category": "home",
    "description": "Paint Cost Estimate Calculator – How Much Paint Do You Need for a Room?"
  },
  {
    "name": "Paint Coverage Calculator",
    "slug": "paint-coverage-calculator",
    "category": "construction",
    "description": "Paint Calculator – How Much Paint Do You Need to Cover a Room?"
  },
  {
    "name": "Pallet Stacking Calculator",
    "slug": "pallet-stacking-calculator",
    "category": "shipping",
    "description": "Pallet Stacking Calculator – Maximize Box Quantities Per Pallet"
  },
  {
    "name": "Parallelogram Area Calculator",
    "slug": "parallelogram-area-calculator",
    "category": "geometry",
    "description": "Parallelogram Area Calculator"
  },
  {
    "name": "Pascal's Triangle Calculator",
    "slug": "pascals-triangle-calculator",
    "category": "math",
    "description": "Pascal's Triangle Calculator"
  },
  {
    "name": "Password Strength Scorer",
    "slug": "password-strength-scorer",
    "category": "security",
    "description": "Password Strength Checker – Test How Strong & Secure Your Password Is"
  },
  {
    "name": "Payback Period Calculator",
    "slug": "payback-period-calculator",
    "category": "finance",
    "description": "Payback Period Calculator"
  },
  {
    "name": "Peak-to-Peak Voltage Calculator",
    "slug": "peak-to-peak-voltage-calculator",
    "category": "electrical",
    "description": "Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements"
  },
  {
    "name": "Percent Composition Calculator",
    "slug": "percent-composition-calculator",
    "category": "science",
    "description": "Percent Composition Calculator – Find Mass Percent of Elements"
  },
  {
    "name": "Percentage Calculator",
    "slug": "percentage-calculator",
    "category": "math",
    "description": "Percentage Calculator – Calculate Percentages Instantly"
  },
  {
    "name": "Percentage Change Calculator",
    "slug": "percentage-change-calculator",
    "category": "math",
    "description": "Percentage Change Calculator"
  },
  {
    "name": "Permutation Calculator",
    "slug": "permutation-calculator",
    "category": "math",
    "description": "Permutation Calculator"
  },
  {
    "name": "Perspective Angle Calculator",
    "slug": "perspective-angle-calculator",
    "category": "design",
    "description": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing"
  },
  {
    "name": "Pesticide Dilution Calculator",
    "slug": "pesticide-dilution-calculator",
    "category": "agriculture",
    "description": "Pesticide Dilution Calculator – Calculate the Right Pesticide-to-Water Ratio"
  },
  {
    "name": "Pet Age Calculator",
    "slug": "pet-age-calculator",
    "category": "pets",
    "description": "Pet Age Calculator – Convert Dog & Cat Age to Human Years"
  },
  {
    "name": "Photon Energy Calculator",
    "slug": "photon-energy-calculator",
    "category": "physics",
    "description": "Photon Energy Calculator – Calculate Energy of a Photon"
  },
  {
    "name": "Pipe Friction Loss Calculator",
    "slug": "pipe-friction-loss-calculator",
    "category": "hvac",
    "description": "Pipe Friction Loss Calculator – Head Loss in Pipe Flow"
  },
  {
    "name": "Pipe Water Tank Pressure Calculator",
    "slug": "pipe-water-tank-pressure-calculator",
    "category": "home",
    "description": "Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height"
  },
  {
    "name": "Plastering Calculator",
    "slug": "plastering-calculator",
    "category": "construction",
    "description": "Plastering Calculator – How Much Plaster Do You Need?"
  },
  {
    "name": "Poster Print Size Calculator",
    "slug": "poster-print-size-calculator",
    "category": "design",
    "description": "Poster Print Size Calculator – Find the Right Resolution for Any Print Size"
  },
  {
    "name": "Potential Energy Calculator",
    "slug": "potential-energy-calculator",
    "category": "physics",
    "description": "Potential Energy Calculator"
  },
  {
    "name": "Power Factor Calculator",
    "slug": "power-factor-calculator",
    "category": "electrical",
    "description": "Power Factor Calculator – Calculate PF and Phase Angle"
  },
  {
    "name": "Pregnancy Due Date Calculator",
    "slug": "pregnancy-due-date-calculator",
    "category": "health",
    "description": "Pregnancy Due Date Calculator – When Is My Baby Due?"
  },
  {
    "name": "Pregnancy Week Calculator",
    "slug": "pregnancy-week-calculator",
    "category": "health",
    "description": "Pregnancy Week Calculator – Free Due Date & Pregnancy Tracker"
  },
  {
    "name": "Pregnancy Weight Gain Calculator",
    "slug": "pregnancy-weight-gain-calculator",
    "category": "health",
    "description": "Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator"
  },
  {
    "name": "Present Value Calculator",
    "slug": "present-value-calculator",
    "category": "finance",
    "description": "Present Value Calculator"
  },
  {
    "name": "Price Per Unit Comparison Calculator",
    "slug": "price-per-unit-comparison-calculator",
    "category": "finance",
    "description": "Price-Per-Unit Comparison Calculator"
  },
  {
    "name": "Prime Checker",
    "slug": "prime-checker",
    "category": "math",
    "description": "Prime Number Checker – Is This Number Prime?"
  },
  {
    "name": "Prime Factorization Calculator",
    "slug": "prime-factorization-calculator",
    "category": "math",
    "description": "Prime Factorization Calculator – Find Prime Factors"
  },
  {
    "name": "Productivity Streak Calculator",
    "slug": "productivity-streak-calculator",
    "category": "lifestyle",
    "description": "Productivity Streak Calculator – Track Your Daily Productivity Streaks & Consistency"
  },
  {
    "name": "Profit Margin Calculator",
    "slug": "profit-margin-calculator",
    "category": "business",
    "description": "Profit Margin Calculator – Calculate Gross Profit & Markup"
  },
  {
    "name": "Protein Distribution Calculator",
    "slug": "protein-distribution-calculator",
    "category": "health",
    "description": "Protein Distribution Calculator – Optimize Protein Timing Per Meal"
  },
  {
    "name": "Protein Intake Calculator",
    "slug": "protein-intake-calculator",
    "category": "health",
    "description": "Protein Intake Calculator – How Much Protein Do You Need Per Day?"
  },
  {
    "name": "Pulley System Calculator",
    "slug": "pulley-system-calculator",
    "category": "engineering",
    "description": "Pulley System Calculator – Block and Tackle Calculator"
  },
  {
    "name": "Pump Horsepower Calculator",
    "slug": "pump-horsepower-calculator",
    "category": "hvac",
    "description": "Pump Horsepower Calculator – Calculate Required Pump Power"
  },
  {
    "name": "Punnett Square Calculator",
    "slug": "punnett-square-calculator",
    "category": "science",
    "description": "Punnett Square Calculator – Predict Genetic Cross Outcomes"
  },
  {
    "name": "Pythagorean Theorem Calculator",
    "slug": "pythagorean-theorem-calculator",
    "category": "math",
    "description": "Pythagorean Theorem Calculator"
  },
  {
    "name": "Quadratic Equation Solver",
    "slug": "quadratic-equation-solver",
    "category": "math",
    "description": "Quadratic Equation Solver"
  },
  {
    "name": "RC Time Constant Calculator",
    "slug": "rc-time-constant-calculator",
    "category": "electrical",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant"
  },
  {
    "name": "RL Time Constant Calculator",
    "slug": "rl-time-constant-calculator",
    "category": "electrical",
    "description": "RL Time Constant Calculator – Calculate RL Circuit Time Constant"
  },
  {
    "name": "RLC Resonance Calculator",
    "slug": "rlc-resonance-calculator",
    "category": "electrical",
    "description": "RLC Resonance Calculator – Calculate Resonant Frequency"
  },
  {
    "name": "RMS Value Calculator",
    "slug": "rms-value-calculator",
    "category": "electrical",
    "description": "RMS Value Calculator – Calculate Root Mean Square Voltage"
  },
  {
    "name": "ROI Calculator",
    "slug": "roi-calculator",
    "category": "finance",
    "description": "ROI Calculator – Calculate Return on Investment Percentage"
  },
  {
    "name": "ROI Calculator (Ad)",
    "slug": "roi-calculator-ad",
    "category": "business",
    "description": "Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns"
  },
  {
    "name": "RPM Calculator",
    "slug": "rpm-calculator",
    "category": "engineering",
    "description": "RPM Calculator – Calculate Rotational Speed and Gear Ratios"
  },
  {
    "name": "RSA Key Strength Calculator",
    "slug": "rsa-key-strength-calculator",
    "category": "security",
    "description": "RSA Key Strength Calculator – Check How Secure Your RSA Encryption Key Is"
  },
  {
    "name": "RSU Vesting Calculator",
    "slug": "rsu-vesting-calculator",
    "category": "finance",
    "description": "RSU Vesting Calculator"
  },
  {
    "name": "Radiation Dose Calculator",
    "slug": "radiation-dose-calculator",
    "category": "physics",
    "description": "Radiation Dose Calculator – Estimate Radiation Exposure"
  },
  {
    "name": "Ramp Slope Calculator",
    "slug": "ramp-slope-calculator",
    "category": "construction",
    "description": "Ramp Slope Calculator – Calculate Ramp Angle, Gradient & Length"
  },
  {
    "name": "Random Number Generator",
    "slug": "random-number-generator",
    "category": "math",
    "description": "Random Number Generator"
  },
  {
    "name": "Range Calculator",
    "slug": "range-calculator",
    "category": "math",
    "description": "Range Calculator"
  },
  {
    "name": "Range Estimator (EV)",
    "slug": "range-estimator-ev",
    "category": "automotive",
    "description": "EV Range Estimator – Calculate How Far Your Electric Car Can Go"
  },
  {
    "name": "Ranking Percentile Calculator",
    "slug": "ranking-percentile-calculator",
    "category": "education",
    "description": "Ranking Percentile Calculator – Find Your Percentile Rank in Class or Exam"
  },
  {
    "name": "Reaction Yield Calculator",
    "slug": "reaction-yield-calculator",
    "category": "science",
    "description": "Reaction Yield Calculator – Calculate Theoretical and Percent Yield"
  },
  {
    "name": "Recipe Scaler Calculator",
    "slug": "recipe-scaler-calculator",
    "category": "food",
    "description": "Recipe Scaler Calculator – Adjust Recipe Servings Instantly"
  },
  {
    "name": "Rectangle Area Calculator",
    "slug": "rectangle-area-calculator",
    "category": "geometry",
    "description": "Rectangle Area Calculator"
  },
  {
    "name": "Recurring Deposit Calculator",
    "slug": "recurring-deposit-calculator",
    "category": "finance",
    "description": "Recurring Deposit (RD) Calculator"
  },
  {
    "name": "Refraction Index Calculator",
    "slug": "refraction-index-calculator",
    "category": "physics",
    "description": "Refraction Index Calculator – Calculate Refractive Index"
  },
  {
    "name": "Relativistic Energy Calculator",
    "slug": "relativistic-energy-calculator",
    "category": "physics",
    "description": "Relativistic Energy Calculator – Special Relativity Calculator"
  },
  {
    "name": "Rent Per Square Foot Calculator",
    "slug": "rent-per-square-foot-calculator",
    "category": "finance",
    "description": "Rent per Square Foot Calculator – Compare Property Rental Rates"
  },
  {
    "name": "Rental ROI Calculator",
    "slug": "rental-roi-calculator",
    "category": "finance",
    "description": "Rental ROI Calculator – Calculate Return on Investment for Rental Properties"
  },
  {
    "name": "Rental Yield Calculator",
    "slug": "rental-yield-calculator",
    "category": "finance",
    "description": "Rental Yield Calculator"
  },
  {
    "name": "Resistance Calculator",
    "slug": "resistance-calculator",
    "category": "electrical",
    "description": "Resistance Calculator – Calculate Resistance with Ohm's Law"
  },
  {
    "name": "Retirement Age Calculator",
    "slug": "retirement-age-calculator",
    "category": "date",
    "description": "Retirement Age Calculator – Free Retirement Date Calculator"
  },
  {
    "name": "Retirement Corpus Calculator",
    "slug": "retirement-corpus-calculator",
    "category": "finance",
    "description": "Retirement Corpus Calculator"
  },
  {
    "name": "Retirement Withdrawal Rate Calculator",
    "slug": "retirement-withdrawal-rate-calculator",
    "category": "finance",
    "description": "Retirement Withdrawal Rate Calculator"
  },
  {
    "name": "Reverse Stock Split Calculator",
    "slug": "reverse-stock-split-calculator",
    "category": "finance",
    "description": "Reverse Stock Split Calculator"
  },
  {
    "name": "Revision Planner",
    "slug": "revision-planner",
    "category": "education",
    "description": "Revision Planner – Create a Smart Spaced Repetition Study Schedule"
  },
  {
    "name": "Reynolds Number Calculator",
    "slug": "pipe-flow-reynolds-number-calculator",
    "category": "hvac",
    "description": "Reynolds Number Calculator – Pipe Flow Reynolds Number"
  },
  {
    "name": "Rhombus Area Calculator",
    "slug": "rhombus-area-calculator",
    "category": "geometry",
    "description": "Rhombus Area Calculator"
  },
  {
    "name": "Richter Scale to Energy Calculator",
    "slug": "richter-scale-to-energy-calculator",
    "category": "music",
    "description": "Richter Scale to Energy Calculator – Convert Earthquake Magnitude to Energy"
  },
  {
    "name": "Ring Size Calculator",
    "slug": "ring-size-calculator",
    "category": "utilities",
    "description": "Ring Size Calculator – Find Your Ring Size in US, UK & EU Sizes"
  },
  {
    "name": "Rivet Strength Calculator",
    "slug": "rivet-strength-calculator",
    "category": "engineering",
    "description": "Rivet Strength Calculator – Calculate Rivet Shear Capacity"
  },
  {
    "name": "Robot Motor Torque Calculator",
    "slug": "robot-motor-torque-calculator",
    "category": "automotive",
    "description": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators"
  },
  {
    "name": "Roman Numerals Converter",
    "slug": "roman-numerals-converter",
    "category": "math",
    "description": "Roman Numerals Converter"
  },
  {
    "name": "Roofing Sheets Calculator",
    "slug": "roofing-sheets-calculator",
    "category": "construction",
    "description": "Roofing Calculator – How Many Roofing Sheets Do You Need?"
  },
  {
    "name": "Room Heater Wattage Calculator",
    "slug": "room-heater-wattage-calculator",
    "category": "home",
    "description": "Room Heater Wattage Calculator – Find the Right Heater Size for Your Room"
  },
  {
    "name": "Root Calculator",
    "slug": "root-calculator",
    "category": "math",
    "description": "Root Calculator – Calculate Square, Cube and Nth Roots"
  },
  {
    "name": "Rounding Calculator",
    "slug": "rounding-calculator",
    "category": "math",
    "description": "Rounding Calculator – Round Numbers to Decimal Places"
  },
  {
    "name": "Royalty Calculator",
    "slug": "royalty-calculator",
    "category": "finance",
    "description": "Royalty Calculator – Estimate Earnings from Sales and Revenue"
  },
  {
    "name": "Rule of 72 Calculator",
    "slug": "rule-of-72-calculator",
    "category": "finance",
    "description": "Rule of 72 Calculator"
  },
  {
    "name": "Running Pace Calculator",
    "slug": "running-pace-calculator",
    "category": "health",
    "description": "Running Pace Calculator"
  },
  {
    "name": "SIP Calculator",
    "slug": "sip-calculator",
    "category": "finance",
    "description": "SIP Calculator"
  },
  {
    "name": "SIP Step Up Calculator",
    "slug": "sip-step-up-calculator",
    "category": "finance",
    "description": "SIP Step-Up Calculator"
  },
  {
    "name": "SWP Calculator",
    "slug": "swp-calculator",
    "category": "finance",
    "description": "SWP Calculator – Systematic Withdrawal Plan"
  },
  {
    "name": "SaaS Churn Rate Calculator",
    "slug": "saas-churn-rate-calculator",
    "category": "business",
    "description": "SaaS Churn Rate Calculator – Calculate Monthly & Annual Customer Churn"
  },
  {
    "name": "SaaS MRR/ARR Calculator",
    "slug": "saas-mrr-arr-calculator",
    "category": "business",
    "description": "MRR & ARR Calculator – Calculate Monthly and Annual Recurring Revenue for SaaS"
  },
  {
    "name": "Safety Factor Calculator",
    "slug": "safety-factor-calculator",
    "category": "engineering",
    "description": "Safety Factor Calculator – Factor of Safety Calculator"
  },
  {
    "name": "Salary to Hourly Calculator",
    "slug": "salary-to-hourly-calculator",
    "category": "finance",
    "description": "Salary to Hourly Rate Calculator"
  },
  {
    "name": "Sand Quantity Calculator",
    "slug": "sand-quantity-calculator",
    "category": "construction",
    "description": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction"
  },
  {
    "name": "Savings Goal Calculator",
    "slug": "savings-goal-calculator",
    "category": "finance",
    "description": "Savings Goal Calculator"
  },
  {
    "name": "Savings vs Investment Comparison",
    "slug": "savings-vs-investment-comparison",
    "category": "finance",
    "description": "Savings vs Investment Comparison Calculator"
  },
  {
    "name": "Scaffold Board Calculator",
    "slug": "scaffold-board-calculator",
    "category": "construction",
    "description": "Scaffold Board Calculator – Calculate Scaffold Boards Needed for Any Structure"
  },
  {
    "name": "Scale Finder",
    "slug": "scale-finder",
    "category": "music",
    "description": "Scale Finder – Find the Right Musical Scale for Any Key or Note Set"
  },
  {
    "name": "Scientific Notation Calculator",
    "slug": "scientific-notation-calculator",
    "category": "math",
    "description": "Scientific Notation Calculator – Convert to Standard Form"
  },
  {
    "name": "Screen Brightness Battery Calculator",
    "slug": "screen-brightness-battery-calculator",
    "category": "utilities",
    "description": "Screen Brightness Battery Calculator – How Brightness Affects Your Battery Life"
  },
  {
    "name": "Screen Time Calculator",
    "slug": "screen-time-calculator",
    "category": "health",
    "description": "Screen Time Calculator – Track & Manage Your Digital Wellness"
  },
  {
    "name": "Screen-Time Allowance Calculator",
    "slug": "screen-time-allowance-calculator",
    "category": "parenting",
    "description": "Screen-Time Allowance Calculator – Set Healthy Screen Time Limits for Kids"
  },
  {
    "name": "Screw Thread Pitch Calculator",
    "slug": "screw-thread-pitch-calculator",
    "category": "engineering",
    "description": "Screw Thread Pitch Calculator – Thread Dimensions Calculator"
  },
  {
    "name": "Sector Area Calculator",
    "slug": "sector-area-calculator",
    "category": "geometry",
    "description": "Sector Area Calculator"
  },
  {
    "name": "Seed Rate Calculator",
    "slug": "seed-rate-calculator",
    "category": "agriculture",
    "description": "Seed Rate Calculator – Calculate Seeds Per Acre for Optimal Crop Yield"
  },
  {
    "name": "Series/Parallel Capacitor Calculator",
    "slug": "series-parallel-capacitor-calculator",
    "category": "electrical",
    "description": "Capacitor Calculator – Series and Parallel Capacitance Calculator"
  },
  {
    "name": "Series/Parallel Resistor Calculator",
    "slug": "series-parallel-resistor-calculator",
    "category": "electrical",
    "description": "Resistor Calculator – Series and Parallel Resistance Calculator"
  },
  {
    "name": "Shaft Torque Calculator",
    "slug": "shaft-torque-calculator",
    "category": "engineering",
    "description": "Shaft Torque Calculator – Calculate Shaft Torque"
  },
  {
    "name": "Shoe Size Converter",
    "slug": "shoe-size-converter",
    "category": "utilities",
    "description": "Shoe Size Converter – Convert Shoe Sizes Between US, UK, EU & CM"
  },
  {
    "name": "Shutter Speed Calculator",
    "slug": "shutter-speed-calculator",
    "category": "photography",
    "description": "Shutter Speed Calculator – Find the Right Shutter Speed for Sharp or Blurred Shots"
  },
  {
    "name": "Signal-to-Noise Ratio Calculator",
    "slug": "signal-to-noise-ratio-calculator",
    "category": "electrical",
    "description": "Signal-to-Noise Ratio Calculator – Calculate SNR in dB"
  },
  {
    "name": "Simple Interest Calculator",
    "slug": "simple-interest-calculator",
    "category": "finance",
    "description": "Simple Interest Calculator"
  },
  {
    "name": "Simplify Fraction Calculator",
    "slug": "simplify-fraction-calculator",
    "category": "math",
    "description": "Simplify Fraction Calculator"
  },
  {
    "name": "Sleep Cycle Calculator",
    "slug": "sleep-cycle-calculator",
    "category": "health",
    "description": "Sleep Cycle Calculator – Wake Up Refreshed Every Morning"
  },
  {
    "name": "Sleep Debt Calculator",
    "slug": "sleep-debt-calculator",
    "category": "health",
    "description": "Sleep Debt Calculator – How Much Sleep Are You Missing?"
  },
  {
    "name": "Sleep/Wake Efficiency Calculator",
    "slug": "sleep-wake-efficiency-calculator",
    "category": "lifestyle",
    "description": "Sleep Efficiency Calculator – Measure the Quality of Your Night&apos;s Sleep"
  },
  {
    "name": "Slope Calculator",
    "slug": "slope-calculator",
    "category": "math",
    "description": "Slope Calculator"
  },
  {
    "name": "Snell's Law Calculator",
    "slug": "snells-law-calculator",
    "category": "physics",
    "description": "Snell's Law Calculator – Refraction Calculator"
  },
  {
    "name": "Soil pH Adjustment Calculator",
    "slug": "soil-ph-adjustment-calculator",
    "category": "agriculture",
    "description": "Soil pH Adjustment Calculator – How Much Lime or Sulfur to Add to Your Soil"
  },
  {
    "name": "Solar Irradiance Calculator",
    "slug": "solar-irradiance-calculator",
    "category": "weather",
    "description": "Solar Irradiance Calculator – Estimate Solar Energy at Your Location"
  },
  {
    "name": "Solar Panel Requirement Calculator",
    "slug": "solar-panel-requirement-calculator",
    "category": "electrical",
    "description": "Solar Panel Requirement Calculator – Size Your Solar System"
  },
  {
    "name": "Solubility Product (Ksp) Calculator",
    "slug": "solubility-product-ksp-calculator",
    "category": "science",
    "description": "Ksp Calculator – Solubility Product Constant Made Simple"
  },
  {
    "name": "Sound Speed Calculator",
    "slug": "sound-speed-calculator",
    "category": "physics",
    "description": "Sound Speed Calculator – Calculate Speed of Sound"
  },
  {
    "name": "Speed to Pace Converter",
    "slug": "speed-to-pace-converter",
    "category": "health",
    "description": "Speed to Pace Converter – Convert Speed to Running Pace Online"
  },
  {
    "name": "Spring Force (Hooke's Law) Calculator",
    "slug": "spring-force-hookes-law-calculator",
    "category": "physics",
    "description": "Hooke's Law Calculator – Spring Force and Displacement"
  },
  {
    "name": "Square Area Calculator",
    "slug": "square-area-calculator",
    "category": "geometry",
    "description": "Square Area Calculator – Find Area, Perimeter and Diagonal"
  },
  {
    "name": "Staircase Rise/Run Calculator",
    "slug": "staircase-rise-run-calculator",
    "category": "construction",
    "description": "Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs"
  },
  {
    "name": "Standard Deviation Calculator",
    "slug": "standard-deviation-calculator",
    "category": "math",
    "description": "Standard Deviation Calculator"
  },
  {
    "name": "Startup Equity Calculator",
    "slug": "startup-equity-calculator",
    "category": "finance",
    "description": "Startup Equity Calculator"
  },
  {
    "name": "Steel Weight Calculator",
    "slug": "steel-weight-calculator",
    "category": "construction",
    "description": "Steel Weight Calculator – Calculate Weight of Steel Sections and Bars"
  },
  {
    "name": "Step Down SIP Calculator",
    "slug": "step-down-sip-calculator",
    "category": "finance",
    "description": "Step-Down SIP Calculator"
  },
  {
    "name": "Steps to Calories Calculator",
    "slug": "steps-to-calories-calculator",
    "category": "health",
    "description": "Steps to Calories Calculator – Convert Your Steps to Calories Burned"
  },
  {
    "name": "Stock CAGR Calculator",
    "slug": "stock-cagr-calculator",
    "category": "finance",
    "description": "Stock CAGR Calculator"
  },
  {
    "name": "Stock Split Calculator",
    "slug": "stock-split-calculator",
    "category": "finance",
    "description": "Stock Split Calculator"
  },
  {
    "name": "Stoichiometry Calculator",
    "slug": "stoichiometry-calculator",
    "category": "science",
    "description": "Stoichiometry Calculator – Balance Chemical Reactions Instantly"
  },
  {
    "name": "Strength Training PR Estimator",
    "slug": "strength-training-pr-estimator",
    "category": "gaming",
    "description": "Strength Training PR Estimator – Calculate Your One-Rep Max & Training Weights"
  },
  {
    "name": "Stress/Strain Calculator",
    "slug": "stress-strain-calculator",
    "category": "engineering",
    "description": "Stress/Strain Calculator – Mechanical Properties Calculator"
  },
  {
    "name": "Study Hour Efficiency Calculator",
    "slug": "study-hour-efficiency-calculator",
    "category": "education",
    "description": "Study Hour Efficiency Calculator – Measure and Improve Your Study Productivity"
  },
  {
    "name": "Study Hour Planner",
    "slug": "study-hour-planner",
    "category": "education",
    "description": "Study Hour Planner – Create a Personalized Study Schedule for Exams"
  },
  {
    "name": "Subscription Pricing Calculator",
    "slug": "subscription-pricing-calculator",
    "category": "business",
    "description": "Subscription Pricing Calculator – Find the Right Price for Your Subscription Plans"
  },
  {
    "name": "Subscription Profit Calculator",
    "slug": "subscription-profit-calculator",
    "category": "finance",
    "description": "Subscription Business Profit Calculator"
  },
  {
    "name": "Subtraction Calculator",
    "slug": "subtraction-calculator",
    "category": "math",
    "description": "Subtraction Calculator – Subtract Numbers Instantly"
  },
  {
    "name": "Swimming Calorie Calculator",
    "slug": "swimming-calorie-calculator",
    "category": "health",
    "description": "Swimming Calorie Calculator – How Many Calories Does Swimming Burn?"
  },
  {
    "name": "Swimming Lap Pace Calculator",
    "slug": "swimming-lap-pace-calculator",
    "category": "gaming",
    "description": "Swimming Lap Pace Calculator – Calculate Your Swim Speed Per 100m"
  },
  {
    "name": "TDEE Calculator",
    "slug": "tdee-calculator",
    "category": "health",
    "description": "TDEE Calculator – Calculate Your Total Daily Energy Expenditure"
  },
  {
    "name": "Tea Brewing Strength Calculator",
    "slug": "tea-brewing-strength-calculator",
    "category": "food",
    "description": "Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio"
  },
  {
    "name": "Telescope Magnification Calculator",
    "slug": "telescope-magnification-calculator",
    "category": "pets",
    "description": "Telescope Magnification Calculator – Calculate Power, FOV & Exit Pupil"
  },
  {
    "name": "Tempo to Delay Time Converter",
    "slug": "tempo-to-delay-time-converter",
    "category": "music",
    "description": "Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms"
  },
  {
    "name": "Tennis Win Probability Calculator",
    "slug": "tennis-win-probability-calculator",
    "category": "gaming",
    "description": "Tennis Win Probability Calculator – Predict Match Outcome from Player Stats"
  },
  {
    "name": "Thermal Expansion Calculator",
    "slug": "thermal-expansion-calculator",
    "category": "physics",
    "description": "Thermal Expansion Calculator – Linear and Volumetric Expansion"
  },
  {
    "name": "Tile Calculator",
    "slug": "tile-calculator",
    "category": "construction",
    "description": "Tile Calculator – How Many Tiles Do You Need?"
  },
  {
    "name": "Tire Pressure Adjustment Calculator",
    "slug": "tire-pressure-adjustment-calculator",
    "category": "utilities",
    "description": "Tire Pressure Adjustment Calculator – Correct PSI for Temperature & Load"
  },
  {
    "name": "Titration Calculator",
    "slug": "titration-calculator",
    "category": "science",
    "description": "Titration Calculator – Find Unknown Concentration from Titration Data"
  },
  {
    "name": "Toddler Growth Chart Calculator",
    "slug": "toddler-growth-chart-calculator",
    "category": "parenting",
    "description": "Toddler Growth Chart Calculator – Track Height & Weight Percentiles for Your Child"
  },
  {
    "name": "Torque Calculator",
    "slug": "torque-calculator",
    "category": "physics",
    "description": "Torque Calculator"
  },
  {
    "name": "Torque-to-Power Converter",
    "slug": "torque-to-power-converter",
    "category": "automotive",
    "description": "Torque to Power Converter – Convert Engine Torque & RPM to HP or kW"
  },
  {
    "name": "Trail Difficulty Estimator",
    "slug": "trail-difficulty-estimator",
    "category": "outdoor",
    "description": "Trail Difficulty Estimator – Calculate How Hard a Hiking Trail Really Is"
  },
  {
    "name": "Trapezoid Area Calculator",
    "slug": "trapezoid-area-calculator",
    "category": "geometry",
    "description": "Trapezoid Area Calculator"
  },
  {
    "name": "Triangle Area Calculator",
    "slug": "triangle-area-calculator",
    "category": "geometry",
    "description": "Triangle Area Calculator – Find Area from Base and Height"
  },
  {
    "name": "Trip Cost Estimator",
    "slug": "trip-cost-estimator",
    "category": "utilities",
    "description": "Trip Cost Estimator – Plan Your Road Trip Budget with Ease"
  },
  {
    "name": "Tuning Frequency Converter",
    "slug": "tuning-frequency-converter",
    "category": "music",
    "description": "Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch"
  },
  {
    "name": "Typography Scale Calculator",
    "slug": "typography-scale-calculator",
    "category": "music",
    "description": "Typography Scale Calculator – Generate a Harmonious Font Size Scale"
  },
  {
    "name": "UPS Load Calculator",
    "slug": "ups-load-calculator",
    "category": "utilities",
    "description": "UPS Load Calculator – Calculate UPS Capacity & Runtime for Your Equipment"
  },
  {
    "name": "UPS/Generator Runtime Calculator",
    "slug": "ups-generator-runtime-calculator",
    "category": "utilities",
    "description": "UPS & Generator Runtime Calculator – How Long Will Your Backup Power Last?"
  },
  {
    "name": "Unit Price Calculator",
    "slug": "unit-price-calculator",
    "category": "finance",
    "description": "Unit Price Calculator"
  },
  {
    "name": "VO2 Max Calculator",
    "slug": "vo2-max-calculator",
    "category": "health",
    "description": "VO2 Max Calculator – Estimate Your Aerobic Fitness Level"
  },
  {
    "name": "Valuation Cap Calculator",
    "slug": "valuation-cap-calculator",
    "category": "finance",
    "description": "Valuation Cap Calculator – SAFE & Convertible Notes"
  },
  {
    "name": "Vapor Pressure Calculator",
    "slug": "vapor-pressure-calculator",
    "category": "science",
    "description": "Vapor Pressure Calculator – Calculate Vapor Pressure at Any Temperature"
  },
  {
    "name": "Variance Calculator",
    "slug": "variance-calculator",
    "category": "math",
    "description": "Variance Calculator – Calculate Population and Sample Variance"
  },
  {
    "name": "Vehicle Depreciation Calculator",
    "slug": "vehicle-depreciation-calculator",
    "category": "automotive",
    "description": "Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value"
  },
  {
    "name": "Vehicle Turning Radius Calculator",
    "slug": "vehicle-turning-radius-calculator",
    "category": "automotive",
    "description": "Vehicle Turning Radius Calculator – Calculate Minimum Turning Circle for Any Car"
  },
  {
    "name": "Velocity Calculator",
    "slug": "velocity-calculator",
    "category": "physics",
    "description": "Velocity Calculator – Calculate Speed with Direction"
  },
  {
    "name": "Ventilation Rate Calculator",
    "slug": "ventilation-rate-calculator",
    "category": "science",
    "description": "Ventilation Rate Calculator – Calculate Required Airflow (ACH & CFM) per ASHRAE"
  },
  {
    "name": "Voltage Calculator",
    "slug": "voltage-calculator",
    "category": "electrical",
    "description": "Voltage Calculator"
  },
  {
    "name": "Volume of Cone Calculator",
    "slug": "volume-of-cone-calculator",
    "category": "geometry",
    "description": "Volume of Cone Calculator"
  },
  {
    "name": "Volume of Cube Calculator",
    "slug": "volume-of-cube-calculator",
    "category": "geometry",
    "description": "Volume of Cube Calculator – Calculate Cube Volume and Surface Area"
  },
  {
    "name": "Volume of Cuboid Calculator",
    "slug": "volume-of-cuboid-calculator",
    "category": "geometry",
    "description": "Volume of Cuboid Calculator"
  },
  {
    "name": "Volume of Cylinder Calculator",
    "slug": "volume-of-cylinder-calculator",
    "category": "geometry",
    "description": "Volume of Cylinder Calculator"
  },
  {
    "name": "Volume of Pyramid Calculator",
    "slug": "volume-of-pyramid-calculator",
    "category": "geometry",
    "description": "Volume of Pyramid Calculator"
  },
  {
    "name": "Volume of Sphere Calculator",
    "slug": "volume-of-sphere-calculator",
    "category": "geometry",
    "description": "Volume of Sphere Calculator – Find Volume and Surface Area"
  },
  {
    "name": "Volumetric Weight Calculator",
    "slug": "volumetric-weight-calculator",
    "category": "shipping",
    "description": "Volumetric Weight Calculator – Calculate Dimensional Weight for Shipping"
  },
  {
    "name": "WACC Calculator",
    "slug": "wacc-calculator",
    "category": "finance",
    "description": "WACC Calculator – Weighted Average Cost of Capital"
  },
  {
    "name": "Waist-to-Height Ratio Calculator",
    "slug": "waist-to-height-ratio-calculator",
    "category": "health",
    "description": "Waist-to-Height Ratio Calculator – Assess Your Health Risk"
  },
  {
    "name": "Waist-to-Hip Ratio Calculator",
    "slug": "waist-to-hip-ratio-calculator",
    "category": "health",
    "description": "Waist-to-Hip Ratio Calculator – Check Your Body Shape & Health Risk"
  },
  {
    "name": "Walking Calorie Calculator",
    "slug": "walking-calorie-calculator",
    "category": "health",
    "description": "Walking Calorie Calculator – How Many Calories Do You Burn Walking?"
  },
  {
    "name": "Wallpaper Calculator",
    "slug": "wallpaper-calculator",
    "category": "home",
    "description": "Wallpaper Calculator – Calculate How Many Rolls You Need for Your Room"
  },
  {
    "name": "Warehouse Storage Volume Calculator",
    "slug": "warehouse-storage-volume-calculator",
    "category": "shipping",
    "description": "Warehouse Storage Volume Calculator – Calculate Usable Warehouse Capacity"
  },
  {
    "name": "Warm-Up Calculator",
    "slug": "warm-up-calculator",
    "category": "health",
    "description": "Warm-Up Calculator – Build the Perfect Warm-Up Set Progression"
  },
  {
    "name": "Water Flow Rate Calculator",
    "slug": "water-flow-rate-calculator",
    "category": "hvac",
    "description": "Water Flow Rate Calculator – Calculate Flow Rate in Pipes"
  },
  {
    "name": "Water Requirement Calculator",
    "slug": "water-requirement-calculator",
    "category": "health",
    "description": "Water Intake Calculator – How Much Water Should You Drink Per Day?"
  },
  {
    "name": "Water Tank Volume Calculator",
    "slug": "water-tank-volume-calculator",
    "category": "home",
    "description": "Water Tank Volume Calculator – Calculate Tank Capacity in Liters & Gallons"
  },
  {
    "name": "Wavelength Calculator",
    "slug": "wavelength-calculator",
    "category": "physics",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency"
  },
  {
    "name": "Wealth Growth Projection Calculator",
    "slug": "wealth-growth-projection-calculator",
    "category": "finance",
    "description": "Wealth Growth Projection Calculator"
  },
  {
    "name": "Week Number Calculator",
    "slug": "week-number-calculator",
    "category": "date",
    "description": "Week Number Calculator – Find ISO Week Number for Any Date"
  },
  {
    "name": "Weight Distribution Calculator",
    "slug": "weight-distribution-calculator",
    "category": "shipping",
    "description": "Weight Distribution Calculator – Calculate Load Distribution Across Axles & Points"
  },
  {
    "name": "Weight Loss Time Calculator",
    "slug": "weight-loss-time-calculator",
    "category": "health",
    "description": "Weight Loss Time Calculator – How Long Will It Take to Lose Weight?"
  },
  {
    "name": "Weighted Average Calculator",
    "slug": "weighted-average-calculator",
    "category": "math",
    "description": "Weighted Average Calculator"
  },
  {
    "name": "Welding Strength Calculator",
    "slug": "welding-strength-calculator",
    "category": "engineering",
    "description": "Welding Strength Calculator – Calculate Weld Strength"
  },
  {
    "name": "Win-Rate Estimator",
    "slug": "win-rate-estimator",
    "category": "gaming",
    "description": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio"
  },
  {
    "name": "Wind Chill Calculator",
    "slug": "wind-chill-calculator",
    "category": "weather",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like"
  },
  {
    "name": "Window Area Calculator",
    "slug": "window-area-calculator",
    "category": "construction",
    "description": "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss"
  },
  {
    "name": "Wine ABV Calculator",
    "slug": "wine-abv-calculator",
    "category": "food",
    "description": "Wine ABV Calculator – Calculate Alcohol Content in Homemade Wine"
  },
  {
    "name": "Wire Gauge Calculator",
    "slug": "wire-gauge-calculator",
    "category": "electrical",
    "description": "Wire Gauge Calculator – Calculate Required Wire Size"
  },
  {
    "name": "Wood Board Feet Calculator",
    "slug": "wood-board-feet-calculator",
    "category": "construction",
    "description": "Wood Board Feet Calculator – Calculate Lumber Board Footage Instantly"
  },
  {
    "name": "Work Calculator",
    "slug": "work-calculator",
    "category": "physics",
    "description": "Work Calculator"
  },
  {
    "name": "Working Capital Calculator",
    "slug": "working-capital-calculator",
    "category": "finance",
    "description": "Working Capital Calculator"
  },
  {
    "name": "Workout Max Reps Estimator",
    "slug": "workout-max-reps-estimator",
    "category": "health",
    "description": "Max Reps Estimator – How Many Reps Can You Do at a Given Weight?"
  },
  {
    "name": "Workout Rest Timer",
    "slug": "workout-rest-timer",
    "category": "health",
    "description": "Workout Rest Timer – Optimal Rest Time Between Sets Calculator"
  },
  {
    "name": "Workout Volume Calculator",
    "slug": "workout-volume-calculator",
    "category": "health",
    "description": "Workout Volume Calculator – Track Your Total Training Volume"
  },
  {
    "name": "XP Progression Calculator",
    "slug": "xp-progression-calculator",
    "category": "gaming",
    "description": "XP Progression Calculator – Calculate How Long to Reach Your Target Level"
  },
  {
    "name": "Yeast Conversion Calculator",
    "slug": "yeast-conversion-calculator",
    "category": "business",
    "description": "Yeast Conversion Calculator – Convert Between Dry, Instant & Fresh Yeast"
  },
  {
    "name": "Yield to Maturity Calculator",
    "slug": "yield-to-maturity-calculator",
    "category": "finance",
    "description": "Yield-to-Maturity (YTM) Calculator"
  },
  {
    "name": "Z-Score Calculator",
    "slug": "z-score-calculator",
    "category": "math",
    "description": "Z-Score Calculator"
  },
  {
    "name": "Zodiac Sign Calculator",
    "slug": "zodiac-sign-calculator",
    "category": "date",
    "description": "Zodiac Sign Calculator – Free Western Astrology Sign Finder"
  },
  {
    "name": "dB Calculator",
    "slug": "db-calculator",
    "category": "electrical",
    "description": "dB Calculator – Decibel to Ratio Converter for Audio and RF"
  },
  {
    "name": "pH Calculator",
    "slug": "ph-calculator",
    "category": "science",
    "description": "pH Calculator – Calculate pH from H⁺ Concentration"
  },
  {
    "name": "pKa/pKb Calculator",
    "slug": "pka-pkb-calculator",
    "category": "science",
    "description": "pKa and pKb Calculator – Convert Ka, Kb, pKa, and pKb"
  },
  {
    "name": "pOH Calculator",
    "slug": "poh-calculator",
    "category": "science",
    "description": "pOH Calculator – Calculate pOH and Convert to pH"
  }
]

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

  { id: "automotive", name: "Automotive" },
  { id: "business", name: "Business" },
  { id: "home", name: "Home & Garden" },
  { id: "education", name: "Education" },
  { id: "agriculture", name: "Agriculture" },
  { id: "weather", name: "Weather" },
  { id: "security", name: "Security" },
  { id: "food", name: "Food & Cooking" },
  { id: "gaming", name: "Gaming & Sports" },
  { id: "music", name: "Music & Audio" },
  { id: "design", name: "Design" },
  { id: "outdoor", name: "Outdoor" },
  { id: "pets", name: "Pets" },
  { id: "parenting", name: "Parenting" },
  { id: "science", name: "Science" },
  { id: "shipping", name: "Shipping" },
  { id: "photography", name: "Photography" },
  { id: "lifestyle", name: "Lifestyle" },
];

export default function CalculatorsLandingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch = calc.name.toLowerCase().includes(search.toLowerCase()) || calc.description.toLowerCase().includes(search.toLowerCase());
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12">
          {filteredCalculators.map((calc) => (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`}>
              <Card key={calc.slug} className="hover:shadow-md transition-shadow">
                <CardHeader className="px-4">
                  <CardTitle className="text-base font-medium">
                    <h2 className="hover:text-primary transition-colors">
                      {calc.name}
                    </h2>
                  </CardTitle>
                  <CardDescription>
                    <p>
                      {calc.description}
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
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

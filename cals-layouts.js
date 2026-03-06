import fs from "fs";
import path from "path";

const pagesData = [
    {
        "id": 1,
        "pageName": "0-100-acceleration-estimator",
        "h1": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
        "p": "Wondering how fast your car actually is? Enter your vehicle's horsepower, weight, and drivetrain to get instant 0-60 mph and 0-100 km/h time estimates. No sign-up required.",
        "internalLinkPages": [
            7,
            50,
            278,
            474,
            233,
            156
        ],
        "pageHasH1": false
    },
    {
        "id": 2,
        "pageName": "1rm-calculator",
        "h1": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
        "p": "Find your one-rep max without maxing out. Enter the weight and reps you lifted to calculate your estimated 1RM and set smarter strength training goals.",
        "internalLinkPages": [
            438,
            491,
            510,
            512,
            1,
            389
        ],
        "pageHasH1": false
    },
    {
        "id": 3,
        "pageName": "4-percent-rule-retirement-calculator",
        "h1": "4% Rule Retirement Calculator",
        "p": "Apply the classic 4% rule to your retirement plan. Calculate the corpus needed to withdraw 4% annually and see if your current savings are on track.",
        "internalLinkPages": [
            167,
            364,
            365,
            366,
            388,
            4
        ],
        "pageHasH1": false
    },
    {
        "id": 4,
        "pageName": "50-30-20-budget-rule-calculator",
        "h1": "50/30/20 Budget Rule Calculator",
        "p": "Apply the popular 50/30/20 budgeting rule to your income. Get recommended amounts for needs, wants, and savings based on your monthly take-home pay.",
        "internalLinkPages": [
            280,
            116,
            200,
            148,
            395,
            3
        ],
        "pageHasH1": false
    },
    {
        "id": 5,
        "pageName": "a-b-test-significance-calculator",
        "h1": "A/B Test Significance Calculator – Check If Your Test Results Are Statistically Valid",
        "p": "Make confident marketing decisions with our A/B Test Significance Calculator.            Enter your control and variant conversion rates along with sample sizes to determine            statistical significance and confidence level — stop guessing and start testing smarter.",
        "internalLinkPages": [
            1,
            2,
            3,
            4,
            6,
            7
        ],
        "pageHasH1": true
    },
    {
        "id": 6,
        "pageName": "ac-impedance-calculator",
        "h1": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
        "p": "Calculate impedance, reactance, and phase angle for AC circuits with R, L, and C components.",
        "internalLinkPages": [
            296,
            363,
            105,
            143,
            477,
            221
        ],
        "pageHasH1": false
    },
    {
        "id": 7,
        "pageName": "acceleration-calculator",
        "h1": "Acceleration Calculator",
        "p": "Calculate acceleration from change in velocity over time, or use Newton's second law (F = ma).",
        "internalLinkPages": [
            1,
            474,
            278,
            233,
            156,
            328
        ],
        "pageHasH1": false
    },
    {
        "id": 8,
        "pageName": "acoustic-impedance-calculator",
        "h1": "Acoustic Impedance Calculator – Calculate Z",
        "p": "Calculate the acoustic impedance of a material. Z = ρc where ρ is density and c is the speed of sound.",
        "internalLinkPages": [
            27,
            115,
            117,
            137,
            288,
            289
        ],
        "pageHasH1": false
    },
    {
        "id": 9,
        "pageName": "activity-calorie-calculator",
        "h1": "Activity Calorie Burn Calculator – Calories Burned by Activity & Duration",
        "p": "Find out how many calories any activity burns based on your weight and how long you do it. Our calculator covers hundreds of activities using MET-based calculations.",
        "internalLinkPages": [
            68,
            109,
            434,
            445,
            488,
            111
        ],
        "pageHasH1": false
    },
    {
        "id": 10,
        "pageName": "adc-resolution-calculator",
        "h1": "ADC Resolution Calculator – Calculate ADC LSB Size",
        "p": "Calculate the resolution and number of levels for an ADC based on bit depth and reference voltage.",
        "internalLinkPages": [
            110,
            35,
            115,
            344,
            353,
            373
        ],
        "pageHasH1": false
    },
    {
        "id": 11,
        "pageName": "addition-calculator",
        "h1": "Addition Calculator",
        "p": "Add multiple numbers together",
        "internalLinkPages": [
            131,
            286,
            444,
            313,
            28,
            500
        ],
        "pageHasH1": false
    },
    {
        "id": 12,
        "pageName": "aes-key-size-estimator",
        "h1": "AES Key Size Estimator – Understand Encryption Key Strength",
        "p": "Understand the security of your encryption with our AES Key Size Estimator.            See how many possible keys exist for different key sizes and how long brute            force attacks would take — essential for security planning.",
        "internalLinkPages": [
            386,
            308,
            201,
            35,
            115,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 13,
        "pageName": "age-calculator",
        "h1": "Age Calculator – Calculate Your Exact Age in Years, Months & Days",
        "p": "Find out your exact age down to the day with our free age calculator. Enter any date of birth and get a precise breakdown of years, months, and days elapsed.",
        "internalLinkPages": [
            18,
            113,
            114,
            65,
            497,
            29
        ],
        "pageHasH1": false
    },
    {
        "id": 14,
        "pageName": "air-conditioner-tonnage-calculator",
        "h1": "AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room",
        "p": "Choose the right air conditioner for your space with our AC Tonnage Calculator. Enter            your room size, ceiling height, insulation quality, and climate zone to get the            recommended BTU or tonnage — ensuring comfort and energy efficiency.",
        "internalLinkPages": [
            84,
            215,
            216,
            206,
            381,
            144
        ],
        "pageHasH1": true
    },
    {
        "id": 15,
        "pageName": "air-density-calculator",
        "h1": "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
        "p": "Calculate the density of air at any altitude, temperature, and pressure with our Air Density Calculator. Essential for aviation, HVAC engineering, meteorology, and aerodynamics calculations.",
        "internalLinkPages": [
            214,
            122,
            205,
            503,
            218,
            470
        ],
        "pageHasH1": true
    },
    {
        "id": 16,
        "pageName": "alcohol-dilution-calculator",
        "h1": "Alcohol Dilution Calculator – Calculate Water to Add for Target ABV",
        "p": "Dilute spirits to your desired strength with our Alcohol Dilution Calculator.            Enter starting ABV and volume along with your target ABV to calculate exactly            how much water to add — perfect for home distillers and bartenders.",
        "internalLinkPages": [
            41,
            90,
            505,
            91,
            449,
            34
        ],
        "pageHasH1": true
    },
    {
        "id": 17,
        "pageName": "altitude-sickness-risk-calculator",
        "h1": "Altitude Sickness Risk Calculator – Assess Your Risk of AMS Before Climbing",
        "p": "Stay safe at high altitude with our Altitude Sickness Risk Calculator.            Enter your ascent rate, target altitude, and health risk factors to evaluate            your Acute Mountain Sickness (AMS) risk level and get acclimatization recommendations.",
        "internalLinkPages": [
            285,
            32,
            71,
            460,
            209,
            503
        ],
        "pageHasH1": true
    },
    {
        "id": 18,
        "pageName": "anniversary-calculator",
        "h1": "Anniversary Calculator – Free Anniversary Date Counter",
        "p": "Calculate how long since your special day and when your next anniversary is. Perfect for weddings, birthdays, relationships, and any memorable date.",
        "internalLinkPages": [
            13,
            113,
            114,
            65,
            497,
            29
        ],
        "pageHasH1": false
    },
    {
        "id": 19,
        "pageName": "antilog-calculator",
        "h1": "Antilog Calculator",
        "p": "Calculate the inverse logarithm (bˣ)",
        "internalLinkPages": [
            254,
            160,
            382,
            399,
            161,
            35
        ],
        "pageHasH1": false
    },
    {
        "id": 20,
        "pageName": "aperture-depth-of-field-calculator",
        "h1": "Depth of Field Calculator – Calculate DOF from Aperture, Focal Length & Distance",
        "p": "Control your background blur with precision using our Depth-of-Field Calculator.            Enter aperture, focal length, and subject distance to calculate depth of field,            hyperfocal distance, and sharp zone limits — essential for portrait, landscape,            and macro photography.",
        "internalLinkPages": [
            70,
            170,
            229,
            410,
            245,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 21,
        "pageName": "aquarium-co-calculator",
        "h1": "Aquarium CO₂ Calculator – Calculate CO₂ Injection Rate for Planted Tanks",
        "p": "Optimize plant growth in your aquarium with our CO₂ Calculator.            Enter tank volume, target CO₂ concentration, and current pH and KH levels            to calculate the required CO₂ injection rate — essential for serious            planted tank enthusiasts.",
        "internalLinkPages": [
            22,
            23,
            45,
            79,
            133,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 22,
        "pageName": "aquarium-filtration-calculator",
        "h1": "Aquarium Filtration Calculator – Find the Right Filter Size for Your Fish Tank",
        "p": "Keep your aquarium water crystal clear with our Filtration Calculator.            Enter tank volume and fish stocking level to calculate the minimum required            filter flow rate — ensuring healthy water quality for all tank inhabitants.",
        "internalLinkPages": [
            21,
            23,
            45,
            79,
            133,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 23,
        "pageName": "aquarium-volume-calculator",
        "h1": "Aquarium Volume Calculator – Calculate Fish Tank Water Capacity",
        "p": "Calculate your aquarium's water volume instantly with our free Aquarium Volume Calculator. Enter tank dimensions to find gallons, liters, and recommended fish capacity — essential for proper stocking and water treatment.",
        "internalLinkPages": [
            21,
            22,
            45,
            79,
            133,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 24,
        "pageName": "arithmetic-sequence-calculator",
        "h1": "Arithmetic Sequence Calculator",
        "p": "Calculate nth term and sum of arithmetic sequence",
        "internalLinkPages": [
            185,
            166,
            28,
            500,
            350,
            430
        ],
        "pageHasH1": false
    },
    {
        "id": 25,
        "pageName": "asphalt-quantity-calculator",
        "h1": "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways",
        "p": "Accurately estimate asphalt requirements for any paving project with our            Asphalt Quantity Calculator. Enter the area and compacted depth to calculate            volume in cubic yards and weight in tons — enabling accurate material            ordering and cost estimation.",
        "internalLinkPages": [
            64,
            96,
            97,
            195,
            281,
            394
        ],
        "pageHasH1": true
    },
    {
        "id": 26,
        "pageName": "attendance-percentage-calculator",
        "h1": "Attendance Percentage Calculator – Check If You Meet the Minimum Attendance Requirement",
        "p": "Instantly check your attendance percentage and find out how many more classes you can            miss with our Attendance Calculator. Enter classes attended and total classes held to            stay on top of your attendance requirements.",
        "internalLinkPages": [
            194,
            81,
            192,
            193,
            158,
            159
        ],
        "pageHasH1": true
    },
    {
        "id": 27,
        "pageName": "audio-dynamic-range-calculator",
        "h1": "Audio Dynamic Range Calculator – Calculate dB Dynamic Range of Audio Signals",
        "p": "Measure the dynamic range of your audio recordings with our Dynamic Range Calculator.            Enter peak level and noise floor in dB to calculate dynamic range — a key metric for            mastering engineers, sound designers, and audiophiles.",
        "internalLinkPages": [
            8,
            115,
            117,
            288,
            289,
            411
        ],
        "pageHasH1": true
    },
    {
        "id": 28,
        "pageName": "average-calculator",
        "h1": "Average Calculator – Calculate Mean, Median & More",
        "p": "Calculate the mean (average), median, and other statistics for any set of numbers. Enter values separated by commas or spaces for instant results.",
        "internalLinkPages": [
            266,
            272,
            500,
            350,
            430,
            471
        ],
        "pageHasH1": false
    },
    {
        "id": 29,
        "pageName": "baby-age-calculator",
        "h1": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months",
        "p": "Calculate your baby's exact age in weeks, months, and days. Track upcoming developmental milestones and never miss an important date in your baby's growth journey.",
        "internalLinkPages": [
            30,
            31,
            123,
            83,
            457,
            318
        ],
        "pageHasH1": false
    },
    {
        "id": 30,
        "pageName": "baby-feeding-chart-calculator",
        "h1": "Baby Feeding Chart Calculator – How Much & How Often to Feed Your Baby",
        "p": "Navigate the early months of feeding with our Baby Feeding Chart Calculator.            Enter your baby&apos;s age and weight to get recommended feeding frequency,            milk volume per feed, and solid food introduction milestones — backed by            pediatric guidelines.",
        "internalLinkPages": [
            29,
            31,
            123,
            83,
            457,
            318
        ],
        "pageHasH1": true
    },
    {
        "id": 31,
        "pageName": "baby-sleep-schedule-calculator",
        "h1": "Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby",
        "p": "Help your baby sleep better with our Baby Sleep Schedule Calculator.            Enter your child&apos;s age to get a recommended daily sleep schedule including            nap times, wake windows, and total sleep hours — aligned with pediatric sleep guidelines.",
        "internalLinkPages": [
            29,
            30,
            123,
            83,
            457,
            416
        ],
        "pageHasH1": true
    },
    {
        "id": 32,
        "pageName": "backpack-load-calculator",
        "h1": "Backpack Load Calculator – Find Your Safe Maximum Pack Weight",
        "p": "Protect your body on the trail with our Backpack Load Calculator.            Enter your body weight and trip type to see the maximum recommended            pack weight based on guidelines from hiking experts — preventing            injury from overloaded packs.",
        "internalLinkPages": [
            71,
            17,
            460,
            209,
            503,
            285
        ],
        "pageHasH1": true
    },
    {
        "id": 33,
        "pageName": "bacterial-growth-calculator",
        "h1": "Bacterial Growth Calculator – Model Microbial Population Growth",
        "p": "Model bacterial population growth using exponential growth equations with our bacterial growth calculator. Input initial population, growth rate, and time to predict colony size. Perfect for microbiology, food science, and infectious disease studies.",
        "internalLinkPages": [
            132,
            293,
            343,
            1,
            2,
            3
        ],
        "pageHasH1": false
    },
    {
        "id": 34,
        "pageName": "baking-time-adjustment-calculator",
        "h1": "Baking Time Adjustment Calculator – Adjust Oven Time When Changing Pan Sizes",
        "p": "Get perfect bakes every time with our Baking Time Adjustment Calculator.            When you change pan size, get adjusted baking time and temperature to ensure            even cooking and consistent results.",
        "internalLinkPages": [
            355,
            234,
            91,
            449,
            69,
            300
        ],
        "pageHasH1": true
    },
    {
        "id": 35,
        "pageName": "base-converter-calculator",
        "h1": "Base Converter Calculator",
        "p": "Convert numbers between different bases (2-36)",
        "internalLinkPages": [
            118,
            173,
            294,
            379,
            399,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 36,
        "pageName": "basketball-shooting-percentage-calculator",
        "h1": "Basketball Shooting Percentage Calculator – Calculate FG%, 3P% & FT%",
        "p": "Analyze basketball shooting performance with our Shooting Percentage Calculator.            Calculate field goal percentage, three-point percentage, and free throw            percentage from shots made and attempted — essential stats for player            evaluation and game analysis.",
        "internalLinkPages": [
            191,
            102,
            103,
            452,
            171,
            502
        ],
        "pageHasH1": true
    },
    {
        "id": 37,
        "pageName": "battery-backup-time-calculator",
        "h1": "Battery Backup Time Calculator – How Long Will Your Battery Last?",
        "p": "Find out how long your battery will power your devices with our Battery Backup Time            Calculator. Enter battery capacity in Ah or Wh and your device's power draw in watts to            get an accurate runtime estimate — ideal for solar systems, UPS, and portable power banks.",
        "internalLinkPages": [
            39,
            38,
            271,
            400,
            82,
            144
        ],
        "pageHasH1": true
    },
    {
        "id": 38,
        "pageName": "battery-c-rate-calculator",
        "h1": "Battery C-Rate Calculator – Calculate Charge/Discharge Rate",
        "p": "Calculate battery C-rate and corresponding current. C-rate indicates how fast a battery charges or discharges.",
        "internalLinkPages": [
            37,
            39,
            82,
            271,
            144,
            225
        ],
        "pageHasH1": false
    },
    {
        "id": 39,
        "pageName": "battery-life-calculator",
        "h1": "Battery Life Calculator – Calculate Battery Runtime",
        "p": "Estimate how long your battery will last with our battery life calculator. Enter battery capacity and load to calculate runtime in hours and minutes.",
        "internalLinkPages": [
            37,
            38,
            271,
            400,
            82,
            144
        ],
        "pageHasH1": false
    },
    {
        "id": 40,
        "pageName": "beam-bending-calculator",
        "h1": "Beam Bending Calculator – Stress & Deflection for Structural Beams",
        "p": "Analyze beam performance under load with our beam bending calculator. Calculate maximum bending stress, deflection, and moment for simply supported and cantilever beams.",
        "internalLinkPages": [
            392,
            439,
            163,
            54,
            43,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 41,
        "pageName": "beer-abv-calculator",
        "h1": "Beer ABV Calculator – Calculate Alcohol Content of Your Home Brew",
        "p": "Know exactly how strong your home brew is with our Beer ABV Calculator. Enter your original gravity (OG) and final gravity (FG) readings to calculate the alcohol by volume percentage of your beer — an essential tool for home brewers.",
        "internalLinkPages": [
            90,
            16,
            505,
            91,
            449,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 42,
        "pageName": "belt-length-calculator",
        "h1": "Belt Length Calculator – Calculate V-Belt Length",
        "p": "Calculate the required belt length for a two-pulley system. Enter pulley diameters and center distance to find the correct belt size.",
        "internalLinkPages": [
            43,
            182,
            385,
            458,
            341,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 43,
        "pageName": "belt-tension-calculator",
        "h1": "Belt Tension Calculator – Calculate Belt Drive Tension",
        "p": "Calculate belt tension and torque for belt drive systems. Determine proper initial tension for installation.",
        "internalLinkPages": [
            42,
            182,
            385,
            458,
            341,
            392
        ],
        "pageHasH1": false
    },
    {
        "id": 44,
        "pageName": "biorhythm-calculator",
        "h1": "Biorhythm Calculator – Track Your Physical, Emotional & Intellectual Cycles",
        "p": "Discover your natural performance rhythms with our Biorhythm Calculator. Enter your birth date to see your current physical, emotional, and intellectual cycle positions — helping you plan important activities on your peak days.",
        "internalLinkPages": [
            517,
            13,
            18,
            136,
            267,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 45,
        "pageName": "bird-cage-size-calculator",
        "h1": "Bird Cage Size Calculator – Find the Minimum Cage Size for Your Bird",
        "p": "Give your bird the space it deserves with our Bird Cage Size Calculator.            Enter your bird species to get minimum recommended cage dimensions based on            wingspan and behavioral needs — ensuring a healthy, stress-free environment            for your feathered friend.",
        "internalLinkPages": [
            79,
            133,
            210,
            248,
            318,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 46,
        "pageName": "blood-alcohol-calculator",
        "h1": "Blood Alcohol Content Calculator – Estimate Your BAC Level",
        "p": "Use our BAC calculator to estimate your blood alcohol content based on the number of drinks, your body weight, and time elapsed. Stay safe and make informed decisions.",
        "internalLinkPages": [
            85,
            47,
            48,
            51,
            52,
            232
        ],
        "pageHasH1": false
    },
    {
        "id": 47,
        "pageName": "blood-sugar-converter",
        "h1": "Blood Sugar Converter – Free Glucose Unit Converter mg/dL to mmol/L",
        "p": "Convert blood glucose levels between mg/dL and mmol/L instantly. Enter a value in either unit to see the conversion in real-time. Essential tool for diabetes management.",
        "internalLinkPages": [
            85,
            232,
            48,
            51,
            52,
            219
        ],
        "pageHasH1": false
    },
    {
        "id": 48,
        "pageName": "bmi-calculator",
        "h1": "BMI Calculator – Free Body Mass Index Calculator Online",
        "p": "Use our free BMI calculator to instantly find your Body Mass Index. Enter your height and weight to check if you're in a healthy weight range. Supports both metric and imperial units.",
        "internalLinkPages": [
            49,
            51,
            52,
            219,
            243,
            486
        ],
        "pageHasH1": false
    },
    {
        "id": 49,
        "pageName": "bmr-calculator",
        "h1": "BMR Calculator",
        "p": "Calculate your Basal Metabolic Rate - the calories your body burns at complete rest. Enter your details to find your BMR using the Mifflin-St Jeor equation.",
        "internalLinkPages": [
            48,
            51,
            52,
            219,
            243,
            448
        ],
        "pageHasH1": false
    },
    {
        "id": 50,
        "pageName": "boat-speed-calculator",
        "h1": "Boat Speed Calculator – Calculate Maximum Hull Speed for Any Boat",
        "p": "Find your boat&apos;s theoretical maximum hull speed with our Boat Speed Calculator.            Enter waterline length to calculate hull speed in knots, mph, and km/h —            essential knowledge for sailors and powerboat operators planning passages.",
        "internalLinkPages": [
            302,
            426,
            260,
            389,
            7,
            474
        ],
        "pageHasH1": true
    },
    {
        "id": 51,
        "pageName": "body-fat-calculator",
        "h1": "Body Fat Percentage Calculator – Estimate Your Body Fat Instantly",
        "p": "Calculate your body fat percentage accurately using our free online tool. Input your measurements to get an estimate of your fat mass, lean mass, and fitness category.",
        "internalLinkPages": [
            48,
            49,
            52,
            219,
            243,
            486
        ],
        "pageHasH1": false
    },
    {
        "id": 52,
        "pageName": "body-surface-area-calculator",
        "h1": "Body Surface Area Calculator – BSA Calculation for Medical Use",
        "p": "Calculate your body surface area (BSA) quickly and accurately. Useful for medication dosing, chemotherapy, and clinical assessments using the Mosteller, DuBois, or Haycock formula.",
        "internalLinkPages": [
            48,
            49,
            51,
            219,
            243,
            486
        ],
        "pageHasH1": false
    },
    {
        "id": 53,
        "pageName": "boiler-efficiency-calculator",
        "h1": "Boiler Efficiency Calculator – Calculate Boiler Efficiency",
        "p": "Calculate boiler efficiency from fuel input and heat output. Estimate stack losses from exhaust temperature.",
        "internalLinkPages": [
            206,
            216,
            215,
            14,
            84,
            207
        ],
        "pageHasH1": false
    },
    {
        "id": 54,
        "pageName": "bolt-torque-calculator",
        "h1": "Bolt Torque Calculator – Calculate Bolt Tightening Torque",
        "p": "Calculate the recommended tightening torque for bolts based on size, grade, and lubrication condition.",
        "internalLinkPages": [
            458,
            43,
            408,
            376,
            392,
            163
        ],
        "pageHasH1": false
    },
    {
        "id": 55,
        "pageName": "bond-convexity-calculator",
        "h1": "Bond Convexity Calculator",
        "p": "Go beyond duration with convexity. Calculate bond convexity to accurately assess interest rate risk by measuring the curvature in the price-yield relationship.",
        "internalLinkPages": [
            56,
            57,
            58,
            515,
            292,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 56,
        "pageName": "bond-duration-calculator",
        "h1": "Bond Duration Calculator",
        "p": "Measure your bond's sensitivity to interest rate changes. Calculate Macaulay and Modified Duration to better manage fixed-income portfolio risk.",
        "internalLinkPages": [
            55,
            57,
            58,
            515,
            292,
            309
        ],
        "pageHasH1": true
    },
    {
        "id": 57,
        "pageName": "bond-price-calculator",
        "h1": "Bond Price Calculator",
        "p": "Calculate the fair market price of a bond based on its face value, coupon rate, years to maturity, and the prevailing market yield or discount rate.",
        "internalLinkPages": [
            55,
            56,
            58,
            515,
            292,
            309
        ],
        "pageHasH1": true
    },
    {
        "id": 58,
        "pageName": "bond-yield-calculator",
        "h1": "Bond Yield Calculator",
        "p": "Find the current yield or yield-to-maturity of a bond from its market price, coupon payments, and maturity date. Essential for fixed-income investing.",
        "internalLinkPages": [
            55,
            56,
            57,
            515,
            292,
            309
        ],
        "pageHasH1": true
    },
    {
        "id": 59,
        "pageName": "break-even-discount-calculator",
        "h1": "Break-Even Discount Calculator",
        "p": "Find the maximum discount you can offer without losing money. Calculate the break-even discount percentage given your cost price and current selling price.",
        "internalLinkPages": [
            60,
            126,
            127,
            261,
            263,
            338
        ],
        "pageHasH1": true
    },
    {
        "id": 60,
        "pageName": "break-even-point-calculator",
        "h1": "Break-Even Point Calculator",
        "p": "Find the exact number of units you need to sell to cover all costs. Calculate your break-even point from fixed costs, variable costs, and selling price.",
        "internalLinkPages": [
            59,
            126,
            127,
            261,
            263,
            338
        ],
        "pageHasH1": true
    },
    {
        "id": 61,
        "pageName": "breathing-exercise-timer",
        "h1": "Breathing Exercise Timer – Guided Timer for Box Breathing, 4-7-8 & More",
        "p": "Reduce stress and improve focus with our Breathing Exercise Timer.            Choose from popular techniques like box breathing (4-4-4-4) or the 4-7-8 method            and follow guided visual cues through each inhale, hold, and exhale phase.",
        "internalLinkPages": [
            267,
            416,
            417,
            418,
            119,
            217
        ],
        "pageHasH1": true
    },
    {
        "id": 62,
        "pageName": "brewster-angle-calculator",
        "h1": "Brewster Angle Calculator – Polarization Angle Calculator",
        "p": "Calculate Brewster's angle (polarization angle) for light passing between two media. At this angle, reflected light is completely polarized.",
        "internalLinkPages": [
            358,
            420,
            245,
            170,
            20,
            316
        ],
        "pageHasH1": false
    },
    {
        "id": 63,
        "pageName": "brick-bond-calculator",
        "h1": "Brick Bond Calculator – Calculate Bricks Needed for Any Wall Pattern",
        "p": "Plan your brickwork accurately with our Brick Bond Calculator. Enter your wall dimensions and choose a bond pattern (running, Flemish, English) to calculate the total number of bricks required, including mortar joints and waste allowance.",
        "internalLinkPages": [
            64,
            96,
            281,
            325,
            394,
            97
        ],
        "pageHasH1": true
    },
    {
        "id": 64,
        "pageName": "brick-calculator",
        "h1": "Brick Calculator",
        "p": "Calculate how many bricks you need for your wall. Enter wall dimensions, brick size, and mortar thickness to get accurate quantities with waste allowance.",
        "internalLinkPages": [
            63,
            96,
            97,
            281,
            325,
            394
        ],
        "pageHasH1": false
    },
    {
        "id": 65,
        "pageName": "business-days-calculator",
        "h1": "Business Days Calculator – Count Working Days Between Dates",
        "p": "Count the number of working/business days between two dates, excluding weekends and holidays. Perfect for project planning and deadline calculations.",
        "internalLinkPages": [
            113,
            114,
            13,
            18,
            497,
            368
        ],
        "pageHasH1": false
    },
    {
        "id": 66,
        "pageName": "business-loan-emi-calculator",
        "h1": "Business Loan EMI Calculator",
        "p": "Calculate your business loan EMI, total repayment, and interest cost. Includes options for moratorium periods and processing fees for a complete cost picture.",
        "internalLinkPages": [
            250,
            249,
            251,
            252,
            253,
            74
        ],
        "pageHasH1": true
    },
    {
        "id": 67,
        "pageName": "buy-vs-rent-calculator",
        "h1": "Buy vs Rent Calculator",
        "p": "Make a smarter housing decision. Compare the long-term financial outcome of buying versus renting a home, factoring in appreciation, opportunity cost, and expenses.",
        "internalLinkPages": [
            213,
            283,
            282,
            360,
            361,
            362
        ],
        "pageHasH1": true
    },
    {
        "id": 68,
        "pageName": "calorie-deficit-calculator",
        "h1": "Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?",
        "p": "Find out exactly how large a calorie deficit you need to reach your weight loss goals. Our calorie deficit calculator helps you lose weight safely and sustainably.",
        "internalLinkPages": [
            9,
            111,
            434,
            109,
            445,
            488
        ],
        "pageHasH1": false
    },
    {
        "id": 69,
        "pageName": "calories-per-serving-calculator",
        "h1": "Calories Per Serving Calculator – Calculate Nutrition Calories in Any Recipe",
        "p": "Track your nutrition accurately with our Calories Per Serving Calculator. Enter ingredients and their calorie values along with serving count to calculate total recipe calories and calories per serving — great for meal planning and diet tracking.",
        "internalLinkPages": [
            355,
            234,
            91,
            449,
            75,
            164
        ],
        "pageHasH1": true
    },
    {
        "id": 70,
        "pageName": "camera-exposure-calculator",
        "h1": "Camera Exposure Calculator – Find the Perfect Aperture, Shutter Speed & ISO",
        "p": "Get perfectly exposed photos every time with our Camera Exposure Calculator.            Input your current exposure settings to calculate EV and find equivalent            exposures — ideal for photographers learning manual mode.",
        "internalLinkPages": [
            20,
            229,
            410,
            245,
            170,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 71,
        "pageName": "camping-gear-weight-calculator",
        "h1": "Camping Gear Weight Calculator – Plan Your Pack Weight for Any Trip",
        "p": "Pack smart with our Camping Gear Weight Calculator. List all your gear items            with individual weights to calculate total pack weight and identify heavy items —            helping backpackers and campers stay within comfortable carry limits.",
        "internalLinkPages": [
            32,
            17,
            460,
            209,
            503,
            285
        ],
        "pageHasH1": true
    },
    {
        "id": 72,
        "pageName": "canvas-aspect-ratio-calculator",
        "h1": "Canvas Aspect Ratio Calculator – Resize Canvas While Keeping Proportions",
        "p": "Resize your canvas perfectly with our Aspect Ratio Calculator. Lock your            width-to-height ratio and enter a new dimension to instantly see the correct            corresponding size — ideal for graphic designers, video editors, and photographers.",
        "internalLinkPages": [
            316,
            327,
            1,
            2,
            3,
            4
        ],
        "pageHasH1": true
    },
    {
        "id": 73,
        "pageName": "car-loan-affordability-calculator",
        "h1": "Car Loan Affordability Calculator – Find Out What Car You Can Afford",
        "p": "Use our Car Loan Affordability Calculator to determine your monthly payment and total            interest before buying a car. Enter the loan amount, annual interest rate, and repayment            term to plan your auto financing with confidence.",
        "internalLinkPages": [
            74,
            176,
            177,
            213,
            67,
            253
        ],
        "pageHasH1": true
    },
    {
        "id": 74,
        "pageName": "car-loan-calculator",
        "h1": "Car Loan Calculator – Calculate Auto Loan Payments",
        "p": "Plan your auto financing with confidence. Calculate your monthly car loan payment and total cost based on vehicle price, down payment, rate, and duration.",
        "internalLinkPages": [
            73,
            176,
            177,
            268,
            463,
            472
        ],
        "pageHasH1": false
    },
    {
        "id": 75,
        "pageName": "carb-intake-calculator",
        "h1": "Carb Intake Calculator – Daily Carbohydrate Needs Calculator",
        "p": "Find out how many grams of carbohydrates you need each day. Our carb intake calculator tailors your carb target to your calorie goals, lifestyle, and dietary preferences.",
        "internalLinkPages": [
            164,
            257,
            231,
            339,
            340,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 76,
        "pageName": "carbon-footprint-calculator",
        "h1": "Carbon Footprint Calculator – Calculate Your Personal Annual CO₂ Footprint",
        "p": "Understand your environmental impact with our Carbon Footprint Calculator. Answer questions about your travel habits, home energy use, diet, and purchases to calculate your total annual CO₂ footprint in tonnes — and discover the biggest areas for reduction.",
        "internalLinkPages": [
            89,
            153,
            422,
            423,
            145,
            144
        ],
        "pageHasH1": true
    },
    {
        "id": 77,
        "pageName": "cargo-volume-calculator",
        "h1": "Cargo Volume Calculator – Calculate Total Shipment Volume & Chargeable Weight",
        "p": "Plan and price your freight accurately with our Cargo Volume Calculator.            Enter dimensions and quantities for multiple package types to calculate total            cargo volume in CBM and chargeable weight — supporting air, ocean, and road freight planning.",
        "internalLinkPages": [
            72,
            73,
            74,
            75,
            76,
            78
        ],
        "pageHasH1": true
    },
    {
        "id": 78,
        "pageName": "carpet-area-calculator",
        "h1": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
        "p": "Calculate the carpet area of a flat or house from built-up or super built-up area using standard ratios with our free carpet area calculator. Understand exactly how much usable space you're getting. Essential for home buyers in India.",
        "internalLinkPages": [
            169,
            454,
            80,
            304,
            325,
            489
        ],
        "pageHasH1": false
    },
    {
        "id": 79,
        "pageName": "cat-calorie-calculator",
        "h1": "Cat Calorie Calculator – Calculate Your Cat&apos;s Daily Calorie Requirements",
        "p": "Ensure proper nutrition for your feline companion with our Cat Calorie Calculator.            Enter your cat&apos;s weight, age, and lifestyle to calculate exact daily caloric needs —            ideal for preventing feline obesity and maintaining healthy weight.",
        "internalLinkPages": [
            133,
            45,
            210,
            248,
            318,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 80,
        "pageName": "ceiling-tile-calculator",
        "h1": "Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?",
        "p": "Order the right number of ceiling tiles every time with our Ceiling Tile Calculator.            Input your ceiling dimensions and tile size to calculate the total number of tiles            needed, complete with a percentage allowance for waste and cuts.",
        "internalLinkPages": [
            78,
            169,
            454,
            304,
            325,
            139
        ],
        "pageHasH1": true
    },
    {
        "id": 81,
        "pageName": "cgpa-calculator",
        "h1": "CGPA Calculator – Calculate Your Cumulative GPA Across All Semesters",
        "p": "Track your academic performance across your entire degree with our CGPA Calculator.            Enter your semester GPAs and credit hours to calculate your overall cumulative GPA.            Supports 4.0, 5.0, and 10-point grading scales.",
        "internalLinkPages": [
            192,
            193,
            194,
            26,
            158,
            159
        ],
        "pageHasH1": true
    },
    {
        "id": 82,
        "pageName": "charging-cost-ev-calculator",
        "h1": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
        "p": "Wondering how much it costs to charge your electric vehicle? Our EV Charging Cost            Calculator lets you enter your battery size (kWh) and local electricity rate to estimate            charging costs at home or at a public station. Save more by knowing your real charging            expenses.",
        "internalLinkPages": [
            157,
            351,
            37,
            39,
            38,
            144
        ],
        "pageHasH1": true
    },
    {
        "id": 83,
        "pageName": "child-height-predictor",
        "h1": "Child Height Predictor – Free Adult Height Calculator",
        "p": "Predict your child's adult height using the mid-parental height method. Enter both parents' heights and the child's gender to get an estimated adult height with a normal range.",
        "internalLinkPages": [
            457,
            29,
            30,
            123,
            318,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 84,
        "pageName": "chiller-tonnage-calculator",
        "h1": "Chiller Tonnage Calculator – Calculate Cooling Capacity",
        "p": "Calculate chiller tonnage from water flow rate and temperature difference. Essential for HVAC system sizing.",
        "internalLinkPages": [
            14,
            215,
            216,
            206,
            53,
            381
        ],
        "pageHasH1": false
    },
    {
        "id": 85,
        "pageName": "cholesterol-ratio-calculator",
        "h1": "Cholesterol Ratio Calculator – Free Heart Health Risk Assessment",
        "p": "Calculate your cholesterol ratios to assess heart disease risk. Enter your lipid panel results to get your Total/HDL and LDL/HDL ratios with risk assessment.",
        "internalLinkPages": [
            47,
            232,
            48,
            51,
            52,
            219
        ],
        "pageHasH1": false
    },
    {
        "id": 86,
        "pageName": "chord-progression-generator",
        "h1": "Chord Progression Generator – Create Chord Progressions in Any Key & Scale",
        "p": "Find the perfect chord progression for your song with our Chord Progression Generator.            Select your key, scale, and mood to generate common and creative chord sequences —            ideal for songwriters and music producers.",
        "internalLinkPages": [
            290,
            398,
            451,
            464,
            175,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 87,
        "pageName": "circle-area-calculator",
        "h1": "Circle Area Calculator",
        "p": "Calculate area, circumference, and diameter of a circle",
        "internalLinkPages": [
            147,
            306,
            356,
            404,
            428,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 88,
        "pageName": "clothing-shrinkage-estimator",
        "h1": "Clothing Shrinkage Estimator – Predict How Much Your Clothes Will Shrink",
        "p": "Avoid ruining your clothes with our Clothing Shrinkage Estimator.            Enter fabric type, washing temperature, and garment dimensions to predict            post-wash shrinkage — helping you buy the right size and care for your wardrobe.",
        "internalLinkPages": [
            409,
            238,
            169,
            1,
            2,
            3
        ],
        "pageHasH1": true
    },
    {
        "id": 89,
        "pageName": "co-emissions-calculator",
        "h1": "CO₂ Emissions Calculator – Calculate Carbon Dioxide Emissions from Any Activity",
        "p": "Quantify your carbon impact with our CO₂ Emissions Calculator. Enter data for            transportation, electricity use, or other activities to calculate total CO₂            emissions — supporting sustainability reporting and carbon reduction planning.",
        "internalLinkPages": [
            76,
            153,
            422,
            423,
            145,
            144
        ],
        "pageHasH1": true
    },
    {
        "id": 90,
        "pageName": "cocktail-abv-calculator",
        "h1": "Cocktail ABV Calculator – Calculate the Alcohol Content of Any Mixed Drink",
        "p": "Know what&apos;s in your glass with our Cocktail ABV Calculator. Enter each            ingredient&apos;s volume and ABV to calculate the total alcohol content of your            cocktail — great for bartenders, party planners, and responsible drinkers.",
        "internalLinkPages": [
            41,
            16,
            505,
            91,
            449,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 91,
        "pageName": "coffee-to-water-ratio-calculator",
        "h1": "Coffee to Water Ratio Calculator – Perfect Coffee Every Time",
        "p": "Brew the perfect cup of coffee with our Coffee to Water Ratio Calculator. Enter your desired water amount and brewing method to get the ideal coffee-to-water ratio — essential for baristas and coffee enthusiasts.",
        "internalLinkPages": [
            449,
            34,
            69,
            355,
            234,
            41
        ],
        "pageHasH1": true
    },
    {
        "id": 92,
        "pageName": "combination-calculator",
        "h1": "Combination Calculator",
        "p": "Calculate selections where order doesn't matter: C(n,r)",
        "internalLinkPages": [
            315,
            162,
            307,
            181,
            241,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 93,
        "pageName": "compound-interest-calculator",
        "h1": "Compound Interest Calculator",
        "p": "Find out how your money grows when interest compounds on both principal and accumulated earnings. Choose your compounding frequency for accurate projections.",
        "internalLinkPages": [
            94,
            412,
            179,
            333,
            388,
            226
        ],
        "pageHasH1": false
    },
    {
        "id": 94,
        "pageName": "compounding-frequency-comparison",
        "h1": "Compounding Frequency Comparison Calculator",
        "p": "Visualize how compounding frequency affects your returns. Compare daily, monthly, quarterly, and annual compounding side by side for the same principal and rate.",
        "internalLinkPages": [
            93,
            412,
            179,
            333,
            388,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 95,
        "pageName": "concentration-calculator",
        "h1": "Concentration Calculator – Convert Solution Concentration Units",
        "p": "Calculate solution concentration in molarity, percent composition, ppm, or ppb with our versatile concentration calculator. Ideal for chemists, lab technicians, and students working with solution preparation and analysis.",
        "internalLinkPages": [
            124,
            275,
            274,
            276,
            277,
            312
        ],
        "pageHasH1": false
    },
    {
        "id": 96,
        "pageName": "concrete-mix-ratio-calculator",
        "h1": "Concrete Mix Ratio Calculator – Calculate Material Quantities",
        "p": "Calculate cement, sand, and aggregate quantities for concrete mixes. Enter volume and mix ratio.",
        "internalLinkPages": [
            97,
            64,
            63,
            281,
            394,
            25
        ],
        "pageHasH1": false
    },
    {
        "id": 97,
        "pageName": "concrete-volume-calculator",
        "h1": "Concrete Volume Calculator – How Much Concrete Do You Need?",
        "p": "Estimate concrete quantities for any project with our concrete volume calculator. Compute cubic yards or meters for slabs, columns, footings, and walls to avoid over-ordering.",
        "internalLinkPages": [
            96,
            64,
            63,
            281,
            394,
            25
        ],
        "pageHasH1": false
    },
    {
        "id": 98,
        "pageName": "container-load-calculator",
        "h1": "Container Load Calculator – How Many Boxes Fit in a 20ft or 40ft Container?",
        "p": "Optimize your container loading with our Container Load Calculator.            Enter your cargo dimensions and container size (20ft, 40ft, 40ft HC) to            calculate the maximum number of boxes that can fit, maximizing shipping efficiency.",
        "internalLinkPages": [
            125,
            484,
            305,
            77,
            490,
            237
        ],
        "pageHasH1": true
    },
    {
        "id": 99,
        "pageName": "cost-of-capital-calculator",
        "h1": "Cost of Capital Calculator",
        "p": "Calculate your company's cost of equity and cost of debt separately to understand the minimum return required to justify investment decisions.",
        "internalLinkPages": [
            485,
            142,
            287,
            298,
            338,
            378
        ],
        "pageHasH1": true
    },
    {
        "id": 100,
        "pageName": "cpc-cpm-ctr-calculator",
        "h1": "CPC, CPM & CTR Calculator – Measure Your Digital Ad Campaign Performance",
        "p": "Analyze the effectiveness of your online ads with our CPC/CPM/CTR Calculator.            Enter impressions, clicks, and spend to instantly calculate cost per click,            cost per thousand impressions, and click-through rate — essential metrics for            Google Ads, Facebook Ads, and more.",
        "internalLinkPages": [
            107,
            108,
            178,
            291,
            242,
            377
        ],
        "pageHasH1": true
    },
    {
        "id": 101,
        "pageName": "credit-card-payoff-calculator",
        "h1": "Credit Card Payoff Calculator",
        "p": "Find out when you'll be debt-free and how much interest you'll pay. Enter your balance, interest rate, and fixed monthly payment to plan your payoff.",
        "internalLinkPages": [
            269,
            116,
            222,
            223,
            251,
            252
        ],
        "pageHasH1": true
    },
    {
        "id": 102,
        "pageName": "cricket-economy-rate-calculator",
        "h1": "Cricket Economy Rate Calculator – Calculate Bowling Economy Rate",
        "p": "Evaluate bowling performance with our Cricket Economy Rate Calculator.            Enter runs conceded and overs bowled to calculate economy rate — the            fundamental metric for assessing a bowler&apos;s ability to restrict run scoring.",
        "internalLinkPages": [
            103,
            36,
            171,
            191,
            452,
            502
        ],
        "pageHasH1": true
    },
    {
        "id": 103,
        "pageName": "cricket-strike-rate-calculator",
        "h1": "Cricket Strike Rate Calculator – Calculate Batting Strike Rate Instantly",
        "p": "Measure batting aggression with our Cricket Strike Rate Calculator.            Enter runs scored and balls faced to calculate strike rate — the key            metric for evaluating batting speed and scoring efficiency in T20,            ODI, and Test cricket.",
        "internalLinkPages": [
            102,
            36,
            171,
            191,
            452,
            502
        ],
        "pageHasH1": true
    },
    {
        "id": 104,
        "pageName": "crop-yield-estimator",
        "h1": "Crop Yield Estimator – Predict Your Farm's Harvest Before It Happens",
        "p": "Plan ahead with our Crop Yield Estimator. Input plant population, average weight per            unit, and field area to project your total harvest in kg, tons, or bushels per acre.            Useful for market planning, insurance, and farm management.",
        "internalLinkPages": [
            165,
            228,
            317,
            405,
            421,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 105,
        "pageName": "current-calculator",
        "h1": "Current Calculator – Calculate Electrical Current (Amps)",
        "p": "Calculate the current flowing through any circuit. Enter voltage and resistance to apply Ohm's Law and find current in amperes with our electrical current calculator.",
        "internalLinkPages": [
            296,
            363,
            143,
            477,
            6,
            144
        ],
        "pageHasH1": false
    },
    {
        "id": 106,
        "pageName": "curtain-length-calculator",
        "h1": "Curtain Length Calculator – Find the Perfect Curtain Size for Your Windows",
        "p": "Get perfectly sized curtains every time with our Curtain Length Calculator. Enter your            window height and width along with your preferred drop and fullness ratio to calculate            the exact fabric dimensions needed.",
        "internalLinkPages": [
            78,
            504,
            489,
            169,
            454,
            80
        ],
        "pageHasH1": true
    },
    {
        "id": 107,
        "pageName": "customer-acquisition-cost-calculator",
        "h1": "Customer Acquisition Cost (CAC) Calculator – Find Out How Much Each New Customer Costs",
        "p": "Keep your growth profitable by tracking your Customer Acquisition Cost.            Our CAC Calculator divides total sales and marketing spend by the number of            new customers acquired to give you a clear cost-per-customer metric.",
        "internalLinkPages": [
            108,
            178,
            100,
            291,
            242,
            377
        ],
        "pageHasH1": true
    },
    {
        "id": 108,
        "pageName": "customer-lifetime-value-calculator",
        "h1": "Customer Lifetime Value (CLV) Calculator – Measure Customer Worth",
        "p": "Calculate the total value a customer brings to your business with our Customer Lifetime Value Calculator. Essential for determining marketing budgets, customer acquisition costs, and business growth strategies.",
        "internalLinkPages": [
            107,
            178,
            100,
            291,
            242,
            377
        ],
        "pageHasH1": true
    },
    {
        "id": 109,
        "pageName": "cycling-calorie-calculator",
        "h1": "Cycling Calorie Calculator – Calories Burned Biking Calculator",
        "p": "Estimate how many calories you burn on your bike rides. Our cycling calorie calculator factors in your weight, speed, and ride duration for accurate energy expenditure results.",
        "internalLinkPages": [
            445,
            488,
            9,
            434,
            68,
            111
        ],
        "pageHasH1": false
    },
    {
        "id": 110,
        "pageName": "dac-resolution-calculator",
        "h1": "DAC Resolution Calculator – Calculate DAC Output Step Size",
        "p": "Calculate the resolution and output step size for a DAC based on bit depth and reference voltage.",
        "internalLinkPages": [
            10,
            35,
            115,
            344,
            353,
            373
        ],
        "pageHasH1": false
    },
    {
        "id": 111,
        "pageName": "daily-calorie-needs-calculator",
        "h1": "Daily Calorie Needs Calculator – How Many Calories Should You Eat?",
        "p": "Find out exactly how many calories you need each day with our daily calorie needs calculator. Personalized results based on your age, weight, height, and activity level.",
        "internalLinkPages": [
            68,
            9,
            434,
            109,
            445,
            488
        ],
        "pageHasH1": false
    },
    {
        "id": 112,
        "pageName": "daily-habit-streak-calculator",
        "h1": "Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks",
        "p": "Build lasting habits with our Daily Habit Streak Calculator.            Log your habit completions to track your current streak, longest streak,            and overall success rate — using positive reinforcement to keep you            consistent and motivated.",
        "internalLinkPages": [
            337,
            188,
            65,
            113,
            114,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 113,
        "pageName": "date-add-subtract-calculator",
        "h1": "Date Calculator – Add or Subtract Days, Weeks & Months from a Date",
        "p": "Find past or future dates instantly by adding or subtracting time from any date. Works with days, weeks, months, and years for deadlines, events, and planning.",
        "internalLinkPages": [
            114,
            13,
            18,
            65,
            497,
            368
        ],
        "pageHasH1": false
    },
    {
        "id": 114,
        "pageName": "date-difference-calculator",
        "h1": "Date Difference Calculator – Days Between Two Dates",
        "p": "Easily find the difference between any two dates. Our date difference calculator returns results in days, weeks, months, and years—perfect for planning and tracking.",
        "internalLinkPages": [
            113,
            13,
            18,
            65,
            497,
            368
        ],
        "pageHasH1": false
    },
    {
        "id": 115,
        "pageName": "db-calculator",
        "h1": "dB Calculator – Decibel to Ratio Converter for Audio and RF",
        "p": "Convert between decibels and linear ratios for power, voltage, and amplitude. Our dB calculator is essential for audio engineering, RF systems, and signal processing.",
        "internalLinkPages": [
            117,
            27,
            8,
            288,
            289,
            411
        ],
        "pageHasH1": false
    },
    {
        "id": 116,
        "pageName": "debt-to-income-ratio-calculator",
        "h1": "Debt-to-Income Ratio Calculator",
        "p": "Assess your borrowing capacity in seconds. Calculate the percentage of your gross monthly income consumed by debt payments to understand your financial health.",
        "internalLinkPages": [
            4,
            101,
            200,
            148,
            280,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 117,
        "pageName": "decibel-to-power-converter",
        "h1": "Decibel to Power Converter – Convert dB to Watts & Sound Pressure Level",
        "p": "Convert decibel levels to acoustic power and pressure measurements with our            dB to Power Converter. Enter dB value to calculate power ratio, sound intensity,            and SPL — essential for audio engineers, acousticians, and electronics designers.",
        "internalLinkPages": [
            115,
            27,
            8,
            288,
            289,
            411
        ],
        "pageHasH1": true
    },
    {
        "id": 118,
        "pageName": "decimal-to-fraction-calculator",
        "h1": "Decimal to Fraction Calculator",
        "p": "Convert a decimal to a simplified fraction",
        "internalLinkPages": [
            173,
            413,
            35,
            294,
            161,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 119,
        "pageName": "deep-sleep-cycle-planner",
        "h1": "Deep Sleep Planner – Optimize Your Sleep Schedule for Deep Rest",
        "p": "Maximize deep sleep for better recovery and brain health. Our deep sleep cycle planner helps you schedule bedtimes that align with natural sleep architecture for optimal rest.",
        "internalLinkPages": [
            416,
            417,
            418,
            31,
            217,
            267
        ],
        "pageHasH1": false
    },
    {
        "id": 120,
        "pageName": "depreciation-calculator",
        "h1": "Depreciation Calculator",
        "p": "Calculate how your asset's value decreases over time. Supports straight-line, declining balance, and sum-of-years-digits depreciation methods.",
        "internalLinkPages": [
            472,
            309,
            1,
            2,
            3,
            4
        ],
        "pageHasH1": true
    },
    {
        "id": 121,
        "pageName": "determinant-calculator",
        "h1": "Determinant Calculator",
        "p": "Calculate the determinant of a square matrix",
        "internalLinkPages": [
            264,
            265,
            224,
            247,
            346,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 122,
        "pageName": "dew-point-calculator",
        "h1": "Dew Point Calculator – Calculate Dew Point from Temperature & Humidity",
        "p": "Calculate the dew point temperature instantly with our free Dew Point Calculator. Enter air temperature and relative humidity to determine when condensation will form — useful for weather forecasting, HVAC, and agriculture.",
        "internalLinkPages": [
            214,
            15,
            205,
            503,
            218,
            285
        ],
        "pageHasH1": true
    },
    {
        "id": 123,
        "pageName": "diaper-usage-estimator",
        "h1": "Diaper Usage Estimator – Calculate Monthly Diaper Costs for Your Baby",
        "p": "Budget for baby with our Diaper Usage Estimator. Enter your baby&apos;s age            and diaper usage to calculate monthly usage and total diaper expenses —            helping new parents plan their budgets confidently.",
        "internalLinkPages": [
            29,
            30,
            83,
            457,
            318,
            31
        ],
        "pageHasH1": true
    },
    {
        "id": 124,
        "pageName": "dilution-calculator",
        "h1": "Dilution Calculator – C1V1 = C2V2 Solution Dilution Tool",
        "p": "Quickly calculate solution dilutions with our free dilution calculator. Using the C1V1 = C2V2 formula, find any unknown concentration or volume in seconds. Perfect for lab preparation, microbiology, and chemistry experiments.",
        "internalLinkPages": [
            95,
            275,
            274,
            276,
            277,
            312
        ],
        "pageHasH1": false
    },
    {
        "id": 125,
        "pageName": "dimensional-weight-calculator",
        "h1": "Dimensional Weight Calculator – Calculate DIM Weight for FedEx, UPS & DHL",
        "p": "Calculate the correct billed weight for your shipments with our Dimensional Weight Calculator.            Enter package dimensions and select your carrier to apply the correct DIM factor and determine            whether actual or dimensional weight applies.",
        "internalLinkPages": [
            98,
            484,
            305,
            77,
            490,
            237
        ],
        "pageHasH1": true
    },
    {
        "id": 126,
        "pageName": "discount-calculator",
        "h1": "Discount Calculator – Calculate Sale Price & Savings",
        "p": "Instantly find the sale price, amount saved, and percentage off for any discount. Perfect for shopping, pricing, and deal comparisons.",
        "internalLinkPages": [
            127,
            313,
            314,
            59,
            60,
            261
        ],
        "pageHasH1": false
    },
    {
        "id": 127,
        "pageName": "discount-stacking-calculator",
        "h1": "Discount Stacking Calculator – Calculate Final Price After Multiple Discounts",
        "p": "Apply multiple discounts and see your true savings with our Discount Stacking            Calculator. Whether it's a coupon plus a sale, or tiered pricing, instantly calculate            the final price after stacking all discounts.",
        "internalLinkPages": [
            126,
            313,
            314,
            59,
            60,
            261
        ],
        "pageHasH1": true
    },
    {
        "id": 128,
        "pageName": "distance-formula-calculator",
        "h1": "Distance Formula Calculator – Find Distance Between Two Points",
        "p": "Calculate the straight-line distance between any two points on a coordinate plane. Enter the x and y coordinates to get the distance and midpoint instantly.",
        "internalLinkPages": [
            345,
            419,
            247,
            1,
            2,
            3
        ],
        "pageHasH1": false
    },
    {
        "id": 129,
        "pageName": "dividend-payout-calculator",
        "h1": "Dividend Payout Calculator",
        "p": "Estimate your total dividend income from a stock holding. Enter shares held, dividend per share, and payout frequency to calculate your earnings.",
        "internalLinkPages": [
            130,
            134,
            435,
            436,
            367,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 130,
        "pageName": "dividend-reinvestment-calculator",
        "h1": "Dividend Reinvestment (DRIP) Calculator",
        "p": "Calculate how reinvesting dividends to buy more shares compounds your portfolio growth over time. See the power of DRIP on your long-term wealth.",
        "internalLinkPages": [
            129,
            134,
            435,
            436,
            367,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 131,
        "pageName": "division-calculator",
        "h1": "Division Calculator",
        "p": "Divide one number by another",
        "internalLinkPages": [
            11,
            286,
            444,
            313,
            28,
            500
        ],
        "pageHasH1": false
    },
    {
        "id": 132,
        "pageName": "dna-base-count-calculator",
        "h1": "DNA Base Count Calculator – Count Nucleotides and GC Content",
        "p": "Analyze any DNA sequence with our DNA base count calculator. Count adenine, thymine, guanine, and cytosine bases and calculate GC content percentage instantly. Useful for molecular biology, genetics, and bioinformatics students.",
        "internalLinkPages": [
            33,
            293,
            343,
            1,
            2,
            3
        ],
        "pageHasH1": false
    },
    {
        "id": 133,
        "pageName": "dog-calorie-calculator",
        "h1": "Dog Calorie Calculator – Find Out How Many Calories Your Dog Needs Per Day",
        "p": "Keep your dog healthy with our Dog Calorie Calculator. Enter your dog&apos;s            weight, age, and activity level to get the recommended daily calorie intake —            helping prevent obesity and underfeeding in dogs of all breeds.",
        "internalLinkPages": [
            79,
            45,
            210,
            248,
            318,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 134,
        "pageName": "dollar-cost-averaging-calculator",
        "h1": "Dollar-Cost Averaging (DCA) Calculator",
        "p": "Simulate investing a fixed amount at regular intervals over time. Calculate your average cost per unit, total invested, and final portfolio value with DCA.",
        "internalLinkPages": [
            129,
            130,
            256,
            414,
            415,
            433
        ],
        "pageHasH1": true
    },
    {
        "id": 135,
        "pageName": "door-frame-calculator",
        "h1": "Door Frame Calculator – Calculate Door Frame Dimensions & Material Quantities",
        "p": "Ensure a perfect door fit with our Door Frame Calculator. Enter your door size            and wall thickness to calculate the exact frame dimensions and material            quantities needed for a professional installation.",
        "internalLinkPages": [
            169,
            429,
            348,
            78,
            504,
            80
        ],
        "pageHasH1": true
    },
    {
        "id": 136,
        "pageName": "dopamine-detox-planner",
        "h1": "Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels",
        "p": "Reset your reward system with our Dopamine Detox Planner. Schedule activity            restrictions, set detox duration, and plan healthy low-stimulation alternatives            to break addictive cycles and restore your natural motivation and focus.",
        "internalLinkPages": [
            267,
            61,
            112,
            337,
            368,
            441
        ],
        "pageHasH1": true
    },
    {
        "id": 137,
        "pageName": "doppler-effect-calculator",
        "h1": "Doppler Effect Calculator – Calculate Frequency Shift",
        "p": "Calculate the observed frequency shift due to relative motion between source and observer. Works for both sound and light waves.",
        "internalLinkPages": [
            8,
            495,
            175,
            290,
            288,
            289
        ],
        "pageHasH1": false
    },
    {
        "id": 138,
        "pageName": "drone-flight-time-estimator",
        "h1": "Drone Flight Time Estimator – Calculate How Long Your Drone Can Fly",
        "p": "Plan your aerial shoots with our Drone Flight Time Estimator. Enter battery            capacity, drone weight, and flight style to estimate maximum flight time —            helping drone pilots manage battery usage for longer and safer flights.",
        "internalLinkPages": [
            37,
            39,
            38,
            82,
            157,
            351
        ],
        "pageHasH1": true
    },
    {
        "id": 139,
        "pageName": "drywall-area-calculator",
        "h1": "Drywall Calculator – Calculate How Many Drywall Sheets You Need",
        "p": "Take the guesswork out of drywall installation with our Drywall Area Calculator. Enter room dimensions and drywall sheet size to calculate the exact number of sheets needed, including a waste factor for cuts and openings.",
        "internalLinkPages": [
            78,
            169,
            304,
            325,
            454,
            80
        ],
        "pageHasH1": true
    },
    {
        "id": 140,
        "pageName": "duty-cycle-calculator",
        "h1": "Duty Cycle Calculator – Calculate PWM Duty Cycle",
        "p": "Calculate duty cycle, on-time, and off-time for PWM signals. Essential for motor control and power regulation.",
        "internalLinkPages": [
            344,
            175,
            353,
            373,
            374,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 141,
        "pageName": "dynamic-pricing-calculator",
        "h1": "Dynamic Pricing Calculator – Optimize Your Prices Based on Demand & Market Conditions",
        "p": "Maximize revenue with smart pricing using our Dynamic Pricing Calculator.            Input demand levels, inventory, and competitor prices to calculate optimal            price points in real time — perfect for e-commerce, hospitality, and ticketing businesses.",
        "internalLinkPages": [
            107,
            108,
            100,
            178,
            291,
            242
        ],
        "pageHasH1": true
    },
    {
        "id": 142,
        "pageName": "ebitda-calculator",
        "h1": "EBITDA Calculator",
        "p": "Calculate Earnings Before Interest, Taxes, Depreciation, and Amortization from net income or operating profit figures to assess core business performance.",
        "internalLinkPages": [
            287,
            298,
            338,
            99,
            485,
            378
        ],
        "pageHasH1": true
    },
    {
        "id": 143,
        "pageName": "electric-power-calculator",
        "h1": "Electric Power Calculator",
        "p": "Calculate electrical power using P = VI, P = I²R, or P = V²/R. Also calculate energy consumption over time.",
        "internalLinkPages": [
            296,
            363,
            105,
            477,
            6,
            144
        ],
        "pageHasH1": false
    },
    {
        "id": 144,
        "pageName": "electrical-load-calculator",
        "h1": "Electrical Load Calculator – Calculate Circuit Load",
        "p": "Calculate the total electrical load on a circuit. Enter voltage and connected loads to determine current, breaker size, and wire requirements.",
        "internalLinkPages": [
            143,
            296,
            363,
            105,
            477,
            381
        ],
        "pageHasH1": false
    },
    {
        "id": 145,
        "pageName": "electricity-appliance-wattage-calculator",
        "h1": "Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill",
        "p": "Find out exactly how much each appliance costs to run with our Electricity Appliance            Wattage Calculator. Enter wattage and daily usage hours to see kWh consumption and            monthly electricity cost — perfect for reducing your power bill.",
        "internalLinkPages": [
            144,
            296,
            381,
            143,
            363,
            225
        ],
        "pageHasH1": true
    },
    {
        "id": 146,
        "pageName": "electrochemical-cell-potential-calculator",
        "h1": "Electrochemical Cell Potential Calculator – Calculate EMF of Galvanic Cells",
        "p": "Find the standard cell potential (EMF) of galvanic or electrolytic cells using our electrochemical calculator. Enter reduction potentials for cathode and anode to get the cell voltage. Perfect for electrochemistry and physical chemistry students.",
        "internalLinkPages": [
            319,
            208,
            324,
            326,
            456,
            95
        ],
        "pageHasH1": false
    },
    {
        "id": 147,
        "pageName": "ellipse-area-calculator",
        "h1": "Ellipse Area Calculator",
        "p": "Calculate area and circumference of an ellipse",
        "internalLinkPages": [
            87,
            306,
            356,
            404,
            428,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 148,
        "pageName": "emergency-fund-calculator",
        "h1": "Emergency Fund Calculator",
        "p": "Find out how large your emergency fund should be. Enter your monthly expenses and desired months of coverage to get your recommended safety net target.",
        "internalLinkPages": [
            395,
            4,
            280,
            116,
            167,
            3
        ],
        "pageHasH1": true
    },
    {
        "id": 149,
        "pageName": "emi-breakup-visualizer",
        "h1": "EMI Breakup Visualizer",
        "p": "See exactly where each EMI goes. Get a month-by-month breakdown of principal vs. interest components with a clear chart of your loan payoff progression.",
        "internalLinkPages": [
            250,
            249,
            251,
            252,
            253,
            66
        ],
        "pageHasH1": true
    },
    {
        "id": 150,
        "pageName": "emi-for-home-loan-calculator",
        "h1": "Home Loan EMI Calculator – Calculate Monthly EMI and Interest",
        "p": "Calculate your monthly home loan EMI, total interest, and repayment schedule with our free home loan EMI calculator. Enter loan amount, interest rate, and tenure for instant results. Essential for home buyers comparing mortgage options.",
        "internalLinkPages": [
            250,
            249,
            251,
            252,
            253,
            66
        ],
        "pageHasH1": false
    },
    {
        "id": 151,
        "pageName": "empirical-formula-calculator",
        "h1": "Empirical Formula Calculator – Find Empirical Formula from Percent Composition",
        "p": "Find the empirical formula of any compound using our free empirical formula calculator. Enter percent composition or mass of each element to instantly get the simplest whole-number ratio. Great for general and organic chemistry students.",
        "internalLinkPages": [
            276,
            312,
            95,
            124,
            275,
            274
        ],
        "pageHasH1": false
    },
    {
        "id": 152,
        "pageName": "energy-calculator",
        "h1": "Energy Calculator",
        "p": "Calculate kinetic energy (KE = ½mv²) and gravitational potential energy (PE = mgh).",
        "internalLinkPages": [
            233,
            328,
            508,
            278,
            427,
            320
        ],
        "pageHasH1": false
    },
    {
        "id": 153,
        "pageName": "energy-consumption-breakdown-calculator",
        "h1": "Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used",
        "p": "Identify your biggest energy users with our Energy Consumption Breakdown Calculator.            Enter usage data for appliances, heating, cooling, and lighting to see a detailed            percentage breakdown of total energy consumption — helping you prioritize efficiency improvements.",
        "internalLinkPages": [
            144,
            145,
            89,
            76,
            422,
            423
        ],
        "pageHasH1": true
    },
    {
        "id": 154,
        "pageName": "engine-displacement-calculator",
        "h1": "Engine Displacement Calculator – Calculate CC & Liter Capacity from Bore & Stroke",
        "p": "Calculate your engine's total displacement in cc or liters using bore, stroke, and            cylinder count with our Engine Displacement Calculator. Ideal for mechanics, car            enthusiasts, and performance tuning.",
        "internalLinkPages": [
            149,
            150,
            151,
            152,
            153,
            155
        ],
        "pageHasH1": true
    },
    {
        "id": 155,
        "pageName": "entropy-calculator",
        "h1": "Entropy Calculator – Calculate Password & Data Entropy in Bits",
        "p": "Measure the true randomness and security of your passwords with our Entropy Calculator. Enter your password or data string to calculate entropy in bits — helping security professionals and developers assess cryptographic strength.",
        "internalLinkPages": [
            218,
            470,
            95,
            275,
            274,
            276
        ],
        "pageHasH1": true
    },
    {
        "id": 156,
        "pageName": "escape-velocity-calculator",
        "h1": "Escape Velocity Calculator – Calculate Escape Velocity",
        "p": "Calculate the escape velocity needed to break free from a celestial body's gravitational pull. Our calculator uses the formula ve = √(2GM/R).",
        "internalLinkPages": [
            196,
            299,
            197,
            7,
            474,
            233
        ],
        "pageHasH1": false
    },
    {
        "id": 157,
        "pageName": "ev-battery-capacity-estimator",
        "h1": "EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life",
        "p": "Estimate your EV&apos;s effective battery capacity after degradation with our            EV Battery Capacity Estimator. Understand how aging and usage patterns affect            your range and plan accordingly for long trips.",
        "internalLinkPages": [
            82,
            351,
            37,
            39,
            472,
            176
        ],
        "pageHasH1": true
    },
    {
        "id": 158,
        "pageName": "exam-correction-curve-calculator",
        "h1": "Exam Correction Curve Calculator – Apply Grade Curves to Exam Scores",
        "p": "Easily apply bell curve or flat curve adjustments to exam scores with our            Exam Correction Curve Calculator. Supports multiple curving methods including            flat point addition, square root curve, and proportional scaling for fair grade distribution.",
        "internalLinkPages": [
            159,
            194,
            81,
            192,
            193,
            26
        ],
        "pageHasH1": true
    },
    {
        "id": 159,
        "pageName": "exam-scoring-calculator",
        "h1": "Exam Scoring Calculator – Calculate Weighted Exam Scores & Final Grades",
        "p": "Calculate your final exam grade from multiple components like quizzes, midterms, and            finals with our Exam Scoring Calculator. Enter each component's score and weight to see            your weighted average and projected final grade.",
        "internalLinkPages": [
            158,
            194,
            81,
            192,
            193,
            26
        ],
        "pageHasH1": true
    },
    {
        "id": 160,
        "pageName": "exponent-calculator",
        "h1": "Exponent Calculator",
        "p": "Calculate base raised to a power (bⁿ)",
        "internalLinkPages": [
            19,
            254,
            382,
            399,
            161,
            35
        ],
        "pageHasH1": false
    },
    {
        "id": 161,
        "pageName": "expression-evaluator",
        "h1": "Expression Evaluator",
        "p": "Evaluate mathematical expressions",
        "internalLinkPages": [
            346,
            247,
            11,
            131,
            286,
            444
        ],
        "pageHasH1": false
    },
    {
        "id": 162,
        "pageName": "factorial-calculator",
        "h1": "Factorial Calculator",
        "p": "Calculate the factorial of a number (n!)",
        "internalLinkPages": [
            92,
            315,
            307,
            181,
            241,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 163,
        "pageName": "fastener-load-calculator",
        "h1": "Fastener Load Calculator – Calculate Fastener Capacity",
        "p": "Calculate the load capacity of fasteners including tensile and shear strength with safety factors.",
        "internalLinkPages": [
            392,
            40,
            439,
            54,
            372,
            43
        ],
        "pageHasH1": false
    },
    {
        "id": 164,
        "pageName": "fat-intake-calculator",
        "h1": "Fat Intake Calculator – How Much Fat Should You Eat Daily?",
        "p": "Calculate your daily fat requirements with our fat intake calculator. Get a breakdown of saturated and unsaturated fat targets based on your calorie needs and health goals.",
        "internalLinkPages": [
            75,
            257,
            231,
            339,
            340,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 165,
        "pageName": "fertilizer-requirement-calculator",
        "h1": "Fertilizer Requirement Calculator – Calculate NPK Fertilizer Dose Per Acre",
        "p": "Apply the right fertilizer at the right dose with our Fertilizer Requirement Calculator.            Based on your soil test results and crop's NPK requirements, get precise fertilizer            application rates to boost yield and reduce input costs.",
        "internalLinkPages": [
            104,
            228,
            317,
            405,
            421,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 166,
        "pageName": "fibonacci-generator",
        "h1": "Fibonacci Generator",
        "p": "Generate Fibonacci sequence up to n terms",
        "internalLinkPages": [
            24,
            185,
            307,
            162,
            92,
            315
        ],
        "pageHasH1": false
    },
    {
        "id": 167,
        "pageName": "fire-number-calculator",
        "h1": "FIRE Number Calculator – Financial Independence",
        "p": "Calculate your FIRE number—the net worth needed to retire early. Based on your annual expenses and safe withdrawal rate, find your path to financial independence.",
        "internalLinkPages": [
            3,
            364,
            365,
            366,
            388,
            395
        ],
        "pageHasH1": true
    },
    {
        "id": 168,
        "pageName": "fixed-deposit-interest-calculator",
        "h1": "Fixed Deposit (FD) Interest Calculator",
        "p": "Calculate the maturity amount and total interest earned on your fixed deposit. Enter principal, interest rate, tenure, and compounding frequency for precise results.",
        "internalLinkPages": [
            357,
            412,
            93,
            94,
            179,
            333
        ],
        "pageHasH1": true
    },
    {
        "id": 169,
        "pageName": "flooring-calculator",
        "h1": "Flooring Calculator – How Much Flooring Do You Need?",
        "p": "Get accurate flooring estimates for any room with our flooring calculator. Enter room dimensions and material size to calculate the total area and number of units needed.",
        "internalLinkPages": [
            78,
            454,
            80,
            304,
            325,
            489
        ],
        "pageHasH1": false
    },
    {
        "id": 170,
        "pageName": "focal-length-calculator",
        "h1": "Focal Length Calculator – Lensmaker's Equation",
        "p": "Calculate the focal length of a lens using the lensmaker's equation. Enter refractive index and radii of curvature.",
        "internalLinkPages": [
            20,
            70,
            245,
            316,
            229,
            62
        ],
        "pageHasH1": false
    },
    {
        "id": 171,
        "pageName": "football-goal-conversion-calculator",
        "h1": "Football Goal Conversion Rate Calculator – Measure Shooting Efficiency",
        "p": "Assess a striker&apos;s clinical finishing with our Football Goal Conversion Calculator.            Enter total goals scored and shots attempted to calculate goal conversion rate —            a vital metric for evaluating attacking effectiveness in football/soccer.",
        "internalLinkPages": [
            36,
            102,
            103,
            191,
            452,
            502
        ],
        "pageHasH1": true
    },
    {
        "id": 172,
        "pageName": "foundation-volume-calculator",
        "h1": "Foundation Volume Calculator – Calculate Concrete for Footings",
        "p": "Calculate the volume of concrete needed for foundation footings. Enter dimensions and number of footings.",
        "internalLinkPages": [
            97,
            96,
            64,
            281,
            394,
            25
        ],
        "pageHasH1": false
    },
    {
        "id": 173,
        "pageName": "fraction-to-decimal-calculator",
        "h1": "Fraction to Decimal Calculator",
        "p": "Convert a fraction to decimal",
        "internalLinkPages": [
            118,
            413,
            35,
            294,
            161,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 174,
        "pageName": "freelance-effective-hourly-rate-calculator",
        "h1": "Freelance Effective Hourly Rate Calculator",
        "p": "Know what you actually earn per hour. Calculate your real effective rate after non-billable hours, taxes, and business expenses are factored in.",
        "internalLinkPages": [
            393,
            212,
            200,
            338,
            261,
            263
        ],
        "pageHasH1": true
    },
    {
        "id": 175,
        "pageName": "frequency-calculator",
        "h1": "Frequency Calculator – Calculate Frequency from Period and More",
        "p": "Calculate signal frequency, period, and angular frequency with our frequency calculator. Covers Hz to period conversions and is useful for electronics, physics, and audio.",
        "internalLinkPages": [
            495,
            320,
            425,
            137,
            290,
            344
        ],
        "pageHasH1": false
    },
    {
        "id": 176,
        "pageName": "fuel-cost-calculator",
        "h1": "Fuel Cost Calculator – Estimate Your Trip Fuel Expenses Instantly",
        "p": "Use our free Fuel Cost Calculator to estimate how much you'll spend on fuel for any            trip. Enter your distance, vehicle fuel efficiency, and local fuel price to get an            instant cost breakdown. Perfect for road trips, daily commutes, and travel budgeting.",
        "internalLinkPages": [
            177,
            268,
            74,
            463,
            1,
            2
        ],
        "pageHasH1": true
    },
    {
        "id": 177,
        "pageName": "fuel-efficiency-comparison-calculator",
        "h1": "Fuel Efficiency Comparison Calculator – Compare Cars by MPG & Running Cost",
        "p": "Can&apos;t decide between two cars? Our Fuel Efficiency Comparison Calculator            lets you compare vehicles side-by-side based on fuel economy, annual mileage,            and fuel price. See which car truly costs less to run over time.",
        "internalLinkPages": [
            176,
            268,
            74,
            463,
            1,
            2
        ],
        "pageHasH1": true
    },
    {
        "id": 178,
        "pageName": "funnel-drop-off-calculator",
        "h1": "Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel",
        "p": "Pinpoint leaks in your sales pipeline with our Funnel Drop-off Calculator.            Enter the number of users at each funnel stage to calculate conversion and            drop-off rates — enabling targeted optimization for maximum revenue.",
        "internalLinkPages": [
            107,
            108,
            100,
            291,
            242,
            377
        ],
        "pageHasH1": true
    },
    {
        "id": 179,
        "pageName": "future-value-calculator",
        "h1": "Future Value Calculator",
        "p": "Project how much your savings or investment will grow over time. Enter the current amount, expected return rate, and time horizon to see your future wealth.",
        "internalLinkPages": [
            333,
            93,
            94,
            412,
            388,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 180,
        "pageName": "gacha-pull-probability-calculator",
        "h1": "Gacha Pull Probability Calculator – Calculate Your Odds in Gacha Games",
        "p": "Know your odds before you spend with our Gacha Pull Probability Calculator.            Enter the pull rate for your desired character or item and the number of            attempts to calculate the cumulative probability — essential for gacha game            players managing their budgets.",
        "internalLinkPages": [
            255,
            349,
            92,
            315,
            162,
            307
        ],
        "pageHasH1": true
    },
    {
        "id": 181,
        "pageName": "gcd-calculator",
        "h1": "GCD / HCF Calculator",
        "p": "Find the Greatest Common Divisor (Highest Common Factor)",
        "internalLinkPages": [
            241,
            336,
            335,
            162,
            92,
            315
        ],
        "pageHasH1": false
    },
    {
        "id": 182,
        "pageName": "gear-ratio-calculator",
        "h1": "Gear Ratio Calculator – Calculate Gear Train Ratio",
        "p": "Calculate gear ratios for single or multi-stage gear trains. Our calculator determines output speed and torque based on gear tooth counts.",
        "internalLinkPages": [
            183,
            184,
            385,
            43,
            42,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 183,
        "pageName": "gear-shifting-rpms-calculator",
        "h1": "Gear Shifting RPMs Calculator – Find the Perfect RPM to Shift Gears",
        "p": "Optimize your driving performance with our Gear Shifting RPMs Calculator.            Enter your vehicle&apos;s gear ratios, tire size, and redline to find the            ideal RPM for each gear change and improve fuel efficiency or performance.",
        "internalLinkPages": [
            182,
            184,
            385,
            458,
            43,
            376
        ],
        "pageHasH1": true
    },
    {
        "id": 184,
        "pageName": "gear-train-efficiency-calculator",
        "h1": "Gear Train Efficiency Calculator – Calculate Power Loss",
        "p": "Calculate the overall efficiency of a gear train. Enter gear pairs and their individual efficiencies.",
        "internalLinkPages": [
            182,
            183,
            385,
            458,
            43,
            341
        ],
        "pageHasH1": false
    },
    {
        "id": 185,
        "pageName": "geometric-sequence-calculator",
        "h1": "Geometric Sequence Calculator",
        "p": "Calculate nth term and sum of geometric sequence",
        "internalLinkPages": [
            24,
            166,
            28,
            500,
            350,
            430
        ],
        "pageHasH1": false
    },
    {
        "id": 186,
        "pageName": "glycemic-index-calculator",
        "h1": "Glycemic Index Calculator – Find the GI of Any Food",
        "p": "Manage blood sugar and energy levels with our glycemic index tool. Look up GI values for common foods to make smarter dietary choices for diabetes management or performance.",
        "internalLinkPages": [
            187,
            75,
            164,
            231,
            257,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 187,
        "pageName": "glycemic-load-calculator",
        "h1": "Glycemic Load Calculator – Calculate GL of Foods and Meals",
        "p": "Understand the real impact of carbohydrates on your blood sugar. Our glycemic load calculator factors in both the GI and the amount of carbs to give you a true measure of glycemic impact.",
        "internalLinkPages": [
            186,
            75,
            164,
            231,
            257,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 188,
        "pageName": "goal-tracker-calculator",
        "h1": "Goal Tracker Calculator – Track Your Progress Toward Any Goal",
        "p": "Stay on track to achieve your goals with our Goal Tracker Calculator.            Enter your starting point, current progress, and target to see your completion            percentage and projected finish date — perfect for fitness, financial, and            personal development goals.",
        "internalLinkPages": [
            112,
            337,
            368,
            441,
            440,
            136
        ],
        "pageHasH1": true
    },
    {
        "id": 189,
        "pageName": "golden-ratio-calculator",
        "h1": "Golden Ratio Calculator",
        "p": "Calculate proportions using the golden ratio (φ ≈ 1.618)",
        "internalLinkPages": [
            190,
            199,
            246,
            465,
            72,
            316
        ],
        "pageHasH1": false
    },
    {
        "id": 190,
        "pageName": "golden-ratio-layout-generator",
        "h1": "Golden Ratio Layout Generator – Design Perfectly Proportioned Layouts",
        "p": "Create visually harmonious designs with our Golden Ratio Layout Generator.            Enter your canvas dimensions to generate golden ratio subdivisions, rectangles,            and spiral guides — the mathematical foundation of beautiful graphic design            and architecture.",
        "internalLinkPages": [
            189,
            199,
            246,
            465,
            72,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 191,
        "pageName": "golf-handicap-calculator",
        "h1": "Golf Handicap Calculator – Calculate Your Official Golf Handicap Index",
        "p": "Find your official golf handicap with our Golf Handicap Calculator.            Enter your recent round scores and course ratings to calculate your            handicap index using the World Handicap System (WHS) formula —            enabling fair competition with players of all abilities.",
        "internalLinkPages": [
            36,
            102,
            103,
            452,
            171,
            502
        ],
        "pageHasH1": true
    },
    {
        "id": 192,
        "pageName": "gpa-calculator",
        "h1": "GPA Calculator – Calculate Your Grade Point Average Instantly",
        "p": "Calculate your current GPA quickly and accurately with our free GPA Calculator. Enter            your grades and credit hours for each course to get your semester or cumulative GPA on            a 4.0 scale. Perfect for students planning for scholarships and graduate school.",
        "internalLinkPages": [
            193,
            81,
            194,
            26,
            158,
            159
        ],
        "pageHasH1": true
    },
    {
        "id": 193,
        "pageName": "gpa-weight-distribution-calculator",
        "h1": "GPA Weight Distribution Calculator – See How Each Course Impacts Your GPA",
        "p": "Understand how each course affects your GPA with our GPA Weight Distribution Calculator. Enter course grades and credit hours to see the weighted contribution of each subject to your overall GPA — great for strategic academic planning.",
        "internalLinkPages": [
            192,
            81,
            194,
            26,
            158,
            159
        ],
        "pageHasH1": true
    },
    {
        "id": 194,
        "pageName": "grade-percentage-calculator",
        "h1": "Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade",
        "p": "Instantly convert your exam or assignment marks to a percentage grade with our Grade Percentage Calculator. Enter your score and the maximum marks to get your grade percentage, letter grade, and GPA equivalent.",
        "internalLinkPages": [
            81,
            192,
            193,
            26,
            158,
            159
        ],
        "pageHasH1": false
    },
    {
        "id": 195,
        "pageName": "gravel-quantity-calculator",
        "h1": "Gravel Quantity Calculator – Calculate Gravel Needed for Driveways & Landscaping",
        "p": "Estimate the exact amount of gravel for your project with our Gravel Quantity Calculator.            Enter area dimensions and desired depth to get volume in cubic yards or meters and weight            in tons — perfect for driveways, garden paths, and construction bases.",
        "internalLinkPages": [
            394,
            25,
            64,
            96,
            97,
            281
        ],
        "pageHasH1": true
    },
    {
        "id": 196,
        "pageName": "gravitational-field-calculator",
        "h1": "Gravitational Field Calculator – Calculate Gravitational Field Strength",
        "p": "Calculate the gravitational field strength at a distance from a mass. Our calculator uses g = GM/r² for point masses and spherical bodies.",
        "internalLinkPages": [
            197,
            156,
            299,
            7,
            278,
            474
        ],
        "pageHasH1": false
    },
    {
        "id": 197,
        "pageName": "gravitational-force-calculator",
        "h1": "Gravitational Force Calculator – Newton's Law of Gravitation",
        "p": "Calculate the gravitational force between two objects using Newton's universal law of gravitation. Enter mass and distance values to compute gravitational attraction.",
        "internalLinkPages": [
            196,
            156,
            299,
            278,
            233,
            474
        ],
        "pageHasH1": false
    },
    {
        "id": 198,
        "pageName": "greenhouse-ventilation-calculator",
        "h1": "Greenhouse Ventilation Calculator – Calculate Fan Size & Airflow for Your Greenhouse",
        "p": "Maintain ideal growing conditions with our Greenhouse Ventilation Calculator. Enter            your greenhouse dimensions, plant density, and target temperature to calculate the            required air exchange rate and recommended fan capacity.",
        "internalLinkPages": [
            475,
            215,
            216,
            220,
            14,
            84
        ],
        "pageHasH1": true
    },
    {
        "id": 199,
        "pageName": "grid-layout-calculator",
        "h1": "Grid Layout Calculator – Calculate Column Widths, Gutters & Margins for Web Design",
        "p": "Build perfect grid layouts with our Grid Layout Calculator.            Enter your container width, number of columns, and gutter size to calculate            precise column widths and margins — essential for responsive web design and print layout.",
        "internalLinkPages": [
            189,
            190,
            246,
            465,
            72,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 200,
        "pageName": "gross-vs-net-income-calculator",
        "h1": "Gross vs Net Income Calculator",
        "p": "Convert your gross income to take-home pay. Subtract taxes, deductions, and contributions with an itemized breakdown to see your actual net income.",
        "internalLinkPages": [
            212,
            393,
            174,
            116,
            4,
            280
        ],
        "pageHasH1": true
    },
    {
        "id": 201,
        "pageName": "hash-brute-force-time-estimator",
        "h1": "Hash Brute-Force Time Estimator – How Long to Crack a Password Hash?",
        "p": "Understand the real-world risk of hash cracking with our Brute-Force Time Estimator.            Enter the hash algorithm, password length, and character set to estimate how long            it would take to crack the hash by brute force.",
        "internalLinkPages": [
            12,
            386,
            308,
            35,
            115,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 202,
        "pageName": "head-loss-darcy-weisbach-calculator",
        "h1": "Head Loss (Darcy-Weisbach) Calculator – Pipe Friction Loss",
        "p": "Calculate head loss due to friction in pipes using the Darcy-Weisbach equation. Essential for pipe system design and pump sizing.",
        "internalLinkPages": [
            258,
            321,
            322,
            236,
            492,
            323
        ],
        "pageHasH1": false
    },
    {
        "id": 203,
        "pageName": "heart-rate-recovery-calculator",
        "h1": "Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness",
        "p": "Heart rate recovery is a key fitness metric. Enter your peak and post-exercise heart rate to calculate HRR and gauge your cardiovascular health and recovery efficiency.",
        "internalLinkPages": [
            204,
            476,
            235,
            389,
            260,
            302
        ],
        "pageHasH1": false
    },
    {
        "id": 204,
        "pageName": "heart-rate-zones-calculator",
        "h1": "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones",
        "p": "Train smarter with our heart rate zones calculator. Discover your five heart rate training zones to optimize fat burn, aerobic fitness, and peak performance.",
        "internalLinkPages": [
            203,
            476,
            235,
            389,
            260,
            302
        ],
        "pageHasH1": false
    },
    {
        "id": 205,
        "pageName": "heat-index-calculator",
        "h1": "Heat Index Calculator – Calculate the 'Feels Like' Temperature",
        "p": "Know how hot it really feels outside with our Heat Index Calculator. Combine air temperature and humidity to calculate the apparent temperature — helping you prepare for heat-related risks during summer and outdoor activities.",
        "internalLinkPages": [
            122,
            214,
            503,
            15,
            285,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 206,
        "pageName": "heat-pump-cop-calculator",
        "h1": "Heat Pump COP Calculator – Coefficient of Performance",
        "p": "Calculate the Coefficient of Performance (COP) for heat pumps and compare to Carnot efficiency.",
        "internalLinkPages": [
            53,
            14,
            216,
            215,
            84,
            207
        ],
        "pageHasH1": false
    },
    {
        "id": 207,
        "pageName": "heat-transfer-calculator",
        "h1": "Heat Transfer Calculator – Conduction, Convection & Radiation",
        "p": "Analyze thermal performance with our heat transfer calculator. Compute heat flow rates for conduction, convection, and radiation in HVAC, manufacturing, and engineering design.",
        "internalLinkPages": [
            206,
            53,
            453,
            218,
            14,
            216
        ],
        "pageHasH1": false
    },
    {
        "id": 208,
        "pageName": "henderson-hasselbalch-calculator",
        "h1": "Henderson-Hasselbalch Calculator – Buffer pH Made Easy",
        "p": "Calculate the pH of buffer solutions using the Henderson-Hasselbalch equation. Enter pKa, acid concentration, and conjugate base concentration to get precise buffer pH values. Ideal for biochemistry, pharmacology, and analytical chemistry.",
        "internalLinkPages": [
            319,
            324,
            326,
            146,
            456,
            95
        ],
        "pageHasH1": false
    },
    {
        "id": 209,
        "pageName": "hiking-pace-calculator",
        "h1": "Hiking Pace Calculator – Estimate Trail Time with Naismith's Rule",
        "p": "Plan your hike with confidence using our Hiking Pace Calculator. Enter trail distance, elevation gain, and your fitness level to estimate total hiking time using Naismith's Rule — helping you plan water, food, and daylight requirements accurately.",
        "internalLinkPages": [
            460,
            389,
            302,
            426,
            32,
            71
        ],
        "pageHasH1": true
    },
    {
        "id": 210,
        "pageName": "horse-feed-calculator",
        "h1": "Horse Feed Calculator – Calculate Daily Feed Requirements for Your Horse",
        "p": "Fuel your horse's performance and health with our Horse Feed Calculator. Enter body weight, workload level, and life stage to calculate daily forage (hay) and concentrate requirements — based on equine nutrition guidelines.",
        "internalLinkPages": [
            248,
            133,
            79,
            45,
            318,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 211,
        "pageName": "horsepower-to-kw-converter",
        "h1": "Horsepower to kW Converter – Instantly Convert HP to Kilowatts",
        "p": "Convert engine power between horsepower and kilowatts instantly with our free HP to kW            Converter. Whether you're comparing cars or working with technical specs, get accurate            conversions in seconds.",
        "internalLinkPages": [
            342,
            459,
            458,
            376,
            408,
            385
        ],
        "pageHasH1": true
    },
    {
        "id": 212,
        "pageName": "hourly-wage-to-salary-calculator",
        "h1": "Hourly Wage to Annual Salary Calculator",
        "p": "Convert any hourly pay rate to an annual, monthly, or weekly salary equivalent. Based on your hours worked per week for a fast, accurate comparison.",
        "internalLinkPages": [
            393,
            174,
            200,
            116,
            4,
            280
        ],
        "pageHasH1": true
    },
    {
        "id": 213,
        "pageName": "housing-affordability-calculator",
        "h1": "Housing Affordability Calculator",
        "p": "Find out how much home you can afford. Based on your income, existing debts, down payment, and standard lending ratios to give you a realistic price range.",
        "internalLinkPages": [
            67,
            283,
            282,
            360,
            361,
            362
        ],
        "pageHasH1": true
    },
    {
        "id": 214,
        "pageName": "humidity-calculator",
        "h1": "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity",
        "p": "Calculate various humidity measurements with our comprehensive Humidity Calculator. Enter temperature and dew point to determine relative humidity, absolute humidity, specific humidity, and vapor pressure — essential for meteorology, HVAC, and environmental monitoring.",
        "internalLinkPages": [
            122,
            15,
            205,
            503,
            218,
            285
        ],
        "pageHasH1": true
    },
    {
        "id": 215,
        "pageName": "hvac-airflow-calculator",
        "h1": "HVAC Airflow Calculator – Calculate Required CFM",
        "p": "Calculate the required airflow for HVAC systems based on room volume and air changes per hour (ACH).",
        "internalLinkPages": [
            216,
            14,
            84,
            206,
            53,
            475
        ],
        "pageHasH1": false
    },
    {
        "id": 216,
        "pageName": "hvac-btu-calculator",
        "h1": "HVAC BTU Calculator – What Size Air Conditioner Do You Need?",
        "p": "Choose the right HVAC unit with our BTU calculator. Enter room size, insulation, and climate to determine the required heating or cooling capacity in BTUs per hour.",
        "internalLinkPages": [
            215,
            14,
            84,
            206,
            53,
            475
        ],
        "pageHasH1": false
    },
    {
        "id": 217,
        "pageName": "ideal-bedtime-calculator",
        "h1": "Ideal Bedtime Calculator – What Time Should You Go to Sleep?",
        "p": "Struggling with morning grogginess? Our bedtime calculator tells you exactly when to go to sleep so you wake up feeling rested and refreshed every day.",
        "internalLinkPages": [
            416,
            417,
            418,
            119,
            31,
            267
        ],
        "pageHasH1": false
    },
    {
        "id": 218,
        "pageName": "ideal-gas-law-calculator",
        "h1": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
        "p": "Apply the ideal gas law PV = nRT to find any unknown gas property. Our calculator solves for pressure, volume, temperature, or amount of gas in chemistry and physics.",
        "internalLinkPages": [
            15,
            214,
            470,
            207,
            453,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 219,
        "pageName": "ideal-weight-calculator",
        "h1": "Ideal Weight Calculator – What Is Your Ideal Body Weight?",
        "p": "Discover your ideal weight range with our free calculator. Based on your height and gender, we apply multiple scientific formulas to give you a healthy target weight.",
        "internalLinkPages": [
            48,
            49,
            51,
            52,
            243,
            486
        ],
        "pageHasH1": false
    },
    {
        "id": 220,
        "pageName": "indoor-co-level-estimator",
        "h1": "Indoor CO₂ Level Estimator – Calculate CO₂ Concentration in Any Room",
        "p": "Ensure healthy indoor air quality with our CO₂ Level Estimator. Enter room            dimensions, occupancy, and ventilation rate to estimate indoor CO₂            concentration in ppm — helping building managers and homeowners maintain            safe and productive environments.",
        "internalLinkPages": [
            475,
            215,
            216,
            198,
            1,
            2
        ],
        "pageHasH1": true
    },
    {
        "id": 221,
        "pageName": "inductor-calculations",
        "h1": "Inductor Calculator – Inductance and Inductive Reactance Calculator",
        "p": "Analyze inductor behavior in circuits with our inductor calculator. Compute inductance, inductive reactance (XL), and impedance for AC circuit design and electronics.",
        "internalLinkPages": [
            6,
            296,
            353,
            373,
            374,
            406
        ],
        "pageHasH1": false
    },
    {
        "id": 222,
        "pageName": "interest-rate-finder-calculator",
        "h1": "Interest Rate Finder Calculator",
        "p": "Don&apos;t know your loan&apos;s interest rate? Reverse-calculate the implied annual rate from your known principal, monthly payment, and loan tenure.",
        "internalLinkPages": [
            223,
            101,
            116,
            251,
            252,
            253
        ],
        "pageHasH1": true
    },
    {
        "id": 223,
        "pageName": "interest-vs-principal-split-calculator",
        "h1": "Interest vs Principal Split Calculator",
        "p": "For any payment number in your loan, instantly see how much goes toward interest and how much reduces your principal. Understand your loan repayment in depth.",
        "internalLinkPages": [
            222,
            101,
            116,
            251,
            252,
            253
        ],
        "pageHasH1": true
    },
    {
        "id": 224,
        "pageName": "inverse-matrix-calculator",
        "h1": "Inverse Matrix Calculator",
        "p": "Calculate the inverse of a 2x2 or 3x3 matrix",
        "internalLinkPages": [
            121,
            264,
            265,
            247,
            346,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 225,
        "pageName": "inverter-capacity-calculator",
        "h1": "Inverter Capacity Calculator – Size Your Inverter",
        "p": "Calculate the required inverter capacity for your electrical loads. Enter your devices and their power consumption to determine the right inverter size.",
        "internalLinkPages": [
            144,
            37,
            39,
            38,
            143,
            467
        ],
        "pageHasH1": false
    },
    {
        "id": 226,
        "pageName": "investment-return-rate-calculator",
        "h1": "Investment Return Rate Calculator",
        "p": "Work backwards from your goal. Calculate the annualized return rate needed to grow your investment from a starting value to a target amount over a set period.",
        "internalLinkPages": [
            179,
            93,
            94,
            412,
            388,
            378
        ],
        "pageHasH1": true
    },
    {
        "id": 227,
        "pageName": "irr-calculator",
        "h1": "IRR Calculator – Internal Rate of Return",
        "p": "Find the effective annualized yield of any investment. Calculate the Internal Rate of Return from a series of cash flows to compare investment opportunities.",
        "internalLinkPages": [
            292,
            309,
            378,
            99,
            485,
            142
        ],
        "pageHasH1": true
    },
    {
        "id": 228,
        "pageName": "irrigation-water-calculator",
        "h1": "Irrigation Water Calculator – Calculate Water Needed for Crop Irrigation",
        "p": "Optimize water usage on your farm with our Irrigation Water Calculator. Enter crop            type, field size, soil type, and evapotranspiration rate to calculate the precise water            volume needed for efficient irrigation.",
        "internalLinkPages": [
            104,
            165,
            317,
            405,
            421,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 229,
        "pageName": "iso-noise-predictor",
        "h1": "ISO Noise Predictor – Estimate Image Noise Level for Any Camera ISO Setting",
        "p": "Avoid grainy photos by knowing your camera's ISO limits with our ISO Noise Predictor. Enter your camera model's sensor size and ISO value to predict the expected noise level — helping photographers choose the best ISO for any lighting condition.",
        "internalLinkPages": [
            20,
            70,
            410,
            170,
            245,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 230,
        "pageName": "k-d-ratio-calculator",
        "h1": "K/D Ratio Calculator – Calculate Your Kill/Death Ratio in Any Game",
        "p": "Track your combat performance with our K/D Ratio Calculator.            Enter your total kills and deaths to instantly calculate your Kill/Death ratio —            the most popular metric for measuring skill in FPS and battle royale games.",
        "internalLinkPages": [
            36,
            502,
            452,
            102,
            103,
            171
        ],
        "pageHasH1": true
    },
    {
        "id": 231,
        "pageName": "ketogenic-macro-calculator",
        "h1": "Keto Macro Calculator – Perfect Macros for a Ketogenic Diet",
        "p": "Start your keto journey the right way. Our ketogenic macro calculator gives you personalized fat, protein, and carb targets to keep your body in ketosis and burning fat.",
        "internalLinkPages": [
            257,
            75,
            164,
            339,
            340,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 232,
        "pageName": "kidney-function-egfr-calculator",
        "h1": "Kidney Function eGFR Calculator – Free CKD-EPI Calculator",
        "p": "Calculate your estimated Glomerular Filtration Rate (eGFR) using the CKD-EPI formula. Enter serum creatinine, age, gender, and race to assess kidney function and determine CKD stage.",
        "internalLinkPages": [
            85,
            47,
            48,
            51,
            52,
            219
        ],
        "pageHasH1": false
    },
    {
        "id": 233,
        "pageName": "kinetic-energy-calculator",
        "h1": "Kinetic Energy Calculator – Calculate Energy of Motion",
        "p": "Calculate kinetic energy from mass and velocity. Includes classical and relativistic calculations for high-speed objects. Perfect for physics students and engineers.",
        "internalLinkPages": [
            278,
            152,
            328,
            427,
            7,
            474
        ],
        "pageHasH1": false
    },
    {
        "id": 234,
        "pageName": "kitchen-measurement-converter",
        "h1": "Kitchen Measurement Converter – Convert Cooking Units Instantly",
        "p": "Never mess up a recipe conversion again with our Kitchen Measurement Converter.            Convert between cups, tablespoons, teaspoons, milliliters, and more — supporting            both US and metric cooking systems.",
        "internalLinkPages": [
            229,
            230,
            231,
            232,
            233,
            235
        ],
        "pageHasH1": true
    },
    {
        "id": 235,
        "pageName": "lactate-threshold-calculator",
        "h1": "Lactate Threshold Calculator – Find Your Anaerobic Threshold",
        "p": "Train at the right intensity with our lactate threshold calculator. Estimate your threshold heart rate and pace to improve endurance performance and training zone accuracy.",
        "internalLinkPages": [
            203,
            204,
            476,
            389,
            260,
            302
        ],
        "pageHasH1": false
    },
    {
        "id": 236,
        "pageName": "laminar-turbulent-flow-calculator",
        "h1": "Laminar/Turbulent Flow Calculator – Flow Regime Calculator",
        "p": "Determine if fluid flow is laminar or turbulent based on Reynolds number. Enter flow parameters to analyze flow regime.",
        "internalLinkPages": [
            321,
            322,
            202,
            258,
            492,
            323
        ],
        "pageHasH1": false
    },
    {
        "id": 237,
        "pageName": "land-area-converter",
        "h1": "Land Area Converter – Convert Acres, Hectares, Sq Ft, and Bigha",
        "p": "Convert land area between acres, hectares, square meters, square feet, bigha, and other units with our free land area converter. Perfect for real estate buyers, sellers, farmers, and property developers needing accurate area conversions.",
        "internalLinkPages": [
            259,
            1,
            2,
            3,
            4,
            5
        ],
        "pageHasH1": false
    },
    {
        "id": 238,
        "pageName": "laundry-detergent-calculator",
        "h1": "Laundry Detergent Calculator – How Much Detergent Should You Use Per Wash?",
        "p": "Stop guessing and start using the right amount of laundry detergent with our            Laundry Detergent Calculator. Based on your load size, machine type, and water            hardness, get the perfect detergent dose every time to save money and protect your clothes.",
        "internalLinkPages": [
            88,
            409,
            1,
            2,
            3,
            4
        ],
        "pageHasH1": true
    },
    {
        "id": 239,
        "pageName": "law-of-cosines-calculator",
        "h1": "Law of Cosines Calculator",
        "p": "Solve triangles using c² = a² + b² - 2ab·cos(C)",
        "internalLinkPages": [
            240,
            345,
            128,
            462,
            306,
            369
        ],
        "pageHasH1": false
    },
    {
        "id": 240,
        "pageName": "law-of-sines-calculator",
        "h1": "Law of Sines Calculator",
        "p": "Solve triangles using a/sin(A) = b/sin(B)",
        "internalLinkPages": [
            239,
            345,
            128,
            462,
            306,
            369
        ],
        "pageHasH1": false
    },
    {
        "id": 241,
        "pageName": "lcm-calculator",
        "h1": "LCM Calculator – Find Least Common Multiple Online",
        "p": "Find the Least Common Multiple",
        "internalLinkPages": [
            181,
            336,
            335,
            162,
            92,
            315
        ],
        "pageHasH1": false
    },
    {
        "id": 242,
        "pageName": "lead-conversion-calculator",
        "h1": "Lead Conversion Calculator – Calculate Your Sales Conversion Rate & Cost Per Lead",
        "p": "Understand how well your marketing funnel is performing with our Lead Conversion Calculator.            Enter total leads, conversions, and marketing spend to calculate your conversion rate            and cost per lead — key metrics for optimizing sales and marketing performance.",
        "internalLinkPages": [
            107,
            108,
            178,
            100,
            291,
            377
        ],
        "pageHasH1": true
    },
    {
        "id": 243,
        "pageName": "lean-body-mass-calculator",
        "h1": "Lean Body Mass Calculator – Find Your Fat-Free Mass Instantly",
        "p": "Determine your lean body mass with our simple calculator. Enter your total weight and body fat percentage to get your fat-free mass—a key metric for fitness and nutrition planning.",
        "internalLinkPages": [
            48,
            49,
            51,
            52,
            219,
            486
        ],
        "pageHasH1": false
    },
    {
        "id": 244,
        "pageName": "led-resistor-calculator",
        "h1": "LED Resistor Calculator – Calculate Current Limiting Resistor",
        "p": "Calculate the correct resistor value for your LED circuit. Enter supply voltage, LED forward voltage and current to get the required resistance and power rating.",
        "internalLinkPages": [
            296,
            363,
            407,
            406,
            221,
            353
        ],
        "pageHasH1": false
    },
    {
        "id": 245,
        "pageName": "lens-equation-calculator",
        "h1": "Lens Equation Calculator – Thin Lens Formula Calculator",
        "p": "Calculate focal length, object distance, or image distance using the thin lens equation. Our calculator also determines magnification.",
        "internalLinkPages": [
            170,
            20,
            70,
            62,
            358,
            316
        ],
        "pageHasH1": false
    },
    {
        "id": 246,
        "pageName": "line-height-calculator",
        "h1": "Line-Height Calculator – Find the Optimal Line Spacing for Your Typography",
        "p": "Improve readability with perfectly calculated line spacing using our Line-Height Calculator.            Enter your font size and column width to get recommended line-height values in px, em,            or unitless — following best practices for body text and headings.",
        "internalLinkPages": [
            465,
            189,
            190,
            199,
            72,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 247,
        "pageName": "linear-equation-solver",
        "h1": "Linear Equation Solver – Solve ax + b = 0",
        "p": "Solve equations in the form: ax + b = 0",
        "internalLinkPages": [
            346,
            121,
            264,
            265,
            224,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 248,
        "pageName": "livestock-feed-calculator",
        "h1": "Livestock Feed Calculator – Calculate Daily Feed Requirements for Farm Animals",
        "p": "Ensure your animals get proper nutrition with our Livestock Feed Calculator. Enter            animal type, live weight, and production stage (growth, lactation, etc.) to calculate            optimal daily feed quantities and reduce feed wastage on your farm.",
        "internalLinkPages": [
            210,
            133,
            79,
            45,
            318,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 249,
        "pageName": "loan-amortization-visualizer",
        "h1": "Loan Amortization Visualizer",
        "p": "See your entire loan journey at a glance. An interactive visual chart shows your loan balance declining over time alongside cumulative principal and interest paid.",
        "internalLinkPages": [
            282,
            250,
            251,
            252,
            253,
            66
        ],
        "pageHasH1": true
    },
    {
        "id": 250,
        "pageName": "loan-emi-calculator",
        "h1": "Loan EMI Calculator – Calculate Monthly Loan Payments",
        "p": "Calculate your fixed monthly loan installment (EMI) in seconds. Enter the loan amount, interest rate, and tenure to see your monthly payment.",
        "internalLinkPages": [
            249,
            66,
            251,
            252,
            253,
            282
        ],
        "pageHasH1": false
    },
    {
        "id": 251,
        "pageName": "loan-payoff-time-calculator",
        "h1": "Loan Payoff Time Calculator",
        "p": "Find out exactly how long it will take to become debt-free. Enter your loan balance, interest rate, and fixed monthly payment to see your payoff timeline.",
        "internalLinkPages": [
            250,
            249,
            252,
            253,
            66,
            282
        ],
        "pageHasH1": true
    },
    {
        "id": 252,
        "pageName": "loan-prepayment-impact-calculator",
        "h1": "Loan Prepayment Impact Calculator",
        "p": "See the benefit of paying extra on your loan. Calculate the reduction in tenure and total interest saved by making a one-time or recurring prepayment.",
        "internalLinkPages": [
            250,
            249,
            251,
            253,
            66,
            282
        ],
        "pageHasH1": true
    },
    {
        "id": 253,
        "pageName": "loan-refinancing-calculator",
        "h1": "Loan Refinancing Calculator",
        "p": "Compare your current loan against a refinanced offer. See monthly savings, total interest savings, and the break-even period to decide if refinancing makes sense.",
        "internalLinkPages": [
            250,
            249,
            251,
            252,
            66,
            282
        ],
        "pageHasH1": true
    },
    {
        "id": 254,
        "pageName": "logarithm-calculator",
        "h1": "Logarithm Calculator",
        "p": "Calculate logarithms with different bases",
        "internalLinkPages": [
            19,
            160,
            382,
            399,
            161,
            35
        ],
        "pageHasH1": false
    },
    {
        "id": 255,
        "pageName": "loot-probability-calculator",
        "h1": "Loot Drop Probability Calculator – Calculate Your Chances of Getting Rare Items",
        "p": "Find out your real chances of getting that rare drop with our Loot Probability Calculator. Enter the item's drop rate and your number of attempts to calculate the probability of obtaining it — perfect for planning farming sessions in MMOs and ARPGs.",
        "internalLinkPages": [
            180,
            349,
            92,
            315,
            162,
            307
        ],
        "pageHasH1": true
    },
    {
        "id": 256,
        "pageName": "lump-sum-vs-sip-analyzer",
        "h1": "Lump Sum vs SIP Analyzer",
        "p": "Compare investing all at once versus spreading it out monthly. Analyze the final corpus from a lump sum investment versus an equivalent total via monthly SIP.",
        "internalLinkPages": [
            134,
            414,
            415,
            433,
            179,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 257,
        "pageName": "macro-calculator",
        "h1": "Macro Calculator – Calculate Your Daily Macros for Any Goal",
        "p": "Dial in your nutrition with our macro calculator. Get personalized daily protein, carb, and fat targets tailored to your body, calories, and whether you want to cut, bulk, or maintain.",
        "internalLinkPages": [
            231,
            75,
            164,
            339,
            340,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 258,
        "pageName": "manning-equation-calculator",
        "h1": "Manning Equation Calculator – Open Channel Flow",
        "p": "Calculate flow velocity and discharge in open channels using the Manning equation. Used for rivers, canals, and stormwater systems.",
        "internalLinkPages": [
            202,
            236,
            321,
            322,
            492,
            323
        ],
        "pageHasH1": false
    },
    {
        "id": 259,
        "pageName": "map-scale-calculator",
        "h1": "Map Scale Calculator – Convert Map Distances to Real-World Measurements",
        "p": "Navigate any map accurately with our Map Scale Calculator. Enter a map            measurement and scale ratio to instantly calculate the actual real-world            distance — useful for hiking, urban planning, and geography education.",
        "internalLinkPages": [
            237,
            463,
            268,
            176,
            177,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 260,
        "pageName": "marathon-pace-calculator",
        "h1": "Marathon Pace Calculator – Calculate Your Target Running Pace",
        "p": "Plan your race strategy with our Marathon Pace Calculator. Enter your target finish time for any distance — 5K to 100-mile ultra — to get your required pace per kilometer and mile, plus splits for race day.",
        "internalLinkPages": [
            389,
            302,
            426,
            203,
            204,
            235
        ],
        "pageHasH1": true
    },
    {
        "id": 261,
        "pageName": "margin-calculator",
        "h1": "Profit Margin Calculator",
        "p": "Calculate your gross profit margin percentage from revenue and cost, or find the selling price needed to hit a target margin. Built for businesses and freelancers.",
        "internalLinkPages": [
            263,
            287,
            338,
            298,
            126,
            127
        ],
        "pageHasH1": true
    },
    {
        "id": 262,
        "pageName": "mark-to-grade-converter",
        "h1": "Mark to Grade Converter – Convert Exam Marks to Letter Grades Instantly",
        "p": "Quickly convert your numerical marks to letter grades or grade points with our            Mark-to-Grade Converter. Supports custom grading scales including A–F, O/A/B/C, and            10-point systems used globally.",
        "internalLinkPages": [
            194,
            81,
            192,
            193,
            158,
            159
        ],
        "pageHasH1": true
    },
    {
        "id": 263,
        "pageName": "markup-calculator",
        "h1": "Markup Calculator",
        "p": "Calculate selling price and markup percentage from cost and desired profit, or reverse-calculate cost from price and markup. Essential for pricing strategy.",
        "internalLinkPages": [
            261,
            287,
            338,
            298,
            126,
            127
        ],
        "pageHasH1": true
    },
    {
        "id": 264,
        "pageName": "matrix-addition-calculator",
        "h1": "Matrix Addition Calculator",
        "p": "Add two matrices of the same dimensions",
        "internalLinkPages": [
            265,
            121,
            224,
            247,
            346,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 265,
        "pageName": "matrix-multiplication-calculator",
        "h1": "Matrix Multiplication Calculator",
        "p": "Multiply two matrices (A × B)",
        "internalLinkPages": [
            264,
            121,
            224,
            247,
            346,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 266,
        "pageName": "median-calculator",
        "h1": "Median Calculator",
        "p": "Find the middle value of a dataset",
        "internalLinkPages": [
            28,
            272,
            500,
            350,
            430,
            471
        ],
        "pageHasH1": false
    },
    {
        "id": 267,
        "pageName": "meditation-timer-scheduler",
        "h1": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
        "p": "Create the perfect meditation session with our Meditation Timer Scheduler.            Set session duration, interval bells, and session type to stay focused            without watching the clock — ideal for beginners and experienced meditators alike.",
        "internalLinkPages": [
            61,
            416,
            417,
            418,
            119,
            217
        ],
        "pageHasH1": true
    },
    {
        "id": 268,
        "pageName": "mileage-calculator",
        "h1": "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)",
        "p": "Find out your car's real-world mileage with our free Mileage Calculator. Simply enter            the distance traveled and the amount of fuel used to instantly calculate MPG, km/L, or            L/100km. Great for tracking fuel efficiency and planning fuel budgets.",
        "internalLinkPages": [
            176,
            177,
            463,
            259,
            50,
            74
        ],
        "pageHasH1": true
    },
    {
        "id": 269,
        "pageName": "minimum-payment-calculator",
        "h1": "Credit Card Minimum Payment Calculator",
        "p": "Discover the true cost of paying only the minimum on your credit card. See the total interest paid and years it takes to clear your balance this way.",
        "internalLinkPages": [
            264,
            265,
            266,
            267,
            268,
            270
        ],
        "pageHasH1": true
    },
    {
        "id": 270,
        "pageName": "mirror-equation-calculator",
        "h1": "Mirror Equation Calculator – Spherical Mirror Formula",
        "p": "Calculate focal length, object distance, or image distance for spherical mirrors. Our calculator works for both concave and convex mirrors.",
        "internalLinkPages": [
            245,
            170,
            62,
            358,
            420,
            316
        ],
        "pageHasH1": false
    },
    {
        "id": 271,
        "pageName": "mobile-charging-time-calculator",
        "h1": "Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?",
        "p": "Find out exactly when your phone will be fully charged with our Mobile Charging Time Calculator. Enter battery capacity (mAh), charger wattage, and current charge level to get an accurate estimated charging time.",
        "internalLinkPages": [
            39,
            37,
            38,
            400,
            82,
            144
        ],
        "pageHasH1": true
    },
    {
        "id": 272,
        "pageName": "mode-calculator",
        "h1": "Mode Calculator",
        "p": "Find the most frequently occurring value(s)",
        "internalLinkPages": [
            28,
            266,
            500,
            350,
            430,
            471
        ],
        "pageHasH1": false
    },
    {
        "id": 273,
        "pageName": "modulo-calculator",
        "h1": "Modulo Calculator",
        "p": "Calculate the remainder: a mod n",
        "internalLinkPages": [
            131,
            11,
            286,
            444,
            161,
            313
        ],
        "pageHasH1": false
    },
    {
        "id": 274,
        "pageName": "molality-calculator",
        "h1": "Molality Calculator – Find Molality of Any Solution",
        "p": "Calculate the molality of a solution quickly with our free molality calculator. Enter moles of solute and mass of solvent in kilograms to get accurate molality values. Ideal for chemistry coursework and laboratory applications.",
        "internalLinkPages": [
            275,
            95,
            124,
            276,
            277,
            312
        ],
        "pageHasH1": false
    },
    {
        "id": 275,
        "pageName": "molarity-calculator",
        "h1": "Molarity Calculator – Calculate Molar Concentration Instantly",
        "p": "Use our free molarity calculator to find the molar concentration of a solution. Enter moles of solute and volume of solution to get accurate results in seconds. Perfect for chemistry students, lab technicians, and researchers.",
        "internalLinkPages": [
            274,
            95,
            124,
            276,
            277,
            312
        ],
        "pageHasH1": false
    },
    {
        "id": 276,
        "pageName": "molecular-mass-calculator",
        "h1": "Molecular Mass Calculator – Calculate Molar Mass of Any Compound",
        "p": "Calculate the molecular mass of any chemical compound by entering its formula. Our molecular mass calculator uses atomic weights to deliver accurate molar mass in g/mol instantly. Useful for chemistry students and lab professionals.",
        "internalLinkPages": [
            151,
            312,
            95,
            124,
            275,
            274
        ],
        "pageHasH1": false
    },
    {
        "id": 277,
        "pageName": "moles-to-volume-converter",
        "h1": "Moles to Volume Calculator for Gas – STP and Custom Conditions",
        "p": "Convert moles of gas to liters at STP or any temperature and pressure with our moles-to-volume gas calculator. Uses the ideal gas law for accurate results. Great for chemistry students and lab professionals.",
        "internalLinkPages": [
            275,
            95,
            124,
            274,
            276,
            312
        ],
        "pageHasH1": false
    },
    {
        "id": 278,
        "pageName": "momentum-calculator",
        "h1": "Momentum Calculator",
        "p": "Calculate linear momentum from mass and velocity (p = mv), or from force and time (p = F × t).",
        "internalLinkPages": [
            7,
            474,
            233,
            152,
            328,
            427
        ],
        "pageHasH1": false
    },
    {
        "id": 279,
        "pageName": "money-saving-challenge-calculator",
        "h1": "Money-Saving Challenge Calculator – Track Your 52-Week or Custom Savings Challenge",
        "p": "Make saving money fun with our Money-Saving Challenge Calculator.            Track weekly deposits for the 52-week challenge or create a custom            savings plan, and see your projected total savings grow week by week.",
        "internalLinkPages": [
            395,
            4,
            280,
            148,
            167,
            3
        ],
        "pageHasH1": true
    },
    {
        "id": 280,
        "pageName": "monthly-budget-breakdown-calculator",
        "h1": "Monthly Budget Breakdown Calculator",
        "p": "Get a clear picture of your monthly finances. Input your income and expense categories to generate a full budget breakdown with surplus, deficit, and spending percentages.",
        "internalLinkPages": [
            4,
            116,
            200,
            148,
            395,
            279
        ],
        "pageHasH1": true
    },
    {
        "id": 281,
        "pageName": "mortar-volume-calculator",
        "h1": "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling",
        "p": "Get precise mortar quantities for your construction project with our Mortar Volume Calculator.            Enter wall area, joint width and depth, and brick type to calculate the exact volume needed —            saving material and reducing waste.",
        "internalLinkPages": [
            96,
            97,
            64,
            63,
            394,
            25
        ],
        "pageHasH1": true
    },
    {
        "id": 282,
        "pageName": "mortgage-amortization-schedule",
        "h1": "Mortgage Amortization Schedule Calculator",
        "p": "Generate a complete month-by-month amortization table for your mortgage. See opening balance, EMI, principal paid, interest paid, and closing balance for every payment.",
        "internalLinkPages": [
            283,
            249,
            284,
            67,
            213,
            360
        ],
        "pageHasH1": true
    },
    {
        "id": 283,
        "pageName": "mortgage-calculator",
        "h1": "Mortgage Calculator – Calculate Monthly Home Loan Payments",
        "p": "Estimate your monthly mortgage payment, total interest paid, and full amortization schedule based on home price, down payment, rate, and loan term.",
        "internalLinkPages": [
            282,
            249,
            284,
            67,
            213,
            360
        ],
        "pageHasH1": false
    },
    {
        "id": 284,
        "pageName": "mortgage-refinance-break-even-calculator",
        "h1": "Mortgage Refinance Break-Even Calculator",
        "p": "Is refinancing worth it? Calculate the number of months your monthly savings will take to offset closing costs and determine your refinance break-even point.",
        "internalLinkPages": [
            283,
            282,
            253,
            67,
            213,
            360
        ],
        "pageHasH1": false
    },
    {
        "id": 285,
        "pageName": "mountain-oxygen-calculator",
        "h1": "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude",
        "p": "Understand how altitude affects your breathing with our Mountain Oxygen Calculator. Enter elevation in meters or feet to calculate available oxygen percentage and effective O₂ partial pressure — vital for mountaineers, climbers, and aviation planners.",
        "internalLinkPages": [
            17,
            122,
            214,
            205,
            503,
            15
        ],
        "pageHasH1": true
    },
    {
        "id": 286,
        "pageName": "multiplication-calculator",
        "h1": "Multiplication Calculator",
        "p": "Multiply multiple numbers together",
        "internalLinkPages": [
            11,
            131,
            444,
            313,
            28,
            500
        ],
        "pageHasH1": false
    },
    {
        "id": 287,
        "pageName": "net-profit-margin-calculator",
        "h1": "Net Profit Margin Calculator",
        "p": "Calculate your overall bottom-line profitability. Find net profit margin percentage from total revenue and net income after all expenses are accounted for.",
        "internalLinkPages": [
            298,
            338,
            142,
            99,
            261,
            263
        ],
        "pageHasH1": true
    },
    {
        "id": 288,
        "pageName": "noise-exposure-calculator",
        "h1": "Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits",
        "p": "Protect your hearing with our Noise Exposure Calculator. Enter noise level in dB            and daily exposure duration to calculate your noise dose and permissible exposure            time per OSHA and NIOSH standards — critical for workplace safety and hearing conservation.",
        "internalLinkPages": [
            289,
            115,
            117,
            27,
            8,
            411
        ],
        "pageHasH1": true
    },
    {
        "id": 289,
        "pageName": "noise-level-calculator",
        "h1": "Noise Level Calculator – Combine Multiple Sound Sources",
        "p": "Calculate the combined noise level from multiple sound sources. Our calculator adds decibels correctly and accounts for distance attenuation.",
        "internalLinkPages": [
            288,
            115,
            117,
            27,
            8,
            411
        ],
        "pageHasH1": false
    },
    {
        "id": 290,
        "pageName": "note-frequency-calculator",
        "h1": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
        "p": "Find the exact frequency of any musical note with our Note Frequency Calculator.            Enter a note name and octave to instantly get its frequency in Hz — perfect for            musicians, audio engineers, and instrument tuners.",
        "internalLinkPages": [
            175,
            398,
            451,
            464,
            86,
            137
        ],
        "pageHasH1": true
    },
    {
        "id": 291,
        "pageName": "nps-score-calculator",
        "h1": "NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results",
        "p": "Measure customer loyalty in seconds with our NPS Score Calculator. Enter the number of Promoters, Passives, and Detractors from your survey to calculate your Net Promoter Score — the gold standard for measuring customer satisfaction and brand advocacy.",
        "internalLinkPages": [
            107,
            108,
            178,
            100,
            242,
            377
        ],
        "pageHasH1": true
    },
    {
        "id": 292,
        "pageName": "npv-calculator",
        "h1": "NPV Calculator – Net Present Value",
        "p": "Evaluate the viability of an investment by calculating its Net Present Value. Discount all future cash flows at your required rate of return to make smarter decisions.",
        "internalLinkPages": [
            227,
            309,
            378,
            99,
            485,
            142
        ],
        "pageHasH1": true
    },
    {
        "id": 293,
        "pageName": "nuclear-decay-half-life-calculator",
        "h1": "Nuclear Decay Half-Life Calculator – Radioactive Decay",
        "p": "Calculate radioactive decay using half-life. Find remaining amount after time, or calculate time needed for specific decay.",
        "internalLinkPages": [
            33,
            132,
            347,
            370,
            1,
            2
        ],
        "pageHasH1": false
    },
    {
        "id": 294,
        "pageName": "number-to-words-converter",
        "h1": "Number to Words Converter",
        "p": "Convert numbers to English words",
        "internalLinkPages": [
            379,
            35,
            118,
            173,
            413,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 295,
        "pageName": "office-space-per-employee-calculator",
        "h1": "Office Space Per Employee Calculator – How Much Office Space Do You Need?",
        "p": "Plan your office space efficiently with our Office Space Calculator.            Enter your headcount and workspace style to calculate the total square footage            required per employee — essential for lease planning and workplace design.",
        "internalLinkPages": [
            1,
            2,
            3,
            4,
            5,
            6
        ],
        "pageHasH1": true
    },
    {
        "id": 296,
        "pageName": "ohms-law-calculator",
        "h1": "Ohm's Law Calculator",
        "p": "Calculate voltage, current, resistance, or power using Ohm's Law. Enter any two known values to find the unknown parameters.",
        "internalLinkPages": [
            363,
            105,
            143,
            477,
            6,
            144
        ],
        "pageHasH1": false
    },
    {
        "id": 297,
        "pageName": "online-seller-profit-calculator",
        "h1": "Online Seller Profit Calculator – Calculate Net Profit on Amazon, eBay & More",
        "p": "Know exactly how much you're making from each sale with our Online Seller Profit            Calculator. Deduct platform fees, shipping, COGS, and taxes from your sale price to see            your real net profit. Built for Amazon, eBay, Etsy, and Shopify sellers.",
        "internalLinkPages": [
            292,
            293,
            294,
            295,
            296,
            298
        ],
        "pageHasH1": true
    },
    {
        "id": 298,
        "pageName": "operating-margin-calculator",
        "h1": "Operating Margin Calculator",
        "p": "Measure your business's core profitability. Calculate operating profit margin percentage from revenue and operating expenses, before interest and taxes.",
        "internalLinkPages": [
            287,
            338,
            142,
            99,
            261,
            263
        ],
        "pageHasH1": true
    },
    {
        "id": 299,
        "pageName": "orbital-period-calculator",
        "h1": "Orbital Period Calculator – Calculate Orbital Period",
        "p": "Calculate the orbital period of a satellite or planet using Kepler's third law. Enter the semi-major axis and central body mass.",
        "internalLinkPages": [
            196,
            197,
            156,
            7,
            474,
            278
        ],
        "pageHasH1": false
    },
    {
        "id": 300,
        "pageName": "oven-temperature-converter",
        "h1": "Oven Temperature Converter – Convert Celsius, Fahrenheit & Gas Mark Instantly",
        "p": "Never miscalculate your oven temperature again with our Oven Temperature Converter.            Convert between Celsius, Fahrenheit, and Gas Mark numbers instantly — essential for            following international recipes from any cookbook.",
        "internalLinkPages": [
            34,
            234,
            91,
            449,
            69,
            355
        ],
        "pageHasH1": true
    },
    {
        "id": 301,
        "pageName": "ovulation-calculator",
        "h1": "Ovulation Calculator – Find Your Most Fertile Days",
        "p": "Maximize your chances of conception with our ovulation calculator. Get your predicted ovulation date and full fertile window based on your cycle length and last period.",
        "internalLinkPages": [
            330,
            331,
            332,
            29,
            83,
            457
        ],
        "pageHasH1": false
    },
    {
        "id": 302,
        "pageName": "pace-to-speed-converter",
        "h1": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
        "p": "Easily convert your running or cycling pace to speed. Our pace-to-speed converter handles both metric and imperial units so you can track performance your way.",
        "internalLinkPages": [
            426,
            260,
            389,
            203,
            204,
            235
        ],
        "pageHasH1": false
    },
    {
        "id": 303,
        "pageName": "paint-cost-estimate-calculator",
        "h1": "Paint Cost Estimate Calculator – How Much Paint Do You Need for a Room?",
        "p": "Calculate the exact amount of paint and budget needed for your next painting project            with our Paint Cost Estimate Calculator. Enter room dimensions, number of coats, and            paint price per liter to get an accurate estimate instantly.",
        "internalLinkPages": [
            304,
            169,
            78,
            489,
            454,
            80
        ],
        "pageHasH1": true
    },
    {
        "id": 304,
        "pageName": "paint-coverage-calculator",
        "h1": "Paint Calculator – How Much Paint Do You Need to Cover a Room?",
        "p": "Take the guesswork out of painting with our paint coverage calculator. Enter your room dimensions and number of coats to find out exactly how much paint to buy.",
        "internalLinkPages": [
            303,
            169,
            78,
            489,
            454,
            80
        ],
        "pageHasH1": false
    },
    {
        "id": 305,
        "pageName": "pallet-stacking-calculator",
        "h1": "Pallet Stacking Calculator – Maximize Box Quantities Per Pallet",
        "p": "Optimize pallet loads and reduce shipping costs with our Pallet Stacking Calculator.            Enter box and pallet dimensions along with maximum stack height to calculate            optimal arrangement and total boxes per pallet — improving warehouse and            logistics efficiency.",
        "internalLinkPages": [
            98,
            125,
            484,
            77,
            490,
            237
        ],
        "pageHasH1": true
    },
    {
        "id": 306,
        "pageName": "parallelogram-area-calculator",
        "h1": "Parallelogram Area Calculator",
        "p": "Calculate area and perimeter of a parallelogram",
        "internalLinkPages": [
            87,
            147,
            369,
            461,
            356,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 307,
        "pageName": "pascals-triangle-calculator",
        "h1": "Pascal's Triangle Calculator",
        "p": "Generate Pascal's triangle up to n rows",
        "internalLinkPages": [
            166,
            162,
            92,
            315,
            181,
            241
        ],
        "pageHasH1": false
    },
    {
        "id": 308,
        "pageName": "password-strength-scorer",
        "h1": "Password Strength Checker – Test How Strong & Secure Your Password Is",
        "p": "Check your password security instantly with our Password Strength Scorer. Evaluate entropy, length, character variety, and pattern vulnerabilities to see how strong your password is and get recommendations for creating uncrackable passwords.",
        "internalLinkPages": [
            12,
            386,
            201,
            35,
            115,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 309,
        "pageName": "payback-period-calculator",
        "h1": "Payback Period Calculator",
        "p": "Determine how quickly an investment pays for itself. Calculate the number of years or months needed to recover the initial cost from generated cash flows.",
        "internalLinkPages": [
            227,
            292,
            378,
            99,
            485,
            142
        ],
        "pageHasH1": true
    },
    {
        "id": 310,
        "pageName": "pcb-trace-width-calculator",
        "h1": "PCB Trace Width Calculator – Calculate Copper Trace Width",
        "p": "Calculate minimum PCB trace width for a given current using IPC-2221 guidelines. Prevents overheating and ensures reliability.",
        "internalLinkPages": [
            244,
            296,
            363,
            407,
            406,
            221
        ],
        "pageHasH1": false
    },
    {
        "id": 311,
        "pageName": "peak-to-peak-voltage-calculator",
        "h1": "Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements",
        "p": "Convert between peak, RMS, average, and peak-to-peak voltage for sine waves.",
        "internalLinkPages": [
            375,
            477,
            296,
            143,
            6,
            105
        ],
        "pageHasH1": false
    },
    {
        "id": 312,
        "pageName": "percent-composition-calculator",
        "h1": "Percent Composition Calculator – Find Mass Percent of Elements",
        "p": "Determine the percent composition by mass of each element in a compound with our free percent composition calculator. Enter the chemical formula and get accurate elemental percentages instantly. Perfect for chemistry coursework and analysis.",
        "internalLinkPages": [
            151,
            276,
            95,
            124,
            275,
            274
        ],
        "pageHasH1": false
    },
    {
        "id": 313,
        "pageName": "percentage-calculator",
        "h1": "Percentage Calculator – Calculate Percentages Instantly",
        "p": "Calculate percentages, find what percent one number is of another, or compute percentage change. Our free percentage calculator handles all common percentage calculations with clear results.",
        "internalLinkPages": [
            314,
            28,
            266,
            272,
            500,
            126
        ],
        "pageHasH1": false
    },
    {
        "id": 314,
        "pageName": "percentage-change-calculator",
        "h1": "Percentage Change Calculator",
        "p": "Calculate the percentage increase or decrease",
        "internalLinkPages": [
            313,
            28,
            126,
            127,
            261,
            263
        ],
        "pageHasH1": false
    },
    {
        "id": 315,
        "pageName": "permutation-calculator",
        "h1": "Permutation Calculator",
        "p": "Calculate arrangements where order matters: P(n,r)",
        "internalLinkPages": [
            92,
            162,
            307,
            181,
            241,
            166
        ],
        "pageHasH1": false
    },
    {
        "id": 316,
        "pageName": "perspective-angle-calculator",
        "h1": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
        "p": "Master perspective drawing with our Perspective Angle Calculator. Input viewer            height and distance to calculate accurate vanishing point locations and            perspective angles for one-, two-, and three-point perspective — for artists,            architects, and illustrators.",
        "internalLinkPages": [
            20,
            70,
            170,
            245,
            229,
            62
        ],
        "pageHasH1": true
    },
    {
        "id": 317,
        "pageName": "pesticide-dilution-calculator",
        "h1": "Pesticide Dilution Calculator – Calculate the Right Pesticide-to-Water Ratio",
        "p": "Mix pesticides safely and accurately with our Pesticide Dilution Calculator. Enter the            required concentration, total spray volume, and product label rate to get the exact            amount of concentrate to add to water for effective pest control.",
        "internalLinkPages": [
            104,
            165,
            228,
            405,
            421,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 318,
        "pageName": "pet-age-calculator",
        "h1": "Pet Age Calculator – Convert Dog & Cat Age to Human Years",
        "p": "Find out how old your pet really is in human years with our Pet Age Calculator.            Based on current scientific research on dog and cat aging rates, get a more accurate            conversion than the outdated &apos;7 dog years per human year&apos; myth.",
        "internalLinkPages": [
            29,
            83,
            457,
            45,
            79,
            133
        ],
        "pageHasH1": true
    },
    {
        "id": 319,
        "pageName": "ph-calculator",
        "h1": "pH Calculator – Calculate pH from H⁺ Concentration",
        "p": "Determine the pH of any solution instantly with our pH calculator. Input the hydrogen ion concentration [H⁺] or pH value to convert between them. Great for chemistry students, teachers, and lab professionals.",
        "internalLinkPages": [
            208,
            324,
            326,
            146,
            456,
            95
        ],
        "pageHasH1": false
    },
    {
        "id": 320,
        "pageName": "photon-energy-calculator",
        "h1": "Photon Energy Calculator – Calculate Energy of a Photon",
        "p": "Calculate the energy of a photon from its wavelength or frequency. Our calculator provides results in Joules and electron-volts (eV).",
        "internalLinkPages": [
            359,
            152,
            495,
            175,
            278,
            233
        ],
        "pageHasH1": false
    },
    {
        "id": 321,
        "pageName": "pipe-flow-reynolds-number-calculator",
        "h1": "Reynolds Number Calculator – Pipe Flow Reynolds Number",
        "p": "Calculate the Reynolds number for pipe flow to determine if flow is laminar, transitional, or turbulent.",
        "internalLinkPages": [
            322,
            202,
            236,
            258,
            492,
            323
        ],
        "pageHasH1": false
    },
    {
        "id": 322,
        "pageName": "pipe-friction-loss-calculator",
        "h1": "Pipe Friction Loss Calculator – Head Loss in Pipe Flow",
        "p": "Calculate pressure or head loss due to friction in pipes. Our pipe friction loss calculator uses the Darcy-Weisbach equation for accurate results in water and fluid systems.",
        "internalLinkPages": [
            321,
            202,
            236,
            258,
            492,
            323
        ],
        "pageHasH1": false
    },
    {
        "id": 323,
        "pageName": "pipe-water-tank-pressure-calculator",
        "h1": "Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height",
        "p": "Calculate water pressure at any point in your pipe system with our Tank Pressure Calculator.            Enter the height of the water column to determine static pressure in PSI, bar, or kPa —            essential for plumbing design and water system planning.",
        "internalLinkPages": [
            492,
            494,
            321,
            322,
            202,
            258
        ],
        "pageHasH1": true
    },
    {
        "id": 324,
        "pageName": "pka-pkb-calculator",
        "h1": "pKa and pKb Calculator – Convert Ka, Kb, pKa, and pKb",
        "p": "Convert between Ka, Kb, pKa, and pKb values effortlessly with our pKa/pKb calculator. Use the relationship pKa + pKb = 14 to find acid and base dissociation constants. Essential for acid-base chemistry and biochemistry.",
        "internalLinkPages": [
            319,
            208,
            326,
            146,
            456,
            95
        ],
        "pageHasH1": false
    },
    {
        "id": 325,
        "pageName": "plastering-calculator",
        "h1": "Plastering Calculator – How Much Plaster Do You Need?",
        "p": "Calculate plaster quantities for walls and ceilings with our plastering calculator. Enter surface area and plaster thickness to find the volume and weight of plaster needed.",
        "internalLinkPages": [
            281,
            96,
            97,
            64,
            63,
            394
        ],
        "pageHasH1": false
    },
    {
        "id": 326,
        "pageName": "poh-calculator",
        "h1": "pOH Calculator – Calculate pOH and Convert to pH",
        "p": "Use our pOH calculator to find the pOH of a solution from [OH⁻] concentration, or easily convert between pH and pOH. Essential tool for acid-base chemistry problems and laboratory work.",
        "internalLinkPages": [
            319,
            208,
            324,
            146,
            456,
            95
        ],
        "pageHasH1": false
    },
    {
        "id": 327,
        "pageName": "poster-print-size-calculator",
        "h1": "Poster Print Size Calculator – Find the Right Resolution for Any Print Size",
        "p": "Ensure crisp, high-quality poster prints with our Print Size Calculator.            Enter your desired poster dimensions and print resolution (DPI) to calculate            the minimum pixel dimensions needed for your artwork — avoiding blurry and            pixelated prints.",
        "internalLinkPages": [
            72,
            316,
            1,
            2,
            3,
            4
        ],
        "pageHasH1": true
    },
    {
        "id": 328,
        "pageName": "potential-energy-calculator",
        "h1": "Potential Energy Calculator",
        "p": "Calculate gravitational potential energy (PE = mgh) or elastic potential energy (PE = ½kx²).",
        "internalLinkPages": [
            152,
            233,
            427,
            508,
            278,
            196
        ],
        "pageHasH1": false
    },
    {
        "id": 329,
        "pageName": "power-factor-calculator",
        "h1": "Power Factor Calculator – Calculate PF and Phase Angle",
        "p": "Calculate power factor, phase angle, and reactive power for AC circuits. Essential for power system analysis.",
        "internalLinkPages": [
            296,
            143,
            477,
            6,
            105,
            363
        ],
        "pageHasH1": false
    },
    {
        "id": 330,
        "pageName": "pregnancy-due-date-calculator",
        "h1": "Pregnancy Due Date Calculator – When Is My Baby Due?",
        "p": "Find your estimated due date instantly with our pregnancy calculator. Enter the date of your last period or conception date to get a personalized birth timeline and week-by-week breakdown.",
        "internalLinkPages": [
            331,
            332,
            301,
            29,
            83,
            457
        ],
        "pageHasH1": false
    },
    {
        "id": 331,
        "pageName": "pregnancy-week-calculator",
        "h1": "Pregnancy Week Calculator – Free Due Date & Pregnancy Tracker",
        "p": "Calculate your current pregnancy week and due date. Enter your last menstrual period (LMP) or due date to track your pregnancy progress, trimester, and estimated conception date.",
        "internalLinkPages": [
            330,
            332,
            301,
            29,
            83,
            457
        ],
        "pageHasH1": false
    },
    {
        "id": 332,
        "pageName": "pregnancy-weight-gain-calculator",
        "h1": "Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator",
        "p": "Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI. Get personalized weight gain recommendations for each trimester according to IOM guidelines.",
        "internalLinkPages": [
            330,
            331,
            301,
            29,
            83,
            457
        ],
        "pageHasH1": false
    },
    {
        "id": 333,
        "pageName": "present-value-calculator",
        "h1": "Present Value Calculator",
        "p": "Determine what a future sum of money is worth in today&apos;s dollars. Discount single or multiple future cash flows using your chosen discount rate.",
        "internalLinkPages": [
            179,
            93,
            94,
            412,
            388,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 334,
        "pageName": "price-per-unit-comparison-calculator",
        "h1": "Price-Per-Unit Comparison Calculator",
        "p": "Find the best value buy every time. Compare two or more products by normalizing their prices to a common unit to instantly identify the most cost-effective option.",
        "internalLinkPages": [
            329,
            330,
            331,
            332,
            333,
            335
        ],
        "pageHasH1": true
    },
    {
        "id": 335,
        "pageName": "prime-checker",
        "h1": "Prime Number Checker – Is This Number Prime?",
        "p": "Check if a number is prime and see its factors",
        "internalLinkPages": [
            336,
            181,
            241,
            162,
            92,
            307
        ],
        "pageHasH1": false
    },
    {
        "id": 336,
        "pageName": "prime-factorization-calculator",
        "h1": "Prime Factorization Calculator – Find Prime Factors",
        "p": "Find the prime factors of a number",
        "internalLinkPages": [
            335,
            181,
            241,
            162,
            92,
            307
        ],
        "pageHasH1": false
    },
    {
        "id": 337,
        "pageName": "productivity-streak-calculator",
        "h1": "Productivity Streak Calculator – Track Your Daily Productivity Streaks & Consistency",
        "p": "Stay motivated and consistent with our Productivity Streak Calculator.            Track your daily task completion, calculate your current streak length,            and monitor your consistency rate to build powerful productive habits.",
        "internalLinkPages": [
            112,
            188,
            368,
            441,
            440,
            136
        ],
        "pageHasH1": true
    },
    {
        "id": 338,
        "pageName": "profit-margin-calculator",
        "h1": "Profit Margin Calculator – Calculate Gross Profit & Markup",
        "p": "Calculate profit margins, markup percentages, and optimal selling prices with our comprehensive Profit Margin Calculator. Essential for business owners, retailers, and anyone analyzing product profitability.",
        "internalLinkPages": [
            261,
            263,
            287,
            298,
            126,
            127
        ],
        "pageHasH1": true
    },
    {
        "id": 339,
        "pageName": "protein-distribution-calculator",
        "h1": "Protein Distribution Calculator – Optimize Protein Timing Per Meal",
        "p": "Maximize muscle growth and recovery by spacing your protein intake correctly. Our protein distribution calculator helps you divide your daily protein across meals for best results.",
        "internalLinkPages": [
            340,
            257,
            231,
            75,
            164,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 340,
        "pageName": "protein-intake-calculator",
        "h1": "Protein Intake Calculator – How Much Protein Do You Need Per Day?",
        "p": "Use our protein intake calculator to determine your optimal daily protein consumption. Whether you're building muscle, losing weight, or maintaining fitness, get personalized recommendations.",
        "internalLinkPages": [
            339,
            257,
            231,
            75,
            164,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 341,
        "pageName": "pulley-system-calculator",
        "h1": "Pulley System Calculator – Block and Tackle Calculator",
        "p": "Calculate mechanical advantage and required effort for pulley systems. Determine rope length needed for lifting.",
        "internalLinkPages": [
            42,
            43,
            182,
            392,
            40,
            163
        ],
        "pageHasH1": false
    },
    {
        "id": 342,
        "pageName": "pump-horsepower-calculator",
        "h1": "Pump Horsepower Calculator – Calculate Required Pump Power",
        "p": "Size your pump correctly with our pump horsepower calculator. Enter flow rate, total head, and efficiency to find the required pump power in HP or kW.",
        "internalLinkPages": [
            211,
            458,
            408,
            376,
            143,
            392
        ],
        "pageHasH1": false
    },
    {
        "id": 343,
        "pageName": "punnett-square-calculator",
        "h1": "Punnett Square Calculator – Predict Genetic Cross Outcomes",
        "p": "Generate Punnett squares for monohybrid and dihybrid genetic crosses with our free calculator. Calculate genotype and phenotype ratios and probabilities instantly. Perfect for biology students, genetics courses, and science teachers.",
        "internalLinkPages": [
            33,
            132,
            293,
            1,
            2,
            3
        ],
        "pageHasH1": false
    },
    {
        "id": 344,
        "pageName": "pwm-frequency-calculator",
        "h1": "PWM Frequency Calculator – Calculate PWM Output Frequency",
        "p": "Calculate PWM frequency based on clock speed, prescaler, and resolution. Essential for motor control and power electronics.",
        "internalLinkPages": [
            175,
            140,
            353,
            373,
            374,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 345,
        "pageName": "pythagorean-theorem-calculator",
        "h1": "Pythagorean Theorem Calculator",
        "p": "Calculate the missing side of a right triangle: a² + b² = c²",
        "internalLinkPages": [
            239,
            240,
            128,
            419,
            462,
            247
        ],
        "pageHasH1": false
    },
    {
        "id": 346,
        "pageName": "quadratic-equation-solver",
        "h1": "Quadratic Equation Solver",
        "p": "Solve equations in the form: ax² + bx + c = 0",
        "internalLinkPages": [
            247,
            121,
            264,
            265,
            224,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 347,
        "pageName": "radiation-dose-calculator",
        "h1": "Radiation Dose Calculator – Estimate Radiation Exposure",
        "p": "Estimate radiation dose from a gamma source. Enter activity, distance, and exposure time for approximate dose calculation.",
        "internalLinkPages": [
            293,
            370,
            132,
            33,
            1,
            2
        ],
        "pageHasH1": false
    },
    {
        "id": 348,
        "pageName": "ramp-slope-calculator",
        "h1": "Ramp Slope Calculator – Calculate Ramp Angle, Gradient & Length",
        "p": "Design accessible and safe ramps with our Ramp Slope Calculator. Enter the rise and run to calculate slope percentage, gradient ratio, and ramp angle — ensuring ADA or building code compliance for wheelchair ramps and loading docks.",
        "internalLinkPages": [
            429,
            419,
            135,
            169,
            78,
            504
        ],
        "pageHasH1": true
    },
    {
        "id": 349,
        "pageName": "random-number-generator",
        "h1": "Random Number Generator",
        "p": "Generate random numbers within a range",
        "internalLinkPages": [
            92,
            162,
            315,
            180,
            255,
            516
        ],
        "pageHasH1": false
    },
    {
        "id": 350,
        "pageName": "range-calculator",
        "h1": "Range Calculator",
        "p": "Find the difference between max and min values",
        "internalLinkPages": [
            28,
            266,
            272,
            430,
            471,
            500
        ],
        "pageHasH1": false
    },
    {
        "id": 351,
        "pageName": "range-estimator-ev",
        "h1": "EV Range Estimator – Calculate How Far Your Electric Car Can Go",
        "p": "Find out exactly how far your electric vehicle can travel on a full charge with our EV            Range Estimator. Input your battery capacity and average energy consumption to get an            accurate range estimate in miles or kilometers. Perfect for trip planning and avoiding            range anxiety.",
        "internalLinkPages": [
            157,
            82,
            176,
            177,
            472,
            74
        ],
        "pageHasH1": true
    },
    {
        "id": 352,
        "pageName": "ranking-percentile-calculator",
        "h1": "Ranking Percentile Calculator – Find Your Percentile Rank in Class or Exam",
        "p": "Find out where you stand among your peers with our Ranking Percentile Calculator.            Enter your rank and total number of students to instantly calculate your percentile —            useful for competitive exams, university admissions, and class rankings.",
        "internalLinkPages": [
            516,
            430,
            471,
            28,
            266,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 353,
        "pageName": "rc-time-constant-calculator",
        "h1": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
        "p": "Calculate the time constant for RC circuits. τ = R × C determines charging and discharging rates.",
        "internalLinkPages": [
            373,
            374,
            221,
            406,
            140,
            344
        ],
        "pageHasH1": false
    },
    {
        "id": 354,
        "pageName": "reaction-yield-calculator",
        "h1": "Reaction Yield Calculator – Calculate Theoretical and Percent Yield",
        "p": "Calculate the theoretical yield, actual yield, and percent yield of any chemical reaction with our free yield calculator. Understand your reaction efficiency and optimize lab results. Ideal for chemistry students and researchers.",
        "internalLinkPages": [
            437,
            151,
            276,
            95,
            124,
            275
        ],
        "pageHasH1": false
    },
    {
        "id": 355,
        "pageName": "recipe-scaler-calculator",
        "h1": "Recipe Scaler Calculator – Adjust Recipe Servings Instantly",
        "p": "Scale your recipes up or down with our free Recipe Scaler Calculator. Enter the original and desired servings to automatically adjust all ingredient quantities — perfect for cooking, baking, and meal prep.",
        "internalLinkPages": [
            350,
            351,
            352,
            353,
            354,
            356
        ],
        "pageHasH1": true
    },
    {
        "id": 356,
        "pageName": "rectangle-area-calculator",
        "h1": "Rectangle Area Calculator",
        "p": "Calculate area, perimeter, and diagonal of a rectangle",
        "internalLinkPages": [
            87,
            147,
            428,
            306,
            369,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 357,
        "pageName": "recurring-deposit-calculator",
        "h1": "Recurring Deposit (RD) Calculator",
        "p": "Calculate the maturity value of your recurring deposit. Enter your monthly installment, interest rate, and tenure to see how your RD grows over time.",
        "internalLinkPages": [
            168,
            412,
            93,
            94,
            179,
            333
        ],
        "pageHasH1": true
    },
    {
        "id": 358,
        "pageName": "refraction-index-calculator",
        "h1": "Refraction Index Calculator – Calculate Refractive Index",
        "p": "Calculate the refractive index of a material from the speed of light or wavelength ratio. Our calculator helps determine optical properties.",
        "internalLinkPages": [
            62,
            420,
            245,
            270,
            170,
            316
        ],
        "pageHasH1": false
    },
    {
        "id": 359,
        "pageName": "relativistic-energy-calculator",
        "h1": "Relativistic Energy Calculator – Special Relativity Calculator",
        "p": "Calculate relativistic energy, momentum, and mass using Einstein's special relativity. Our calculator handles high-velocity scenarios where classical physics breaks down.",
        "internalLinkPages": [
            320,
            152,
            233,
            156,
            197,
            278
        ],
        "pageHasH1": false
    },
    {
        "id": 360,
        "pageName": "rent-per-square-foot-calculator",
        "h1": "Rent per Square Foot Calculator – Compare Property Rental Rates",
        "p": "Calculate rent per square foot for any property with our free calculator. Compare rental rates across different properties to make informed leasing decisions. Essential for tenants, landlords, commercial real estate professionals, and property managers.",
        "internalLinkPages": [
            361,
            362,
            67,
            213,
            283,
            282
        ],
        "pageHasH1": false
    },
    {
        "id": 361,
        "pageName": "rental-roi-calculator",
        "h1": "Rental ROI Calculator – Calculate Return on Investment for Rental Properties",
        "p": "Evaluate the profitability of rental properties with our free rental ROI calculator. Factor in purchase price, monthly rent, expenses, and loan costs to calculate annual return on investment. Essential for real estate investors and landlords.",
        "internalLinkPages": [
            360,
            362,
            67,
            213,
            283,
            282
        ],
        "pageHasH1": false
    },
    {
        "id": 362,
        "pageName": "rental-yield-calculator",
        "h1": "Rental Yield Calculator",
        "p": "Evaluate a rental property&apos;s performance. Calculate gross and net rental yield based on purchase price, annual rental income, and operating expenses.",
        "internalLinkPages": [
            360,
            361,
            67,
            213,
            283,
            282
        ],
        "pageHasH1": true
    },
    {
        "id": 363,
        "pageName": "resistance-calculator",
        "h1": "Resistance Calculator – Calculate Resistance with Ohm's Law",
        "p": "Find electrical resistance using voltage and current with our resistance calculator. Based on Ohm's Law R = V/I, suitable for circuit analysis and electronics design.",
        "internalLinkPages": [
            296,
            105,
            143,
            477,
            6,
            244
        ],
        "pageHasH1": false
    },
    {
        "id": 364,
        "pageName": "retirement-age-calculator",
        "h1": "Retirement Age Calculator – Free Retirement Date Calculator",
        "p": "Calculate when you can retire based on your birth date and desired retirement age. Find out exactly how many years, months, and days until your retirement.",
        "internalLinkPages": [
            3,
            167,
            365,
            366,
            388,
            395
        ],
        "pageHasH1": false
    },
    {
        "id": 365,
        "pageName": "retirement-corpus-calculator",
        "h1": "Retirement Corpus Calculator",
        "p": "Estimate exactly how much you need to retire comfortably. Calculate the total corpus required to sustain your desired monthly income throughout retirement.",
        "internalLinkPages": [
            3,
            167,
            364,
            366,
            388,
            395
        ],
        "pageHasH1": true
    },
    {
        "id": 366,
        "pageName": "retirement-withdrawal-rate-calculator",
        "h1": "Retirement Withdrawal Rate Calculator",
        "p": "Calculate a safe and sustainable annual withdrawal rate from your retirement corpus. Accounts for corpus size, expected returns, inflation, and retirement duration.",
        "internalLinkPages": [
            3,
            167,
            364,
            365,
            388,
            395
        ],
        "pageHasH1": true
    },
    {
        "id": 367,
        "pageName": "reverse-stock-split-calculator",
        "h1": "Reverse Stock Split Calculator",
        "p": "Calculate the reduced share count and new price per share after a reverse stock split. Enter the consolidation ratio to see how your holdings are affected.",
        "internalLinkPages": [
            436,
            435,
            129,
            130,
            134,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 368,
        "pageName": "revision-planner",
        "h1": "Revision Planner – Create a Smart Spaced Repetition Study Schedule",
        "p": "Maximize exam retention with a science-backed revision plan. Our Revision            Planner uses spaced repetition principles to schedule topic reviews at            optimal intervals before your exam date.",
        "internalLinkPages": [
            441,
            440,
            337,
            188,
            112,
            65
        ],
        "pageHasH1": true
    },
    {
        "id": 369,
        "pageName": "rhombus-area-calculator",
        "h1": "Rhombus Area Calculator",
        "p": "Calculate area and perimeter of a rhombus",
        "internalLinkPages": [
            306,
            461,
            87,
            147,
            356,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 370,
        "pageName": "richter-scale-to-energy-calculator",
        "h1": "Richter Scale to Energy Calculator – Convert Earthquake Magnitude to Energy",
        "p": "Understand the true power of earthquakes with our Richter Scale to Energy Calculator.            Enter a magnitude value to see the equivalent energy release in joules and TNT            equivalent — putting seismic events into a real-world perspective.",
        "internalLinkPages": [
            293,
            33,
            132,
            347,
            1,
            2
        ],
        "pageHasH1": true
    },
    {
        "id": 371,
        "pageName": "ring-size-calculator",
        "h1": "Ring Size Calculator – Find Your Ring Size in US, UK & EU Sizes",
        "p": "Find the perfect ring fit with our Ring Size Calculator.            Measure your finger circumference or diameter to get your ring size            in US, UK, EU, Japan, and India standards — essential before buying            rings online or as a gift.",
        "internalLinkPages": [
            409,
            88,
            1,
            2,
            3,
            4
        ],
        "pageHasH1": true
    },
    {
        "id": 372,
        "pageName": "rivet-strength-calculator",
        "h1": "Rivet Strength Calculator – Calculate Rivet Shear Capacity",
        "p": "Calculate the shear and bearing capacity of riveted joints. Essential for structural steel design.",
        "internalLinkPages": [
            392,
            163,
            40,
            439,
            54,
            403
        ],
        "pageHasH1": false
    },
    {
        "id": 373,
        "pageName": "rl-time-constant-calculator",
        "h1": "RL Time Constant Calculator – Calculate RL Circuit Time Constant",
        "p": "Calculate the time constant for RL circuits. τ = L / R determines current rise and decay rates.",
        "internalLinkPages": [
            353,
            374,
            221,
            406,
            140,
            344
        ],
        "pageHasH1": false
    },
    {
        "id": 374,
        "pageName": "rlc-resonance-calculator",
        "h1": "RLC Resonance Calculator – Calculate Resonant Frequency",
        "p": "Calculate resonant frequency, quality factor, and bandwidth for RLC circuits. Essential for filter and oscillator design.",
        "internalLinkPages": [
            353,
            373,
            221,
            406,
            140,
            344
        ],
        "pageHasH1": false
    },
    {
        "id": 375,
        "pageName": "rms-value-calculator",
        "h1": "RMS Value Calculator – Calculate Root Mean Square Voltage",
        "p": "Calculate RMS voltage for different waveforms. RMS is the effective DC-equivalent voltage for AC signals.",
        "internalLinkPages": [
            311,
            477,
            296,
            143,
            6,
            105
        ],
        "pageHasH1": false
    },
    {
        "id": 376,
        "pageName": "robot-motor-torque-calculator",
        "h1": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
        "p": "Select the right motor for your robot with our Torque Calculator.            Input the load weight, moment arm, speed requirements, and friction            coefficients to calculate minimum required torque — essential for            robotics engineers and makers.",
        "internalLinkPages": [
            458,
            408,
            54,
            182,
            342,
            385
        ],
        "pageHasH1": true
    },
    {
        "id": 377,
        "pageName": "roi-calculator-ad",
        "h1": "Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns",
        "p": "Measure the profitability of your advertising with our Ad ROI Calculator.            Enter your total ad spend and revenue generated to calculate ROI percentage —            helping marketers and business owners make smarter advertising budget decisions.",
        "internalLinkPages": [
            378,
            107,
            108,
            100,
            178,
            291
        ],
        "pageHasH1": true
    },
    {
        "id": 378,
        "pageName": "roi-calculator",
        "h1": "ROI Calculator – Calculate Return on Investment Percentage",
        "p": "Calculate your Return on Investment (ROI) instantly with our free ROI Calculator. Enter your initial investment and final value to determine your profit or loss percentage — essential for evaluating investments, business projects, and financial decisions.",
        "internalLinkPages": [
            377,
            227,
            292,
            309,
            99,
            485
        ],
        "pageHasH1": false
    },
    {
        "id": 379,
        "pageName": "roman-numerals-converter",
        "h1": "Roman Numerals Converter",
        "p": "Convert between Roman numerals and decimal numbers",
        "internalLinkPages": [
            294,
            35,
            118,
            173,
            413,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 380,
        "pageName": "roofing-sheets-calculator",
        "h1": "Roofing Calculator – How Many Roofing Sheets Do You Need?",
        "p": "Plan your roofing project with our roofing sheets calculator. Enter roof area and sheet dimensions to calculate the exact number of panels needed with waste included.",
        "internalLinkPages": [
            169,
            78,
            304,
            325,
            454,
            80
        ],
        "pageHasH1": false
    },
    {
        "id": 381,
        "pageName": "room-heater-wattage-calculator",
        "h1": "Room Heater Wattage Calculator – Find the Right Heater Size for Your Room",
        "p": "Choose the right room heater with our Wattage Calculator. Enter your room dimensions,            insulation level, and local climate to find the recommended heater wattage for            efficient and comfortable heating.",
        "internalLinkPages": [
            376,
            377,
            378,
            379,
            380,
            382
        ],
        "pageHasH1": true
    },
    {
        "id": 382,
        "pageName": "root-calculator",
        "h1": "Root Calculator – Calculate Square, Cube and Nth Roots",
        "p": "Calculate any nth root instantly with our free Root Calculator. Find square roots, cube roots, or any higher-order roots with full precision. Enter your radicand and root index to get results — supports negative numbers for odd roots.",
        "internalLinkPages": [
            160,
            19,
            254,
            399,
            161,
            35
        ],
        "pageHasH1": false
    },
    {
        "id": 383,
        "pageName": "rounding-calculator",
        "h1": "Rounding Calculator – Round Numbers to Decimal Places",
        "p": "Round any number to specified decimal places instantly with our free Rounding Calculator. Enter your number and choose decimal places for currency, science, or general math — uses standard round-half-up method for accurate results.",
        "internalLinkPages": [
            313,
            28,
            266,
            272,
            500,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 384,
        "pageName": "royalty-calculator",
        "h1": "Royalty Calculator – Estimate Earnings from Sales and Revenue",
        "p": "Calculate your royalty earnings instantly with our free Royalty Calculator. Enter units sold, price per unit, and royalty rate to see your gross revenue, royalty payout, and net earnings after deductions — perfect for authors, musicians, and creators tracking their income.",
        "internalLinkPages": [
            378,
            338,
            261,
            263,
            174,
            393
        ],
        "pageHasH1": true
    },
    {
        "id": 385,
        "pageName": "rpm-calculator",
        "h1": "RPM Calculator – Calculate Rotational Speed and Gear Ratios",
        "p": "Calculate RPM for pulley systems, gear trains, and AC motors instantly. Enter your parameters to find output speed, gear ratio, and motor synchronous speed — free online RPM calculator for engineers and mechanics.",
        "internalLinkPages": [
            182,
            183,
            184,
            458,
            43,
            376
        ],
        "pageHasH1": false
    },
    {
        "id": 386,
        "pageName": "rsa-key-strength-calculator",
        "h1": "RSA Key Strength Calculator – Check How Secure Your RSA Encryption Key Is",
        "p": "Check your RSA key security instantly with our free RSA Key Strength Calculator. Enter your key size in bits to see security rating, estimated crack time with current hardware, and NIST compliance status — essential for developers and security architects choosing encryption key sizes.",
        "internalLinkPages": [
            12,
            308,
            201,
            35,
            115,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 387,
        "pageName": "rsu-vesting-calculator",
        "h1": "RSU Vesting Calculator",
        "p": "Track your RSU compensation clearly. Calculate shares vesting on each date, their estimated value, and estimated tax liability based on your vesting schedule.",
        "internalLinkPages": [
            431,
            469,
            436,
            435,
            367,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 388,
        "pageName": "rule-of-72-calculator",
        "h1": "Rule of 72 Calculator",
        "p": "Estimate how long it takes to double your money with a simple mental math shortcut. Divide 72 by your annual interest rate to get the approximate doubling time.",
        "internalLinkPages": [
            93,
            94,
            179,
            333,
            226,
            412
        ],
        "pageHasH1": true
    },
    {
        "id": 389,
        "pageName": "running-pace-calculator",
        "h1": "Running Pace Calculator",
        "p": "Calculate your running pace, speed, and estimated finish times. Perfect for training and race planning for 5K, 10K, half marathon, and marathon distances.",
        "internalLinkPages": [
            260,
            302,
            426,
            203,
            204,
            235
        ],
        "pageHasH1": false
    },
    {
        "id": 390,
        "pageName": "saas-churn-rate-calculator",
        "h1": "SaaS Churn Rate Calculator – Calculate Monthly & Annual Customer Churn",
        "p": "Track subscriber retention with our SaaS Churn Rate Calculator. Enter customers at the start of the period and customers lost to calculate monthly or annual churn rate — a critical metric for subscription business health and growth forecasting.",
        "internalLinkPages": [
            391,
            107,
            108,
            442,
            443,
            178
        ],
        "pageHasH1": true
    },
    {
        "id": 391,
        "pageName": "saas-mrr-arr-calculator",
        "h1": "MRR & ARR Calculator – Calculate Monthly and Annual Recurring Revenue for SaaS",
        "p": "Measure your subscription business&apos;s revenue with our MRR/ARR Calculator.            Enter the number of paying customers and average plan price to calculate            Monthly Recurring Revenue and Annual Recurring Revenue — the core financial            metrics for any SaaS company.",
        "internalLinkPages": [
            390,
            107,
            108,
            442,
            443,
            178
        ],
        "pageHasH1": true
    },
    {
        "id": 392,
        "pageName": "safety-factor-calculator",
        "h1": "Safety Factor Calculator – Factor of Safety Calculator",
        "p": "Calculate the factor of safety for your design. Enter material properties and applied stress to determine if your design meets safety requirements.",
        "internalLinkPages": [
            163,
            40,
            439,
            372,
            54,
            43
        ],
        "pageHasH1": false
    },
    {
        "id": 393,
        "pageName": "salary-to-hourly-calculator",
        "h1": "Salary to Hourly Rate Calculator",
        "p": "Convert your annual or monthly salary to an equivalent hourly rate. Customize based on work hours and days per week for a true per-hour breakdown.",
        "internalLinkPages": [
            212,
            174,
            200,
            116,
            4,
            280
        ],
        "pageHasH1": true
    },
    {
        "id": 394,
        "pageName": "sand-quantity-calculator",
        "h1": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
        "p": "Avoid material shortages and over-ordering with our Sand Quantity Calculator. Enter the area and depth of your project to calculate the exact volume and weight of sand required in cubic meters, cubic feet, or tons.",
        "internalLinkPages": [
            195,
            25,
            64,
            96,
            97,
            281
        ],
        "pageHasH1": true
    },
    {
        "id": 395,
        "pageName": "savings-goal-calculator",
        "h1": "Savings Goal Calculator",
        "p": "Figure out how much to save each month—or how long it will take—to reach any financial goal. Accounts for your target amount and expected interest rate.",
        "internalLinkPages": [
            148,
            4,
            280,
            116,
            167,
            3
        ],
        "pageHasH1": true
    },
    {
        "id": 396,
        "pageName": "savings-vs-investment-comparison",
        "h1": "Savings vs Investment Comparison Calculator",
        "p": "See how much more you could earn by investing versus keeping money in a savings account. Compare wealth accumulation at different return rates over time.",
        "internalLinkPages": [
            395,
            93,
            94,
            168,
            179,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 397,
        "pageName": "scaffold-board-calculator",
        "h1": "Scaffold Board Calculator – Calculate Scaffold Boards Needed for Any Structure",
        "p": "Plan scaffolding safely and cost-effectively with our Scaffold Board Calculator.            Enter platform dimensions and board size to calculate the exact number of boards            required for your construction or maintenance project.",
        "internalLinkPages": [
            169,
            78,
            304,
            325,
            454,
            80
        ],
        "pageHasH1": true
    },
    {
        "id": 398,
        "pageName": "scale-finder",
        "h1": "Scale Finder – Find the Right Musical Scale for Any Key or Note Set",
        "p": "Discover which musical scales fit your notes with our Scale Finder.            Enter a root note and select a scale type to view the notes, intervals,            and diatonic chords — perfect for songwriters and improvising musicians.",
        "internalLinkPages": [
            86,
            290,
            451,
            464,
            175,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 399,
        "pageName": "scientific-notation-calculator",
        "h1": "Scientific Notation Calculator – Convert to Standard Form",
        "p": "Convert any number to scientific notation instantly. Enter large or small values and get the standard form with mantissa and exponent – perfect for science and engineering calculations.",
        "internalLinkPages": [
            35,
            118,
            254,
            160,
            382,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 400,
        "pageName": "screen-brightness-battery-calculator",
        "h1": "Screen Brightness Battery Calculator – How Brightness Affects Your Battery Life",
        "p": "Extend your device&apos;s battery life by understanding the cost of screen brightness.            Enter your screen brightness level and device battery capacity to estimate runtime            changes — helping you make smarter power management decisions.",
        "internalLinkPages": [
            39,
            37,
            38,
            401,
            402,
            271
        ],
        "pageHasH1": true
    },
    {
        "id": 401,
        "pageName": "screen-time-allowance-calculator",
        "h1": "Screen-Time Allowance Calculator – Set Healthy Screen Time Limits for Kids",
        "p": "Set healthy digital boundaries for your children with our Screen-Time Allowance Calculator.            Enter your child&apos;s age to get evidence-based daily screen time recommendations from            AAP guidelines — broken down by content type.",
        "internalLinkPages": [
            402,
            400,
            39,
            136,
            267,
            112
        ],
        "pageHasH1": true
    },
    {
        "id": 402,
        "pageName": "screen-time-calculator",
        "h1": "Screen Time Calculator – Track & Manage Your Digital Wellness",
        "p": "Monitor your daily screen exposure and get personalized recommendations for            healthier digital habits. Enter your age and daily screen usage to see how            you compare to recommended guidelines and get tips for better digital wellness.",
        "internalLinkPages": [
            401,
            400,
            39,
            136,
            267,
            112
        ],
        "pageHasH1": true
    },
    {
        "id": 403,
        "pageName": "screw-thread-pitch-calculator",
        "h1": "Screw Thread Pitch Calculator – Thread Dimensions Calculator",
        "p": "Calculate thread dimensions including pitch diameter and minor diameter for metric and imperial threads.",
        "internalLinkPages": [
            42,
            372,
            392,
            163,
            40,
            54
        ],
        "pageHasH1": false
    },
    {
        "id": 404,
        "pageName": "sector-area-calculator",
        "h1": "Sector Area Calculator",
        "p": "Calculate area and arc length of a circular sector",
        "internalLinkPages": [
            87,
            147,
            306,
            356,
            428,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 405,
        "pageName": "seed-rate-calculator",
        "h1": "Seed Rate Calculator – Calculate Seeds Per Acre for Optimal Crop Yield",
        "p": "Ensure optimal plant density with our Seed Rate Calculator. Enter crop type, field            area, germination rate, and spacing to calculate the exact amount of seed required per            acre or hectare — helping farmers minimize waste and maximize yield.",
        "internalLinkPages": [
            104,
            165,
            228,
            317,
            421,
            493
        ],
        "pageHasH1": true
    },
    {
        "id": 406,
        "pageName": "series-parallel-capacitor-calculator",
        "h1": "Capacitor Calculator – Series and Parallel Capacitance Calculator",
        "p": "Find the equivalent capacitance for series or parallel capacitor circuits. Our calculator handles any number of capacitors and displays results in µF, nF, or pF.",
        "internalLinkPages": [
            407,
            221,
            353,
            373,
            374,
            296
        ],
        "pageHasH1": false
    },
    {
        "id": 407,
        "pageName": "series-parallel-resistor-calculator",
        "h1": "Resistor Calculator – Series and Parallel Resistance Calculator",
        "p": "Calculate total resistance for any series or parallel resistor network. Enter individual resistor values to get the equivalent resistance for circuit design and analysis.",
        "internalLinkPages": [
            406,
            244,
            296,
            363,
            353,
            221
        ],
        "pageHasH1": false
    },
    {
        "id": 408,
        "pageName": "shaft-torque-calculator",
        "h1": "Shaft Torque Calculator – Calculate Shaft Torque",
        "p": "Calculate shaft torque from power and RPM, or from force and radius. Our calculator helps size shafts and couplings for mechanical systems.",
        "internalLinkPages": [
            458,
            54,
            376,
            342,
            182,
            392
        ],
        "pageHasH1": false
    },
    {
        "id": 409,
        "pageName": "shoe-size-converter",
        "h1": "Shoe Size Converter – Convert Shoe Sizes Between US, UK, EU & CM",
        "p": "Shop shoes from any country with confidence using our Shoe Size Converter.            Instantly convert between US, UK, European, and centimeter shoe sizes for            men, women, and children — eliminating sizing confusion when shopping            internationally or online.",
        "internalLinkPages": [
            371,
            88,
            238,
            1,
            2,
            3
        ],
        "pageHasH1": true
    },
    {
        "id": 410,
        "pageName": "shutter-speed-calculator",
        "h1": "Shutter Speed Calculator – Find the Right Shutter Speed for Sharp or Blurred Shots",
        "p": "Capture exactly the look you want with our Shutter Speed Calculator.            Enter your subject&apos;s movement speed and desired effect to calculate            the optimal shutter speed — perfect for sports, wildlife, and creative            long-exposure photography.",
        "internalLinkPages": [
            20,
            70,
            229,
            170,
            245,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 411,
        "pageName": "signal-to-noise-ratio-calculator",
        "h1": "Signal-to-Noise Ratio Calculator – Calculate SNR in dB",
        "p": "Calculate SNR from power or voltage ratios. Essential for audio, RF, and communication system analysis.",
        "internalLinkPages": [
            27,
            115,
            117,
            288,
            289,
            8
        ],
        "pageHasH1": false
    },
    {
        "id": 412,
        "pageName": "simple-interest-calculator",
        "h1": "Simple Interest Calculator",
        "p": "Calculate the interest earned or owed on a principal amount using the formula I = P × R × T. Enter your principal, annual rate, and time period to get instant results.",
        "internalLinkPages": [
            93,
            94,
            179,
            333,
            388,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 413,
        "pageName": "simplify-fraction-calculator",
        "h1": "Simplify Fraction Calculator",
        "p": "Reduce a fraction to its simplest form",
        "internalLinkPages": [
            118,
            173,
            35,
            294,
            379,
            161
        ],
        "pageHasH1": false
    },
    {
        "id": 414,
        "pageName": "sip-calculator",
        "h1": "SIP Calculator",
        "p": "Calculate the maturity value of your Systematic Investment Plan. Enter your monthly investment, expected return rate, and duration to see your potential corpus.",
        "internalLinkPages": [
            415,
            433,
            134,
            256,
            179,
            226
        ],
        "pageHasH1": false
    },
    {
        "id": 415,
        "pageName": "sip-step-up-calculator",
        "h1": "SIP Step-Up Calculator",
        "p": "Boost your SIP returns by increasing contributions each year. Calculate the maturity value of a step-up SIP where your monthly investment grows by a fixed percentage annually.",
        "internalLinkPages": [
            414,
            433,
            134,
            256,
            179,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 416,
        "pageName": "sleep-cycle-calculator",
        "h1": "Sleep Cycle Calculator – Wake Up Refreshed Every Morning",
        "p": "Wake up feeling energized by timing your sleep with our sleep cycle calculator. Find the best times to wake up or fall asleep based on natural 90-minute sleep cycles.",
        "internalLinkPages": [
            417,
            418,
            119,
            31,
            217,
            267
        ],
        "pageHasH1": false
    },
    {
        "id": 417,
        "pageName": "sleep-debt-calculator",
        "h1": "Sleep Debt Calculator – How Much Sleep Are You Missing?",
        "p": "Are you chronically under-slept? Our sleep debt calculator totals your cumulative sleep deficit over days or weeks so you can understand and address your sleep deprivation.",
        "internalLinkPages": [
            416,
            418,
            119,
            31,
            217,
            267
        ],
        "pageHasH1": false
    },
    {
        "id": 418,
        "pageName": "sleep-wake-efficiency-calculator",
        "h1": "Sleep Efficiency Calculator – Measure the Quality of Your Night&apos;s Sleep",
        "p": "Find out how efficiently you&apos;re sleeping with our Sleep/Wake Efficiency Calculator.            Enter your time in bed and total time asleep to calculate your sleep efficiency score —            a key indicator of sleep quality recommended by sleep specialists.",
        "internalLinkPages": [
            416,
            417,
            119,
            31,
            217,
            267
        ],
        "pageHasH1": true
    },
    {
        "id": 419,
        "pageName": "slope-calculator",
        "h1": "Slope Calculator",
        "p": "Calculate slope and line equation from two points",
        "internalLinkPages": [
            128,
            345,
            348,
            429,
            247,
            87
        ],
        "pageHasH1": false
    },
    {
        "id": 420,
        "pageName": "snells-law-calculator",
        "h1": "Snell's Law Calculator – Refraction Calculator",
        "p": "Calculate the angle of refraction using Snell's law. Our calculator also determines the critical angle for total internal reflection.",
        "internalLinkPages": [
            62,
            358,
            245,
            270,
            170,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 421,
        "pageName": "soil-ph-adjustment-calculator",
        "h1": "Soil pH Adjustment Calculator – How Much Lime or Sulfur to Add to Your Soil",
        "p": "Correct your soil pH for optimal crop growth with our Soil pH Adjustment Calculator.            Enter your current soil pH, target pH, soil type, and field area to calculate the            exact amount of agricultural lime or sulfur to apply.",
        "internalLinkPages": [
            319,
            104,
            165,
            228,
            317,
            405
        ],
        "pageHasH1": true
    },
    {
        "id": 422,
        "pageName": "solar-irradiance-calculator",
        "h1": "Solar Irradiance Calculator – Estimate Solar Energy at Your Location",
        "p": "Plan solar energy systems with confidence using our Solar Irradiance Calculator. Estimate the amount of solar energy (W/m²) available at your location based on latitude, season, and weather conditions — perfect for solar panel sizing and energy yield calculations.",
        "internalLinkPages": [
            423,
            89,
            76,
            153,
            144,
            145
        ],
        "pageHasH1": true
    },
    {
        "id": 423,
        "pageName": "solar-panel-requirement-calculator",
        "h1": "Solar Panel Requirement Calculator – Size Your Solar System",
        "p": "Calculate how many solar panels you need for your energy requirements. Our calculator considers daily consumption, sun hours, and system losses to size your solar installation.",
        "internalLinkPages": [
            422,
            89,
            76,
            153,
            144,
            145
        ],
        "pageHasH1": false
    },
    {
        "id": 424,
        "pageName": "solubility-product-ksp-calculator",
        "h1": "Ksp Calculator – Solubility Product Constant Made Simple",
        "p": "Calculate the solubility product constant (Ksp) or find ion concentrations at equilibrium with our Ksp calculator. Essential for understanding sparingly soluble salts and equilibrium chemistry. Perfect for general and analytical chemistry.",
        "internalLinkPages": [
            319,
            208,
            324,
            326,
            146,
            95
        ],
        "pageHasH1": false
    },
    {
        "id": 425,
        "pageName": "sound-speed-calculator",
        "h1": "Sound Speed Calculator – Calculate Speed of Sound",
        "p": "Calculate the speed of sound in various media. For air, enter temperature. For other media, use bulk modulus and density.",
        "internalLinkPages": [
            495,
            137,
            175,
            290,
            8,
            288
        ],
        "pageHasH1": false
    },
    {
        "id": 426,
        "pageName": "speed-to-pace-converter",
        "h1": "Speed to Pace Converter – Convert Speed to Running Pace Online",
        "p": "Convert speed to pace instantly with our free tool. Whether you prefer km/h or mph, get your per-kilometer or per-mile pace in seconds.",
        "internalLinkPages": [
            302,
            260,
            389,
            203,
            204,
            235
        ],
        "pageHasH1": false
    },
    {
        "id": 427,
        "pageName": "spring-force-hookes-law-calculator",
        "h1": "Hooke's Law Calculator – Spring Force and Displacement",
        "p": "Solve spring mechanics problems with our Hooke's Law calculator. Find force, spring constant, or displacement using F = kx for physics and mechanical engineering.",
        "internalLinkPages": [
            152,
            233,
            328,
            508,
            278,
            40
        ],
        "pageHasH1": false
    },
    {
        "id": 428,
        "pageName": "square-area-calculator",
        "h1": "Square Area Calculator – Find Area, Perimeter and Diagonal",
        "p": "Calculate the area, perimeter, and diagonal of a square instantly. Enter the side length to get all measurements – perfect for construction, crafts, and math homework.",
        "internalLinkPages": [
            356,
            87,
            147,
            306,
            369,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 429,
        "pageName": "staircase-rise-run-calculator",
        "h1": "Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs",
        "p": "Design code-compliant and comfortable stairs with our Staircase Rise/Run Calculator. Enter the total height and available horizontal space to calculate optimal riser height, tread depth, and number of steps for your staircase.",
        "internalLinkPages": [
            348,
            419,
            135,
            169,
            78,
            504
        ],
        "pageHasH1": false
    },
    {
        "id": 430,
        "pageName": "standard-deviation-calculator",
        "h1": "Standard Deviation Calculator",
        "p": "Calculate population and sample standard deviation",
        "internalLinkPages": [
            471,
            266,
            272,
            350,
            28,
            516
        ],
        "pageHasH1": false
    },
    {
        "id": 431,
        "pageName": "startup-equity-calculator",
        "h1": "Startup Equity Calculator",
        "p": "Model your cap table across multiple funding rounds. Calculate founder and investor equity percentages accounting for dilution, option pools, and valuations.",
        "internalLinkPages": [
            387,
            469,
            436,
            435,
            367,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 432,
        "pageName": "steel-weight-calculator",
        "h1": "Steel Weight Calculator – Calculate Weight of Steel Sections and Bars",
        "p": "Find the weight of any steel component quickly. Our steel weight calculator covers bars, plates, pipes, and structural sections in kg or lbs from standard dimensions.",
        "internalLinkPages": [
            501,
            392,
            439,
            163,
            40,
            54
        ],
        "pageHasH1": false
    },
    {
        "id": 433,
        "pageName": "step-down-sip-calculator",
        "h1": "Step-Down SIP Calculator",
        "p": "Model a SIP where contributions taper down each year. Ideal for retirement planning or winding down an investment phase with decreasing monthly installments.",
        "internalLinkPages": [
            414,
            415,
            134,
            256,
            179,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 434,
        "pageName": "steps-to-calories-calculator",
        "h1": "Steps to Calories Calculator – Convert Your Steps to Calories Burned",
        "p": "Easily convert your daily step count into calories burned. Our step-to-calorie calculator gives you accurate results based on your weight and stride length.",
        "internalLinkPages": [
            9,
            68,
            111,
            109,
            445,
            488
        ],
        "pageHasH1": false
    },
    {
        "id": 435,
        "pageName": "stock-cagr-calculator",
        "h1": "Stock CAGR Calculator",
        "p": "Calculate the Compound Annual Growth Rate of any stock or investment. Enter the beginning value, ending value, and number of years to find your CAGR.",
        "internalLinkPages": [
            436,
            129,
            130,
            134,
            367,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 436,
        "pageName": "stock-split-calculator",
        "h1": "Stock Split Calculator",
        "p": "Calculate your new share count and adjusted price per share after a forward stock split. Enter the split ratio and your current holdings for an instant update.",
        "internalLinkPages": [
            435,
            129,
            130,
            134,
            367,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 437,
        "pageName": "stoichiometry-calculator",
        "h1": "Stoichiometry Calculator – Balance Chemical Reactions Instantly",
        "p": "Solve stoichiometry problems effortlessly with our stoichiometry calculator. Input your balanced chemical equation coefficients and known quantities to find moles, grams, or molecules of reactants and products. A must-have tool for chemistry students.",
        "internalLinkPages": [
            354,
            151,
            276,
            95,
            124,
            275
        ],
        "pageHasH1": false
    },
    {
        "id": 438,
        "pageName": "strength-training-pr-estimator",
        "h1": "Strength Training PR Estimator – Calculate Your One-Rep Max & Training Weights",
        "p": "Estimate your one-rep max (1RM) safely with our Strength Training Calculator.            Enter your current lift weight and reps to calculate your estimated 1RM and            find the right weight for any target rep range — perfect for powerlifters            and strength athletes.",
        "internalLinkPages": [
            2,
            491,
            510,
            512,
            1,
            389
        ],
        "pageHasH1": true
    },
    {
        "id": 439,
        "pageName": "stress-strain-calculator",
        "h1": "Stress/Strain Calculator – Mechanical Properties Calculator",
        "p": "Calculate stress, strain, and Young's modulus for materials. Our calculator helps analyze mechanical properties for engineering and physics applications.",
        "internalLinkPages": [
            40,
            392,
            163,
            372,
            54,
            427
        ],
        "pageHasH1": false
    },
    {
        "id": 440,
        "pageName": "study-hour-efficiency-calculator",
        "h1": "Study Hour Efficiency Calculator – Measure and Improve Your Study Productivity",
        "p": "Are your study hours paying off? Our Study Hour Efficiency Calculator helps            you measure how effectively you&apos;re converting study time into academic            results. Track study sessions and grades to identify where to focus your efforts.",
        "internalLinkPages": [
            441,
            368,
            337,
            188,
            112,
            136
        ],
        "pageHasH1": true
    },
    {
        "id": 441,
        "pageName": "study-hour-planner",
        "h1": "Study Hour Planner – Create a Personalized Study Schedule for Exams",
        "p": "Ace your exams with a smart study plan. Our Study Hour Planner helps you            allocate study time across subjects based on difficulty, exam dates, and            your daily availability. Build a realistic, balanced study schedule.",
        "internalLinkPages": [
            440,
            368,
            337,
            188,
            112,
            136
        ],
        "pageHasH1": true
    },
    {
        "id": 442,
        "pageName": "subscription-pricing-calculator",
        "h1": "Subscription Pricing Calculator – Find the Right Price for Your Subscription Plans",
        "p": "Set the right subscription price with our Subscription Pricing Calculator.            Factor in your costs, desired profit margin, and customer distribution to determine            optimal monthly and annual pricing tiers for your SaaS or membership business.",
        "internalLinkPages": [
            443,
            390,
            391,
            107,
            108,
            178
        ],
        "pageHasH1": true
    },
    {
        "id": 443,
        "pageName": "subscription-profit-calculator",
        "h1": "Subscription Business Profit Calculator",
        "p": "Analyze your subscription business's financials. Calculate MRR, ARR, churn impact, and profit given subscriber count, pricing, and operating costs.",
        "internalLinkPages": [
            442,
            390,
            391,
            107,
            108,
            178
        ],
        "pageHasH1": true
    },
    {
        "id": 444,
        "pageName": "subtraction-calculator",
        "h1": "Subtraction Calculator – Subtract Numbers Instantly",
        "p": "Find the difference between two numbers with our free subtraction calculator. Enter any two values and get instant results – no sign-up required.",
        "internalLinkPages": [
            11,
            131,
            286,
            313,
            28,
            500
        ],
        "pageHasH1": false
    },
    {
        "id": 445,
        "pageName": "swimming-calorie-calculator",
        "h1": "Swimming Calorie Calculator – How Many Calories Does Swimming Burn?",
        "p": "Discover the calorie-burning power of swimming. Input your weight, swim style, and duration to calculate calories burned in the pool with our free swimming calorie calculator.",
        "internalLinkPages": [
            109,
            488,
            9,
            434,
            68,
            111
        ],
        "pageHasH1": false
    },
    {
        "id": 446,
        "pageName": "swimming-lap-pace-calculator",
        "h1": "Swimming Lap Pace Calculator – Calculate Your Swim Speed Per 100m",
        "p": "Optimize your swim training with our Swimming Lap Pace Calculator.            Enter your total distance and time to calculate your pace per 100 meters —            perfect for competitive swimmers and triathletes tracking their speed and progress.",
        "internalLinkPages": [
            445,
            260,
            389,
            302,
            426,
            203
        ],
        "pageHasH1": true
    },
    {
        "id": 447,
        "pageName": "swp-calculator",
        "h1": "SWP Calculator – Systematic Withdrawal Plan",
        "p": "Find out how long your retirement corpus will last or how much you can withdraw monthly. Plan sustainable withdrawals based on corpus size and expected returns.",
        "internalLinkPages": [
            414,
            415,
            433,
            134,
            256,
            179
        ],
        "pageHasH1": true
    },
    {
        "id": 448,
        "pageName": "tdee-calculator",
        "h1": "TDEE Calculator – Calculate Your Total Daily Energy Expenditure",
        "p": "Our TDEE calculator gives you a complete picture of your daily calorie burn. Factor in your activity level for an accurate estimate to guide weight loss, gain, or maintenance.",
        "internalLinkPages": [
            49,
            48,
            51,
            219,
            243,
            68
        ],
        "pageHasH1": false
    },
    {
        "id": 449,
        "pageName": "tea-brewing-strength-calculator",
        "h1": "Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio",
        "p": "Brew the perfect cup of tea with our Tea Brewing Strength Calculator.            Select your tea type and desired strength to get optimal steeping time,            temperature, and tea leaf quantity per cup.",
        "internalLinkPages": [
            91,
            34,
            69,
            355,
            234,
            300
        ],
        "pageHasH1": true
    },
    {
        "id": 450,
        "pageName": "telescope-magnification-calculator",
        "h1": "Telescope Magnification Calculator – Calculate Power, FOV & Exit Pupil",
        "p": "Get the most from your telescope with our Magnification Calculator. Enter your telescope's focal length and eyepiece focal length to calculate magnification power, true field of view, and exit pupil diameter — optimizing your stargazing experience.",
        "internalLinkPages": [
            445,
            446,
            447,
            448,
            449,
            451
        ],
        "pageHasH1": true
    },
    {
        "id": 451,
        "pageName": "tempo-to-delay-time-converter",
        "h1": "Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms",
        "p": "Sync your delay effects perfectly with your track's tempo using our BPM to Delay Converter. Enter your song's BPM to get delay times in milliseconds for quarter notes, eighth notes, dotted values, and more — essential for producers and guitarists.",
        "internalLinkPages": [
            290,
            175,
            464,
            398,
            86,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 452,
        "pageName": "tennis-win-probability-calculator",
        "h1": "Tennis Win Probability Calculator – Predict Match Outcome from Player Stats",
        "p": "Predict tennis match outcomes with our Win Probability Calculator.            Enter each player&apos;s serve win percentage and break point conversion            rates to calculate the probability of winning sets and the overall match.",
        "internalLinkPages": [
            36,
            102,
            103,
            171,
            191,
            502
        ],
        "pageHasH1": true
    },
    {
        "id": 453,
        "pageName": "thermal-expansion-calculator",
        "h1": "Thermal Expansion Calculator – Linear and Volumetric Expansion",
        "p": "Calculate how much a material expands or contracts with temperature change. Our thermal expansion calculator covers linear and volumetric expansion for engineering design.",
        "internalLinkPages": [
            207,
            218,
            15,
            214,
            205,
            122
        ],
        "pageHasH1": false
    },
    {
        "id": 454,
        "pageName": "tile-calculator",
        "h1": "Tile Calculator – How Many Tiles Do You Need?",
        "p": "Plan your tiling project accurately with our tile calculator. Enter room dimensions and tile size to calculate the number of tiles needed, including a recommended waste allowance.",
        "internalLinkPages": [
            169,
            78,
            80,
            304,
            325,
            489
        ],
        "pageHasH1": false
    },
    {
        "id": 455,
        "pageName": "tire-pressure-adjustment-calculator",
        "h1": "Tire Pressure Adjustment Calculator – Correct PSI for Temperature & Load",
        "p": "Maintain optimal tire pressure in all conditions with our Tire Pressure Adjustment Calculator.            Account for ambient temperature, vehicle load, and altitude to calculate the correct PSI —            improving fuel efficiency, tire life, and driving safety.",
        "internalLinkPages": [
            176,
            177,
            74,
            268,
            473,
            50
        ],
        "pageHasH1": true
    },
    {
        "id": 456,
        "pageName": "titration-calculator",
        "h1": "Titration Calculator – Find Unknown Concentration from Titration Data",
        "p": "Solve titration problems quickly with our titration calculator. Enter the volume and concentration of your titrant and analyte to find the unknown concentration of an acid or base. Essential for analytical chemistry labs.",
        "internalLinkPages": [
            319,
            208,
            324,
            326,
            146,
            95
        ],
        "pageHasH1": false
    },
    {
        "id": 457,
        "pageName": "toddler-growth-chart-calculator",
        "h1": "Toddler Growth Chart Calculator – Track Height & Weight Percentiles for Your Child",
        "p": "Monitor your child&apos;s healthy development with our Toddler Growth Chart Calculator.            Enter age, height, and weight to plot on WHO/CDC growth charts and see height and weight            percentile rankings — helping parents identify growth patterns early.",
        "internalLinkPages": [
            83,
            29,
            30,
            123,
            318,
            31
        ],
        "pageHasH1": true
    },
    {
        "id": 458,
        "pageName": "torque-calculator",
        "h1": "Torque Calculator",
        "p": "Calculate torque from force and lever arm length. τ = F × r × sin(θ)",
        "internalLinkPages": [
            54,
            408,
            376,
            342,
            182,
            385
        ],
        "pageHasH1": false
    },
    {
        "id": 459,
        "pageName": "torque-to-power-converter",
        "h1": "Torque to Power Converter – Convert Engine Torque & RPM to HP or kW",
        "p": "Calculate your engine's power output from torque and RPM with our Torque-to-Power            Converter. Enter torque in Nm or lb-ft along with RPM to get horsepower or kilowatts            instantly — perfect for automotive enthusiasts and engineers.",
        "internalLinkPages": [
            458,
            211,
            342,
            376,
            408,
            385
        ],
        "pageHasH1": true
    },
    {
        "id": 460,
        "pageName": "trail-difficulty-estimator",
        "h1": "Trail Difficulty Estimator – Calculate How Hard a Hiking Trail Really Is",
        "p": "Choose the right hiking trail for your fitness level with our Trail Difficulty Estimator.            Input trail distance, total elevation gain, and terrain type to get an objective            difficulty rating — ensuring safe and enjoyable outdoor adventures.",
        "internalLinkPages": [
            209,
            389,
            302,
            426,
            32,
            71
        ],
        "pageHasH1": true
    },
    {
        "id": 461,
        "pageName": "trapezoid-area-calculator",
        "h1": "Trapezoid Area Calculator",
        "p": "Calculate the area of a trapezoid",
        "internalLinkPages": [
            369,
            306,
            87,
            147,
            356,
            462
        ],
        "pageHasH1": false
    },
    {
        "id": 462,
        "pageName": "triangle-area-calculator",
        "h1": "Triangle Area Calculator – Find Area from Base and Height",
        "p": "Calculate the area of any triangle instantly. Enter the base and height to get the area using the standard formula – no sign-up required.",
        "internalLinkPages": [
            239,
            240,
            345,
            87,
            147,
            306
        ],
        "pageHasH1": false
    },
    {
        "id": 463,
        "pageName": "trip-cost-estimator",
        "h1": "Trip Cost Estimator – Plan Your Road Trip Budget with Ease",
        "p": "Plan your next road trip with confidence using our Trip Cost Estimator. Calculate total            travel expenses including fuel, tolls, meals, and lodging all in one place. Get a full            cost breakdown before you hit the road.",
        "internalLinkPages": [
            176,
            177,
            268,
            259,
            50,
            74
        ],
        "pageHasH1": true
    },
    {
        "id": 464,
        "pageName": "tuning-frequency-converter",
        "h1": "Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch",
        "p": "Explore alternative tuning standards with our Tuning Frequency Converter.            Change the A4 reference pitch from 440Hz to 432Hz, 444Hz, or any custom value            and see how every note&apos;s frequency adjusts — useful for musicians working            with different orchestras and DAWs.",
        "internalLinkPages": [
            451,
            290,
            175,
            398,
            86,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 465,
        "pageName": "typography-scale-calculator",
        "h1": "Typography Scale Calculator – Generate a Harmonious Font Size Scale",
        "p": "Create beautiful typographic hierarchies with our Typography Scale Calculator.            Enter your base font size and choose a scale ratio to generate a complete            heading scale — perfect for web designers and UI developers.",
        "internalLinkPages": [
            246,
            189,
            190,
            199,
            72,
            316
        ],
        "pageHasH1": true
    },
    {
        "id": 466,
        "pageName": "unit-price-calculator",
        "h1": "Unit Price Calculator",
        "p": "Calculate the cost per unit of any product or purchase. Enter total quantity and total cost to find the per-unit price and assess cost efficiency.",
        "internalLinkPages": [
            461,
            462,
            463,
            464,
            465,
            467
        ],
        "pageHasH1": true
    },
    {
        "id": 467,
        "pageName": "ups-generator-runtime-calculator",
        "h1": "UPS & Generator Runtime Calculator – How Long Will Your Backup Power Last?",
        "p": "Know exactly how long your UPS or generator will run during a power outage.            Enter battery or fuel capacity and total connected load to calculate expected            runtime — critical for emergency preparedness and business continuity planning.",
        "internalLinkPages": [
            468,
            225,
            144,
            37,
            39,
            38
        ],
        "pageHasH1": true
    },
    {
        "id": 468,
        "pageName": "ups-load-calculator",
        "h1": "UPS Load Calculator – Calculate UPS Capacity & Runtime for Your Equipment",
        "p": "Make sure your UPS can handle your equipment with our UPS Load Calculator. Enter the            wattage of connected devices and your UPS battery rating to determine total load,            required VA rating, and estimated backup runtime.",
        "internalLinkPages": [
            467,
            225,
            144,
            37,
            39,
            38
        ],
        "pageHasH1": true
    },
    {
        "id": 469,
        "pageName": "valuation-cap-calculator",
        "h1": "Valuation Cap Calculator – SAFE & Convertible Notes",
        "p": "Calculate the effective conversion price of a SAFE or convertible note at a priced round. Enter the valuation cap and pre-money valuation to find the conversion price.",
        "internalLinkPages": [
            431,
            387,
            436,
            435,
            367,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 470,
        "pageName": "vapor-pressure-calculator",
        "h1": "Vapor Pressure Calculator – Calculate Vapor Pressure at Any Temperature",
        "p": "Determine the vapor pressure of a substance at any temperature using our vapor pressure calculator. Based on the Clausius-Clapeyron and Antoine equations, it's ideal for physical chemistry, thermodynamics, and engineering applications.",
        "internalLinkPages": [
            218,
            15,
            214,
            122,
            205,
            503
        ],
        "pageHasH1": false
    },
    {
        "id": 471,
        "pageName": "variance-calculator",
        "h1": "Variance Calculator – Calculate Population and Sample Variance",
        "p": "Calculate population and sample variance",
        "internalLinkPages": [
            430,
            266,
            272,
            350,
            28,
            516
        ],
        "pageHasH1": false
    },
    {
        "id": 472,
        "pageName": "vehicle-depreciation-calculator",
        "h1": "Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value",
        "p": "Estimate your car's current market value and total depreciation with our Vehicle            Depreciation Calculator. Enter the original purchase price, vehicle age, and annual            mileage to see how much value your car has lost — ideal for resale planning and            insurance purposes.",
        "internalLinkPages": [
            74,
            120,
            176,
            177,
            351,
            157
        ],
        "pageHasH1": true
    },
    {
        "id": 473,
        "pageName": "vehicle-turning-radius-calculator",
        "h1": "Vehicle Turning Radius Calculator – Calculate Minimum Turning Circle for Any Car",
        "p": "Plan parking and maneuvering with precision using our Vehicle Turning Radius Calculator.            Enter wheelbase, front track width, and maximum steering angle to calculate the minimum            turning circle — useful for driving schools, fleet managers, and automotive engineers.",
        "internalLinkPages": [
            50,
            182,
            385,
            458,
            474,
            7
        ],
        "pageHasH1": true
    },
    {
        "id": 474,
        "pageName": "velocity-calculator",
        "h1": "Velocity Calculator – Calculate Speed with Direction",
        "p": "Calculate velocity from displacement and time. Unlike speed, velocity includes direction – making it a vector quantity essential for physics and engineering calculations.",
        "internalLinkPages": [
            7,
            1,
            278,
            233,
            50,
            302
        ],
        "pageHasH1": false
    },
    {
        "id": 475,
        "pageName": "ventilation-rate-calculator",
        "h1": "Ventilation Rate Calculator – Calculate Required Airflow (ACH & CFM) per ASHRAE",
        "p": "Design healthy indoor spaces with our Ventilation Rate Calculator.            Enter room volume, occupancy, and space type to calculate the required            air changes per hour (ACH) and CFM airflow rate per ASHRAE 62.1 standards.",
        "internalLinkPages": [
            215,
            216,
            198,
            220,
            14,
            84
        ],
        "pageHasH1": true
    },
    {
        "id": 476,
        "pageName": "vo2-max-calculator",
        "h1": "VO2 Max Calculator – Estimate Your Aerobic Fitness Level",
        "p": "Measure your cardiovascular fitness with our VO2 max calculator. Estimate your maximal oxygen uptake using simple field test data and compare your results to fitness norms.",
        "internalLinkPages": [
            203,
            204,
            235,
            389,
            260,
            302
        ],
        "pageHasH1": false
    },
    {
        "id": 477,
        "pageName": "voltage-calculator",
        "h1": "Voltage Calculator",
        "p": "Calculate voltage using Ohm's Law (V = IR), from power and current (V = P/I), or from power and resistance (V = √(PR)).",
        "internalLinkPages": [
            296,
            363,
            105,
            143,
            6,
            311
        ],
        "pageHasH1": false
    },
    {
        "id": 478,
        "pageName": "volume-of-cone-calculator",
        "h1": "Volume of Cone Calculator",
        "p": "Calculate volume and surface area of a cone",
        "internalLinkPages": [
            479,
            480,
            481,
            482,
            483,
            87
        ],
        "pageHasH1": false
    },
    {
        "id": 479,
        "pageName": "volume-of-cube-calculator",
        "h1": "Volume of Cube Calculator – Calculate Cube Volume and Surface Area",
        "p": "Calculate volume and surface area of a cube",
        "internalLinkPages": [
            478,
            480,
            481,
            482,
            483,
            87
        ],
        "pageHasH1": false
    },
    {
        "id": 480,
        "pageName": "volume-of-cuboid-calculator",
        "h1": "Volume of Cuboid Calculator",
        "p": "Calculate volume and surface area of a rectangular prism",
        "internalLinkPages": [
            478,
            479,
            481,
            482,
            483,
            87
        ],
        "pageHasH1": false
    },
    {
        "id": 481,
        "pageName": "volume-of-cylinder-calculator",
        "h1": "Volume of Cylinder Calculator",
        "p": "Calculate volume and surface area of a cylinder",
        "internalLinkPages": [
            478,
            479,
            480,
            482,
            483,
            87
        ],
        "pageHasH1": false
    },
    {
        "id": 482,
        "pageName": "volume-of-pyramid-calculator",
        "h1": "Volume of Pyramid Calculator",
        "p": "Calculate volume of a rectangular pyramid",
        "internalLinkPages": [
            478,
            479,
            480,
            481,
            483,
            87
        ],
        "pageHasH1": false
    },
    {
        "id": 483,
        "pageName": "volume-of-sphere-calculator",
        "h1": "Volume of Sphere Calculator – Find Volume and Surface Area",
        "p": "Calculate the volume and surface area of a sphere instantly. Enter the radius to get all measurements using the standard formulas – perfect for geometry, engineering, and science.",
        "internalLinkPages": [
            478,
            479,
            480,
            481,
            482,
            87
        ],
        "pageHasH1": false
    },
    {
        "id": 484,
        "pageName": "volumetric-weight-calculator",
        "h1": "Volumetric Weight Calculator – Calculate Dimensional Weight for Shipping",
        "p": "Avoid shipping cost surprises with our Volumetric Weight Calculator.            Enter your parcel&apos;s dimensions to calculate dimensional weight using            standard carrier divisors — and see which weight (actual vs. volumetric)            will be charged.",
        "internalLinkPages": [
            125,
            98,
            305,
            77,
            490,
            237
        ],
        "pageHasH1": true
    },
    {
        "id": 485,
        "pageName": "wacc-calculator",
        "h1": "WACC Calculator – Weighted Average Cost of Capital",
        "p": "Calculate your company's Weighted Average Cost of Capital using equity, debt, tax rate, and their proportions in the capital structure.",
        "internalLinkPages": [
            99,
            142,
            287,
            298,
            338,
            378
        ],
        "pageHasH1": true
    },
    {
        "id": 486,
        "pageName": "waist-to-height-ratio-calculator",
        "h1": "Waist-to-Height Ratio Calculator – Assess Your Health Risk",
        "p": "The waist-to-height ratio is a powerful predictor of health risks. Use our calculator to see where you stand and get insights on cardiovascular and metabolic health.",
        "internalLinkPages": [
            48,
            51,
            52,
            219,
            243,
            487
        ],
        "pageHasH1": false
    },
    {
        "id": 487,
        "pageName": "waist-to-hip-ratio-calculator",
        "h1": "Waist-to-Hip Ratio Calculator – Check Your Body Shape & Health Risk",
        "p": "Find your waist-to-hip ratio and understand what it means for your health. Our calculator helps identify risk levels for heart disease, diabetes, and other conditions.",
        "internalLinkPages": [
            486,
            48,
            51,
            52,
            219,
            243
        ],
        "pageHasH1": false
    },
    {
        "id": 488,
        "pageName": "walking-calorie-calculator",
        "h1": "Walking Calorie Calculator – How Many Calories Do You Burn Walking?",
        "p": "Find out how many calories you burn walking with our free calculator. Input your weight, speed, and duration to get an accurate calorie expenditure estimate for any walk.",
        "internalLinkPages": [
            445,
            109,
            9,
            434,
            68,
            111
        ],
        "pageHasH1": false
    },
    {
        "id": 489,
        "pageName": "wallpaper-calculator",
        "h1": "Wallpaper Calculator – Calculate How Many Rolls You Need for Your Room",
        "p": "Avoid over- or under-buying wallpaper with our free Wallpaper Calculator. Enter your            room dimensions and roll size to instantly find out how many rolls you need, including            a waste allowance for pattern matching.",
        "internalLinkPages": [
            169,
            78,
            304,
            325,
            454,
            80
        ],
        "pageHasH1": true
    },
    {
        "id": 490,
        "pageName": "warehouse-storage-volume-calculator",
        "h1": "Warehouse Storage Volume Calculator – Calculate Usable Warehouse Capacity",
        "p": "Maximize your warehouse efficiency with our Storage Volume Calculator.            Enter building dimensions and racking configuration to calculate total            usable storage volume and estimated pallet positions — critical for            logistics planning.",
        "internalLinkPages": [
            98,
            125,
            484,
            305,
            77,
            237
        ],
        "pageHasH1": true
    },
    {
        "id": 491,
        "pageName": "warm-up-calculator",
        "h1": "Warm-Up Calculator – Build the Perfect Warm-Up Set Progression",
        "p": "Prepare your body and CNS for heavy lifting. Our warm-up calculator generates a complete set-by-set warm-up progression leading up to your working weight.",
        "internalLinkPages": [
            2,
            438,
            510,
            512,
            389,
            204
        ],
        "pageHasH1": false
    },
    {
        "id": 492,
        "pageName": "water-flow-rate-calculator",
        "h1": "Water Flow Rate Calculator – Calculate Flow Rate in Pipes",
        "p": "Determine water or fluid flow rates quickly with our flow rate calculator. Enter pipe diameter and velocity to calculate volumetric flow in liters per second or gallons per minute.",
        "internalLinkPages": [
            323,
            494,
            321,
            322,
            202,
            258
        ],
        "pageHasH1": false
    },
    {
        "id": 493,
        "pageName": "water-requirement-calculator",
        "h1": "Water Intake Calculator – How Much Water Should You Drink Per Day?",
        "p": "Staying hydrated is vital. Use our water requirement calculator to find your personalized daily water intake goal based on your body weight, exercise habits, and environment.",
        "internalLinkPages": [
            228,
            104,
            165,
            317,
            405,
            421
        ],
        "pageHasH1": false
    },
    {
        "id": 494,
        "pageName": "water-tank-volume-calculator",
        "h1": "Water Tank Volume Calculator – Calculate Tank Capacity in Liters & Gallons",
        "p": "Quickly find out how much water your tank can hold with our Water Tank Volume            Calculator. Supports cylindrical, rectangular, and other tank shapes. Get results in            liters, gallons, or cubic meters instantly.",
        "internalLinkPages": [
            492,
            323,
            493,
            22,
            23,
            258
        ],
        "pageHasH1": true
    },
    {
        "id": 495,
        "pageName": "wavelength-calculator",
        "h1": "Wavelength Calculator – Calculate Wavelength from Frequency",
        "p": "Find the wavelength of any wave using our wavelength calculator. Enter frequency and wave speed to calculate λ = v/f for electromagnetic, sound, or water waves.",
        "internalLinkPages": [
            175,
            320,
            137,
            425,
            290,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 496,
        "pageName": "wealth-growth-projection-calculator",
        "h1": "Wealth Growth Projection Calculator",
        "p": "Project your portfolio's value year by year. Enter current savings, monthly contributions, and expected annual return to visualize your long-term wealth trajectory.",
        "internalLinkPages": [
            179,
            93,
            94,
            412,
            388,
            226
        ],
        "pageHasH1": true
    },
    {
        "id": 497,
        "pageName": "week-number-calculator",
        "h1": "Week Number Calculator – Find ISO Week Number for Any Date",
        "p": "Look up the week number for any date instantly. Our ISO week number calculator also shows the start and end dates for any given week of the year.",
        "internalLinkPages": [
            113,
            114,
            13,
            18,
            65,
            368
        ],
        "pageHasH1": false
    },
    {
        "id": 498,
        "pageName": "weight-distribution-calculator",
        "h1": "Weight Distribution Calculator – Calculate Load Distribution Across Axles & Points",
        "p": "Ensure safe load distribution with our Weight Distribution Calculator.            Enter total load weight and distance from each support point or axle to calculate            the weight carried at each point — essential for truck loading, trailer towing,            and structural engineering.",
        "internalLinkPages": [
            493,
            494,
            495,
            496,
            497,
            499
        ],
        "pageHasH1": true
    },
    {
        "id": 499,
        "pageName": "weight-loss-time-calculator",
        "h1": "Weight Loss Time Calculator – How Long Will It Take to Lose Weight?",
        "p": "Plan your weight loss journey with confidence. Enter your current weight, goal weight, and daily deficit to see a realistic timeline for reaching your target.",
        "internalLinkPages": [
            494,
            495,
            496,
            497,
            498,
            500
        ],
        "pageHasH1": false
    },
    {
        "id": 500,
        "pageName": "weighted-average-calculator",
        "h1": "Weighted Average Calculator",
        "p": "Calculate weighted average with custom weights",
        "internalLinkPages": [
            28,
            266,
            272,
            350,
            430,
            471
        ],
        "pageHasH1": false
    },
    {
        "id": 501,
        "pageName": "welding-strength-calculator",
        "h1": "Welding Strength Calculator – Calculate Weld Strength",
        "p": "Calculate the strength of welds based on weld type, size, and electrode strength. Essential for structural design.",
        "internalLinkPages": [
            392,
            439,
            40,
            163,
            372,
            54
        ],
        "pageHasH1": false
    },
    {
        "id": 502,
        "pageName": "win-rate-estimator",
        "h1": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio",
        "p": "Measure your competitive edge with our Win Rate Estimator. Enter total games            played along with wins and losses to calculate your win rate percentage and            win/loss ratio — valuable for tracking improvement across any competitive game.",
        "internalLinkPages": [
            36,
            102,
            103,
            171,
            191,
            452
        ],
        "pageHasH1": true
    },
    {
        "id": 503,
        "pageName": "wind-chill-calculator",
        "h1": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
        "p": "Dress appropriately for the weather with our Wind Chill Calculator. Enter the air temperature and wind speed to calculate the real feel temperature — essential for outdoor activity planning in cold and windy conditions.",
        "internalLinkPages": [
            498,
            499,
            500,
            501,
            502,
            504
        ],
        "pageHasH1": true
    },
    {
        "id": 504,
        "pageName": "window-area-calculator",
        "h1": "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss",
        "p": "Calculate the exact area of your windows with our Window Area Calculator.            Enter window dimensions to find total glazing area — useful for ordering glass,            estimating heat loss, and window treatment planning.",
        "internalLinkPages": [
            78,
            169,
            106,
            303,
            304,
            454
        ],
        "pageHasH1": true
    },
    {
        "id": 505,
        "pageName": "wine-abv-calculator",
        "h1": "Wine ABV Calculator – Calculate Alcohol Content in Homemade Wine",
        "p": "Measure the strength of your homemade wine with our Wine ABV Calculator.            Use initial and final hydrometer gravity readings or Brix sugar levels to            calculate ABV percentage — perfect for home winemakers and fermentation enthusiasts.",
        "internalLinkPages": [
            41,
            90,
            16,
            91,
            449,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 506,
        "pageName": "wire-gauge-calculator",
        "h1": "Wire Gauge Calculator – Calculate Required Wire Size",
        "p": "Determine the appropriate wire gauge for your electrical project. Our calculator considers current, length, voltage, and acceptable voltage drop to recommend the right AWG size.",
        "internalLinkPages": [
            244,
            296,
            363,
            310,
            144,
            407
        ],
        "pageHasH1": false
    },
    {
        "id": 507,
        "pageName": "wood-board-feet-calculator",
        "h1": "Wood Board Feet Calculator – Calculate Lumber Board Footage Instantly",
        "p": "Price and plan your woodworking projects accurately with our Wood Board Feet Calculator.            Enter the thickness, width, and length of each board to calculate total board feet —            the standard unit for buying and selling lumber.",
        "internalLinkPages": [
            502,
            503,
            504,
            505,
            506,
            508
        ],
        "pageHasH1": true
    },
    {
        "id": 508,
        "pageName": "work-calculator",
        "h1": "Work Calculator",
        "p": "Calculate mechanical work done. Enter force and distance, with an optional angle for W = Fd cos(θ).",
        "internalLinkPages": [
            152,
            328,
            233,
            278,
            474,
            427
        ],
        "pageHasH1": false
    },
    {
        "id": 509,
        "pageName": "working-capital-calculator",
        "h1": "Working Capital Calculator",
        "p": "Assess your company's short-term financial health. Calculate net working capital and the working capital ratio from current assets and current liabilities.",
        "internalLinkPages": [
            142,
            287,
            298,
            338,
            99,
            485
        ],
        "pageHasH1": true
    },
    {
        "id": 510,
        "pageName": "workout-max-reps-estimator",
        "h1": "Max Reps Estimator – How Many Reps Can You Do at a Given Weight?",
        "p": "Predict how many reps you can complete with any weight using your 1RM. Our max reps estimator helps you program training weights intelligently.",
        "internalLinkPages": [
            2,
            438,
            491,
            512,
            389,
            204
        ],
        "pageHasH1": false
    },
    {
        "id": 511,
        "pageName": "workout-rest-timer",
        "h1": "Workout Rest Timer – Optimal Rest Time Between Sets Calculator",
        "p": "Rest the right amount between sets to hit your goals. Our workout rest timer recommends evidence-based rest periods for strength, muscle building, or endurance training.",
        "internalLinkPages": [
            267,
            61,
            416,
            417,
            419,
            1
        ],
        "pageHasH1": false
    },
    {
        "id": 512,
        "pageName": "workout-volume-calculator",
        "h1": "Workout Volume Calculator – Track Your Total Training Volume",
        "p": "Monitor your workout progress with our training volume calculator. Calculate total sets, reps, and weight lifted to ensure progressive overload and consistent gains.",
        "internalLinkPages": [
            2,
            438,
            491,
            510,
            389,
            204
        ],
        "pageHasH1": false
    },
    {
        "id": 513,
        "pageName": "xp-progression-calculator",
        "h1": "XP Progression Calculator – Calculate How Long to Reach Your Target Level",
        "p": "Plan your grinding sessions with our XP Progression Calculator.            Enter your current XP, target level XP threshold, and average XP per hour            to see how long it will take to level up in your favorite RPG or online game.",
        "internalLinkPages": [
            230,
            502,
            180,
            255,
            349,
            1
        ],
        "pageHasH1": true
    },
    {
        "id": 514,
        "pageName": "yeast-conversion-calculator",
        "h1": "Yeast Conversion Calculator – Convert Between Dry, Instant & Fresh Yeast",
        "p": "Substitute yeast types without ruining your recipe using our Yeast Conversion Calculator.            Convert between active dry yeast, instant yeast, and fresh yeast with accurate ratios —            perfect for bakers who need to work with what&apos;s available.",
        "internalLinkPages": [
            34,
            449,
            91,
            69,
            355,
            234
        ],
        "pageHasH1": true
    },
    {
        "id": 515,
        "pageName": "yield-to-maturity-calculator",
        "h1": "Yield-to-Maturity (YTM) Calculator",
        "p": "Calculate the total annualized return of a bond held to maturity. Factors in coupon payments, purchase price, face value, and time remaining to maturity.",
        "internalLinkPages": [
            55,
            56,
            57,
            58,
            292,
            309
        ],
        "pageHasH1": true
    },
    {
        "id": 516,
        "pageName": "z-score-calculator",
        "h1": "Z-Score Calculator",
        "p": "Calculate the standard score and percentile",
        "internalLinkPages": [
            430,
            471,
            352,
            28,
            266,
            272
        ],
        "pageHasH1": false
    },
    {
        "id": 517,
        "pageName": "zodiac-sign-calculator",
        "h1": "Zodiac Sign Calculator – Free Western Astrology Sign Finder",
        "p": "Discover your Western zodiac sign from your birth date. Get detailed information about your sign including element, ruling planet, date range, and key personality traits.",
        "internalLinkPages": [
            13,
            18,
            44,
            1,
            2,
            3
        ],
        "pageHasH1": false
    }
]

const BASE_FOLDER = "app/calculators";

function pageNameToTitle(pageName) {
    return pageName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function generateLayout(page, allPages) {
    const { h1, p, pageName, internalLinkPages, pageHasH1 } = page;

    const canonical = `https://1000freetools.com/calculators/${pageName}`;

    // Build tools array from internalLinkPages ids
    const tools = internalLinkPages
        .map((id) => {
            const linked = allPages.find((pg) => pg.id === id);
            if (!linked) return null;
            return {
                name: pageNameToTitle(linked.pageName),
                description: linked.h1,
                href: `/${linked.pageName}`,
            };
        })
        .filter(Boolean);

    const toolsJson = JSON.stringify(tools, null, 2);

    const headerBlock = !pageHasH1
        ? `      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">${h1}</h1>
        <p className="text-muted-foreground">${p}</p>
      </header>
      `
        : "";

    const headerImport = !pageHasH1
        ? ""
        : "";

    return `import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "${h1}",
  description: "${p}",
  alternates: {
    canonical: "${canonical}",
  },
};

const tools = ${toolsJson};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      ${headerBlock}{children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
`;
}

function run() {
    let created = 0;
    let skipped = 0;
    let missing = 0;

    for (const page of pagesData) {
        const dirPath = path.join(BASE_FOLDER, page.pageName);

        if (!fs.existsSync(dirPath)) {
            console.warn(`⚠️  Directory not found, skipping: ${dirPath}`);
            missing++;
            continue;
        }

        const layoutPath = path.join(dirPath, "layout.tsx");

        if (fs.existsSync(layoutPath)) {
            console.log(`⏭️  layout.tsx already exists, skipping: ${layoutPath}`);
            skipped++;
            continue;
        }

        const content = generateLayout(page, pagesData);
        fs.writeFileSync(layoutPath, content, "utf-8");
        console.log(`✅ Created: ${layoutPath}`);
        created++;
    }

    console.log(`\nDone. Created: ${created} | Skipped: ${skipped} | Missing dirs: ${missing}`);
}

run();

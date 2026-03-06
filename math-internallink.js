const fs = require("fs");
const path = require("path");

const linkMapping = {
  1: [2, 3, 4, 7, 8, 9, 34, 35],
  2: [1, 7, 8, 19, 57, 58, 96, 97],
  3: [41, 42, 43, 1, 4, 23, 24, 3],
  4: [168, 107, 113, 114, 5, 1, 81, 6],
  5: [5, 4, 23, 24, 6, 81, 1, 41],
  6: [66, 81, 82, 83, 67, 84, 85, 169],
  7: [8, 7, 2, 1, 48, 64, 44, 19],
  8: [7, 19, 2, 1, 33, 100, 8, 96],
  9: [155, 27, 174, 17, 23, 152, 154, 156],
  10: [1, 2, 10, 131, 11, 15, 16, 36],
  11: [12, 13, 15, 16, 14, 51, 1, 2],
  12: [11, 13, 14, 15, 16, 18, 1, 2],
  13: [11, 12, 14, 15, 16, 86, 90, 1],
  14: [12, 11, 16, 18, 96, 100, 126, 2],
  15: [11, 12, 16, 131, 10, 1, 13, 2],
  16: [11, 12, 14, 15, 18, 17, 1, 2],
  17: [22, 23, 24, 28, 21, 27, 9, 16],
  18: [16, 12, 14, 148, 147, 11, 1, 2],
  19: [20, 8, 2, 7, 33, 100, 19, 96],
  20: [19, 8, 2, 7, 33, 19, 96, 100],
  21: [22, 17, 27, 28, 29, 156, 23, 174],
  22: [21, 17, 23, 24, 28, 27, 156, 174],
  23: [24, 17, 22, 27, 28, 3, 41, 155],
  24: [23, 17, 22, 27, 28, 3, 41, 155],
  25: [141, 142, 145, 147, 148, 144, 146, 175],
  26: [152, 153, 154, 149, 150, 32, 125, 33],
  27: [174, 17, 23, 9, 21, 22, 28, 155],
  28: [17, 23, 24, 22, 27, 21, 9, 169],
  29: [21, 30, 31, 172, 156, 17, 27, 22],
  30: [29, 31, 172, 173, 21, 27, 174, 177],
  31: [30, 173, 29, 172, 174, 21, 27, 177],
  32: [26, 40, 33, 1, 32, 116, 117, 2],
  33: [39, 38, 8, 19, 32, 2, 1, 37],
  34: [35, 36, 1, 9, 166, 3, 43, 2],
  35: [34, 36, 1, 87, 166, 2, 37, 9],
  36: [34, 35, 1, 10, 16, 2, 170, 11],
  37: [1, 2, 34, 35, 36, 87, 152, 154],
  38: [39, 171, 33, 1, 2, 41, 42, 6],
  39: [38, 33, 171, 2, 1, 6, 3, 37],
  40: [32, 26, 1, 172, 33, 2, 169, 131],
  41: [42, 3, 43, 38, 5, 23, 24, 1],
  42: [41, 3, 43, 38, 5, 23, 24, 1],
  43: [3, 41, 42, 6, 81, 1, 23, 24],
  44: [45, 54, 47, 46, 48, 53, 55, 44],
  45: [44, 54, 48, 55, 53, 46, 47, 64],
  46: [47, 44, 45, 54, 121, 46, 120, 116],
  47: [46, 44, 45, 54, 48, 55, 64, 53],
  48: [64, 55, 52, 62, 61, 44, 45, 49],
  49: [50, 51, 56, 133, 48, 64, 55, 52],
  50: [49, 51, 56, 133, 48, 52, 64, 55],
  51: [49, 50, 56, 133, 76, 102, 126, 11],
  52: [55, 64, 48, 61, 62, 65, 53, 57],
  53: [44, 45, 52, 54, 55, 64, 57, 59],
  54: [44, 45, 47, 46, 53, 48, 175, 64],
  55: [52, 61, 62, 64, 48, 57, 65, 58],
  56: [49, 50, 51, 133, 126, 48, 55, 52],
  57: [58, 59, 60, 63, 61, 62, 64, 55],
  58: [57, 59, 60, 63, 61, 62, 64, 65],
  59: [57, 58, 60, 63, 52, 53, 2, 65],
  60: [57, 58, 59, 63, 61, 62, 2, 64],
  61: [62, 55, 52, 57, 58, 60, 64, 65],
  62: [61, 55, 52, 57, 58, 60, 64, 65],
  63: [57, 58, 59, 60, 61, 62, 64, 131],
  64: [48, 55, 52, 61, 62, 57, 44, 65],
  65: [64, 55, 52, 57, 61, 62, 48, 58],
  66: [67, 72, 73, 74, 84, 85, 79, 6],
  67: [66, 72, 73, 74, 84, 85, 75, 6],
  68: [69, 70, 71, 73, 66, 67, 80, 84],
  69: [70, 71, 68, 147, 148, 25, 164, 165],
  70: [69, 71, 68, 147, 148, 25, 164, 165],
  71: [69, 70, 68, 147, 148, 25, 37, 164],
  72: [73, 67, 66, 74, 75, 76, 84, 85],
  73: [72, 67, 66, 74, 75, 76, 84, 85],
  74: [73, 72, 67, 66, 75, 76, 84, 85],
  75: [76, 67, 72, 73, 74, 127, 66, 84],
  76: [75, 127, 51, 67, 72, 73, 74, 66],
  77: [78, 79, 80, 127, 66, 67, 85, 129],
  78: [129, 130, 77, 80, 66, 127, 128, 79],
  79: [84, 85, 77, 66, 67, 80, 127, 72],
  80: [77, 66, 67, 79, 84, 85, 127, 72],
  81: [6, 82, 83, 66, 67, 84, 43, 5],
  82: [83, 81, 6, 66, 67, 84, 75, 4],
  83: [82, 81, 6, 66, 67, 84, 146, 5],
  84: [85, 79, 66, 67, 72, 73, 80, 6],
  85: [84, 79, 66, 67, 72, 73, 80, 6],
  86: [87, 88, 89, 90, 92, 91, 93, 94],
  87: [86, 88, 89, 90, 92, 91, 93, 95],
  88: [86, 87, 89, 90, 92, 91, 93, 94],
  89: [90, 86, 87, 88, 92, 93, 95, 91],
  90: [89, 86, 87, 88, 92, 93, 95, 91],
  91: [86, 87, 88, 89, 90, 92, 93, 94],
  92: [86, 87, 88, 89, 90, 91, 93, 94],
  93: [86, 87, 88, 89, 90, 92, 94, 95],
  94: [86, 87, 88, 89, 90, 91, 92, 93],
  95: [89, 90, 86, 87, 88, 93, 92, 91],
  96: [97, 98, 99, 100, 101, 102, 2, 14],
  97: [96, 98, 99, 100, 101, 102, 2, 126],
  98: [96, 97, 99, 100, 101, 102, 2, 14],
  99: [97, 96, 98, 100, 101, 102, 126, 2],
  100: [96, 97, 98, 99, 101, 102, 2, 19],
  101: [96, 102, 51, 97, 98, 99, 126, 2],
  102: [101, 96, 51, 97, 98, 99, 126, 2],
  103: [104, 105, 109, 110, 106, 111, 4, 1],
  104: [103, 105, 109, 110, 106, 111, 4, 1],
  105: [104, 103, 109, 110, 106, 111, 4, 1],
  106: [108, 113, 104, 103, 107, 109, 110, 4],
  107: [4, 168, 114, 112, 113, 106, 103, 1],
  108: [106, 113, 103, 104, 109, 110, 4, 1],
  109: [110, 104, 103, 111, 105, 103, 106, 4],
  110: [109, 104, 103, 111, 105, 106, 4, 1],
  111: [109, 110, 104, 103, 105, 106, 4, 1],
  112: [4, 107, 114, 1, 168, 113, 5, 103],
  113: [106, 108, 104, 107, 4, 168, 112, 1],
  114: [4, 107, 112, 113, 168, 103, 1, 5],
  115: [116, 117, 118, 119, 120, 121, 4, 107],
  116: [117, 118, 119, 120, 121, 122, 115, 44],
  117: [116, 118, 119, 120, 121, 122, 115, 1],
  118: [116, 117, 119, 120, 121, 122, 115, 2],
  119: [116, 117, 118, 120, 121, 122, 115, 1],
  120: [116, 117, 118, 119, 121, 122, 115, 44],
  121: [116, 117, 118, 119, 120, 122, 115, 46],
  122: [116, 117, 118, 119, 120, 121, 115, 157],
  123: [116, 117, 118, 119, 120, 121, 122, 124],
  124: [116, 117, 118, 119, 120, 121, 122, 123],
  125: [26, 152, 153, 154, 116, 117, 122, 1],
  126: [133, 56, 51, 127, 96, 97, 14, 76],
  127: [76, 75, 126, 128, 77, 80, 133, 56],
  128: [129, 130, 77, 78, 127, 76, 80, 66],
  129: [78, 130, 128, 77, 80, 66, 127, 76],
  130: [78, 129, 128, 77, 80, 66, 127, 76],
  131: [133, 15, 10, 11, 49, 50, 126, 169],
  132: [134, 135, 136, 137, 138, 139, 140, 77],
  133: [49, 50, 51, 56, 126, 131, 52, 55],
  134: [135, 136, 137, 138, 139, 140, 132, 68],
  135: [134, 136, 137, 138, 139, 140, 132, 68],
  136: [134, 135, 137, 138, 139, 140, 132, 68],
  137: [134, 135, 136, 138, 139, 140, 132, 68],
  138: [134, 135, 136, 137, 139, 140, 132, 68],
  139: [134, 135, 136, 137, 138, 140, 132, 68],
  140: [134, 135, 136, 137, 138, 139, 132, 68],
  141: [143, 145, 142, 144, 25, 146, 6, 81],
  142: [144, 145, 141, 143, 25, 146, 82, 6],
  143: [141, 145, 142, 144, 25, 146, 6, 81],
  144: [142, 145, 141, 143, 25, 146, 82, 6],
  145: [141, 142, 143, 144, 25, 146, 6, 12],
  146: [141, 142, 143, 144, 145, 83, 25, 98],
  147: [148, 18, 25, 69, 70, 71, 149, 1],
  148: [147, 18, 12, 69, 70, 71, 25, 1],
  149: [150, 151, 152, 154, 26, 125, 2, 36],
  150: [149, 151, 152, 154, 26, 125, 2, 36],
  151: [149, 150, 152, 154, 26, 125, 2, 36],
  152: [153, 154, 26, 149, 150, 151, 125, 36],
  153: [152, 154, 26, 149, 150, 151, 125, 36],
  154: [152, 153, 26, 149, 150, 151, 125, 36],
  155: [9, 23, 24, 156, 27, 174, 152, 21],
  156: [155, 9, 23, 24, 21, 22, 27, 174],
  157: [158, 159, 160, 161, 162, 163, 6, 1],
  158: [157, 159, 160, 161, 162, 163, 1, 6],
  159: [157, 158, 160, 161, 162, 163, 1, 6],
  160: [157, 158, 159, 161, 162, 163, 25, 1],
  161: [157, 158, 159, 160, 162, 163, 1, 6],
  162: [157, 158, 159, 160, 161, 163, 122, 1],
  163: [157, 158, 159, 160, 161, 162, 122, 1],
  164: [165, 68, 69, 70, 164, 1, 25, 71],
  165: [164, 68, 69, 70, 71, 25, 1, 176],
  166: [35, 34, 1, 87, 36, 25, 2, 167],
  167: [4, 168, 6, 66, 81, 1, 167, 74],
  168: [4, 107, 113, 114, 167, 1, 103, 5],
  169: [6, 66, 84, 85, 80, 28, 169, 131],
  170: [11, 12, 13, 36, 16, 1, 2, 15],
  171: [38, 39, 33, 1, 2, 36, 6, 169],
  172: [30, 31, 173, 174, 29, 40, 1, 21],
  173: [31, 172, 174, 30, 29, 40, 1, 21],
  174: [27, 9, 17, 23, 155, 172, 173, 21],
  175: [25, 54, 7, 19, 8, 2, 1, 176],
  176: [177, 164, 165, 25, 175, 1, 147, 29],
  177: [176, 31, 30, 172, 29, 164, 165, 1],
};

const pageIds = {
  "standard-calculator": 1,
  "scientific-calculator": 2,
  "fraction-calculator": 3,
  "percentage-calculator": 4,
  "ratio-calculator": 5,
  "average-calculator": 6,
  "square-root-calculator": 7,
  "exponent-calculator": 8,
  "modulo-calculator": 9,
  "absolute-value-calculator": 10,
  "linear-equation-solver": 11,
  "quadratic-equation-solver": 12,
  "system-of-equations-solver": 13,
  "polynomial-evaluator": 14,
  "inequality-solver": 15,
  "simplify-expression": 16,
  "factor-calculator": 17,
  "expand-simplify-binomials": 18,
  "logarithm-calculator": 19,
  "antilogarithm-calculator": 20,
  "prime-number-checker": 21,
  "prime-factorization-calculator": 22,
  "gcd-hcf-calculator": 23,
  "lcm-calculator": 24,
  "fibonacci-generator": 25,
  "number-base-converter": 26,
  "divisibility-checker": 27,
  "factors-list-generator": 28,
  "perfect-number-checker": 29,
  "armstrong-number-checker": 30,
  "palindrome-number-checker": 31,
  "roman-numeral-converter": 32,
  "scientific-notation-converter": 33,
  "long-division-calculator": 34,
  "long-multiplication-calculator": 35,
  "order-of-operations-solver": 36,
  "big-number-calculator": 37,
  "rounding-calculator": 38,
  "significant-figures-calculator": 39,
  "number-word-converter": 40,
  "decimal-to-fraction-converter": 41,
  "fraction-to-decimal-converter": 42,
  "mixed-number-calculator": 43,
  "area-calculator": 44,
  "perimeter-calculator": 45,
  "volume-calculator": 46,
  "surface-area-calculator": 47,
  "pythagorean-theorem-calculator": 48,
  "distance-between-two-points-calculator": 49,
  "midpoint-calculator": 50,
  "slope-calculator": 51,
  "angle-calculator": 52,
  "polygon-interior-angle-sum-calculator": 53,
  "circle-calculator": 54,
  "triangle-solver": 55,
  "coordinate-geometry-calculator": 56,
  "trig-function-calculator": 57,
  "inverse-trig-calculator": 58,
  "degrees-radians-converter": 59,
  "trig-identity-verifier": 60,
  "law-of-sines-calculator": 61,
  "law-of-cosines-calculator": 62,
  "unit-circle-reference": 63,
  "right-triangle-calculator": 64,
  "angle-elevation-depression-solver": 65,
  "mean-median-mode-calculator": 66,
  "standard-deviation-variance-calculator": 67,
  "probability-calculator": 68,
  "permutation-calculator": 69,
  "combination-calculator": 70,
  "factorial-calculator": 71,
  "z-score-calculator": 72,
  "normal-distribution-calculator": 73,
  "confidence-interval-calculator": 74,
  "correlation-coefficient-calculator": 75,
  "linear-regression-calculator": 76,
  "histogram-generator": 77,
  "pie-bar-chart-generator": 78,
  "box-plot-generator": 79,
  "frequency-distribution-table": 80,
  "weighted-average-calculator": 81,
  "geometric-mean-calculator": 82,
  "harmonic-mean-calculator": 83,
  "five-number-summary-calculator": 84,
  "outlier-detector": 85,
  "matrix-addition-subtraction-calculator": 86,
  "matrix-multiplication-calculator": 87,
  "matrix-transpose-calculator": 88,
  "matrix-determinant-calculator": 89,
  "matrix-inverse-calculator": 90,
  "identity-matrix-generator": 91,
  "scalar-multiplication-calculator": 92,
  "matrix-rank-calculator": 93,
  "matrix-trace-calculator": 94,
  "eigenvalue-calculator": 95,
  "derivative-calculator": 96,
  "definite-integral-calculator": 97,
  "limit-calculator": 98,
  "riemann-sum-calculator": 99,
  "taylor-series-approximation": 100,
  "tangent-line-calculator": 101,
  "gradient-slope-calculator": 102,
  "simple-interest-calculator": 103,
  "compound-interest-calculator": 104,
  "emi-loan-calculator": 105,
  "roi-calculator": 106,
  "discount-markup-calculator": 107,
  "break-even-point-calculator": 108,
  "future-value-calculator": 109,
  "present-value-calculator": 110,
  "annuity-calculator": 111,
  "tip-calculator": 112,
  "profit-loss-calculator": 113,
  "sales-tax-vat-calculator": 114,
  "currency-exchange-calculator": 115,
  "length-converter": 116,
  "weight-converter": 117,
  "temperature-converter": 118,
  "speed-converter": 119,
  "area-converter": 120,
  "volume-converter": 121,
  "time-converter": 122,
  "energy-converter": 123,
  "pressure-converter": 124,
  "data-storage-converter": 125,
  "2d-function-plotter": 126,
  "scatter-plot-generator": 127,
  "line-graph-builder": 128,
  "bar-chart-builder": 129,
  "pie-chart-builder": 130,
  "number-line-visualizer": 131,
  "venn-diagram-tool": 132,
  "coordinate-plane-plotter": 133,
  "union-of-sets-calculator": 134,
  "intersection-of-sets-calculator": 135,
  "difference-of-sets-calculator": 136,
  "complement-of-set-calculator": 137,
  "subset-checker": 138,
  "power-set-generator": 139,
  "cartesian-product-calculator": 140,
  "arithmetic-sequence-calculator": 141,
  "geometric-sequence-calculator": 142,
  "arithmetic-series-calculator": 143,
  "geometric-series-calculator": 144,
  "nth-term-finder": 145,
  "harmonic-series-calculator": 146,
  "pascals-triangle-generator": 147,
  "binomial-expansion-calculator": 148,
  "truth-table-generator": 149,
  "boolean-expression-evaluator": 150,
  "logic-gate-simulator": 151,
  "binary-arithmetic-calculator": 152,
  "twos-complement-calculator": 153,
  "bitwise-operations-calculator": 154,
  "modular-arithmetic-calculator": 155,
  "eulers-totient-calculator": 156,
  "age-calculator": 157,
  "date-difference-calculator": 158,
  "days-until-since-calculator": 159,
  "leap-year-checker": 160,
  "day-of-week-calculator": 161,
  "time-duration-calculator": 162,
  "date-arithmetic-calculator": 163,
  "random-number-generator": 164,
  "dice-roller": 165,
  "multiplication-table": 166,
  "gpa-calculator": 167,
  "percentage-change-calculator": 168,
  "number-sorter": 169,
  "equation-balancer": 170,
  "estimation-rounding-tool": 171,
  "digit-sum-calculator": 172,
  "reverse-number": 173,
  "divisibility-check-2-20": 174,
  "pi-digit-generator": 175,
  "magic-square-generator": 176,
  "sudoku-validator": 177,
};

const toolMetadata = [
  {
    toolName: "Standard Calculator",
    description:
      "A basic calculator that performs addition, subtraction, multiplication, and division operations",
    h1: "Free Online Standard Calculator – Fast & Easy Math",
    p: "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    shortTailKeywords:
      "online calculator, standard calculator, free calculator",
    mediumTailKeywords:
      "free online standard calculator, basic math calculator online, simple arithmetic calculator, everyday calculator tool",
    longTailKeywords:
      "free standard calculator for basic math, simple online calculator for addition and subtraction, easy arithmetic calculator no download, quick online math calculator for students",
  },
  {
    toolName: "Scientific Calculator",
    description:
      "An advanced calculator supporting trigonometric functions, logarithms, exponents, and complex scientific computations",
    h1: "Free Online Scientific Calculator – Advanced Math Functions",
    p: "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    shortTailKeywords:
      "scientific calculator, online scientific calculator, advanced calculator",
    mediumTailKeywords:
      "free scientific calculator online, scientific calculator with trig functions, advanced math calculator online, scientific calculator for students",
    longTailKeywords:
      "free online scientific calculator with steps, scientific calculator for trigonometry and logarithms, advanced scientific calculator no download required, best online scientific calculator for high school",
  },
  {
    toolName: "Fraction Calculator",
    description:
      "Calculates addition, subtraction, multiplication, and division of fractions and mixed numbers with simplified results",
    h1: "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions",
    p: "Easily add, subtract, multiply, and divide fractions with our free online fraction calculator. Get instant simplified results and step-by-step solutions for all fraction operations.",
    shortTailKeywords:
      "fraction calculator, fractions calculator, online fraction calculator",
    mediumTailKeywords:
      "add and subtract fractions calculator, fraction calculator with steps, simplify fractions calculator online, mixed number fraction calculator",
    longTailKeywords:
      "free online fraction calculator with step by step solution, how to add and subtract fractions calculator, fraction calculator that shows work for students, simplify fractions calculator with mixed numbers",
  },
  {
    toolName: "Percentage Calculator",
    description:
      "Calculates percentages, percentage increase/decrease, and what percent one number is of another",
    h1: "Percentage Calculator – Find % of Any Number Instantly",
    p: "Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.",
    shortTailKeywords:
      "percentage calculator, percent calculator, calculate percentage",
    mediumTailKeywords:
      "percentage calculator online free, calculate percentage of a number, percentage increase decrease calculator, what percent is x of y",
    longTailKeywords:
      "how to calculate percentage of a number online, free percentage increase and decrease calculator, what is x percent of y calculator, calculate percentage change between two numbers online",
  },
  {
    toolName: "Ratio Calculator",
    description:
      "Simplifies ratios and solves for missing values in proportional ratio equations",
    h1: "Ratio Calculator – Simplify & Solve Ratios Online",
    p: "Simplify ratios and solve ratio problems instantly with our free online ratio calculator. Solve for missing values in proportions and reduce ratios to their simplest form.",
    shortTailKeywords:
      "ratio calculator, ratio simplifier, proportion calculator",
    mediumTailKeywords:
      "online ratio calculator free, simplify ratio calculator, solve proportion calculator, equivalent ratio finder",
    longTailKeywords:
      "how to simplify a ratio calculator online, solve for missing value in ratio proportion, free ratio and proportion calculator with steps, ratio calculator to find equivalent ratios",
  },
  {
    toolName: "Average / Mean Calculator",
    description: "Computes the arithmetic mean of a set of numbers instantly",
    h1: "Average Calculator – Find the Mean of Any Numbers",
    p: "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    shortTailKeywords: "average calculator, mean calculator, calculate average",
    mediumTailKeywords:
      "calculate average of numbers online, arithmetic mean calculator, online average calculator free, find the mean calculator",
    longTailKeywords:
      "how to calculate average of a set of numbers, free arithmetic mean calculator online, calculate mean of numbers with steps, average calculator for a list of numbers",
  },
  {
    toolName: "Square Root Calculator",
    description:
      "Calculates the square root of any positive number with high precision",
    h1: "Square Root Calculator – Compute √ of Any Number",
    p: "Find the square root of any number instantly with our free online square root calculator. Supports both perfect and imperfect squares with high precision decimal results.",
    shortTailKeywords:
      "square root calculator, sqrt calculator, find square root",
    mediumTailKeywords:
      "calculate square root online, square root of a number, online sqrt calculator, perfect square root finder",
    longTailKeywords:
      "how to calculate square root of any number online, free square root calculator with decimals, square root calculator for non perfect squares, find exact square root value calculator",
  },
  {
    toolName: "Exponent Calculator",
    description:
      "Computes the result of raising a base number to any given power or exponent",
    h1: "Exponent Calculator – Calculate Base to the Power of n",
    p: "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
    shortTailKeywords:
      "exponent calculator, power calculator, calculate exponents",
    mediumTailKeywords:
      "base to the power calculator, online exponent calculator free, negative exponent calculator, number to the power of n",
    longTailKeywords:
      "how to calculate exponents online step by step, free online calculator for base raised to a power, negative and fractional exponent calculator online, calculate large exponents with precision",
  },
  {
    toolName: "Modulo Calculator",
    description:
      "Calculates the remainder when one number is divided by another using modulo operation",
    h1: "Modulo Calculator – Find the Remainder of Division",
    p: "Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.",
    shortTailKeywords:
      "modulo calculator, mod calculator, remainder calculator",
    mediumTailKeywords:
      "calculate modulo online, modulo operation calculator, find remainder of division, mod arithmetic calculator",
    longTailKeywords:
      "how to calculate modulo of two numbers online, free modulo calculator for programming, find remainder when dividing two numbers, online mod calculator for number theory",
  },
  {
    toolName: "Absolute Value Calculator",
    description:
      "Returns the absolute value (magnitude) of any real number or expression",
    h1: "Absolute Value Calculator – Find |x| of Any Number",
    p: "Calculate the absolute value of any number or expression instantly with our free online absolute value calculator. Supports positive, negative, and decimal numbers.",
    shortTailKeywords:
      "absolute value calculator, |x| calculator, find absolute value",
    mediumTailKeywords:
      "absolute value calculator online, calculate absolute value of a number, positive value of negative number, magnitude calculator online",
    longTailKeywords:
      "how to find absolute value of a number online, free absolute value calculator for negative numbers, absolute value expression calculator with steps, calculate modulus of a real number online",
  },
  {
    toolName: "Linear Equation Solver (ax + b = c)",
    description:
      "Solves linear equations of the form ax + b = c for the unknown variable x",
    h1: "Linear Equation Solver – Solve ax + b = c Online",
    p: "Solve any linear equation of the form ax + b = c instantly with our free online linear equation solver. Get step-by-step solutions for one-variable linear equations.",
    shortTailKeywords:
      "linear equation solver, solve linear equation, equation calculator",
    mediumTailKeywords:
      "solve linear equation online, ax plus b equals c solver, one variable equation calculator, linear equation calculator with steps",
    longTailKeywords:
      "how to solve linear equation ax plus b equals c online, free linear equation solver step by step, solve for x in linear equation calculator, one variable linear equation solver with solution",
  },
  {
    toolName: "Quadratic Equation Solver",
    description:
      "Solves quadratic equations of the form ax² + bx + c = 0 using the quadratic formula, showing all roots",
    h1: "Quadratic Equation Solver – Find Roots of ax² + bx + c = 0",
    p: "Solve any quadratic equation instantly with our free online quadratic equation solver. Find real and complex roots using the quadratic formula with detailed step-by-step solutions.",
    shortTailKeywords:
      "quadratic equation solver, quadratic formula calculator, solve quadratic",
    mediumTailKeywords:
      "solve quadratic equation online, quadratic formula calculator with steps, find roots of quadratic equation, ax squared bx c solver",
    longTailKeywords:
      "how to solve quadratic equations using the quadratic formula online, free quadratic equation solver with step by step solution, find real and complex roots of quadratic equation calculator, quadratic equation solver showing discriminant",
  },
  {
    toolName: "System of 2 Linear Equations Solver",
    description:
      "Solves a system of two linear equations with two unknowns using substitution or elimination method",
    h1: "System of Linear Equations Solver – Solve 2x2 Equation Systems",
    p: "Solve a system of two linear equations with two variables online. Our free solver uses substitution and elimination methods to find exact solutions with step-by-step explanations.",
    shortTailKeywords:
      "system of equations solver, simultaneous equations calculator, linear system solver",
    mediumTailKeywords:
      "solve system of two linear equations, simultaneous equations solver online, two variable equation system calculator, elimination substitution method calculator",
    longTailKeywords:
      "how to solve system of two linear equations online, free simultaneous equations calculator with steps, solve 2 equations 2 unknowns online calculator, system of linear equations solver with steps",
  },
  {
    toolName: "Polynomial Evaluator",
    description:
      "Evaluates a polynomial expression for a given value of the variable",
    h1: "Polynomial Evaluator – Calculate Polynomial Value at Any x",
    p: "Evaluate any polynomial expression at a given value of x with our free online polynomial evaluator. Supports polynomials of any degree with instant accurate results.",
    shortTailKeywords:
      "polynomial evaluator, polynomial calculator, evaluate polynomial",
    mediumTailKeywords:
      "evaluate polynomial at x online, polynomial value calculator, compute polynomial expression, polynomial function evaluator",
    longTailKeywords:
      "how to evaluate a polynomial at a given value online, free polynomial evaluator calculator with steps, calculate value of polynomial expression for x, online tool to compute polynomial function output",
  },
  {
    toolName: "Inequality Solver (linear)",
    description:
      "Solves linear inequalities and displays the solution set on a number line",
    h1: "Linear Inequality Solver – Solve and Graph Inequalities Online",
    p: "Solve linear inequalities instantly with our free online inequality solver. Get solutions displayed on a number line with clear step-by-step explanations for all inequality types.",
    shortTailKeywords:
      "inequality solver, linear inequality calculator, solve inequalities",
    mediumTailKeywords:
      "solve linear inequality online, inequality calculator with steps, graph linear inequality online, one variable inequality solver",
    longTailKeywords:
      "how to solve linear inequalities online step by step, free linear inequality solver with number line graph, solve and graph one variable inequality calculator, linear inequality solution set calculator online",
  },
  {
    toolName: "Simplify Expression (basic)",
    description:
      "Simplifies basic algebraic expressions by combining like terms and applying arithmetic rules",
    h1: "Simplify Expression Calculator – Simplify Algebraic Expressions",
    p: "Simplify any basic algebraic expression instantly with our free online simplify expression calculator. Combine like terms and reduce expressions to their simplest form with ease.",
    shortTailKeywords:
      "simplify expression calculator, algebraic expression simplifier, simplify algebra",
    mediumTailKeywords:
      "simplify algebraic expressions online, combine like terms calculator, simplify math expression tool, basic algebra simplifier",
    longTailKeywords:
      "how to simplify algebraic expressions online step by step, free calculator to simplify and combine like terms, simplify basic algebra expressions with steps, online algebraic expression simplifier for students",
  },
  {
    toolName: "Factor Calculator (integers)",
    description:
      "Finds all factors of a given integer and lists them in ascending order",
    h1: "Factor Calculator – Find All Factors of Any Integer",
    p: "Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.",
    shortTailKeywords:
      "factor calculator, find factors of a number, integer factoring",
    mediumTailKeywords:
      "list all factors of a number, online factor calculator free, factor finder for integers, divisors of a number calculator",
    longTailKeywords:
      "how to find all factors of an integer online, free calculator to list factors of any number, find all divisors of a given integer online, factor calculator showing complete list of factors",
  },
  {
    toolName: "Expand & Simplify Binomials",
    description:
      "Expands and simplifies binomial expressions like (a + b)² or (x + y)(x - y)",
    h1: "Binomial Expansion Calculator – Expand & Simplify Binomials",
    p: "Expand and simplify binomial expressions instantly with our free online binomial expansion calculator. Handles products, squares, and cubes of binomials with full step-by-step solutions.",
    shortTailKeywords:
      "binomial expansion calculator, expand binomials, simplify binomials",
    mediumTailKeywords:
      "expand and simplify binomial expressions, binomial calculator online, foil method calculator, binomial product simplifier",
    longTailKeywords:
      "how to expand and simplify binomial expressions online, free binomial expansion calculator with steps, expand a plus b squared calculator, FOIL method binomial calculator step by step",
  },
  {
    toolName: "Logarithm Calculator",
    description:
      "Calculates the logarithm of a number for any base including natural log and log base 10",
    h1: "Logarithm Calculator – Compute Log of Any Base Online",
    p: "Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.",
    shortTailKeywords: "logarithm calculator, log calculator, calculate log",
    mediumTailKeywords:
      "log calculator online free, natural log calculator, log base 10 calculator, custom base logarithm calculator",
    longTailKeywords:
      "how to calculate logarithm of any number online, free log calculator for any base, natural logarithm ln calculator online, calculate log base 2 log base 10 calculator",
  },
  {
    toolName: "Antilogarithm Calculator",
    description:
      "Calculates the antilogarithm (inverse of logarithm) for any base and given log value",
    h1: "Antilogarithm Calculator – Find Antilog of Any Number",
    p: "Calculate the antilogarithm of any value for any base with our free online antilog calculator. Find the inverse of log base 10, natural log, or any custom base instantly.",
    shortTailKeywords:
      "antilogarithm calculator, antilog calculator, inverse log",
    mediumTailKeywords:
      "calculate antilog online, antilogarithm base 10 calculator, inverse logarithm calculator, antilog value finder",
    longTailKeywords:
      "how to calculate antilogarithm of a number online, free antilog calculator for any base, find inverse of logarithm calculator online, antilogarithm calculator base 10 and natural log",
  },
  {
    toolName: "Prime Number Checker",
    description:
      "Determines whether a given integer is a prime number or composite number",
    h1: "Prime Number Checker – Is It Prime? Find Out Instantly",
    p: "Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.",
    shortTailKeywords: "prime number checker, is it prime, prime tester",
    mediumTailKeywords:
      "check if number is prime online, prime number calculator, prime or composite checker, prime number test tool",
    longTailKeywords:
      "how to check if a number is prime online, free prime number checker for large numbers, is this number prime or composite calculator, online prime number testing tool with explanation",
  },
  {
    toolName: "Prime Factorization",
    description:
      "Breaks down any integer into its prime factors and displays the prime factor tree",
    h1: "Prime Factorization Calculator – Find Prime Factors Instantly",
    p: "Find the prime factorization of any number with our free online calculator. Displays all prime factors in exponential form and as a factor tree for easy understanding.",
    shortTailKeywords:
      "prime factorization calculator, prime factors, factorization tool",
    mediumTailKeywords:
      "prime factorization of a number, find prime factors calculator, prime factor tree generator, factorize number online",
    longTailKeywords:
      "how to find prime factorization of any number online, free prime factorization calculator with factor tree, express number as product of prime factors calculator, prime factorization calculator showing exponent form",
  },
  {
    toolName: "GCD / HCF Calculator",
    description:
      "Finds the Greatest Common Divisor (GCD) or Highest Common Factor (HCF) of two or more numbers",
    h1: "GCD / HCF Calculator – Find Greatest Common Divisor Online",
    p: "Calculate the GCD or HCF of two or more numbers instantly with our free online calculator. Uses the Euclidean algorithm to find the greatest common divisor with step-by-step solutions.",
    shortTailKeywords:
      "GCD calculator, HCF calculator, greatest common divisor",
    mediumTailKeywords:
      "find GCD of two numbers, HCF calculator online, greatest common factor calculator, Euclidean algorithm calculator",
    longTailKeywords:
      "how to find GCD of two or more numbers online, free HCF calculator with Euclidean algorithm steps, greatest common divisor calculator for multiple numbers, find highest common factor of two numbers calculator",
  },
  {
    toolName: "LCM Calculator",
    description:
      "Calculates the Least Common Multiple (LCM) of two or more numbers",
    h1: "LCM Calculator – Find Least Common Multiple Online",
    p: "Calculate the Least Common Multiple (LCM) of two or more numbers instantly with our free online LCM calculator. Get accurate results with step-by-step explanations.",
    shortTailKeywords: "LCM calculator, least common multiple, LCM finder",
    mediumTailKeywords:
      "find LCM of two numbers, LCM calculator online, least common multiple calculator, LCM for multiple numbers",
    longTailKeywords:
      "how to find least common multiple of two numbers online, free LCM calculator with steps for multiple numbers, LCM calculator using prime factorization method, find LCM and GCD together online calculator",
  },
  {
    toolName: "Fibonacci Sequence Generator",
    description:
      "Generates the Fibonacci sequence up to n terms or finds the nth Fibonacci number",
    h1: "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    p: "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    shortTailKeywords:
      "Fibonacci calculator, Fibonacci sequence generator, Fibonacci numbers",
    mediumTailKeywords:
      "generate Fibonacci sequence online, nth Fibonacci number calculator, Fibonacci series generator, Fibonacci number finder",
    longTailKeywords:
      "how to generate Fibonacci sequence up to n terms online, find the nth Fibonacci number calculator, free Fibonacci sequence generator for any length, online Fibonacci calculator showing full sequence",
  },
  {
    toolName: "Number Base Converter (Binary, Octal, Hex, Decimal)",
    description:
      "Converts numbers between binary, octal, decimal, and hexadecimal number systems",
    h1: "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
    p: "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
    shortTailKeywords:
      "number base converter, binary to decimal, hex converter",
    mediumTailKeywords:
      "binary octal hex decimal converter, number system converter online, convert binary to hexadecimal, decimal to binary converter",
    longTailKeywords:
      "free online number base converter binary decimal octal hexadecimal, how to convert binary to decimal online, convert hexadecimal to binary and octal calculator, number system conversion tool for computer science",
  },
  {
    toolName: "Divisibility Checker",
    description:
      "Checks whether a given number is divisible by another number and shows the divisibility rule used",
    h1: "Divisibility Checker – Test Divisibility Rules Instantly",
    p: "Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results.",
    shortTailKeywords:
      "divisibility checker, divisibility test, is divisible by",
    mediumTailKeywords:
      "check divisibility online, divisibility rules calculator, test if number divisible, divisibility rule tester",
    longTailKeywords:
      "how to check if a number is divisible by another online, free divisibility checker using divisibility rules, test divisibility by 2 3 5 7 11 online, online divisibility rule calculator with explanation",
  },
  {
    toolName: "Factors List Generator",
    description:
      "Generates and lists all factors of a given number in sorted order",
    h1: "Factors List Generator – Find All Factors of a Number",
    p: "Generate a complete sorted list of all factors of any number instantly with our free online factors calculator. Ideal for math homework, LCM/GCD problems, and number theory.",
    shortTailKeywords:
      "factors list generator, list factors of a number, factor finder",
    mediumTailKeywords:
      "generate list of factors online, find all factors of a number, complete factor list calculator, factor generator tool",
    longTailKeywords:
      "how to find and list all factors of a number online, free factors list generator for any integer, complete list of factors of a number calculator, online tool to generate all divisors of a number",
  },
  {
    toolName: "Perfect Number Checker",
    description:
      "Determines whether a given number is a perfect number (sum of its divisors equals the number)",
    h1: "Perfect Number Checker – Is It a Perfect Number?",
    p: "Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.",
    shortTailKeywords:
      "perfect number checker, is it perfect number, perfect number test",
    mediumTailKeywords:
      "check if number is perfect online, perfect number calculator, perfect number finder, perfect number verification tool",
    longTailKeywords:
      "how to check if a number is perfect online, free perfect number checker with explanation, determine if sum of divisors equals number calculator, online perfect number test for any integer",
  },
  {
    toolName: "Armstrong Number Checker",
    description:
      "Checks if a number is an Armstrong (narcissistic) number where the sum of digits raised to the power of digit count equals the number",
    h1: "Armstrong Number Checker – Verify Narcissistic Numbers",
    p: "Check if any number is an Armstrong or narcissistic number with our free online tool. Instantly verify whether the sum of each digit raised to the number of digits equals the original number.",
    shortTailKeywords:
      "Armstrong number checker, narcissistic number, Armstrong number test",
    mediumTailKeywords:
      "check Armstrong number online, narcissistic number calculator, Armstrong number finder, verify Armstrong number",
    longTailKeywords:
      "how to check if a number is Armstrong online, free Armstrong number checker with steps, what is a narcissistic number calculator, online tool to verify Armstrong numbers with explanation",
  },
  {
    toolName: "Palindrome Number Checker",
    description:
      "Checks whether a given number reads the same forwards and backwards",
    h1: "Palindrome Number Checker – Is It a Palindrome?",
    p: "Check if any number is a palindrome with our free online palindrome number checker. Instantly determine whether a number reads the same in both directions.",
    shortTailKeywords:
      "palindrome number checker, palindrome test, is it palindrome",
    mediumTailKeywords:
      "check if number is palindrome online, palindrome number calculator, palindrome finder online, reverse number palindrome test",
    longTailKeywords:
      "how to check if a number is a palindrome online, free palindrome number checker with explanation, is a number a palindrome calculator, online palindrome number verification tool",
  },
  {
    toolName: "Roman Numeral Converter",
    description:
      "Converts integers to Roman numerals and Roman numerals back to integers",
    h1: "Roman Numeral Converter – Convert Numbers to Roman Numerals",
    p: "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
    shortTailKeywords:
      "Roman numeral converter, Roman numerals, number to Roman",
    mediumTailKeywords:
      "convert number to Roman numeral, Roman numeral calculator online, integer to Roman numeral converter, decode Roman numerals",
    longTailKeywords:
      "how to convert numbers to Roman numerals online, free Roman numeral to number converter, integer to Roman numeral conversion tool, convert Roman numerals to integers and back online",
  },
  {
    toolName: "Scientific Notation Converter",
    description:
      "Converts numbers between standard form and scientific notation and vice versa",
    h1: "Scientific Notation Converter – Standard to Scientific Form",
    p: "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    shortTailKeywords:
      "scientific notation converter, scientific notation calculator, standard form converter",
    mediumTailKeywords:
      "convert to scientific notation online, scientific notation to standard form, express number in scientific notation, scientific notation calculator free",
    longTailKeywords:
      "how to convert a number to scientific notation online, free scientific notation converter with steps, convert large numbers to scientific notation calculator, standard form to scientific notation converter online",
  },
  {
    toolName: "Long Division Calculator (with steps)",
    description:
      "Performs long division showing each step of the division process including quotient and remainder",
    h1: "Long Division Calculator – Step-by-Step Division with Remainder",
    p: "Solve long division problems step by step with our free online long division calculator. See every step of the division process including quotient and remainder – ideal for learning.",
    shortTailKeywords:
      "long division calculator, division with steps, long division solver",
    mediumTailKeywords:
      "long division calculator with steps, step by step division calculator, long division with remainder, show division work calculator",
    longTailKeywords:
      "free long division calculator that shows every step, how to do long division online with steps, long division calculator showing quotient and remainder, step by step long division solver for students",
  },
  {
    toolName: "Long Multiplication (with steps)",
    description:
      "Performs long multiplication of large numbers showing each step of the process",
    h1: "Long Multiplication Calculator – Step-by-Step Multiplication",
    p: "Multiply large numbers with full step-by-step working using our free online long multiplication calculator. See every step laid out clearly – perfect for students learning multiplication.",
    shortTailKeywords:
      "long multiplication calculator, multiply with steps, multiplication solver",
    mediumTailKeywords:
      "long multiplication with steps, step by step multiplication calculator, large number multiplication, show multiplication work calculator",
    longTailKeywords:
      "free long multiplication calculator that shows every step, how to do long multiplication online with steps, multiply large numbers step by step calculator, long multiplication solver for elementary students",
  },
  {
    toolName: "Order of Operations (BODMAS) Solver",
    description:
      "Evaluates math expressions using the correct order of operations (BODMAS/PEMDAS) with step-by-step breakdown",
    h1: "BODMAS / PEMDAS Calculator – Order of Operations Solver",
    p: "Solve any math expression using the correct order of operations with our free BODMAS/PEMDAS calculator. Get step-by-step breakdowns to understand exactly how each expression is evaluated.",
    shortTailKeywords: "BODMAS calculator, PEMDAS solver, order of operations",
    mediumTailKeywords:
      "order of operations calculator online, BODMAS PEMDAS solver, evaluate expression order of operations, math expression calculator with steps",
    longTailKeywords:
      "free BODMAS calculator that shows step by step solution, how to solve math expressions using order of operations online, PEMDAS order of operations calculator with explanation, evaluate math expression using BODMAS rules online",
  },
  {
    toolName: "Big Number Calculator",
    description:
      "Performs arithmetic operations on very large integers beyond normal calculator limits",
    h1: "Big Number Calculator – Compute Huge Numbers Online",
    p: "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
    shortTailKeywords:
      "big number calculator, large number calculator, huge number arithmetic",
    mediumTailKeywords:
      "calculate large numbers online, big integer calculator, arbitrary precision calculator, very large number arithmetic",
    longTailKeywords:
      "free online calculator for very large numbers, big integer arithmetic calculator online, how to multiply extremely large numbers online, arbitrary precision number calculator for huge integers",
  },
  {
    toolName: "Rounding Calculator",
    description:
      "Rounds numbers to a specified number of decimal places or significant figures",
    h1: "Rounding Calculator – Round to Decimal Places or Sig Figs",
    p: "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
    shortTailKeywords:
      "rounding calculator, round to decimal places, number rounding",
    mediumTailKeywords:
      "round number to decimal places online, rounding calculator with rules, significant figures rounding, round to nearest tenth hundredth",
    longTailKeywords:
      "how to round a number to decimal places online, free rounding calculator for significant figures, round to nearest hundredth thousandth calculator, online number rounding tool with rounding rules explained",
  },
  {
    toolName: "Significant Figures Calculator",
    description:
      "Counts or rounds a number to the correct number of significant figures",
    h1: "Significant Figures Calculator – Count and Round Sig Figs",
    p: "Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.",
    shortTailKeywords:
      "significant figures calculator, sig figs calculator, significant figures counter",
    mediumTailKeywords:
      "count significant figures online, round to significant figures calculator, sig fig calculator free, significant figures in a number",
    longTailKeywords:
      "how to count significant figures in a number online, free significant figures calculator with rules, round number to 3 significant figures calculator, online sig figs counter for chemistry and physics",
  },
  {
    toolName: "Number Word Converter (e.g. 1234 → one thousand...)",
    description: "Converts any number into its full English word form",
    h1: "Number to Words Converter – Convert Numbers to English Words",
    p: "Convert any number to its full English word representation with our free online number words converter. Supports millions, billions, and beyond – perfect for checks, documents, and more.",
    shortTailKeywords:
      "number to words converter, number in words, spell out numbers",
    mediumTailKeywords:
      "convert numbers to words online, number word converter free, spell number in English, write number in words",
    longTailKeywords:
      "how to convert numbers to English words online, free number to words converter for large numbers, write number amounts in words for checks, convert any number to word form online",
  },
  {
    toolName: "Decimal to Fraction Converter",
    description:
      "Converts any decimal number to its equivalent fraction in simplified form",
    h1: "Decimal to Fraction Converter – Convert Decimals to Fractions",
    p: "Convert any decimal to a fraction instantly with our free online decimal to fraction converter. Returns fully simplified fractions with clear step-by-step conversion process.",
    shortTailKeywords:
      "decimal to fraction, decimal to fraction converter, convert decimal to fraction",
    mediumTailKeywords:
      "convert decimal to fraction online, decimal to fraction calculator free, repeating decimal to fraction, simplify decimal as fraction",
    longTailKeywords:
      "how to convert a decimal to a fraction online, free decimal to fraction converter with steps, convert repeating decimal to fraction calculator, decimal to simplified fraction converter online",
  },
];

// Create reverse mappings
const idToSlug = Object.fromEntries(
  Object.entries(pageIds).map(([slug, id]) => [id, slug]),
);

// Category for math tools
const category = "math-tools";

// Create a mapping from slug to metadata by index
// The toolMetadata array is in the same order as the IDs (1-indexed)
const slugToMetadata = {};
Object.entries(pageIds).forEach(([slug, id]) => {
  // toolMetadata is 0-indexed, IDs are 1-indexed
  const metadata = toolMetadata[id - 1];
  if (metadata) {
    slugToMetadata[slug] = metadata;
  }
});

/**
 * Escape special characters for JSON strings in template literals
 */
const escapeString = (str) => {
  return str.replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/`/g, "\\`");
};

/**
 * Generate layout file content with proper SEO meta and interlinking cards
 */
const generateLayout = (toolName, { h1, p }) => {
  const canonical = `https://1000freetools.com/math-tools/${toolName}`;

  // Get the ID of the current tool
  const currentToolId = pageIds[toolName];

  let linkedToolSlugs = [];
  if (currentToolId && linkMapping[currentToolId]) {
    // Map the linked IDs to their corresponding slugs
    linkedToolSlugs = linkMapping[currentToolId]
      .map((id) => idToSlug[id])
      .filter(Boolean); // Filter out any undefined slugs if an ID is missing
  }

  // Generate tools array for ToolLinkCards based on the mapping
  const otherTools = linkedToolSlugs
    .map((slug) => {
      // Find the metadata for this linked tool
      const linkedMetadata = slugToMetadata[slug];

      if (!linkedMetadata) return null;

      return {
        name: linkedMetadata.h1,
        description: linkedMetadata.p,
        href: `/math-tools/${slug}`,
      };
    })
    .filter(Boolean);

  const toolsJson = JSON.stringify(otherTools, null, 2);

  // Escape strings for template literal
  const escapedH1 = escapeString(h1);
  const escapedP = escapeString(p);

  return `import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "${escapedH1}",
  description: "${escapedP}",
  alternates: {
    canonical: "${canonical}",
  },
  openGraph: {
    title: "${escapedH1}",
    description: "${escapedP}",
    type: "website",
    url: "${canonical}",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "${escapedH1}",
    description: "${escapedP}",
  },
};

const tools = ${toolsJson};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
`;
};

/**
 * Find tool metadata by tool name (handling slight variations)
 */
const findToolMetadata = (toolName) => {
  // Try exact match first
  let metadata = toolMetadata.find((m) => m.toolName === toolName);

  if (!metadata) {
    // Try case-insensitive match
    metadata = toolMetadata.find(
      (m) => m.toolName.toLowerCase() === toolName.toLowerCase(),
    );
  }

  if (!metadata) {
    // Try matching by removing special characters
    const normalizedToolName = toolName
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    metadata = toolMetadata.find(
      (m) =>
        m.toolName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() ===
        normalizedToolName,
    );
  }

  return (
    metadata || {
      toolName,
      h1: toolName,
      p: `Free online ${toolName} tool.`,
    }
  );
};

// Main execution
console.log("🚀 Starting layout generation for math tools...\n");

// Get all slugs from pageIds
const allSlugs = Object.keys(pageIds);

for (const slug of allSlugs) {
  const toolName = slug;
  const metadata = slugToMetadata[slug] || {
    toolName: slug,
    h1: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    p: `Free online ${slug.replace(/-/g, " ")} tool.`,
  };

  const dir = path.join("app", category, toolName);
  const filePath = path.join(dir, "layout.tsx");

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, generateLayout(toolName, metadata), "utf-8");

  console.log(`✅ Created: ${filePath}`);
}

console.log("\n🎉 Done! All layout files generated successfully.");
console.log(`📁 Total layouts created: ${allSlugs.length}`);
console.log(`📂 Category: ${category}`);

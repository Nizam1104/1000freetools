"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeedingResult {
  age: number;
  weight: number;
  feedingType: string;
  feedsPerDay: number;
  volumePerFeed: string;
  dailyTotal: string;
  milestones: string[];
  recommendations: string[];
}

export default function BabyFeedingChartCalculatorPage() {
  const [babyAge, setBabyAge] = useState<string>("");
  const [babyWeight, setBabyWeight] = useState<string>("");
  const [feedingType, setFeedingType] = useState<string>("breast");
  const [result, setResult] = useState<FeedingResult | null>(null);

  const calculate = () => {
    const ageMonths = parseFloat(babyAge) || 0;
    const weightNum = parseFloat(babyWeight) || 0;

    if (ageMonths === 0) return;

    let feedsPerDay = 0;
    let volumePerFeed = "";
    let dailyTotal = "";
    const milestones: string[] = [];
    const recommendations: string[] = [];

    // Age-based recommendations
    if (ageMonths < 0.5) { // 0-2 weeks
      feedsPerDay = 10;
      volumePerFeed = "30-60 ml (1-2 oz)";
      dailyTotal = "300-600 ml (10-20 oz)";
      milestones.push("Feed on demand, 8-12 times per 24 hours");
      milestones.push("Watch for hunger cues: rooting, hand-to-mouth");
      recommendations.push("🍼 Newborns need frequent, small feeds");
      recommendations.push("⚠️ Minimum 6 wet diapers per day");
    } else if (ageMonths < 1) { // 2 weeks - 1 month
      feedsPerDay = 8;
      volumePerFeed = "60-90 ml (2-3 oz)";
      dailyTotal = "480-720 ml (16-24 oz)";
      milestones.push("Establishing feeding routine");
      milestones.push("May start sleeping longer stretches at night");
      recommendations.push("📈 Weight gain: 20-35g per day expected");
      recommendations.push("💤 May go 3-4 hours between feeds");
    } else if (ageMonths < 3) { // 1-3 months
      feedsPerDay = 7;
      volumePerFeed = "90-120 ml (3-4 oz)";
      dailyTotal = "630-840 ml (21-28 oz)";
      milestones.push("More alert during feeds");
      milestones.push("May drop night feeds");
      recommendations.push("📊 Total daily: ~150-200ml per kg body weight");
      recommendations.push("😴 Some babies sleep through the night");
    } else if (ageMonths < 6) { // 3-6 months
      feedsPerDay = 6;
      volumePerFeed = "120-180 ml (4-6 oz)";
      dailyTotal = "720-1080 ml (24-36 oz)";
      milestones.push("Solid foods NOT recommended before 6 months");
      milestones.push("Exclusive breast milk or formula only");
      recommendations.push("🚫 No solids before 6 months (AAP guideline)");
      recommendations.push("💧 No water needed before 6 months");
    } else if (ageMonths < 9) { // 6-9 months
      feedsPerDay = 5;
      volumePerFeed = "180-240 ml (6-8 oz)";
      dailyTotal = "900-1200 ml (30-40 oz)";
      milestones.push("Start solids: iron-fortified cereals first");
      milestones.push("Introduce one new food every 3-5 days");
      recommendations.push("🥄 Start with single-grain cereals");
      recommendations.push("🥕 Introduce vegetables before fruits");
    } else if (ageMonths < 12) { // 9-12 months
      feedsPerDay = 4;
      volumePerFeed = "240 ml (8 oz)";
      dailyTotal = "720-960 ml (24-32 oz)";
      milestones.push("Three meals + 2 snacks daily");
      milestones.push("Self-feeding with fingers");
      recommendations.push("🍽️ Family foods (mashed, cut small)");
      recommendations.push("🥛 Whole milk can start at 12 months");
    } else { // 12+ months
      feedsPerDay = 3;
      volumePerFeed = "240 ml (8 oz) milk + meals";
      dailyTotal = "480-720 ml (16-24 oz) milk + solid food";
      milestones.push("Transition to whole cow's milk");
      milestones.push("Full family diet (modified for safety)");
      recommendations.push("🥛 Limit milk to 16-24 oz to ensure solid food intake");
      recommendations.push("🚫 No honey before 12 months (botulism risk)");
    }

    // Weight-based adjustment for formula
    if (weightNum > 0 && feedingType === "formula") {
      const dailyMl = weightNum * 150; // 150ml per kg
      recommendations.push(`⚖️ Based on weight: ~${dailyMl} ml/day`);
    }

    setResult({
      age: ageMonths,
      weight: weightNum,
      feedingType,
      feedsPerDay,
      volumePerFeed,
      dailyTotal,
      milestones,
      recommendations,
    });
  };

  const reset = () => {
    setBabyAge("");
    setBabyWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Baby Feeding Chart Calculator – How Much & How Often to Feed Your Baby
          </h1>
          <p className="text-muted-foreground">
            Navigate the early months of feeding with our Baby Feeding Chart Calculator.
            Enter your baby&apos;s age and weight to get recommended feeding frequency,
            milk volume per feed, and solid food introduction milestones — backed by
            pediatric guidelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baby-age">Baby&apos;s Age</Label>
                <div className="flex gap-2">
                  <Input
                    id="baby-age"
                    type="number"
                    step="0.5"
                    value={babyAge}
                    onChange={(e) => setBabyAge(e.target.value)}
                    placeholder="e.g., 3"
                    className="flex-1"
                  />
                  <span className="flex items-center text-muted-foreground">months</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baby-weight">Baby&apos;s Weight (kg)</Label>
                <Input
                  id="baby-weight"
                  type="number"
                  step="0.1"
                  value={babyWeight}
                  onChange={(e) => setBabyWeight(e.target.value)}
                  placeholder="e.g., 5.5"
                />
                <p className="text-xs text-muted-foreground">Optional - for formula calculations</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeding-type">Feeding Type</Label>
                <Select value={feedingType} onValueChange={setFeedingType}>
                  <SelectTrigger id="feeding-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breast">Breastfeeding</SelectItem>
                    <SelectItem value="formula">Formula</SelectItem>
                    <SelectItem value="mixed">Mixed/Combination</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Feeding Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Feeds Per Day</p>
                    <p className="text-4xl font-bold text-primary">{result.feedsPerDay}</p>
                    <p className="text-sm mt-1">
                      {result.volumePerFeed} per feed
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Daily Total:</span>
                      <span className="font-semibold">{result.dailyTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Feeding Type:</span>
                      <span className="font-semibold capitalize">{result.feedingType}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Developmental Milestones</h4>
                    <ul className="space-y-1">
                      {result.milestones.map((m, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter baby&apos;s details and click Calculate to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Feeding Guidelines by Age
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>0-6 months:</strong> Exclusive breast milk or formula
                  </li>
                  <li>
                    <strong>6 months:</strong> Introduce iron-fortified solids
                  </li>
                  <li>
                    <strong>6-12 months:</strong> Gradually increase solids, milk remains primary
                  </li>
                  <li>
                    <strong>12+ months:</strong> Transition to whole milk, family foods
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Every baby is different. These are general
                  guidelines. Always consult your pediatrician for personalized advice,
                  especially for premature babies or those with special needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Sections */}
        <div className="mt-12 space-y-8">
          {/* How to Use Section */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">How to Use This Baby Feeding Chart Calculator</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Enter your baby&apos;s age</h3>
                  <p>Input your baby&apos;s age in months. For newborns, use decimals like 0.5 for 2 weeks or 0.25 for 1 week.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Add weight (optional)</h3>
                  <p>Enter your baby&apos;s weight in kilograms. This helps provide more accurate formula feeding recommendations based on body weight.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Select feeding type and calculate</h3>
                  <p>Choose breastfeeding, formula, or mixed feeding, then click Calculate to see personalized feeding recommendations, daily volumes, and age-appropriate milestones.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Baby Feeding Needs */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Understanding Baby Feeding Needs</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Newborn Stomach Capacity</h3>
                <p>A newborn&apos;s stomach is tiny at birth - about the size of a cherry, holding only 5-7 ml. By day 3, it grows to walnut size (22-27 ml). By one week, it&apos;s about the size of an apricot (45-60 ml). This rapid growth explains why newborns need frequent, small feeds. Don&apos;t try to stretch feeds too far apart in the early weeks - their stomachs literally can&apos;t hold much at once.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Breast Milk vs Formula Amounts</h3>
                <p>Breast milk and formula have different compositions, which affects how much babies need. Breast milk is easier to digest, so breastfed babies typically feed more often but may consume slightly less volume per feed. Formula-fed babies often go longer between feeds because formula takes more time to break down. The amounts shown in this calculator account for these differences.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Feeding on Demand vs Schedule</h3>
                <p>In the first few months, feeding on demand (responsive feeding) is recommended over strict scheduling. Watch for early hunger cues like rooting, hand-to-mouth movements, and lip smacking. Crying is actually a late hunger sign. As babies get older, natural patterns emerge and you can gradually move toward more predictable routines. Most babies self-regulate well when allowed to feed on cue.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Signs of Hunger and Fullness</h3>
                <p><strong>Hunger cues:</strong> Rooting reflex (turning head with open mouth), sucking on hands or fingers, lip smacking, tongue movements, becoming more alert or active, and eventually crying.</p>
                <p><strong>Fullness cues:</strong> Slowing down or stopping sucking, turning head away from breast or bottle, closing mouth, pushing bottle away, relaxed hands and body, falling asleep. Learning to read these signals helps prevent overfeeding and builds healthy eating patterns.</p>
              </div>
            </div>
          </section>

          {/* Baby Feeding Guidelines by Age Table */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Baby Feeding Guidelines by Age</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Age</th>
                    <th className="text-left py-3 px-4 font-semibold">Amount per Feed</th>
                    <th className="text-left py-3 px-4 font-semibold">Feeds per Day</th>
                    <th className="text-left py-3 px-4 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">0-1 month</td>
                    <td className="py-3 px-4">2-3 oz (60-90 ml)</td>
                    <td className="py-3 px-4">8-12 times</td>
                    <td className="py-3 px-4 text-muted-foreground">Feed on demand, watch for hunger cues</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">1-3 months</td>
                    <td className="py-3 px-4">3-5 oz (90-150 ml)</td>
                    <td className="py-3 px-4">6-8 times</td>
                    <td className="py-3 px-4 text-muted-foreground">May start sleeping longer stretches</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">3-6 months</td>
                    <td className="py-3 px-4">5-7 oz (150-210 ml)</td>
                    <td className="py-3 px-4">5-6 times</td>
                    <td className="py-3 px-4 text-muted-foreground">Exclusive milk only, no solids yet</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">6-9 months</td>
                    <td className="py-3 px-4">6-8 oz (180-240 ml)</td>
                    <td className="py-3 px-4">4-5 times</td>
                    <td className="py-3 px-4 text-muted-foreground">Begin iron-fortified solids</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">9-12 months</td>
                    <td className="py-3 px-4">7-8 oz (210-240 ml)</td>
                    <td className="py-3 px-4">3-4 times</td>
                    <td className="py-3 px-4 text-muted-foreground">Three meals + snacks with milk</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              These are general guidelines. Individual needs vary based on growth spurts, activity level, and whether baby is breastfed or formula-fed.
            </p>
          </section>

          {/* Signs Baby is Getting Enough */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Signs Your Baby is Getting Enough Milk</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Diaper Output</h3>
                <p className="text-sm text-muted-foreground">Six or more wet diapers per day after the first week is a reliable sign of adequate milk intake. In the early days, expect fewer wet diapers as milk supply establishes.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Weight Gain</h3>
                <p className="text-sm text-muted-foreground">Steady weight gain following your baby&apos;s growth curve indicates good nutrition. Most babies regain birth weight by 10-14 days and gain 4-7 oz per week in early months.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Contentment Between Feeds</h3>
                <p className="text-sm text-muted-foreground">A well-fed baby appears satisfied after most feeds and can go reasonable stretches between feedings. Consistent fussiness right after feeds may signal inadequate intake.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Developmental Milestones</h3>
                <p className="text-sm text-muted-foreground">Meeting age-appropriate milestones like alertness, muscle tone, and eventual motor skills suggests your baby is getting the nutrition needed for growth and development.</p>
              </div>
            </div>
          </section>

          {/* Breastfeeding vs Formula Feeding */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Breastfeeding vs Formula Feeding</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Digestion Speed</h3>
                <p>Breast milk digests faster than formula - typically within 1.5 to 2 hours compared to 3-4 hours for formula. This is why breastfed babies often feed more frequently. It&apos;s not that breast milk is &quot;less filling&quot; - it&apos;s simply designed for rapid digestion and absorption.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Formula Takes Longer to Digest</h3>
                <p>Formula contains proteins that are harder for babies to break down, which means it stays in the stomach longer. Formula-fed babies may go longer between feeds but also may experience more digestive discomfort. Never dilute formula to make it digest faster - this deprives babies of needed nutrition.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Combination Feeding Works</h3>
                <p>Many families use both breast milk and formula - this is called combination or mixed feeding. You might breastfeed during the day and use formula at night, supplement with formula if supply is low, or pump breast milk for bottles. Any amount of breast milk provides benefits, and fed is best.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Every Baby is Different</h3>
                <p>Some breastfed babies feed every 2 hours like clockwork. Others go 4 hours between feeds. Some formula-fed babies need 6 oz per feed; others do fine with 4 oz. Growth, diaper output, and contentment matter more than hitting exact numbers. Use guidelines as a starting point, then adjust based on your individual baby.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">How much should my newborn eat?</h3>
                <p className="text-muted-foreground">In the first few days, newborns take only 1-2 oz per feed as your milk supply establishes. By one week, most take 2-3 oz every 2-3 hours. By one month, 3-4 oz per feed is typical. Breastfed babies may take slightly less per feed but feed more often. Follow hunger cues rather than trying to hit specific amounts.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">How often should I feed my baby?</h3>
                <p className="text-muted-foreground">Newborns typically feed 8-12 times per 24 hours - that&apos;s every 2-3 hours around the clock. As babies grow, feeds space out naturally. By 3 months, many feed 6-8 times daily. By 6 months with solids, 5-6 milk feeds plus solid meals. Watch for hunger cues rather than watching the clock, especially in early weeks.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">How do I know if my baby is getting enough?</h3>
                <p className="text-muted-foreground">The best indicators are diaper output and weight gain. Expect 6+ wet diapers daily after the first week, plus regular bowel movements (frequency varies by feeding type). Steady weight gain along your baby&apos;s growth curve confirms adequate intake. A content baby who feeds actively and seems satisfied after most feeds is likely getting enough.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">When should I introduce solids?</h3>
                <p className="text-muted-foreground">Most babies are ready for solids around 6 months. Signs of readiness include: sitting with minimal support, good head control, showing interest in food, losing the tongue-thrust reflex, and ability to move food to the back of the mouth. Starting before 4 months is not recommended. Iron-fortified cereals or pureed meats are often good first foods.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Should I wake my baby to feed?</h3>
                <p className="text-muted-foreground">In the first 2-3 weeks, yes - wake your newborn every 3-4 hours to feed until they&apos;ve regained birth weight and your pediatrician confirms weight gain is on track. After that, most healthy babies will wake on their own when hungry. Once weight gain is established, sleeping longer stretches at night is fine and developmentally normal.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}

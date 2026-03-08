"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ZodiacSign {
  name: string;
  symbol: string;
  dateRange: string;
  element: string;
  rulingPlanet: string;
  traits: string[];
  startDate: { month: number; day: number };
  endDate: { month: number; day: number };
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: "Capricorn",
    symbol: "♑",
    dateRange: "Dec 22 - Jan 19",
    element: "Earth",
    rulingPlanet: "Saturn",
    traits: ["Ambitious", "Disciplined", "Practical"],
    startDate: { month: 11, day: 22 },
    endDate: { month: 0, day: 19 },
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dateRange: "Jan 20 - Feb 18",
    element: "Air",
    rulingPlanet: "Uranus",
    traits: ["Independent", "Innovative", "Humanitarian"],
    startDate: { month: 0, day: 20 },
    endDate: { month: 1, day: 18 },
  },
  {
    name: "Pisces",
    symbol: "♓",
    dateRange: "Feb 19 - Mar 20",
    element: "Water",
    rulingPlanet: "Neptune",
    traits: ["Compassionate", "Intuitive", "Artistic"],
    startDate: { month: 1, day: 19 },
    endDate: { month: 2, day: 20 },
  },
  {
    name: "Aries",
    symbol: "♈",
    dateRange: "Mar 21 - Apr 19",
    element: "Fire",
    rulingPlanet: "Mars",
    traits: ["Bold", "Energetic", "Confident"],
    startDate: { month: 2, day: 21 },
    endDate: { month: 3, day: 19 },
  },
  {
    name: "Taurus",
    symbol: "♉",
    dateRange: "Apr 20 - May 20",
    element: "Earth",
    rulingPlanet: "Venus",
    traits: ["Reliable", "Patient", "Devoted"],
    startDate: { month: 3, day: 20 },
    endDate: { month: 4, day: 20 },
  },
  {
    name: "Gemini",
    symbol: "♊",
    dateRange: "May 21 - Jun 20",
    element: "Air",
    rulingPlanet: "Mercury",
    traits: ["Curious", "Adaptable", "Social"],
    startDate: { month: 4, day: 21 },
    endDate: { month: 5, day: 20 },
  },
  {
    name: "Cancer",
    symbol: "♋",
    dateRange: "Jun 21 - Jul 22",
    element: "Water",
    rulingPlanet: "Moon",
    traits: ["Nurturing", "Protective", "Empathetic"],
    startDate: { month: 5, day: 21 },
    endDate: { month: 6, day: 22 },
  },
  {
    name: "Leo",
    symbol: "♌",
    dateRange: "Jul 23 - Aug 22",
    element: "Fire",
    rulingPlanet: "Sun",
    traits: ["Charismatic", "Generous", "Creative"],
    startDate: { month: 6, day: 23 },
    endDate: { month: 7, day: 22 },
  },
  {
    name: "Virgo",
    symbol: "♍",
    dateRange: "Aug 23 - Sep 22",
    element: "Earth",
    rulingPlanet: "Mercury",
    traits: ["Analytical", "Detail-oriented", "Helpful"],
    startDate: { month: 7, day: 23 },
    endDate: { month: 8, day: 22 },
  },
  {
    name: "Libra",
    symbol: "♎",
    dateRange: "Sep 23 - Oct 22",
    element: "Air",
    rulingPlanet: "Venus",
    traits: ["Diplomatic", "Charming", "Fair-minded"],
    startDate: { month: 8, day: 23 },
    endDate: { month: 9, day: 22 },
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dateRange: "Oct 23 - Nov 21",
    element: "Water",
    rulingPlanet: "Pluto",
    traits: ["Passionate", "Determined", "Intense"],
    startDate: { month: 9, day: 23 },
    endDate: { month: 10, day: 21 },
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dateRange: "Nov 22 - Dec 21",
    element: "Fire",
    rulingPlanet: "Jupiter",
    traits: ["Optimistic", "Adventurous", "Honest"],
    startDate: { month: 10, day: 22 },
    endDate: { month: 11, day: 21 },
  },
];

export default function ZodiacSignCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);

  useEffect(() => {
    if (!birthDate) {
      setZodiacSign(null);
      return;
    }

    const date = new Date(birthDate);
    const month = date.getMonth();
    const day = date.getDate();

    // Find the zodiac sign
    let foundSign: ZodiacSign | null = null;

    for (const sign of zodiacSigns) {
      // Handle Capricorn (spans Dec-Jan)
      if (sign.name === "Capricorn") {
        if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) {
          foundSign = sign;
          break;
        }
      } else {
        // Regular signs within same year
        if (
          (month === sign.startDate.month && day >= sign.startDate.day) ||
          (month === sign.endDate.month && day <= sign.endDate.day)
        ) {
          foundSign = sign;
          break;
        }
      }
    }

    setZodiacSign(foundSign);
  }, [birthDate]);

  const reset = () => {
    setBirthDate("");
    setZodiacSign(null);
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case "Fire":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Earth":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Air":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Water":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {zodiacSign && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div className="text-center p-6 bg-background rounded-md">
                  <p className="text-6xl mb-2">{zodiacSign.symbol}</p>
                  <p className="text-3xl font-bold">{zodiacSign.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{zodiacSign.dateRange}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Element</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getElementColor(zodiacSign.element)}`}>
                      {zodiacSign.element}
                    </span>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Ruling Planet</p>
                    <p className="font-medium mt-1">{zodiacSign.rulingPlanet}</p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Key Traits</p>
                  <div className="flex flex-wrap gap-2">
                    {zodiacSign.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-background rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">All Zodiac Signs</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {zodiacSigns.map((sign) => (
                      <div
                        key={sign.name}
                        className={`p-2 rounded-md text-center text-xs ${
                          sign.name === zodiacSign.name
                            ? "bg-primary text-primary-foreground"
                            : "bg-background"
                        }`}
                      >
                        <p className="text-lg">{sign.symbol}</p>
                        <p className="font-medium truncate">{sign.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  This calculator uses Western/Tropical astrology. Date ranges may vary slightly depending on the year and astrological system used.
                </p>
              </div>
            )}

            {!zodiacSign && birthDate && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground text-center">
                  Unable to determine zodiac sign. Please check your birth date.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How It Works
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Enter Your Birth Date</h4>
                  <p className="text-xs text-muted-foreground">Select your date of birth using the date picker. Your zodiac sign is determined by the sun's position on that date.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Instant Sign Detection</h4>
                  <p className="text-xs text-muted-foreground">The calculator automatically identifies your Western/Tropical zodiac sign based on standard date ranges.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">View Sign Details</h4>
                  <p className="text-xs text-muted-foreground">See your sign's symbol, element, ruling planet, date range, and key personality traits.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Zodiac Signs Date Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold">Sign</th>
                    <th className="text-left py-2 px-3 font-semibold">Symbol</th>
                    <th className="text-left py-2 px-3 font-semibold">Date Range</th>
                    <th className="text-left py-2 px-3 font-semibold">Element</th>
                    <th className="text-left py-2 px-3 font-semibold">Ruling Planet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Aries</td>
                    <td className="py-2 px-3">♈</td>
                    <td className="py-2 px-3 text-xs">Mar 21 - Apr 19</td>
                    <td className="py-2 px-3 text-xs">Fire</td>
                    <td className="py-2 px-3 text-xs">Mars</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Taurus</td>
                    <td className="py-2 px-3">♉</td>
                    <td className="py-2 px-3 text-xs">Apr 20 - May 20</td>
                    <td className="py-2 px-3 text-xs">Earth</td>
                    <td className="py-2 px-3 text-xs">Venus</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Gemini</td>
                    <td className="py-2 px-3">♊</td>
                    <td className="py-2 px-3 text-xs">May 21 - Jun 20</td>
                    <td className="py-2 px-3 text-xs">Air</td>
                    <td className="py-2 px-3 text-xs">Mercury</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Cancer</td>
                    <td className="py-2 px-3">♋</td>
                    <td className="py-2 px-3 text-xs">Jun 21 - Jul 22</td>
                    <td className="py-2 px-3 text-xs">Water</td>
                    <td className="py-2 px-3 text-xs">Moon</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Leo</td>
                    <td className="py-2 px-3">♌</td>
                    <td className="py-2 px-3 text-xs">Jul 23 - Aug 22</td>
                    <td className="py-2 px-3 text-xs">Fire</td>
                    <td className="py-2 px-3 text-xs">Sun</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Virgo</td>
                    <td className="py-2 px-3">♍</td>
                    <td className="py-2 px-3 text-xs">Aug 23 - Sep 22</td>
                    <td className="py-2 px-3 text-xs">Earth</td>
                    <td className="py-2 px-3 text-xs">Mercury</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Libra</td>
                    <td className="py-2 px-3">♎</td>
                    <td className="py-2 px-3 text-xs">Sep 23 - Oct 22</td>
                    <td className="py-2 px-3 text-xs">Air</td>
                    <td className="py-2 px-3 text-xs">Venus</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Scorpio</td>
                    <td className="py-2 px-3">♏</td>
                    <td className="py-2 px-3 text-xs">Oct 23 - Nov 21</td>
                    <td className="py-2 px-3 text-xs">Water</td>
                    <td className="py-2 px-3 text-xs">Pluto</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Sagittarius</td>
                    <td className="py-2 px-3">♐</td>
                    <td className="py-2 px-3 text-xs">Nov 22 - Dec 21</td>
                    <td className="py-2 px-3 text-xs">Fire</td>
                    <td className="py-2 px-3 text-xs">Jupiter</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Capricorn</td>
                    <td className="py-2 px-3">♑</td>
                    <td className="py-2 px-3 text-xs">Dec 22 - Jan 19</td>
                    <td className="py-2 px-3 text-xs">Earth</td>
                    <td className="py-2 px-3 text-xs">Saturn</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Aquarius</td>
                    <td className="py-2 px-3">♒</td>
                    <td className="py-2 px-3 text-xs">Jan 20 - Feb 18</td>
                    <td className="py-2 px-3 text-xs">Air</td>
                    <td className="py-2 px-3 text-xs">Uranus</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Pisces</td>
                    <td className="py-2 px-3">♓</td>
                    <td className="py-2 px-3 text-xs">Feb 19 - Mar 20</td>
                    <td className="py-2 px-3 text-xs">Water</td>
                    <td className="py-2 px-3 text-xs">Neptune</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Key Features & Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">All 12 Zodiac Signs</h4>
                <p className="text-xs text-muted-foreground">Complete coverage of the Western zodiac from Aries to Pisces with accurate date ranges.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Element Classification</h4>
                <p className="text-xs text-muted-foreground">See which element (Fire, Earth, Air, Water) governs your sign and influences your personality.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Ruling Planet Info</h4>
                <p className="text-xs text-muted-foreground">Discover which celestial body rules your sign and shapes your astrological profile.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Visual Sign Display</h4>
                <p className="text-xs text-muted-foreground">See all 12 zodiac symbols with your sign highlighted for easy reference.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">What is my zodiac sign based on?</h4>
              <p className="text-xs text-muted-foreground">
                Your zodiac sign (sun sign) is determined by the sun's position in the zodiac constellations on your birth date. Western astrology uses the Tropical zodiac, which is based on seasons rather than actual constellation positions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What if I was born on a cusp date?</h4>
              <p className="text-xs text-muted-foreground">
                Cusp dates are when the sun transitions between signs (e.g., July 22-23). Your exact sign depends on your birth year, time, and location. Use a detailed birth chart calculator for precision if born within 1-2 days of a sign change.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What are the four zodiac elements?</h4>
              <p className="text-xs text-muted-foreground">
                Fire (Aries, Leo, Sagittarius): Passionate, energetic, impulsive. Earth (Taurus, Virgo, Capricorn): Practical, grounded, reliable. Air (Gemini, Libra, Aquarius): Intellectual, social, communicative. Water (Cancer, Scorpio, Pisces): Emotional, intuitive, sensitive.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Is Western astrology the same as Chinese zodiac?</h4>
              <p className="text-xs text-muted-foreground">
                No. Western astrology uses 12 sun signs based on birth month. Chinese zodiac uses 12 animal signs based on birth year (Rat, Ox, Tiger, etc.). They're different systems with different calculation methods and interpretations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Why do zodiac date ranges vary slightly?</h4>
              <p className="text-xs text-muted-foreground">
                Date ranges can vary by a day depending on the year (leap years) and astrological system used. The Tropical zodiac (Western) is fixed to seasons. The Sidereal zodiac (Vedic) accounts for Earth's precession and differs by ~23 days.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

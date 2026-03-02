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
        <CardHeader>
          <CardTitle>Zodiac Sign Calculator – Free Western Astrology Sign Finder</CardTitle>
          <CardDescription>
            Discover your Western zodiac sign from your birth date. Get detailed information about your sign including element, ruling planet, date range, and key personality traits.
          </CardDescription>
        </CardHeader>
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
    </div>
  );
}

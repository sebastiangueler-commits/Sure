
import { SurebetOpportunity } from "../types";

export const generateMockOpportunities = (): SurebetOpportunity[] => {
  const now = new Date();
  
  return [
    {
      id: "m-812",
      event: {
        id: "ev-101",
        sport: "Basketball",
        league: "NBA",
        homeTeam: "Golden State Warriors",
        awayTeam: "Boston Celtics",
        startTime: now.toISOString(),
        market: "Handicap asiático (-3.5 / +3.5)"
      },
      outcomes: [
        { label: "Warriors -3.5", bestOdds: { bookie: "1xbet", value: 2.15 } },
        { label: "Celtics +3.5", bestOdds: { bookie: "Dafabet", value: 2.05 } }
      ],
      profitPercentage: 4.88,
      lastUpdated: now.toLocaleTimeString()
    },
    {
      id: "m-992",
      event: {
        id: "ev-102",
        sport: "Football",
        league: "La Liga",
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        startTime: now.toISOString(),
        market: "Total Goles (Over/Under 2.5)"
      },
      outcomes: [
        { label: "Over 2.5", bestOdds: { bookie: "Dafabet", value: 1.95 } },
        { label: "Under 2.5", bestOdds: { bookie: "1xbet", value: 2.10 } }
      ],
      profitPercentage: 1.09,
      lastUpdated: now.toLocaleTimeString()
    },
    {
      id: "m-451",
      event: {
        id: "ev-103",
        sport: "Tennis",
        league: "ATP Paris",
        homeTeam: "Carlos Alcaraz",
        awayTeam: "Jannik Sinner",
        startTime: now.toISOString(),
        market: "Ganador del Partido"
      },
      outcomes: [
        { label: "Alcaraz", bestOdds: { bookie: "1xbet", value: 2.02 } },
        { label: "Sinner", bestOdds: { bookie: "Dafabet", value: 2.02 } }
      ],
      profitPercentage: 0.00,
      lastUpdated: now.toLocaleTimeString()
    }
  ].sort((a, b) => b.profitPercentage - a.profitPercentage);
};

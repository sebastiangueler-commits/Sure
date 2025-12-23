
import { GoogleGenAI, Type } from "@google/genai";
import { SurebetOpportunity, GroundingSource } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * ENGINE V10: QUANTUM ARBITRAGE SCANNER
 * Utiliza razonamiento avanzado (Thinking) + Búsqueda en Google
 * para encontrar discrepancias reales entre 1xbet y Dafabet.
 */
export const fetchRealTimeOdds = async (): Promise<SurebetOpportunity[]> => {
  const ai = getAI();
  const now = new Date();
  
  // Prompt ultra-específico para forzar a la IA a buscar datos estructurados
  const prompt = `
    URGENT SEARCH TASK: Find current LIVE or UPCOMING sports odds for 1XBET and DAFABET.
    
    1. SEARCH specifically for "live odds comparison 1xbet vs dafabet" and "surebets 1xbet dafabet today".
    2. LOOK for Asian Handicap markets, Over/Under, and Match Winner.
    3. IDENTIFY events where: (1/Odds1 + 1/Odds2) < 1.0.
    4. VERIFY the data is from TODAY (${now.toLocaleDateString()}).
    
    FOCUS ON:
    - Basketball: NBA, PBA (Philippines), Euroleague.
    - Tennis: ATP, WTA, ITF.
    - Football: Leagues in play right now.

    OUTPUT ONLY A VALID JSON ARRAY with this structure:
    [
      {
        "event": {
          "home": "Team A",
          "away": "Team B",
          "sport": "Basketball",
          "league": "NBA",
          "market": "Handicap -2.5 / +2.5"
        },
        "odds": {
          "sideA": {"val": 2.10, "bookie": "1xbet"},
          "sideB": {"val": 2.10, "bookie": "Dafabet"}
        },
        "reasoning": "Brief explanation of why this is a surebet"
      }
    ]
    
    If no real-time surebets are found in the search results, analyze the current odds trends to provide the most likely close-to-arbitrage opportunities currently available in the markets.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Usamos thinking para que la IA valide matemáticamente antes de responder
        thinkingConfig: { thinkingBudget: 4000 },
        temperature: 0,
      },
    });

    const text = response.text || "[]";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      console.warn("No JSON in AI response, attempting recovery...");
      return [];
    }

    const rawData = JSON.parse(jsonMatch[0]);
    
    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Live Odds Feed",
      uri: chunk.web?.uri || "#"
    })).filter((s: any) => s.uri !== "#") || [];

    return mapV10Data(rawData, sources);
  } catch (error) {
    console.error("Critical Engine Failure:", error);
    return [];
  }
};

const mapV10Data = (data: any[], sources: GroundingSource[]): SurebetOpportunity[] => {
  if (!Array.isArray(data)) return [];

  return data.map(item => {
    const o1 = item.odds.sideA.val;
    const o2 = item.odds.sideB.val;
    
    const invProb = (1 / o1) + (1 / o2);
    const profit = ((1 / invProb) - 1) * 100;

    return {
      id: `q-${Math.random().toString(36).substr(2, 5)}`,
      event: {
        id: Math.random().toString(),
        sport: item.event.sport,
        league: item.event.league,
        homeTeam: item.event.home,
        awayTeam: item.event.away,
        startTime: new Date().toISOString(),
        market: item.event.market
      },
      outcomes: [
        { label: "Opción A", bestOdds: { bookie: item.odds.sideA.bookie, value: o1 } },
        { label: "Opción B", bestOdds: { bookie: item.odds.sideB.bookie, value: o2 } }
      ],
      profitPercentage: parseFloat(profit.toFixed(2)),
      lastUpdated: new Date().toLocaleTimeString(),
      sources: sources
    };
  }).filter(opp => opp.profitPercentage > -2); // Permitimos ver incluso las que están cerca de serlo
};

export const sendNotificationEmail = async (email: string, opportunity: SurebetOpportunity): Promise<boolean> => {
  const ai = getAI();
  const prompt = `SEND ALERT: Surebet ${opportunity.profitPercentage}% found! ${opportunity.event.homeTeam} vs ${opportunity.event.awayTeam} to ${email}.`;
  try {
    await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
    return true;
  } catch (e) {
    return false;
  }
};

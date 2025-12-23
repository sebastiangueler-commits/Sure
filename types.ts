
export interface Odds {
  bookie: string;
  value: number;
}

export interface MatchEvent {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  market: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SurebetOpportunity {
  id: string;
  event: MatchEvent;
  outcomes: {
    label: string;
    bestOdds: Odds;
  }[];
  profitPercentage: number;
  lastUpdated: string;
  isLive?: boolean;
  sources?: GroundingSource[];
}

export interface ScannerSettings {
  email: string;
  minProfit: number;
  autoPilot: boolean;
  scanInterval: number;
  notifyByEmail: boolean;
}

export interface CalculationResult {
  totalInvestment: number;
  bets: {
    label: string;
    stake: number;
    odds: number;
    bookie: string;
    profit: number;
  }[];
  totalProfit: number;
  roi: number;
}

export interface IStatisticsBase {
  title: string;
}

export interface ISpendingStatistics extends IStatisticsBase {
  total: number;
  growth: number;
  weeklyIncome: number[];
}

export interface IRevenueFlow extends IStatisticsBase {
  pending: number;
  signed: number;
  lost: number;
}

export interface IEfficiency {
  arrival: number;
  spending: number;
  statistical: {
    title: string;
    value: number;
  }[];
}

export type TOverallBalance = Pick<ISpendingStatistics, 'total' | 'growth'> & {
  data: Omit<IRevenueFlow, 'pending'>[];
};

import { IRevenueFlow, ISpendingStatistics } from '@app/interfaces';

export const TOTAL_EARNINGS_MOCK = {
  title: 'Total earnings',
  total: 7.245,
  growth: 3.5,
  weeklyIncome: [30, 40, 45, 50, 49, 60, 91],
};

export const SPENDING_STATISTICS_MOCK = [
  TOTAL_EARNINGS_MOCK,
  {
    title: 'Total Spending',
    total: 7.245,
    growth: 3.5,
    weeklyIncome: [20, 40, 60, 80, 90, 110, 130],
  },
  {
    title: 'Spending Goal',
    total: 7.245,
    growth: 3.5,
    weeklyIncome: [30, 40, 45, 50, 49, 60, 91],
  },
];

export const INITIAL_TOTAL_STATISTICS: ISpendingStatistics[] = [
  {
    title: '',
    total: 0,
    growth: 0,
    weeklyIncome: [],
  },
];

export const EFFICIENCY_MOCK = {
  arrival: 5.23,
  spending: 6.23,
  statistical: [
    {
      title: 'Goal',
      value: 50,
    },
    {
      title: 'Spending',
      value: 30,
    },
    {
      title: 'Others',
      value: 20,
    },
  ],
};

export const INITIAL_EFFICIENCY = {
  arrival: 0,
  spending: 0,
  statistical: [
    {
      title: '',
      value: 0,
    },
  ],
};

export const REVENUE_FLOW_MOCK = [
  {
    title: 'Jan',
    pending: 10,
    signed: 21,
    lost: 45,
  },
  {
    title: 'Feb',
    pending: 23,
    signed: 54,
    lost: 23,
  },
  {
    title: 'Mar',
    pending: 54,
    signed: 23,
    lost: 54,
  },
  {
    title: 'April',
    pending: 75,
    signed: 45,
    lost: 87,
  },
  {
    title: 'May',
    pending: 34,
    signed: 76,
    lost: 34,
  },
  {
    title: 'Jun',
    pending: 67,
    signed: 54,
    lost: 76,
  },
  {
    title: 'July',
    pending: 34,
    signed: 36,
    lost: 75,
  },
  {
    title: 'Aug',
    pending: 67,
    signed: 87,
    lost: 23,
  },
  {
    title: 'Sep',
    pending: 60,
    signed: 54,
    lost: 32,
  },
  {
    title: 'Oct',
    pending: 34,
    signed: 56,
    lost: 43,
  },
  {
    title: 'Nov',
    pending: 54,
    signed: 34,
    lost: 86,
  },
  {
    title: 'Dec',
    pending: 34,
    signed: 32,
    lost: 65,
  },
];

export const INITIAL_REVENUE_FLOW: IRevenueFlow[] = [
  {
    title: '',
    pending: 0,
    signed: 0,
    lost: 0,
  },
];

export const OVERALL_BALANCE_MOCK = {
  total: 48.574,
  growth: 20,
  data: [
    {
      title: 'Jan',
      signed: 534534,
      lost: 234324,
    },
    {
      title: 'Feb',
      signed: 434523,
      lost: 657667,
    },
    {
      title: 'Mar',
      signed: 534534,
      lost: 234766,
    },
    {
      title: 'April',
      signed: 435234,
      lost: 867876,
    },
    {
      title: 'May',
      signed: 533453,
      lost: 767876,
    },
    {
      title: 'Jun',
      signed: 435443,
      lost: 345433,
    },
    {
      title: 'July',
      signed: 234434,
      lost: 345343,
    },
    {
      title: 'Aug',
      signed: 423422,
      lost: 234234,
    },
    {
      title: 'Sep',
      signed: 341342,
      lost: 234243,
    },
    {
      title: 'Oct',
      signed: 423432,
      lost: 657677,
    },
    {
      title: 'Nov',
      signed: 234234,
      lost: 312312,
    },
    {
      title: 'Dec',
      signed: 534534,
      lost: 345354,
    },
  ],
};

export const INITIAL_OVERALL_BALANCE = {
  total: 0,
  growth: 0,
  data: [
    {
      title: '',
      signed: 0,
      lost: 0,
    },
  ],
};

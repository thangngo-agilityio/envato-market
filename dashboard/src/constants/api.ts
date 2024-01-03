// TODO: Will provide latter
export const BASE_API = '';
export const USERS_API = process.env.VITE_API_USER || BASE_API;
export const STATISTICAL_API = process.env.VITE_STATISTICAL_API || BASE_API;

export const END_POINTS = {
  AUTHEN_USERS: '/authenUsers',
  USERS: '/users',
  TRANSACTIONS: '/transactions',
  STATISTICS: '/statistics',
  REVENUE: '/revenue',
  EFFICIENCY: '/efficiency',
  EMPLOYEES: '/employees',
  OVERALL_BALANCE: '/overall-balance',
};

export const SEARCH_PARAM = {
  EMAIL: 'email',
  PASSWORD: 'password',
  TRANSACTION_NAME: 'transactionName',
};

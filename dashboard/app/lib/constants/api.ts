// TODO: Will provide latter
export const BASE_API = '';
export const USERS_API = process.env.NEXT_PUBLIC_API_USER || BASE_API;
export const STATISTICAL_API =
  process.env.NEXT_PUBLIC_STATISTICAL_API || BASE_API;

export const END_POINTS = {
  AUTHEN_USERS: '/authenUsers',
  USERS: '/users',
  TRANSACTIONS: '/transactions',
  STATISTICS: '/statistics',
  REVENUE: '/revenue',
  EFFICIENCY: '/efficiency',
  EMPLOYEES: '/employees',
  OVERALL_BALANCE: '/overall-balance',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DELETE_TRANSACTION: '/delete-transactions',
  EDIT_TRANSACTION: '/edit-transactions',
  UPDATE_PASSWORD: '/update-password',
};

export const SEARCH_PARAM = {
  EMAIL: 'email',
  PASSWORD: 'password',
  TRANSACTION_NAME: 'transactionName',
};

import { TCustomer } from '.';

export type TDataSource = {
  id: string | number;
  [key: string]: string | number | boolean | TCustomer;
};

export type THeaderTable = {
  title?: string;
  key?: string;
  renderBody?: (_: TDataSource) => JSX.Element;
  renderHead?: (title: string, key: string) => JSX.Element;
};

export type TDataSource = {
  id: string | number;
  [key: string]: string | number | boolean;
};

export type THeaderTable = {
  title?: string;
  key?: string;
  renderBody?: (_: TDataSource) => JSX.Element;
  renderHead?: (title: string, key: string) => JSX.Element;
};

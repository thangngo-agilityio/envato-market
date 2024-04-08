export interface PaginationType {
  arrOfCurrButtons: (number | string)[];
  currentPage: number;
  limit: number;
}

export interface FormatPaginationParams extends PaginationType {
  totalCount: number;
}

export interface PageArrayType {
  arrOfCurrButtons: (number | string)[];
  currentPage: number;
  totalPage: number
}

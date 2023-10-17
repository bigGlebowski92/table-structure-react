export type TableStructureProps = {
  category: string;
  key: string;
  title: string;
  isPrimary?: boolean;
  isFilterable?: boolean;
};

export type RowsProps = {
  brandName: string;
  market: string;
  productName: string;
  netProfit: number;
  perUnitFees: number;
  perUnitPrice: number;
  totalProfit: number;
  totalQuantity: number;
  totalSales: number;
};

export type GroupedColumnsProps = {
  [category: string]: TableStructureProps[];
};

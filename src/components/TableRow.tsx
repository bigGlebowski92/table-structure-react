import { GroupedColumnsProps, RowsProps, TableStructureProps } from '../types';

type TableRowProps = {
  groupedColumns: GroupedColumnsProps;
  collapsedCategories: string[];
  primaryColumns: TableStructureProps[];
  row: RowsProps;
};

const TableRow = ({
  groupedColumns,
  collapsedCategories,
  primaryColumns,
  row,
}: TableRowProps) => {
  return (
    <tbody>
      <tr>
        {Object.keys(groupedColumns).map((category) =>
          !collapsedCategories.includes(category)
            ? groupedColumns[category].map((column) => (
                <td key={column.key} className="p-2 border-[1px] border-[#ccc]">
                  {row[column.key as keyof RowsProps]}
                </td>
              ))
            : primaryColumns
                .filter((column) => column.category === category)
                .map((column) => (
                  <td
                    key={column.key}
                    className="p-2 border-[1px] border-[#ccc]"
                  >
                    {row[column.key as keyof RowsProps]}
                  </td>
                ))
        )}
      </tr>
    </tbody>
  );
};

export default TableRow;

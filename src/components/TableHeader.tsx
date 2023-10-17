import { GroupedColumnsProps, TableStructureProps } from '../types';

type TableHeaderProps = {
  groupedColumns: GroupedColumnsProps;
  collapsedCategories: string[];
  toggleCategory: (category: string) => void;
  primaryColumns: TableStructureProps[];
  setFilters: React.Dispatch<React.SetStateAction<string>>;
  uniqueValues: () => string[];
  filters: string;
};

const TableHeader = ({
  groupedColumns,
  collapsedCategories,
  toggleCategory,
  primaryColumns,
  setFilters,
  uniqueValues,
  filters,
}: TableHeaderProps) => {
  const renderColumns = (column: TableStructureProps) => (
    <th
      key={column.key}
      className="p-2 bg-[#f0f0f0] border-[1px] border-[#ccc]"
    >
      {column.title}
      {column.isFilterable && (
        <select
          className="ml-3"
          value={filters}
          onChange={(e) => setFilters(e.target.value)}
        >
          {uniqueValues().map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
    </th>
  );

  return (
    <thead>
      <tr>
        {Object.keys(groupedColumns).map((category, index) => (
          <th
            key={index}
            colSpan={
              !collapsedCategories.includes(category)
                ? groupedColumns[category].length
                : primaryColumns.filter(
                    (column) => column.category === category
                  ).length
            }
            onClick={() => toggleCategory(category)}
            className="p-3 bg-[#f0f0f0] border-[1px] border-[#ccc] text-bold underline hover:cursor-pointer"
          >
            {category}
          </th>
        ))}
      </tr>
      <tr>
        {Object.keys(groupedColumns).map((category) =>
          !collapsedCategories.includes(category)
            ? groupedColumns[category].map((column) => renderColumns(column))
            : primaryColumns
                .filter((column) => column.category === category)
                .map((column) => renderColumns(column))
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;

import { useState } from 'react';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';
import { useFetchData } from './hooks/useFetchData';
import { GroupedColumnsProps, RowsProps } from './types';

const api1 = 'https://api-staging.entriwise.com/mock/test-task-table1';
const api2 = 'https://api-staging.entriwise.com/mock/test-task-table2';

const App = () => {
  const [dataApi, setDataApi] = useState(api1);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState('all');

  const { data, tableStructure, isLoading, error } = useFetchData(dataApi);

  const groupedColumns = tableStructure.reduce((acc, column) => {
    const category = column.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(column);
    return acc;
  }, {} as GroupedColumnsProps);

  const toggleCategory = (category: string) => {
    if (collapsedCategories.includes(category)) {
      setCollapsedCategories(collapsedCategories.filter((c) => c !== category));
    } else {
      setCollapsedCategories([...collapsedCategories, category]);
    }
  };

  const primaryColumns = tableStructure.filter((column) => column.isPrimary);

  const uniqueValues = () => {
    const uniqueValues = new Set();

    data.forEach((row) => {
      tableStructure.forEach((column) => {
        if (column.isFilterable) {
          uniqueValues.add(row[column.key as keyof RowsProps]);
        }
      });
    });

    const array = ['all', ...uniqueValues];
    return array as string[];
  };

  const filteredData =
    filters === 'all'
      ? data
      : data.filter((row) => Object.values(row).includes(filters));

  if (isLoading) {
    return <h1 className="text-xl text-center text-purple-500">Loading....</h1>;
  }
  if (error) {
    return <h3 className="text-xl text-center text-pink-500">{error}</h3>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <button
        className="p-5 bg-[#f0f0f0] hover:cursor-pointer"
        onClick={() => setDataApi(dataApi === api1 ? api2 : api1)}
      >
        Switch To Dataset {dataApi === api1 ? '2' : '1'}
      </button>
      <table className="w-[90%] mt-5">
        <TableHeader
          groupedColumns={groupedColumns}
          collapsedCategories={collapsedCategories}
          toggleCategory={toggleCategory}
          primaryColumns={primaryColumns}
          setFilters={setFilters}
          uniqueValues={uniqueValues}
          filters={filters}
        />
        {filteredData.map((row, rowIndex) => (
          <TableRow
            groupedColumns={groupedColumns}
            collapsedCategories={collapsedCategories}
            primaryColumns={primaryColumns}
            row={row}
            key={rowIndex}
          />
        ))}
      </table>
    </div>
  );
};

export default App;

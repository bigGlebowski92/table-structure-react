import { useEffect, useState } from 'react';
import { getErrorMessage } from '../lib/utils';
import { RowsProps, TableStructureProps } from '../types';

export const useFetchData = (url: string) => {
  const [data, setData] = useState<RowsProps[]>([]);
  const [tableStructure, setTableStructure] = useState<TableStructureProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setIsLoading(false);
        setData(result.rows);
        setTableStructure(result.tableStructure);
      } catch (error) {
        setIsLoading(false);
        setError(getErrorMessage(error));
      }
    };

    fetchData();
  }, [url]);

  return { data, tableStructure, isLoading, error };
};

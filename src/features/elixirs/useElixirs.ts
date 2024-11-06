import { useCallback, useEffect, useState } from 'react';

import { getAllElixirs } from '@/api/elixirs.api.ts';

import { UseElixirs, UseElixirsParams } from '@/features/elixirs/useElixirs.type.ts';

export const useElixirs: UseElixirs = ({ initialData, params }) => {
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState<typeof initialData | ReturnType<UseElixirs>['data']>(
    initialData
  );
  const [error, setError] = useState<Error | null>(null);

  const getData = useCallback(async (searchParams = params) => {
    const data = await getAllElixirs({ params: searchParams });

    if (data instanceof Error) {
      setError(data);
      return null;
    }

    setData(data);
    return data;
    // PARAMS NOT NEEDED
  }, []);

  const refetch = async (params: UseElixirsParams['params']) => {
    setFetching(true);

    const newData = await getData(params);
    setFetching(false);

    return newData;
  };

  useEffect(() => {
    (async () => {
      await getData();
      setLoading(false);
    })();
  }, [getData]);

  return { data, isLoading, isFetching, error, refetch };
};

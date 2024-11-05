import { useCallback, useEffect, useState } from 'react';

import { getAllElixirs } from '@/api/elixirs.api.ts';

import type { UseElixirs } from '@/features/elixirs/useElixirs.type.ts';

export const useElixirs: UseElixirs = ({ initialData, params }) => {
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState<typeof initialData | ReturnType<UseElixirs>['data']>(
    initialData
  );
  const [error, setError] = useState<Error | null>(null);

  const getData = useCallback(async () => {
    const data = await getAllElixirs({ params });

    if (data instanceof Error) {
      setError(data);
      return null;
    }

    setData(data);
    return data;
    // PARAMS NOT NEEDED
  }, []);

  const refetch = async () => {
    setFetching(true);

    const newData = await getData();
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

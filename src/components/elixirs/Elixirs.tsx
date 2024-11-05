import Table from '@/components/UI/table/Table.tsx';
import { useElixirs } from '@/features/elixirs/useElixirs.ts';
import Loading from '@/shared/loading/Loading.tsx';
import Error from '@/shared/error/Error.tsx';

import type { Component } from '@/types';
import type { TableColumns } from '@/components/UI/table/table.type.ts';

const columns: TableColumns = [];

const Elixirs: Component = () => {
  const { data, isLoading, error } = useElixirs({
    initialData: [],
    params: {},
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return <Table columns={columns} data={data} />;
};

export default Elixirs;

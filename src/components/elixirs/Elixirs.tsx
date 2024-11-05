import Table from '@/components/UI/table/Table.tsx';
import { useElixirs } from '@/features/elixirs/useElixirs.ts';
import Loading from '@/shared/loading/Loading.tsx';
import Error from '@/shared/error/Error.tsx';

import type { Component } from '@/types';
import type { TableColumns } from '@/components/UI/table/table.type.ts';
import type { GetAllElixirsOutput } from '@/api/elixirs.api.ts';

const columns = [
  {
    title: 'Name',
    key: 'name',
    render: value => <span>{value}</span>,
  },
  {
    title: 'Difficulty',
    key: 'difficulty',
    render: value => <span>{value}</span>,
  },
  {
    title: 'Ingredient',
    key: 'ingredient',
    render: (_, record) => <span>{record.ingredients.map(cur => cur.name).join(', ') || '-'}</span>,
  },
  {
    title: 'Inventor Full Name',
    key: 'inventor_full_name',
    render: (_, record) => (
      <span>
        {record.inventors.map(cur => `${cur.firstName} ${cur.lastName}`).join(', ') || '-'}
      </span>
    ),
  },
  {
    title: 'Manufacturer',
    key: 'manufacturer',
    render: value => <span>{value || '-'}</span>,
  },
] satisfies TableColumns<GetAllElixirsOutput>[];

const Elixirs: Component = () => {
  const { data, isLoading, isFetching, error } = useElixirs({
    initialData: [],
    params: {},
  });

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return <Table columns={columns} data={data} isLoading={isLoading || isFetching} />;
};

export default Elixirs;

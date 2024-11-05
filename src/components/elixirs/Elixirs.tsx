import { useState } from 'react';

import Table from '@/components/UI/table/Table.tsx';
import { useElixirs } from '@/features/elixirs/useElixirs.ts';

import classes from '@/components/elixirs/Elixirs.module.css';

import type { Component } from '@/types';
import type { TableColumns } from '@/components/UI/table/table.type.ts';
import type { GetAllElixirsOutput } from '@/api/elixirs.api.ts';

const columns = [
  {
    title: 'Name',
    key: 'name',
    render: value => <span>{value}</span>,
    width: '15%',
  },
  {
    title: 'Difficulty',
    key: 'difficulty',
    render: value => <span>{value}</span>,
    width: '20%',
  },
  {
    title: 'Ingredient',
    key: 'ingredient',
    render: (_, record) => <span>{record.ingredients.map(cur => cur.name).join(', ') || '-'}</span>,
  },
  {
    title: 'Inventor Full Name',
    key: 'inventorFullName',
    render: (_, record) => (
      <span>
        {record.inventors.map(cur => `${cur.firstName} ${cur.lastName}`).join(', ') || '-'}
      </span>
    ),
    width: '15%',
  },
  {
    title: 'Manufacturer',
    key: 'manufacturer',
    render: value => <span>{value || '-'}</span>,
    width: '15%',
  },
] satisfies TableColumns<GetAllElixirsOutput>[];

const initialState = {
  name: '',
  difficulty: '',
  ingredient: '',
  inventorFullName: '',
  manufacturer: '',
} as const;

const values = {
  name: 'Name',
  difficulty: 'Difficulty',
  ingredient: 'Ingredient',
  inventorFullName: 'Inventor Full Name',
  manufacturer: 'Manufacturer',
} as const;

const Elixirs: Component = () => {
  const [isFiltersVisible, setFiltersVisible] = useState(true);
  const [state, setState] = useState(initialState);

  const { data, isLoading, isFetching, refetch, error } = useElixirs({
    initialData: [],
    params: state,
  });

  const handleChange = <T extends keyof typeof initialState, V = (typeof initialState)[T]>(
    key: T,
    value: V
  ) => {
    setState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <div className={classes.filtersWrapper}>
        {isFiltersVisible && (
          <div className={classes.filtersBlock}>
            {(Object.keys(initialState) as (keyof typeof initialState)[]).map(key => (
              <div key={key} className={classes.filtersInputBlock}>
                <span>{values[key]}</span>
                <input
                  placeholder="Enter Value..."
                  value={state[key]}
                  onChange={e => handleChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
        <div className={classes.btnBlock}>
          <button
            className={classes.refreshBtn}
            onClick={() => refetch(state)}
            disabled={isFetching}
          >
            Refresh
          </button>
          <button className={classes.filterBtn} onClick={() => setFiltersVisible(prev => !prev)}>
            Filters
          </button>
        </div>
      </div>
      <Table columns={columns} data={data} isLoading={isLoading || isFetching} error={error} />
    </div>
  );
};

export default Elixirs;

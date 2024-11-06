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

const values = {
  Name: 'Name',
  Difficulty: 'Difficulty',
  Ingredient: 'Ingredient',
  InventorFullName: 'Inventor Full Name',
  Manufacturer: 'Manufacturer',
} as const;

const activeKeys = {
  REFRESH: 'refresh',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

const initialState = Object.fromEntries(Object.keys(values).map(cur => [cur, ''])) as {
  [P in keyof typeof values]: string;
};

const Elixirs: Component = () => {
  const [isFiltersVisible, setFiltersVisible] = useState(true);
  const [activeKey, setActiveKey] = useState<(typeof activeKeys)[keyof typeof activeKeys] | null>(
    null
  );
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

  const handleRefresh = async () => {
    setActiveKey(activeKeys.REFRESH);
    await refetch(initialState);
  };

  const handleSubmit = async (key: typeof activeKeys.SUBMIT | typeof activeKeys.RESET) => {
    setActiveKey(key);

    if (key === 'reset') {
      setState(initialState);
      await refetch(initialState);
      return;
    }

    await refetch(state);
  };

  return (
    <div>
      <div className={classes.filtersWrapper}>
        {isFiltersVisible && (
          <div className={classes.filtersBlock}>
            <div className={classes.filtersTable}>
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
            <div className={classes.filtersBtnWrapper}>
              <button
                className={classes.applyBtn}
                onClick={() => handleSubmit(activeKeys.SUBMIT)}
                disabled={activeKey === activeKeys.SUBMIT && isFetching}
              >
                Apply
              </button>
              <button
                onClick={() => handleSubmit(activeKeys.RESET)}
                disabled={activeKey === activeKeys.RESET && isFetching}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
        <div className={classes.btnBlock}>
          {error && (
            <button
              className={classes.refreshBtn}
              onClick={handleRefresh}
              disabled={activeKey === activeKeys.REFRESH && isFetching}
            >
              Refresh
            </button>
          )}
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

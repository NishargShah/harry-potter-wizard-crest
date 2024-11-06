import { Fragment } from 'react';

import Error from '@/shared/error/Error.tsx';
import Loading from '@/shared/loading/Loading.tsx';

import classes from '@/components/UI/table/Table.module.css';

import type { Component, PrimitiveType } from '@/types';
import type { TableProps } from '@/components/UI/table/table.type.ts';

const Table: Component<TableProps> = props => {
  const { columns, data, isLoading, error } = props;
  const hasNoData = !(Array.isArray(data) ? data : []).length;

  const component = (() => {
    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message} />;
    if (hasNoData) return <p>No Data Found</p>;
    return null;
  })();

  return (
    <table
      className={[
        classes.table,
        ...(isLoading ? [classes.tableLoading] : []),
        ...(error ? [classes.tableError] : []),
        ...(hasNoData ? [classes.tableNoData] : []),
      ].join(' ')}
    >
      <thead>
        <tr>
          {columns.map(col => (
            <td key={col.key} width={col.width}>
              {col.title}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading || error || hasNoData ? (
          <tr>
            <td colSpan={columns.length}>{component}</td>
          </tr>
        ) : (
          <Fragment>
            {(Array.isArray(data) ? data : []).map(cur => (
              <tr key={cur.id}>
                {columns.map(col => (
                  <td key={col.key} width={col.width}>
                    {col.render(cur[col.key] as PrimitiveType, cur as never)}
                  </td>
                ))}
              </tr>
            ))}
          </Fragment>
        )}
      </tbody>
    </table>
  );
};

export default Table;

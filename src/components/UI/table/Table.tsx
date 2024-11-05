import classes from '@/components/UI/table/Table.module.css';

import type { Component, PrimitiveType } from '@/types';
import type { TableProps } from '@/components/UI/table/table.type.ts';
import TableLoader from '@/shared/TableLoader/TableLoader.tsx';
import { Fragment } from 'react';

const Table: Component<TableProps> = props => {
  const { columns, data, isLoading } = props;

  return (
    <table className={[classes.table, ...(isLoading ? [classes.tableLoading] : [])].join(' ')}>
      <thead>
        <tr>
          {columns.map(col => (
            <td key={col.key}>{col.title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length}>
              <TableLoader />
            </td>
          </tr>
        ) : (
          <Fragment>
            {(Array.isArray(data) ? data : []).map(cur => (
              <tr key={cur.id}>
                {columns.map(col => (
                  <td key={col.key}>{col.render(cur[col.key] as PrimitiveType, cur as never)}</td>
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

import classes from '@/components/UI/table/Table.module.css';

import type { Component } from '@/types';
import type { TableProps } from '@/components/UI/table/table.type.ts';

const Table: Component<TableProps> = props => {
  const { columns, data } = props;

  // if (false) return <TableLoader />;

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Hello</th>
          <th>Hii</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
        <tr>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;

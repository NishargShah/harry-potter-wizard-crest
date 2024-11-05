import type { ReactNode } from 'react';
import type { PrimitiveType, RecursiveType } from '@/types';

export interface TableColumns<D> {
  title: string;
  key: string;
  render: (value: PrimitiveType | undefined, record: D) => ReactNode;
  width?: string;
}

export interface TableProps<D = RecursiveType<PrimitiveType>> {
  columns: TableColumns<never>[];
  data: D[] | unknown;
  isLoading: boolean;
  error: Error | null;
}

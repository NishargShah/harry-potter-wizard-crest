import { FC, ReactNode } from 'react';

export type PrimitiveType = string | number | boolean;

interface Children {
  children: ReactNode;
}

export type Component<E = unknown> = FC<E>;

export type Layout<E = unknown> = FC<Children & E>;

export interface RecursiveType<T> {
  [key: string]: T | RecursiveType<T>;
}

import type { QueryOutput } from '@/types/api.type.ts';
import type { GetAllElixirsOutput } from '@/api/elixirs.api.ts';

interface UseElixirsParams<D> {
  initialData: unknown | D;
  params: Record<string, string>;
}

export type UseElixirs = <D = GetAllElixirsOutput[]>(
  params: UseElixirsParams<D>
) => QueryOutput<D | UseElixirsParams<D>['initialData'], UseElixirsParams<D>['params']>;

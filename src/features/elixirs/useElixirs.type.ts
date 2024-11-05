import type { QueryOutput } from '@/types/api.type.ts';
import type { GetAllElixirsOutput } from '@/api/elixirs.api.ts';

interface UseElixirsParams {
  initialData: unknown;
  params: Record<string, string>;
}

export type UseElixirs = (
  params: UseElixirsParams
) => QueryOutput<
  GetAllElixirsOutput[] | UseElixirsParams['initialData'],
  UseElixirsParams['params']
>;

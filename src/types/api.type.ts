interface EndpointsOutput {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
}

export type Endpoints = Record<string, EndpointsOutput>;

export type QueryOutput<T, D, E = Error> = {
  data: T;
  isLoading: boolean;
  isFetching: boolean;
  error: E | null;
  refetch: (data: D) => Promise<T | null>;
};

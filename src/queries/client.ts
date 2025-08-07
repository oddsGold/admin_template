import { MutationFunction, QueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from './http-client.ts';

type QueryParams = Record<string, unknown>;

interface MutationVariables {
  url: string;
  method: string;
  data: unknown;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 60 * 1000,
      gcTime: 5 * 60 * 60 * 1000,
      queryFn: async ({ queryKey }) => {
        const [url, params] = queryKey as [string | ((params: QueryParams) => string), QueryParams];

        const endpoint = typeof url === 'string' ? url : url(params);

        const response = await fetchWithAuth(
          endpoint,
          params ? { body: JSON.stringify(params) } : undefined
        );
        return response.json();
      },
      retry: (failureCount, error) => {
        //Do not repeat with 401 (the token update has already been processed)
        if (error.message.includes('401')) return false;
        return failureCount < 3;
      },
    },
    mutations: {
      mutationFn: (async (variables: unknown) => {
        const { url, method, data } = variables as MutationVariables;
        const response = await fetchWithAuth(url, {
          method,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.json();
      }) as MutationFunction<unknown, unknown>,
    },
  },
});

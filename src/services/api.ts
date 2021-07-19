import axios, {AxiosRequestConfig} from 'axios';
import useSWR, {SWRConfiguration} from 'swr';

export const baseURL = 'http://api.maxcore.com.br/imcamp';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: 'Basic aW1jYW1wOkYxMzlDQkQ2RUE3RjY2MzUyQUE1MTE0MkE1MzRBRjkw',
  },
});

export default api;

export function useFetch<Data = any, Error = any>(
  url: string,
  config?: AxiosRequestConfig,
  options?: SWRConfiguration,
) {
  const {data, error, isValidating, mutate, revalidate} = useSWR<Data, Error>(
    url,
    async route => {
      const response = await api.get(route, config);

      return response.data;
    },
    options,
  );

  return {data, error, isValidating, mutate, revalidate};
}

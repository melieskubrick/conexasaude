import axios, {AxiosRequestConfig} from 'axios';
import useSWR, {ConfigInterface} from 'swr';
export const baseURL = 'http://desafio.conexasaude.com.br';
const api = axios.create({
  baseURL: baseURL,
});

export default api;

export function useFetch<Data = any, Error = any>(
  url: string,
  config?: AxiosRequestConfig,
  options?: ConfigInterface,
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

import axios, { AxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useAuth } from 'providers/auth.provider';

export function configureAxiosInstance(userToken?: string) {
  const baseURL = process.env.REACT_APP_API_URL;

  const headers: any = {
    'Access-Control-Allow-Origin': '*'
  };

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

  const config: AxiosRequestConfig = {
    baseURL,
    timeout: 30000,
    headers
  };

  return axios.create(config);
}

export default function useHttpService<T>(url: string) {
  const { userToken, signOut } = useAuth();

  const instance = configureAxiosInstance(userToken);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        signOut?.();
      }
      return Promise.reject(error);
    }
  );

  function all() {
    return instance.get<T[]>(`${url}/all`);
  }

  function one(id: number) {
    return instance.get<T>(`${url}/one/${id}`);
  }

  function create(data: T) {
    return instance.post<T>(`${url}/create`, data);
  }

  function update(id: number, data: T) {
    return instance.put(`${url}/update/${id}`, data);
  }

  function remove(id: number) {
    return instance.delete(`${url}/delete/${id}`);
  }

  return { instance, all, one, create, update, remove };
}

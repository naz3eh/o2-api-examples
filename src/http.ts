import axios, { AxiosInstance } from 'axios';

export function createHttpClient(baseURL: string): AxiosInstance {
  return axios.create({ baseURL, timeout: 10_000, headers: { 'Content-Type': 'application/json' } });
}

export async function get<T>(client: AxiosInstance, url: string, params?: Record<string, any>, ownerId?: string): Promise<T> {
  const res = await client.get(url, { params, headers: ownerId ? { 'O2-Owner-Id': ownerId } : undefined });
  return res.data as T;
}

export async function post<T>(
  client: AxiosInstance,
  url: string,
  data?: Record<string, any>,
  ownerId?: string
): Promise<T> {
  const res = await client.post(url, data ?? {}, { headers: ownerId ? { 'O2-Owner-Id': ownerId } : undefined });
  return res.data as T;
}

export async function put<T>(
  client: AxiosInstance,
  url: string,
  data?: Record<string, any>,
  ownerId?: string
): Promise<T> {
  const res = await client.put(url, data ?? {}, { headers: ownerId ? { 'O2-Owner-Id': ownerId } : undefined });
  return res.data as T;
}

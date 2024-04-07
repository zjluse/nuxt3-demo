export function login(params: any) {
  return useFetchApi.post('/login', params);
}

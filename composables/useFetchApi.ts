// https://nuxt.com/docs/api/composables/use-fetch
import { ResultEnum } from '~/enums/httpEnum';
import { useUserStote } from '~/stores/user';

type UrlType = string | Request | Ref<string | Request> | (() => string | Request);

interface ResponseData {
  code: number,
  data?: any,
  msg?: string
}

const request = async <T>(url: UrlType, params: any, options: any) => {
  const serverHeaders = useRequestHeaders(['cookie']);
  const method = (options?.method || 'GET').toUpperCase();

  const config = useRuntimeConfig();
  const { $toast } = useNuxtApp();
  const userStore = useUserStote();

  const { data: responseData, error } = await useFetch(url, {
    baseURL: config.public.APP_BASEURL,
    headers: {
      ...options.headers,
      ...serverHeaders,
      authorization: `Bearer ${userStore.token}`
    },
    server: false,
    params: method === 'GET' ? params : undefined,
    body: method === 'POST' ? JSON.stringify(params) : undefined,
    timeout: 50000,
    ...options,
  });
  
  if (error.value || !responseData.value) {
    return Promise.reject(error.value || '服务响应失败，请稍后重试');
  }

  const { code, data, msg } = responseData.value as ResponseData;
  if (code === ResultEnum.SUCCESS) {
    return data;
  } else if (code === ResultEnum.EXPIRED || code === ResultEnum.INVALID) {
    // TODO: token 过期/无效 重新登录?
    // TOOD: 错误提示？ i18n处理
    // $toast.add()
    return Promise.reject(error.value || '服务响应失败，请稍后重试');
  }
  return responseData;
};

export const useFetchApi = {
  get: <T>(url: UrlType, params?: any, options?: any) => {
    return request<T>(url, params, {
      method: 'GET',
      ...options
    });
  },
  post: <T>(url: UrlType, params?: any, options?: any) => {
    return request<T>(url, params, {
      method: 'POST',
      ...options
    });
  },
};

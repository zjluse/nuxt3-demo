// https://nuxt.com/docs/api/composables/use-fetch
import { ResultEnum } from '~/enums/httpEnum';
import { useUserStote } from '~/stores/user';

type UrlType = string | Request | Ref<string | Request> | (() => string | Request);

interface ResponseData {
  code: number,
  data?: any,
  msg?: string
}

function jsonToFormData(json: any) {
  if (!json) return null;
  const formData = new FormData();
  
  Object.keys(json).forEach(key => {
    formData.append(key, json[key]);
  });
  
  return formData;
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
    // server: false,
    params: method === 'GET' ? params : undefined,
    // body: method === 'POST' ? JSON.stringify(params) : undefined,
    body: method === 'POST' ? jsonToFormData(params) : undefined,
    timeout: 50000,
    ...options,
  });
  
  if (error.value || !responseData.value) {
    return Promise.reject(error.value);
  }

  const { code, data, msg } = responseData.value as ResponseData;
  if (code === ResultEnum.SUCCESS) {
    return data;
  } else if (code === ResultEnum.EXPIRED || code === ResultEnum.INVALID) {
    // TODO: token 过期/无效 重新登录?
    
    return Promise.reject(error.value);
  }
  
  // TOOD: 错误提示？ i18n处理
  // if(process.client) {
  //   $toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 1000 });
  // }

  return Promise.reject(responseData);
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

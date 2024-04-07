import { useToast } from 'primevue/usetoast';
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastService);
  const toast = useToast();
  return {
    provide: {
      toast
    }
  }
})
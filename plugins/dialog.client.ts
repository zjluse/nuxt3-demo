import { useDialog } from 'primevue/usedialog';
import DialogService from 'primevue/dialogservice';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DialogService);
  const dialog = useDialog();
  return {
    provide: {
      dialog
    }
  }
})
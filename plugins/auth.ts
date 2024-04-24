import InvestmentRentalPopup from "~/components/Investment/RentalPopup.vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('auth', {
    mounted: (el, binding) => {
      el.addEventListener('click', () => {
        const userStore = useUserStote();
        const { token } = storeToRefs(userStore);
        
        const { $dialog } = useNuxtApp()
        // TODO: 换登录组件
        // $dialog.open(InvestmentRentalPopup, {
        //   props: {
        //     modal: true,
        //     showHeader: false,
        //     closable: false,
        //     dismissableMask: true, // 可以关闭蒙层
        //     pt: {
        //       root: 'jx-common-popup',
        //       content: 'jx-common-popup-content'
        //     }
        //   },
        //   templates: {},
        //   data: {}
        // });
      })
    },
  })
})
import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'

// TODO: 一些配置可以单独抽离
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  features: {
    devLogs: false, // https://github.com/nuxt/nuxt/issues/26605
  },
  alias: {},
  app: {
    keepalive: true, // ?
    head: {
      meta: [
        { 'charset': 'utf-8' },
        { 
          'name': 'viewport',
          'content': 'width=device-width,initial-scale=1,user-scalable=no'
        },
        { 'name': 'description', 
          'content': '金象算力是一家在全球范围内领先的比特币挖矿企业，专注于为客户提供高效且稳定的数字货币挖矿服务。同时以客户需求为导向，为客户提供一站式的数字货币挖矿解决方案。'
        },
        { 'name': 'keywords', 
          'content': 'JXMining,交易所,比特币,股票,黄金,原油,外汇数字资产,BTC,ETH,BTCUSD'
        }
      ],
      title: "金象算力：引领比特币挖矿的未来",
    },
  },
  modules: [
    ['nuxt-primevue', {
      cssLayerOrder: 'reset, primevue',
      components: {
        include: ['Toast', 'DynamicDialog', 'InputNumber', 'InputText', 'Checkbox', 'RadioButton', 'Dropdown', 'DataTable', 'Column', 'Paginator'],
        // exclude: ['Chart', 'Dock', 'Menu']
      },
    }],
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    ['@nuxtjs/i18n', {
      lazy: true,
      langDir: 'locales',
      defaultLocale: 'zh-CN',
      strategy: 'no_prefix',
      locales: [
        { code: 'zh-CN', file: 'cn.json', name: '简体中文' },
        { code: 'en', file: 'en.json', name: 'English' },
      ],
      vueI18n: './i18n.config.ts',
      detectBrowserLanguage: {
        fallbackLocale: 'zh-CN',
        useCookie: true,
        cookieKey: '_i18n_',
      }
    }]
  ],
  css: [
    'normalize.css/normalize.css',
    'primevue/resources/themes/aura-light-green/theme.css',
    '~/assets/style/scss/main.scss',
    '~/assets/style/scss/flex.scss'
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : [],
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.NUXT_PUBLIC_API_TARGETURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  },
  devServer: {},
  nitro: {},
  sourcemap: {
    server: true,
    client: false
  },
  runtimeConfig: {
    public: {
      APP_BASEURL: process.env.NUXT_PUBLIC_API_BASEURL,
      APP_VERSION: pkg.version,
      APP_MODE: process.env?.NODE_ENV,
      APP_ENCRYPTKEY: process.env.NUXT_PUBLIC_ENCRYPTKEY
    }
  },
})

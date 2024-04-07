import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  features: {
    devLogs: false, // https://github.com/nuxt/nuxt/issues/26605
  },
  alias: {},
  app: {
    keepalive: true
  },
  modules: [
    ['nuxt-primevue', {
      components: {
        include: ['Toast'],
        // exclude: ['Chart', 'Dock', 'Menu']
      },
    }],
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    ['@nuxtjs/i18n', {
      lazy: true,
      langDir: 'locales',
      defaultLocale: 'cn',
      strategy: 'no_prefix',
      locales: [
        { code: 'cn', file: 'cn.json', name: 'Chinese' },
        { code: 'en', file: 'en.json', name: 'English' },
      ],
      vueI18n: './i18n.config.ts',
      detectBrowserLanguage: {
        fallbackLocale: 'cn',
        useCookie: true,
        cookieKey: '_i18n_',
      }
    }]
  ],
  css: [
    '~/assets/style/scss/main.scss',
    'primevue/resources/themes/aura-light-green/theme.css'
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
      APP_MODE: process.env?.NODE_ENV
    }
  },
})

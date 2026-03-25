// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    'nuxt-calendly',
    '@nuxt/eslint',
    '@nuxt/image'
  ],
   ui: {
        theme: {
            colors: [
                'primary',
                'secondary',
                'success',
                'info',
                'warning',
                'error',
                'neutral'
            ],
        },
        

    },
  css: ['~/assets/css/main.css'],
})
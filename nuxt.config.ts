// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/',
  },
  devtools: {
    enabled: process.env.NODE_ENV !== "production",
  },
  modules: ["nuxt-primevue", "@nuxtjs/tailwindcss"],
});

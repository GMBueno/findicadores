// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["nuxt-primevue", "@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  devtools: {
    enabled: process.env.NODE_ENV !== "production",
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
});

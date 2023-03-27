// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "QRGen | Generate & scan QR Codes instantly!",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Generate & scan QR Codes instantly!",
        },
      ],
    },
  },
  modules: ["nuxt-windicss", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "DM+Sans": true,
    },
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
  },
});

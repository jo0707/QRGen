// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "QRGen | Generate & scan QR Codes instantly!",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Generate & scan QR Codes instantly!",
        },
        // add more meta tags here
        { name: "theme-color", content: "#ffffff" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Joshua Sinaga, josua123690707@gmail.com" },
      ],
    },
  },
  modules: ["nuxt-windicss", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Inter: true,
    },
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
  },
});

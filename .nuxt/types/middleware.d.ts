import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/home/jo/NUXT/QRGen/node_modules/.pnpm/nuxt@3.3.1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
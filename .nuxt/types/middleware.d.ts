import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/home/projects/github-dfrmau/node_modules/.pnpm/nuxt@3.3.1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
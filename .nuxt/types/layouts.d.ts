import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/home/jo/NUXT/QRGen/node_modules/.pnpm/nuxt@3.3.1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}
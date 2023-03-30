<template>
  <div class="max-w-screen flex min-h-screen flex-col font-sans">
    <header class="flex items-center justify-between py-4 px-2 sm:p-4 md:py-4 md:px-12">
      <h1
        class="select-none bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-lg font-bold font-bold text-transparent transition sm:text-xl md:text-3xl">
        QRGenerator
      </h1>
      <nav class="flex place-items-center sm:gap-2">
        <NuxtLink to="/scan" class="py-1 px-3 font-medium">Scan</NuxtLink>
        <NuxtLink to="/"
          class="transform rounded bg-gradient-to-br from-blue-400 to-blue-600 py-2 px-3 font-semibold text-slate-200 shadow transition hover:scale-110">
          + Create</NuxtLink>
      </nav>
    </header>

    <main class="my-8 grid flex-grow place-items-center">
      <NuxtPage></NuxtPage>
    </main>

    <footer class="w-full">
      <div class="flex items-center justify-center p-4 text-center">
        <p class="text-xs text-gray-600">
          Made with
          <a href="https://nuxt.com/" target="_blank" class="text-blue-600 hover:text-blue-700">Nuxt.js</a>
          ,
          <a href="https://www.npmjs.com/package/lean-qr" target="_blank"
            class="text-blue-600 hover:text-blue-700">lean-qr</a>
          , and
          <a href="https://www.npmjs.com/package/qr-scanner" target="_blank"
            class="text-blue-600 hover:text-blue-700">qr-scanner</a>
          | GitHub :
          <a href="https://github.com/jo0707" target="_blank" class="text-blue-600 hover:text-blue-700">jo0707</a>
        </p>
      </div>
    </footer>
  </div>
</template>

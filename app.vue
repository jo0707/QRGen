<template>
  <div class="min-h-screen flex flex-col font-sans">
    <header class="flex justify-between items-center p-4">
      <h1 class="text-3xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 font-bold bg-clip-text text-transparent select-none transition">QRGenerator</h1>
      <nav class="flex space-x-2 place-items-center">
        <NuxtLink to="/scan" class="font-medium py-1 px-3"
          >Scan</NuxtLink
        >
        <NuxtLink to="/" class="font-medium py-1 px-3">Create</NuxtLink>
        <NuxtLink
          to="https://github.com/jo0707"
          target="_blank"
          class="font-semibold text-slate-200 bg-gradient-to-br from-dark-100 to-dark-800 py-2 px-3 rounded shadow hover:scale-110 transform transition"
          >GitHub</NuxtLink
        >
      </nav>
    </header>

    <main class="grid place-items-center my-8 flex-grow">
      <NuxtPage></NuxtPage>
    </main>

    <footer>
      <div class="flex justify-center items-center p-4">
        <p class="text-xs text-gray-500">
          Made with
          <a
            href="https://nuxt.com/"
            target="_blank"
            class="text-blue-500 hover:text-blue-600"
            >Nuxt.js</a
          >
          and
          <a
            href="https://www.npmjs.com/package/lean-qr"
            target="_blank"
            class="text-blue-500 hover:text-blue-600"
            >lean-qr</a
          > 
          |
          <a
            href="https://github.com/jo0707"
            target="_blank"
            class="text-blue-500 hover:text-blue-600"
            >jo0707</a
          >
        </p>
      </div>

    </footer>
  </div>
</template>

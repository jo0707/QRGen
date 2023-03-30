<template>
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
</template>
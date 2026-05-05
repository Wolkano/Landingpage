<template>
  <UHeader
    title="Byggproffs Skåne AB"
    class="border-none flex flex-wrap flex-row"
  >
    <template #title>
      <NuxtLink to="/" aria-label="Byggproffs Skåne AB">
        <img
          src="/byggproffs-logotyp-svart.webp"
          alt="Byggproffs Skåne AB"
          class="h-12 w-auto"
        >
      </NuxtLink>
    </template>
    <template #right>
      <UButton leading-icon="gg:phone" label="Ring oss nu" variant="link" />
      <UButton label="Boka Hembesök" />
    </template>
  </UHeader>
</template>

<script setup lang="ts"></script>

<style scoped></style>

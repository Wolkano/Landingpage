<template>
  <UHeader
    title="Byggproffs Skåne"
    class="border-none flex flex-wrap flex-row"
    :ui="{
      title: 'font-semibold text-3xl',
    }"
  >
    <template #right>
      <UButton leading-icon="gg:phone" label="Ring oss nu" variant="link" />
      <UButton label="Boka Hembesök" />
      <UButton label="RÄKNA UT OFFERT" variant="outline" href="pages/calc.vue"/>
      <UButton label="Startsida" variant="outline" href="pages/index.vue"/>
    </template>
  </UHeader>
</template>

<script setup lang="ts"></script>

<style scoped></style>

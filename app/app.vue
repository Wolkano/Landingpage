<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage class="min-w-full" />
    </NuxtLayout>
  </UApp>
</template>
<script setup>
definePageMeta({
  class: "root",
});
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "sv",
  },
});
</script>
<style></style>

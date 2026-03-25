<template>
  <div class="w-full">
    <div
      class="bg-neutral-500 flex flex-row flex-wrap justify-around h-20 items-center w-full"
    >
      <div class="bannerItem">TRYGG-HANSA</div>
      <div class="bannerItem">ISODRÄN CERTIFIERAD</div>
      <div class="bannerItem">VÅTRUMSBEHÖRIG</div>
      <div class="bannerItem">IDO6</div>
      <div class="bannerItem">SÄKER VATTEN</div>
    </div>
    <u-page-hero
      headline="VARFÖR VÄLJA OSS"
      title="Byggd på förtroende och precision."
      orientation="horizontal"
      class="w-full"
      :ui="{
        title: 'w-full',
        container: 'flex! flex-col!',
      }"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bannerItem {
  font-weight: 700;
}
</style>

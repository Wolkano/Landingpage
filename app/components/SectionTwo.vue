<template>
  <div class="w-full pb-10">
    <div
      class="bg-neutral-500 flex flex-row flex-wrap justify-around h-20 items-center w-full"
    >
      <div class="bannerItem">STÖRST I NV SKÅNE</div>
      <div class="bannerItem">VI ÄR VAD VI HETER</div>
    </div>
    <u-page-hero
      headline="VARFÖR VÄLJA OSS"
      title="Byggd på förtroende och precision."
      orientation="horizontal"
      class="w-full"
      :ui="{
        title: 'w-full',
        container: 'flex! flex-col! py-10! h-fit! gap-0! ',
        root: 'h-fit!',
      }"
    />
    <div
      class="grid grid-cols-1 lg:w-[60%] lg:grid-cols-3 lg:mx-auto gap-6 mx-6"
    >
      <div class="w-full col-span-2">
        <UPageCard
          title="En offert du kan lita på"
          description="Vi gissar aldrig. Efter vårt platsbesök får ni en utförlig offert som visualiserar hela processen och alla ingående moment. Inga överraskningar, bara trygghet."
          icon="material-symbols:house-outline"
          variant="soft"
        >
          <div class="h-[50%]">
            <img src="/hero-image.png" />
          </div>
        </UPageCard>
      </div>
      <div class="flex flex-col gap-6 h-full w-full">
        <UPageCard
          title="Arbete till fastpris"
          description="Vi sköter allt från grävning och isolering till återställning av din tomt. Ni har en dedikerad kontaktperson hela vägen."
          icon="clarity:contract-line"
          class="h-full w-full"
          variant="soft"
        /><UPageCard
          title="Är ni nöjda, är vi nöjda"
          description="Vi är inte klara förrän du är det. Vårt team stannar kvar tills du är helt nöjd med resultatet."
          icon="streamline-ultimate:factory-industrial-robot-arm-1"
          class="h-full w-full"
          variant="soft"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bannerItem {
  font-weight: 700;
}
</style>

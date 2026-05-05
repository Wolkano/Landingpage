<template>
  <div class="w-full pb-10">
    <div
      class="bg-slatePrimary-300 flex flex-row flex-wrap justify-around h-20 items-center w-full"
    >
      <div class="bannerItem">STÖRST I NV SKÅNE</div>
      <div class="bannerItem">VI ÄR VAD VI HETER</div>
    </div>
    <u-page-hero
      headline="VÅRT UPPDRAG"
      title="Skapa trygga och hållbara hem i Skåne"
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
          description="Vi gissar inte. Efter vårt platsbesök får ni en utförlig offert som visualiserar hela processen och alla ingående moment. Inga överraskningar, bara trygghet."
          icon="material-symbols:house-outline"
          variant="soft"
        >
          <div class="h-[50%]">
            <img src="/offer.webp" />
          </div>
        </UPageCard>
      </div>
      <div class="flex flex-col gap-6 h-full w-full">
        <UPageCard
          title="Arbete till fastpris"
          description="Inga överraskningar. Vi tar hand om allt från början till slut. Ni har en dedikerad projektledare hela vägen."
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

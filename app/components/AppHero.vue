<template>
  <u-page-hero
    headline="PROFESSIONELL DRÄNERING"
    title="Säkra din grund för framtiden"
    description="Vi utför markarbete och dränering med kirurgisk precision i hela Skåne. Skydda ditt hem mot fuktskador med vår certifierade expertis."
    :links="links"
    orientation="horizontal"
    class="bg-[url('https://placehold.co/600x400')] bg-no-repeat bg-cover"
    ><div>
      <UForm
        class="bg-neutral-200 flex flex-col gap-4 p-6 shadow-md border-b-3 border-primary-600"
      >
        <h2 class="font-semibold text-2xl">Få en kostnadsfri offert</h2>
        <u-form-field label="DITT NAMN">
          <u-input
            label="Namn"
            placeholder="Erik Andersson"
            variant="ghost"
            size="xl"
            class="w-full border-b border-neutral-600"
          />
        </u-form-field>
        <u-form-field label="E-POST">
          <u-input
            label="E-post"
            placeholder="erik@exempel.se"
            variant="ghost"
            size="xl"
            class="w-full border-b border-neutral-600"
          />
        </u-form-field>
        <u-form-field label="TELEFONNUMMER">
          <u-input
            label="Telefonnummer"
            placeholder="070-000 00 00"
            variant="ghost"
            size="xl"
            class="w-full border-b border-neutral-600"
          />
        </u-form-field>
        <UButton label="SKICKA FÖRFRÅGAN" />
        <p>Vi återkommer till dig inom 24 timmar på arbetsdagar</p>
      </UForm>
    </div></u-page-hero
  >
</template>

<script setup lang="ts">
const links = [
  {
    label: "10 ÅRS GARANTI",
    icon: "gg:check",
    variant: "link",
  },
  {
    label: "CERFTIFIERADE PERSONAL",
    icon: "gg:user",
    variant: "link",
  },
];
</script>

<style scoped></style>

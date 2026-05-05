<template>
  <div
    class="w-full bg-[url('/hero-image.png')] bg-no-repeat bg-cover bg-bottom"
  >
    <u-page-hero
      headline="SKYDDA DITT HEM MOT FUKTSKADOR"
      title="Vänta inte före länge med dräneringen"
      description="Vi utför markarbete och dränering med kirurgisk precision i hela Skåne. Boka in ett kostnadsfritt platsbesök idag!"
      :links="links"
      orientation="horizontal"
      class="bg-[rgba(255,255,255,0.5)] w-full"
      :ui="{
        headline: 'font-bold text-primary-600',
        description: 'font-semibold',
        links: 'heroBtns',
      }"
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
              autocomplete="name"
            />
          </u-form-field>
          <u-form-field label="E-POST">
            <u-input
              label="E-post"
              placeholder="erik@exempel.se"
              variant="ghost"
              size="xl"
              class="w-full border-b border-neutral-600"
              autocomplete="email"
            />
          </u-form-field>
          <u-form-field label="TELEFONNUMMER">
            <u-input
              label="Telefonnummer"
              placeholder="070-000 00 00"
              variant="ghost"
              size="xl"
              class="w-full border-b border-neutral-600"
              autocomplete="tel"
            />
          </u-form-field>
          <u-form-field label="Gatuadress">
            <u-input
              label="Gatuadress"
              placeholder="Storgatan 1"
              variant="ghost"
              size="xl"
              class="w-full border-b border-neutral-600"
              autocomplete="street-address"
            />
          </u-form-field>
          <u-form-field label="Postnummer">
            <u-input
              label="Postnummer"
              placeholder="201 45"
              variant="ghost"
              size="xl"
              class="w-full border-b border-neutral-600"
              autocomplete="postal-code"
            />
          </u-form-field>
          <u-form-field label="Stad">
            <u-input
              label="Stad"
              placeholder="Malmö"
              variant="ghost"
              size="xl"
              class="w-full border-b border-neutral-600"
              autocomplete="address-level2"
            />
          </u-form-field>
          <UButton
            label="SKICKA FÖRFRÅGAN"
            class="flex justify-center gradient-btn py-4 text-2xl"
          />
          <p class="w-full text-center text-sm">
            Vi återkommer till dig inom 12 timmar. Din information behandlas konfidentiellt och används endast för att ge dig en offert.
          </p>
        </UForm>
      </div></u-page-hero
    >
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    label: "KOSTNADSFRI OFFERT",
    icon: "ph:seal-check-fill",
    variant: "link",
  },
  {
    label: "ARBETE TILL FASTPRIS",
    icon: "mdi:worker",
    variant: "link",
  },
];
</script>

<style scoped></style>

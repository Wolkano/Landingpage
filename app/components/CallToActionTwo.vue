<template>
  <div class="w-full bg-neutral-100 py-16">
    <div class="max-w-4xl mx-auto px-6">
      <p class="text-primary-600 font-mono font-semibold uppercase tracking-widest text-sm mb-2">Kontakt</p>
      <h2 class="text-3xl font-bold text-neutral-900 mb-10">Hör av dig till oss</h2>

      <div class="flex flex-col lg:flex-row gap-10 items-start">
        <div class="flex flex-col items-center gap-3 shrink-0">
          <div class="w-40 h-40 rounded-full overflow-hidden border-4 border-primary-500">
            <img src="/byggproffs-alex-n.webp" alt="Aleks Nedeljkovic" class="w-full h-full object-cover" />
          </div>
          <p class="font-semibold text-neutral-800 text-base">Projektledare</p>
          <p class="text-neutral-700 text-sm">Aleks Nedeljkovic</p>
        </div>

        <!-- Contact info -->
        <div class="flex flex-col gap-6 flex-1">
          <div class="flex flex-col gap-3">
            <a href="tel:+46793476300">
              <UButton
                label="+46 79 347 63 00"
                icon="ph:phone-fill"
                size="xl"
                class="gradient-btn w-full justify-left py-4"
              />
            </a>
            <a href="mailto:info@byggproffsskane.se">
              <UButton
                label="info@byggproffsskane.se"
                icon="ph:envelope"
                size="xl"
                variant="outline"
                class="w-full justify-left py-4 border-primary-500 text-primary-600 hover:bg-primary-50"
              />
            </a>
          </div>

          <!-- Address -->
          <div class="flex items-start gap-3 text-neutral-600">
            <UIcon name="ph:map-pin-fill" class="w-5 h-5 mt-0.5 text-primary-500 shrink-0" />
            <div>
              <p class="font-semibold text-neutral-800">Andesitgatan 11V</p>
              <p class="font-semibold text-neutral-800">254 68 Helsingborg</p>
              <p>Skåne, Sverige</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
  <section class="w-full py-14 bg-white overflow-hidden">
    <div class="lg:w-[60%] lg:mx-auto mx-6 mb-8">
      <p class="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1">Samarbetspartners</p>
      <h2 class="text-2xl font-bold text-neutral-800">Leverantörer vi litar på</h2>
    </div>

    <div class="relative w-full overflow-hidden">
      <div class="marquee-track flex gap-12 items-center w-max">
        <a v-for="partner in [...partners, ...partners]" :key="partner.id + partner.name" :href="partner.href" target="_blank" class="logo-card shrink-0">
          <span class="logo-label" :style="{ color: partner.color }">{{ partner.name }}</span>
          <span v-if="partner.tagline" class="logo-tagline">{{ partner.tagline }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { id: 1, name: "STAVAB",     tagline: "VA Grossist", color: "#b72530", href: "https://stavab.se/" },
  { id: 2, name: "Derome",     tagline: "Byggvaror", color: "#005c46", href: "https://www.derome.se/" },
  { id: 3, name: "Wangeskogs", tagline: "Maskinutrustning", color: "#fea268", href: "https://wangeskog.se/" },
  { id: 4, name: "Ahlsell",    tagline: "Leverantör", color: "#003087", href: "https://www.ahlsell.se/" },
  { id: 5, name: "OptiDrain",  tagline: "Leverantör", color: "#004b87", href: "https://fuktsparrteknik.se/utvandig-kallarvagg/optidrain/" },
  { id: 6, name: "STO",        tagline: "Fasadsystem", color: "#ffd700", href: "https://www.sto.se/s/" },
  { id: 7, name: "Cramo AB",   tagline: "Leverantör", color: "#da000b", href: "https://www.cramo.se/sv" },
  { id: 8, name: "Isodrän®",   tagline: "Dräneringstillverkare", color: "#709c40", href: "https://www.isodran.se/" },
  { id: 9, name: "HILTI",      tagline: "Maskinutrustning", color: "#d2041e", href: "https://www.hilti.se/" },
  { id: 9, name: "Wolkano",      tagline: "Systemutveckling", color: "#da8b00", href: "https://wolkano.se" },
]
</script>

<style scoped>
.marquee-track {
  animation: marquee 28s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.logo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 80px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 20px;
  background: #fff;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.logo-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border-color: #b26235;
  border: 2px solid #b26235;
}

.logo-label {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
}

.logo-tagline {
  font-size: 0.6rem;
  font-weight: 500;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
}
</style>

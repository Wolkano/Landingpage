<template>
  <div class="w-full bg-neutral-100">
    <div class="bg-neutral-700 w-full">
      <div class="lg:w-[60%] mx-auto px-6 py-6 flex flex-col md:flex-row justify-around items-center gap-6 md:gap-0">
        <div v-for="stat in stats" :key="stat.value" class="flex flex-col items-center text-white">
          <span class="text-3xl font-bold text-primary-400">{{ stat.value }}</span>
          <span class="text-sm font-medium tracking-wide uppercase mt-1">{{ stat.label }}</span>
        </div>
      </div>
    </div>
    <div class="py-16 lg:w-[60%] mx-auto px-6">
      <p class="text-primary-600 font-bold text-sm tracking-widest uppercase mb-2">Högst kundnöjdhet i Skåne</p>
      <h2 class="text-3xl font-bold mb-10">Vad våra kunder säger</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="bg-white shadow-sm border-b-3 border-primary-600 p-6 flex flex-col gap-4"
        >
          <p class="text-neutral-700 text-sm leading-relaxed flex-1">"{{ testimonial.description }}"</p>
          <div class="flex items-center gap-3 pt-2 border-t border-neutral-200">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full object-cover bg-neutral-300"
            />
            <div>
              <p class="font-semibold text-sm">{{ testimonial.name }}</p>
              <p class="text-neutral-700 text-xs">{{ testimonial.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: "1250+", label: "Genomförda projekt" },
  { value: "40+", label: "Års erfarenhet" },
  { value: "100%", label: "Nöjda kunder" },
];

const testimonials = [
  {
    name: "Jakob Andersson",
    label: "Villaägare, Lund",
    image: "/testimonial-1.jpg",
    description:
      "Fantastiskt professionellt team. De kom ut för ett kostnadsfritt platsbesök och levererade en tydlig offert utan dolda avgifter. Jobbet blev klart i tid och tomten återställdes perfekt.",
  },
  {
    name: "Eva Olsson",
    label: "Villaägare, Landskrona",
    image: "/testimonial-2.jpg",
    description:
      "Vi hade haft problem med fukt i källaren i flera år. Efter dräneringen är problemet helt borta. Rekommenderar dem varmt till alla som har liknande problem.",
  },
  {
    name: "Fredrik Ljungberg",
    label: "Villaägare, Södra Sandby",
    image: "/testimonial-3.jpg",
    description:
      "Snabb respons, tydlig kommunikation och ett slutresultat vi är mycket nöjda med. Priset matchade offerten till punkt och pricka. Vi hade inte kunnat önska oss mer.",
  },
];
</script>

<style scoped></style>

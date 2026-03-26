<template>
  <div class="w-full py-16 bg-neutral-100">
    <div class="lg:w-[60%] mx-auto px-6">
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
              <p class="text-neutral-500 text-xs">{{ testimonial.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: "Erik Andersson",
    label: "Villaägare, Malmö",
    image: "/testimonial-1.jpg",
    description:
      "Fantastiskt professionellt team. De kom ut för ett kostnadsfritt platsbesök och levererade en tydlig offert utan dolda avgifter. Jobbet blev klart i tid och tomten återställdes perfekt.",
  },
  {
    name: "Maria Svensson",
    label: "Villaägare, Helsingborg",
    image: "/testimonial-2.jpg",
    description:
      "Vi hade haft problem med fukt i källaren i flera år. Efter dräneringen är problemet helt borta. Rekommenderar dem varmt till alla som har liknande problem.",
  },
  {
    name: "Johan Nilsson",
    label: "Villaägare, Landskrona",
    image: "/testimonial-3.jpg",
    description:
      "Snabb respons, tydlig kommunikation och ett slutresultat vi är mycket nöjda med. Priset matchade offerten till punkt och pricka. Vi hade inte kunnat önska oss mer.",
  },
];
</script>

<style scoped></style>

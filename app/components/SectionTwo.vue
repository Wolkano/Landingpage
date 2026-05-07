<template>
  <div class="w-full pb-10">
    <div
      class="bg-neutral-900 flex flex-row flex-wrap justify-around h-20 items-center w-full"
    >
      <div class="bannerItem text-amber-50">STÖRST I NV SKÅNE</div>
      <div class="bannerItem text-amber-50">VI ÄR VAD VI HETER</div>
    </div>
    <u-page-hero
      headline="VÅRT UPPDRAG"
      orientation="horizontal"
      class="w-full"
      :ui="{
        container: 'flex! flex-col! py-10! h-fit! gap-0!',
        root: 'h-fit!',
      }"
    >
      <template #title>
        <span ref="titleRef" class="title-words">
          <span
            v-for="(word, i) in titleWords"
            :key="i"
            class="word-outer"
          ><span
            class="word-inner"
            :class="{ 'word-visible': isVisible }"
            :style="{ transitionDelay: isVisible ? `${i * 75}ms` : '0ms' }"
          >{{ word }}</span></span>
        </span>
      </template>
    </u-page-hero>
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
          <div class="w-full overflow-hidden rounded-lg">
            <NuxtImg
              src="/offer.webp"
              sizes="100vw md:50vw lg:40vw"
              class="w-full h-48 sm:h-56 md:h-64 object-cover"
              loading="lazy"
              alt="Offert visualisering"
            />
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

<script setup lang="ts">
const titleWords = 'Skapa trygga och hållbara hem i Skåne'.split(' ')
const titleRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  if (titleRef.value) observer.observe(titleRef.value)
})
</script>

<style scoped>
.bannerItem {
  font-weight: 700;
}

.title-words {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0 0.3em;
}

.word-outer {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}

.word-inner {
  display: inline-block;
  transform: translateY(110%);
  opacity: 0;
  transition:
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.5s ease;
}

.word-visible {
  transform: translateY(0);
  opacity: 1;
}
</style>

<template>
  <div class="w-full bg-white py-16">
    <div class="lg:w-[60%] mx-auto px-6">
      <p class="text-primary-600 font-bold text-sm tracking-widest uppercase mb-2">Kostnadsfri rådgivning</p>
      <h2 class="text-3xl font-bold mb-3">Boka ett möte</h2>
      <p class="text-neutral-600 mb-10 max-w-xl">
        Välj en tid som passar dig så kontaktar vi dig för ett kostnadsfritt platsbesök eller konsultation.
      </p>

      <div class="flex flex-col lg:flex-row gap-10 items-start">
        <!-- Info column -->
        <div class="flex flex-col gap-6 lg:w-64 shrink-0">
          <div class="flex items-start gap-3">
            <div class="mt-1 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-sm">30 minuter</p>
              <p class="text-neutral-700 text-sm">Kostnadsfritt rådgivningsmöte</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="mt-1 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-sm">Telefon</p>
              <p class="text-neutral-700 text-sm">Vi ringer upp dig vid bokad tid</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="mt-1 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-sm">Ingen bindning</p>
              <p class="text-neutral-700 text-sm">Avboka eller omboka enkelt</p>
            </div>
          </div>

          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ008z0cl51NZoJBTojWcHWWi5JGx5EN64GAOKkgkDUKIo1GwNof9pBynL9_ulHBS2MSvPuLP24F?gv=true"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-6 py-3 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Öppna i nytt fönster
          </a>
        </div>

        <!-- Calendar embed -->
        <div class="flex-1 w-full min-h-150 border border-neutral-200 shadow-sm overflow-hidden">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Y6ijeiQkq4LHbO9KWKnMxe9BtMbPIEwvX7nOP8VWeW-nYIAXz8gVm0HR_o6NFnk6deOrgTluH?gv=true"
            width="100%"
            height="600"
            frameborder="0"
            title="Boka ett möte"
            class="block w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

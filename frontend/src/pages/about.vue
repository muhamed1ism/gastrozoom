<script setup>

</script>

<template>
  <v-card variant="text" class="pt-16">
    <v-row justify="center">
      <v-col cols="4">
        <v-img src="" height="20rem" class="bg-grey-lighten-2 ma-8 rounded-xl">
          <template #placeholder>
            <v-icon class="fill-height w-100" size="4rem">mdi-image</v-icon>
          </template>
        </v-img>
      </v-col>
      <v-col cols="6">
        <v-card-title class="text-h3">O projektu</v-card-title>
        <v-card-text class="text-h6">
          Ovaj projekt je web aplikacija napravljena koristeći moderne tehnologije za frontend i backend. Za frontend
          su korišteni Vuetify i Pinia, dok su za backend korišteni MySQL, Prisma i Express. Aplikacija omogućava
          korisnicima pregled ponuda, prijavu, te pristup različitim funkcionalnostima ovisno o statusu korisnika
          (gost ili prijavljeni korisnik).
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

</style>

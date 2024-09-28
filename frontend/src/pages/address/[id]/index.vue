<script setup>
import BackButton from "@/components/BackButton.vue";

</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="pb-8">
        <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3" class="d-flex">
          <BackButton />
        </v-col>
      <v-col cols="10" sm="8" md="6" lg="4" offset="1" offset-sm="2" offset-md="3" offset-lg="4">
        <v-card variant="text">
          <v-icon size="8rem" class="text-center text-primary w-100 mb-4">mdi-map-marker</v-icon>
          <v-card-title class="text-h4 text-center font-weight-medium pb-12">Moja adresa</v-card-title>
          <v-card-text>
            <h6 class="text-h6 font-weight-bold">Naziv ulice</h6>
            <h5 class="text-h5">Adresa 123 ulica </h5>
          </v-card-text>

          <v-row>
            <v-col cols="6">
              <v-card-text>
                <h6 class="text-h6 font-weight-bold">Broj ulice</h6>
                <h5 class="text-h5">57</h5>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-card-text>
                <h6 class="text-h6 font-weight-bold">Kat</h6>
                <h5 class="text-h5">2</h5>
              </v-card-text>
            </v-col>
          </v-row>

          <div class="d-flex justify-space-between mx-2 align-center">
            <span>Postavi kao zadanu adresu</span>
            <v-switch color="primary" class="ml-2 mt-6"/>
          </div>

          <v-btn type="submit" prepend-icon="mdi-pencil" block variant="flat" color="primary" size="large" class="mb-8 mt-2" rounded>
            Uredi adresu
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

<script setup>

import BackButton from "@/components/BackButton.vue";

const price = 10;
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="pt-2 pb-16">
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
        <BackButton />
      </v-col>
      <v-col cols="12" sm="10" md="6" lg="4" offset-sm="1" offset-md="3" offset-lg="4">
        <v-card class="py-2 custom-shadow" variant="text" rounded="xl">
          <v-card-item class="">
            <v-img :src="imageSrc" class="bg-grey-lighten-2 align-center custom-radius aspect-ratio" width="100%">
              <v-icon class="text-center w-100">mdi-image</v-icon>
            </v-img>
          </v-card-item>
          <v-card-title class="mx-4 text-h4 text-start text-wrap">Jelo</v-card-title>
          <v-card-text class="mx-4 text-subtitle-1">Opis jela</v-card-text>
          <v-card-text class="mx-4 text-end text-h5 font-weight-medium text-primary">Cijena: {{ price }} KM</v-card-text>
          <v-card-actions class="d-flex flex-column flex-sm-row justify-space-evenly">
            <v-btn color="primary" variant="tonal" prepend-icon="mdi-basket" min-width="48%" width="98%" class="custom-radius w-sm-auto">
              Naruči odmah
            </v-btn>
            <v-btn color="primary" variant="flat" prepend-icon="mdi-plus" min-width="48%" width="98%" class="custom-radius w-sm-auto">
              Dodaj u narudžbu
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.aspect-ratio {
  aspect-ratio: 16 / 9;
}

.custom-radius {
  border-radius: 16px;
}

.custom-shadow {
  box-shadow: 0 0 32px 8px #ECEFF1;
}
</style>

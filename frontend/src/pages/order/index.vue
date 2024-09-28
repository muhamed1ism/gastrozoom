<script setup>
import BackButton from "@/components/BackButton.vue";
import { ref } from "vue";
import OrderFoodCard from "@/components/OrderFoodCard.vue";

const search = ref("");
</script>

<template>
  <v-container class="d-flex flex-column" style="height: calc(100vh - 64px)">
    <v-row class="d-flex align-center py-4" justify="center">
      <v-col cols="11" md="8" lg="6" class="d-flex">
        <BackButton />
        <div class="d-flex align-center pl-6">
          <h1 class="text-h4 font-weight-medium">Detalji narudžbe</h1>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="pb-4">
      <v-col cols="11" md="8" lg="6" class="d-flex">
        <v-text-field
          v-model="search"
          class="custom-text-field elevation-0 bg-secondary rounded-xl pl-8 pr-4"
          append-inner-icon="mdi-magnify"
          label="Pretraži"
          variant="plain"
          density="comfortable"
          clearable
          rounded
          hide-details
        />
        <v-btn icon="mdi-filter-variant" class="ml-6 custom-radius" color="primary" variant="tonal" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" md="8" lg="6">
        <OrderFoodCard />
        <OrderFoodCard />
        <OrderFoodCard />
      </v-col>
    </v-row>

    <v-row justify="center" align="end" class="pt-1">
      <v-col cols="11" md="8" lg="6">
        <v-card class="bg-primary d-flex flex-column pa-3" rounded="xl">
          <v-card-text class=" d-flex justify-space-between">
            <span>Iznos:</span>
            <span>29KM</span>
          </v-card-text>
          <v-card-text class=" d-flex justify-space-between">
            <span>Dostava:</span>
            <span>29KM</span>
          </v-card-text>
          <v-card-text class=" d-flex justify-space-between">
            <span>Popust:</span>
            <span>29KM</span>
          </v-card-text>
          <v-divider opacity="60%" class="text-white"></v-divider>
          <v-card-text class=" d-flex justify-space-between">
            <span>Za platiti:</span>
            <span>29KM</span>
          </v-card-text>
          <v-btn class="mx-2 mb-2 text-primary" variant="flat" rounded size="x-large">Gotovo</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}
</style>

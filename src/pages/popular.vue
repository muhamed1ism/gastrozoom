<script setup>
import BackButton from "@/components/BackButton.vue";
import FoodCard from "@/components/FoodCard.vue";
import { ref } from "vue";

const search = ref("");
</script>

<template>
  <v-row class="d-flex align-center py-6" justify="center">
    <v-col cols="11" md="8" lg="6" class="d-flex">
      <BackButton />
      <div class="d-flex align-center pl-6">
        <h4 class="text-h5 text-md-h4 font-weight-medium">Popularno</h4>
      </div>
    </v-col>
  </v-row>
  <v-row justify="center" class="pb-4">
    <v-col cols="11" md="8" lg="6" class="d-flex">
      <v-text-field
        v-model="search"
        class="custom-text-field elevation-0 bg-blue-grey-lighten-5 rounded-xl pl-8 pr-4"
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
      <FoodCard />
      <FoodCard />
    </v-col>
  </v-row>
</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}
</style>

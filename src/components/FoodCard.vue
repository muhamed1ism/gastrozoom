<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Naziv jela',
  },
  price: {
    type: String,
    default: '0',
  },
});
</script>

<template>

  <v-card class="d-flex align-center mb-8 custom-shadow" rounded="xl" variant="text">
    <v-img :src="src" class="bg-grey-lighten-2 ma-3 align-center custom-radius" width="80px" max-width="80px" height="80px">
      <v-icon class="text-center w-100">mdi-image</v-icon>
    </v-img>
    <v-card-title class="text-h6 text-start">{{ title }}</v-card-title>
    <v-card-text class="text-h4 font-weight-medium text-end mr-sm-4 mt-3 text-primary">{{ price }} KM</v-card-text>
  </v-card>


</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}

.custom-shadow {
  box-shadow: 0px 0px 32px 8px #ECEFF1;
}
</style>

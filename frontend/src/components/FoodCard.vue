<script setup>

defineProps({
  id: {
    type: String,
    default: '',
  },
  imageSrc: {
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
  <RouterLink :to="`/food/${id}`" class="text-decoration-none">
    <v-card class="d-flex align-center mb-8 custom-shadow" rounded="xl" variant="text">
      <v-img :src="imageSrc" class="bg-grey-lighten-2 ma-3 align-center custom-radius" width="80px" max-width="80px"
             height="80px">
        <template #placeholder>
          <v-icon class="text-center w-100 fill-height">mdi-image</v-icon>
        </template>
      </v-img>

      <div class="d-flex flex-column flex-sm-row w-100 align-center">
        <v-card-title class="text-h6 text-sm-h5 w-100 w-sm-auto text-start text-black">{{ title }}</v-card-title>

        <v-card-text class="w-100 w-sm-auto text-end text-h5 text-sm-h4 font-weight-medium text-end mr-sm-4 mt-3 text-primary">
          $ {{ price.toFixed(2) }}
        </v-card-text>
      </div>

    </v-card>
  </RouterLink>

</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}

.custom-shadow {
  box-shadow: 0 0 32px 8px #ECEFF1;
}
</style>

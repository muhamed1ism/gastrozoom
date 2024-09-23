<script setup>
import {defineProps} from 'vue';
import { ref } from 'vue';

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

const quantity = ref(1);

const inputWidth = ref(42);

const updateWidth = () => {
  const inputLength = quantity.value.toString().length;
  inputWidth.value = Math.max((inputLength + 1) * 10 + 20, 42);
};

const increaseQuantity = () => {
  quantity.value += 1;
  updateWidth();
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    updateWidth();
  }
};
</script>

<template>

  <v-card class="d-flex align-center mb-5 custom-shadow" rounded="xl" variant="text">
    <v-img :src="src" class="bg-grey-lighten-2 ma-3 align-center custom-radius" width="80px" max-width="80px" height="80px">
      <v-icon class="text-center w-100">mdi-image</v-icon>
    </v-img>
    <div>
      <v-card-title class="text-h6 text-start">{{ title }}</v-card-title>
      <v-card-text class="text-h5 font-weight-medium text-start mr-sm-4 text-primary">{{ price }} KM</v-card-text>
    </div>
    <v-spacer />

      <v-btn icon="mdi-minus" class="custom-radius" color="primary" variant="tonal" size="small"
             @click="decreaseQuantity"/>
    <v-text-field density="compact" variant="plain" type="number" step="1" min="1"
                  v-model="quantity" hide-spin-buttons single-line min-width="42px"
                  :style="{ maxWidth: `${inputWidth}px` }" @update:model-value="updateWidth"
                  class="font-weight-medium text-center px-4 mt-5"></v-text-field>
      <v-btn icon="mdi-plus" class="mr-6 custom-radius" color="primary" variant="flat" size="small"
             @click="increaseQuantity"/>
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

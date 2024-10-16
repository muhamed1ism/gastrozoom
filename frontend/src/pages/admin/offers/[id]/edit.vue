<script setup>
import BackButton from "@/components/BackButton.vue";
import router from "@/router";
import {useAuthStore} from "@/stores/auth";
import {useFoodStore} from "@/stores/food";
import {useRoute} from "vue-router";

const authStore = useAuthStore();
const foodStore = useFoodStore();

const route = useRoute();

const foodId = Number(route.params.id);

const form = ref({
  name: "",
  description: "",
  category: "",
  imageUrl: "",
  image: "",
  price: null,
});

const foodCategories = [
  "APPETIZER",
  "MAIN DISH",
  "DESSERT",
  "DRINK",
  "SIDE DISH",
  "SALAD",
  "SOUP"
];

onMounted(async () => {
  if (authStore.auth.role !== 'ADMIN') await router.push('/');
  await foodStore.fetchFoodById(foodId);
  form.value = foodStore.food;
})

const submit = async () => {
  if (form.value.category === "MAIN DISH") {
    form.value.category = "MAIN_DISH";
  }
  if (form.value.category === "SIDE DISH") {
    form.value.category = "SIDE_DISH";
  }
  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('description', form.value.description);
  formData.append('price', form.value.price);
  formData.append('category', form.value.category);
  if (form.value.image) {
    formData.append('image', form.value.image);
  }
  await foodStore.updateFood(foodId, formData);
  await router.push('/admin/offers');
  window.location.reload();
}
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="pb-8">
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3" class="d-flex">
        <BackButton />
        <div class="d-flex align-center pl-6">
          <h1 class="text-h5 text-md-h4 font-weight-medium">Edit offer</h1>
        </div>
      </v-col>
      <v-col cols="10" sm="8" md="6" lg="4" offset="1" offset-sm="2" offset-md="3" offset-lg="4">

        <v-img v-if="form.imageUrl !== ''" :src="form.imageUrl" height="200px" class="ma-4"/>
        <v-icon v-else size="8rem" class="text-center text-primary w-100 mb-8">mdi-food</v-icon>
        <v-form @submit.prevent="submit">
          <v-text-field density="compact" placeholder="Name" rounded
                        variant="outlined" v-model="form.name" class="mb-1" append-inner-icon="."/>

          <v-text-field density="compact" placeholder="Description" rounded
                        variant="outlined" v-model="form.description" class="mb-1" append-inner-icon="."/>

          <v-select :items="foodCategories" variant="outlined" label="Category" v-model="form.category" class="mb-1"
                    rounded/>

          <v-file-input density="compact" label="Select image" variant="outlined" rounded
                        v-model="form.image" class="mb-1">
          </v-file-input>

          <v-text-field density="compact" placeholder="Enter price" variant="outlined" prefix="$" rounded
                        type="number" step="0.01" v-model="form.price" class="mb-1"/>

          <v-btn type="submit" prepend-icon="mdi-content-save" block variant="flat" color="primary" size="large"
                 class="mb-8 mt-2" rounded>
            Save changes
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

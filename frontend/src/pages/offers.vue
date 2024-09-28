<script setup>
import BackButton from "@/components/BackButton.vue";
import FoodCard from "@/components/FoodCard.vue";
import {ref} from "vue";
import {useFoodStore} from "@/stores/food";

const search = ref("");
const foods = ref([])

const foodStore = useFoodStore();
const filters = [
  {
    title: "Cijena",
  },
  {
    title: "Kategorija",
  },
  {
    title: "Ocjena",
  },
];

onMounted(
  async () => {
    await foodStore.fetchFoods();
    foods.value = foodStore.foods;
    console.log(foods.value);
  }
);

watch(
  () => foodStore.foods,
  (newFoods) => {
    foods.value = newFoods;
  }
);

const filteredFoods = computed(() => {
  return foods.value.filter((food) => {
    return food.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>

<template>
  <v-container fluid>

    <v-row class="d-flex align-center py-6" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="d-flex">
        <BackButton/>
        <div class="d-flex align-center pl-6">
          <h1 class="text-h5 text-md-h4 font-weight-medium">Ponude</h1>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="pb-4">
      <v-col cols="12" sm="10" md="8" lg="6" class="d-flex">
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
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-filter-variant" class="ml-6 custom-radius" color="primary" variant="tonal"/>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in filters"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="pb-16">
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3" v-for="food in filteredFoods">
        <FoodCard :id="food.id" :image-src="food.imageUrl" :title="food.name" :price="food.price"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}
</style>

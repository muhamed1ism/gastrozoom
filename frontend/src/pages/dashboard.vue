<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FoodCard from "@/components/FoodCard.vue";

const router = useRouter();

const foodCategories = [
  "PREDJELO",
  "GLAVNO_JELO",
  "DESERT",
  "NAPITAK",
  "PRILOG",
  "SALATA",
  "JUHA",
];

const foods = ref([]);

foods.value = [
  {
    id: 1,
    name: "Piletina sa povrćem",
    description: "Piletina sa povrćem i rižom",
    price: 10.00,
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/12/54/chicken-1868076_960_720.jpg",
  },
  {
    id: 2,
    name: "Pizza",
    description: "Pizza sa šunkom i sirom",
    price: 8.00,
    imageUrl: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
  },
  {
    id: 3,
    name: "Palačinke",
    description: "Palačinke sa nutelom",
    price: 5.00,
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/12/54/chicken-1868076_960_720.jpg",
  },
];

</script>

<template>
  <v-container fluid>
    <v-row class="pt-4">
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3" class="d-flex py-4">
        <v-icon size="6rem">mdi-account-circle</v-icon>
        <div class="d-flex flex-column pa-4 responsive-text">
          <h4 class="text-h6 text-sm-h5 text-md-h4 font-weight-medium text-truncate">Dobrodošli, Ime Korisnika!</h4>
        </div>
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
            <v-btn size="x-large" prepend-icon="mdi-food-fork-drink" color="teal-lighten-1" class="ma-2" variant="flat">Predjelo</v-btn>
            <v-btn size="x-large" prepend-icon="mdi-food" color="orange-lighten-1" class="ma-2" variant="flat">Glavno jelo</v-btn>
            <v-btn size="x-large" prepend-icon="mdi-cupcake" color="pink-lighten-1" class="ma-2" variant="flat">Desert</v-btn>
            <v-btn size="x-large" prepend-icon="mdi-food-variant" color="red-lighten-1" class="ma-2" variant="flat">Prilog</v-btn>
            <v-btn size="x-large" prepend-icon="mdi-food-apple" color="green-lighten-1" class="ma-2" variant="flat">Salata</v-btn>
            <v-btn size="x-large" prepend-icon="mdi-pot-steam" color="yellow-lighten-1" class="ma-2" variant="flat">Juha</v-btn>
            <v-btn size="x-large" prepend-icon="mdi-glass-cocktail" color="blue-lighten-1" class="ma-2" variant="flat">Napitak</v-btn>
      </v-col>

    </v-row>
        <v-row>
          <v-col v-for="food in foods" :key="food.id" cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
            <FoodCard :id="food.id" :image-src="food.imageUrl" :title="food.name" :price="food.price"/>
          </v-col>
        </v-row>
  </v-container>
</template>

<style scoped>
/* Add any custom styles here */
</style>

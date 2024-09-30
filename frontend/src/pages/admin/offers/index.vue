<template>
  <v-container fluid class="mt-6 mb-16">
    <v-row class="d-flex align-center py-6" justify="start">
      <v-col cols="12" sm="7" lg="6" class="d-flex">
        <BackButton />
        <div class="d-flex align-center pl-6">
          <h1 class="text-h5 text-md-h4 font-weight-medium">Ponude</h1>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center my-4 mx-2 justify-space-between">
      <v-col class="d-flex justify-end align-center" cols="12" sm="7" lg="6" offset-sm="5" offset-lg="6">
        <v-text-field
          v-model="search"
          class="custom-text-field elevation-0 bg-secondary rounded-xl pl-8 pr-4 pb-2"
          append-inner-icon="mdi-magnify"
          label="Pretraži"
          variant="plain"
          density="comfortable"
          clearable
          rounded
          hide-details
        />
        <v-btn icon="mdi-plus" class="ml-4 custom-radius" variant="flat" color="primary" to="/admin/offers/add"/>
      </v-col>
      <v-col>
        <v-data-table :headers="headers" :items="foods" :search="search" multi-sort
                      items-per-page-text="Broj stavki po stranici" :items-per-page="10">

          <template v-slot:item.name="{ item }">
            <div class="truncate-name-column">{{ item.name }}</div>
          </template>
          <template v-slot:item.updatedAt="{ item }">
            <div class="truncate-date-column">{{ formatDate(item.updatedAt) }}</div>
          </template>
          <template v-slot:item.createdAt="{ item }">
            <div class="truncate-date-column">{{ formatDate(item.createdAt) }}</div>
          </template>

          <template v-slot:no-data>
            <p>Nema ponuda</p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon="mdi-pencil" variant="outlined" color="primary" size="small"
                   :to="`/admin/offers/${item.id}/edit`" class="ma-1 custom-radius" />
            <v-btn icon="mdi-delete" variant="flat" color="primary" size="small"
                   @click="" class="ma-1 custom-radius" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>


  </v-container>
</template>

<script setup>

import BackButton from "@/components/BackButton.vue";
import router from "@/router";
import {useAuthStore} from "@/stores/auth";

const foods = ref([]);
const search = ref("");

foods.value = [
  { id: 1, name: "Pizza", price: 20, updatedAt: "2022-01-01", createdAt: "2022-01-01" },
  { id: 2, name: "Pasta", price: 15, updatedAt: "2022-01-01", createdAt: "2022-01-01" },
  { id: 3, name: "Salad", price: 10, updatedAt: "2022-01-01", createdAt: "2022-01-01" },
  { id: 4, name: "Burger", price: 25, updatedAt: "2022-01-01", createdAt: "2022-01-01" },
  { id: 5, name: "Sandwich", price: 5, updatedAt: "2022-01-01", createdAt: "2022-01-01" },
];

const headers = [
  { title: "ID", text: "ID", value: "id", sortable: true },
  { title: "Naziv", text: "Naziv", value: "name", sortable: true },
  { title: "Cijena", text: "Cijena", value: "price", sortable: true },
  { title: "Ažurirano", text: "Ažurirano", value: "updatedAt", sortable: true },
  { title: "Kreirano", text: "Kreirano", value: "createdAt", sortable: true },
  {
    title: "Akcije",
    text: "Akcije",
    value: "actions",
    sortable: false,
    align: "center",
  },
];

const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat('hr-HR').format(newDate);
};

const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.auth.role !== 'ADMIN') await router.push('/');
})
</script>

<style scoped>
.custom-radius {
  border-radius: 16px;
}

.custom-radius {
  border-radius: 16px;
}

.truncate-name-column {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate-date-column {
  width: 81px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 601px) and (max-width: 960px) {
  .truncate-name-column {
    max-width: 150px;
  }
}

@media (min-width: 961px) and (max-width: 1264px) {
  .truncate-name-column {
    max-width: 200px;
  }
}
</style>

<script setup>
import BackButton from "@/components/BackButton.vue";
import {useAddressStore} from "@/stores/address";

const addressStore = useAddressStore();

const id = 1;
</script>

<template>
  <v-container fluid>
    <v-row class="d-flex align-center py-6" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="d-flex">
        <BackButton />
        <div class="d-flex align-center pl-6">
          <h1 class="text-h5 text-md-h4 font-weight-medium">Adrese</h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3"
             class="d-flex justify-end mb-2"
      >
        <v-btn prepend-icon="mdi-plus" color="primary" variant="flat"
               class="custom-radius mx-2 mx-sm-4" size="large" to="/address/add"
        >
          Dodaj
        </v-btn>
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
        <RouterLink :to="`/address/${id}`" class="text-decoration-none text-black">
          <v-card class="d-flex mb-8 align-center custom-shadow" rounded="xl" variant="text">
            <template v-slot:prepend>
              <v-icon class="text-primary">mdi-map-marker</v-icon>
            </template>
              <v-card-title class="text-subtitle-1 text-start text-black w-33 w-sm-50 w-md-66 mr-auto">
                <h4 class="text-subtitle-1 text-sm-h6 text-md-h5  text-truncate">Adresa gjjds kjgdskjg kjgkjdsgjk jgdskjsdg kjgjsk</h4>
              </v-card-title>
              <v-card-actions class="pa-3">
                <v-btn color="primary" variant="outlined" class="custom-radius"
                       icon="mdi-pencil" :to="`/address/${id}/edit`"
                />
                <v-btn color="primary" variant="flat" class="custom-radius"
                       icon="mdi-delete" @click="addressStore.deleteAddress(id)"
                />
              </v-card-actions>
          </v-card>
        </RouterLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}

.custom-shadow {
  box-shadow: 0 0 32px 8px #ECEFF1;
}
</style>

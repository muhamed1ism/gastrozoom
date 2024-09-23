<script setup>
import BackButton from "@/components/BackButton.vue";

const form = ref({
  name: "",
  phoneNumber: "",
  email: "",
});

const isSelectedOnDoor = ref(false);
</script>

<template>
  <v-container class="fill-height">
    <BackButton class="position-absolute top-0 left-0 ml-4 mt-4"/>
    <v-row class="justify-center">
      <v-col cols="10" sm="8" md="6" lg="4">
        <v-icon size="8rem" class="text-center text-primary w-100 mb-4">mdi-map-marker-plus</v-icon>
        <h4 class="text-h4 text-center font-weight-medium pb-12">Dodaj adresu</h4>
        <v-text-field density="compact" placeholder="Naziv ulice" prepend-inner-icon="mdi-home-city" rounded
                      variant="outlined" v-model="form.name" class="mb-1" append-inner-icon="."/>

        <v-row>
          <v-col cols="6">
            <v-text-field density="compact" placeholder="Kućni broj" rounded
                          variant="outlined" v-model="form.phoneNumber" class="mb-1" append-inner-icon="."/>
          </v-col>
          <v-col cols="6">
            <v-text-field density="compact" placeholder="Kat" rounded
                          variant="outlined" v-model="form.phoneNumber" class="mb-1" append-inner-icon="."/>
          </v-col>
        </v-row>

        <div class="d-flex justify-space-evenly">
          <v-btn color="primary" :active="!isSelectedOnDoor" @click="isSelectedOnDoor = false" variant="outlined" rounded class="mx-1">Preuzet ću ja</v-btn>
          <v-btn color="primary" :active="isSelectedOnDoor" @click="isSelectedOnDoor = true" variant="outlined" rounded class="mx-1">Dostaviti na vrata</v-btn>
        </div>

        <div class="d-flex justify-space-between align-center">
          <span>Postavi kao zadanu adresu</span>
          <v-switch color="primary" class="ml-2 mt-6"/>
        </div>

        <v-btn type="submit" block variant="flat" color="primary" size="large" class="mb-8 mt-2" rounded>Prijavi
          se</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

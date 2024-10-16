<script setup>

import BackButton from "@/components/BackButton.vue";
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="d-flex align-center py-6" justify="center">
      <v-col cols="12" sm="10" md="10" class="d-flex">
        <BackButton/>
        <div class="d-flex align-center pl-6">
          <h1 class="text-h5 text-md-h4 font-weight-medium">About project</h1>
        </div>
      </v-col>
    </v-row>
    <v-card variant="text" class="pb-16 mb-16">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="4">
          <v-img src="/about.svg" height="30rem" class="ma-8 custom-radius">
            <template #placeholder>
              <v-icon class="fill-height w-100" size="4rem">mdi-image</v-icon>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" sm="10" md="6">
          <v-card-text class="text-h6">
            This project is a web application built using modern technologies for the frontend and backend.
            Vuetify and Pinia were used for the frontend, while MySQL, Prisma, and Express were used for the backend.
            The application allows users to browse offers, sign in, and access various functionalities depending on
            the user's status (guest or logged-in user).
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}
</style>

<template>
  <v-container class="text-center d-flex flex-column mb-16">
    <v-img src="/home-img.jpg" height="20rem"/>
    <span class="text-h3 font-weight-medium">Welcome to GastroZoom</span>
    <span class="text-h5">Best meal in town</span>
    <v-row justify="center" class="pt-8">
      <v-col cols="11" sm="5" md="4" lg="3" class="d-flex justify-end">
        <v-btn class="w-100" color="primary" append-icon="mdi-chevron-right" variant="flat" size="x-large" to="/offers" rounded>Explore offers</v-btn>
      </v-col>
      <v-col cols="11" sm="5" md="4" lg="3" class="d-flex justify-start">
        <v-btn class="w-100" color="primary" append-icon="mdi-information-outline" variant="outlined" size="x-large" to="/about" rounded>About project</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//
</script>

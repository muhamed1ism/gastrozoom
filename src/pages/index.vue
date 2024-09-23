<template>
  <v-container class="text-center d-flex flex-column pt-16">
    <v-img src="/home-img.jpg" height="20rem"/>
    <span class="text-h3 font-weight-medium">Dobrodošli u GastroZoom</span>
    <span class="text-h5">Najbolje jelo u gradu</span>
    <v-row justify="center">
      <v-col cols="11" md="8" lg="6" class="d-flex justify-space-evenly">
        <v-btn class="mt-8" color="primary" variant="flat" size="x-large" to="/offers" rounded>Pogledajte ponudu</v-btn>
        <v-btn class="mt-8" color="primary" variant="outlined" size="x-large" to="/about" rounded>O projektu</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//
</script>

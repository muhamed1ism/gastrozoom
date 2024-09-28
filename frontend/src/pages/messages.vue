<script setup>

import BackButton from "@/components/BackButton.vue";
</script>

<template>

  <v-container fluid>
    <v-row class="d-flex align-center py-6" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="d-flex">
        <BackButton />
        <div class="d-flex align-center pl-6">
          <h1 class="text-h5 text-md-h4 font-weight-medium">Obavjesti</h1>
        </div>
      </v-col>
    </v-row>
    <v-row class="pb-16">
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3"
             class="d-flex justify-end mb-2"
      >
        <v-btn icon="mdi-notification-clear-all" color="primary" variant="tonal"
               class="custom-radius mx-2 mx-sm-4" to="/address/add"
        />
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
          <v-card class="d-flex mb-8 align-center custom-shadow" rounded="xl" variant="text">
            <template v-slot:prepend>
              <v-icon class="text-primary">mdi-bell-outline</v-icon>
            </template>
            <v-card-text class="d-flex flex-column align-center mt-4 w-50 w-sm-66 w-md-75">
              <h4 class="mr-auto text-h6 text-sm-h5 font-weight-medium">Obavjest 1</h4>
              <h5 class="text-subtitle-1 text-sm-h6 font-weight-regular">Adresa gjjds kjgdskjg kj fdfskjjdsk jfdskjf djfskjds jfdskjdsgkjdsgjk jgdskjsdg kjgjsk</h5>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="plain"
                     icon="mdi-close" @click=""
              />
            </v-card-actions>
          </v-card>
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

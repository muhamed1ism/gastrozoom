<script setup>
import {ref} from 'vue';
import BackButton from "@/components/BackButton.vue";
import router from "@/router";

const visible = ref(false);
const isFocused = ref(false);

const form = ref({
  email: '',
  password: '',
});

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};
</script>

<template>
  <v-container fluid class="fill-height bg-primary">
    <v-btn
      @click="router.go(-1)"
      icon
      variant="tonal"
      color="white"
      class="custom-radius position-absolute top-0 left-0 mt-4 ml-4"
    >
      <v-icon size="2.5rem" class="font-weight-thin">mdi-chevron-left</v-icon>
    </v-btn>
    <v-row class="justify-center">
      <v-col cols="10" sm="8" md="6" lg="4">
        <div class="d-flex flex-column justify-center align-center">
          <v-img src="/logo.png" width="200" height="200"/>
          <span class="text-h4 font-weight-medium pt-2 pb-16">GASTROZOOM</span>
        </div>
        <v-text-field density="compact" placeholder="Email" prepend-inner-icon="mdi-email-outline" rounded
                      variant="outlined" v-model="form.email" class="mb-1" append-inner-icon="."/>

        <v-text-field :append-inner-icon="isFocused ? (visible ? 'mdi-eye-off' : 'mdi-eye') : undefined" rounded
                      :type="visible ? 'text' : 'password'" density="compact" placeholder="Unesite lozinku"
                      prepend-inner-icon="mdi-lock-outline" variant="outlined" v-model="form.password"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      @click:append-inner="visible = !visible" class="mb-4" />

        <v-btn type="submit" block variant="flat" color="white" size="large" class="mb-8 text-primary mt-2" rounded>Prijavi
          se</v-btn>
        <div class="text-center">
          <span>Nemate račun?</span>
          <RouterLink class="text-white font-weight-medium text-decoration-none pl-1" to="/register">
            Kreirajte novi!
          </RouterLink>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-radius {
  border-radius: 16px;
}
</style>

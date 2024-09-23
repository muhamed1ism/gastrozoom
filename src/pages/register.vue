<script setup>
import {ref} from 'vue';
import router from "@/router";
import BackButton from "@/components/BackButton.vue";

const visible = ref(false);
const isFocused = ref(false);

const form = ref({
  name: '',
  phoneNumber: '',
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
  <v-container  class="fill-height">
    <BackButton class="position-absolute top-0 left-0 ml-4 mt-4"/>
    <v-row class="justify-center">
      <v-col cols="10" sm="8" md="6" lg="4">
        <h4 class="text-h4 text-center font-weight-medium pb-12">Registruj se</h4>
        <v-text-field density="compact" placeholder="Ime i prezime" prepend-inner-icon="mdi-account" rounded
                      variant="outlined" v-model="form.name" class="mb-1" append-inner-icon="."/>

        <v-text-field density="compact" placeholder="Broj telefona" prepend-inner-icon="mdi-phone" rounded
                      variant="outlined" v-model="form.phoneNumber" class="mb-1" append-inner-icon="."/>

        <v-text-field density="compact" placeholder="Email" prepend-inner-icon="mdi-email-outline" rounded
                      variant="outlined" v-model="form.email" class="mb-1" append-inner-icon="."/>

        <v-text-field :append-inner-icon="isFocused ? (visible ? 'mdi-eye-off' : 'mdi-eye') : undefined" rounded
                      :type="visible ? 'text' : 'password'" density="compact" placeholder="Unesite lozinku"
                      prepend-inner-icon="mdi-lock-outline" variant="outlined" v-model="form.password"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      @click:append-inner="visible = !visible" class="mb-4" />

        <v-btn type="submit" block variant="flat" color="primary" size="large" class="mb-8 mt-2" rounded>
          Registruj se
        </v-btn>
        <div class="text-center">
          <span>Već imate račun?</span>
          <RouterLink class="text-primary text-decoration-none pl-1" to="/login">
            Prijavi se!
          </RouterLink>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

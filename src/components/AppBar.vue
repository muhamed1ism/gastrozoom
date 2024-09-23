<script setup>
import { ref } from 'vue';
import {useRoute} from "vue-router";

const guestItems = [
  {
    id: 'home',
    text: 'Početna',
    icon: 'mdi-home',
    to: '/',
  },
  {
    id: 'offers',
    text: 'Ponude',
    icon: 'mdi-basket',
    to: '/offers',
  },
  {
    id: 'login',
    text: 'Prijava',
    icon: 'mdi-login',
    to: '/login',
  },
]

const userItems = [
  {
    id: 'home',
    text: 'Početna',
    icon: 'mdi-home',
    to: '/',
  },
  {
    id: 'offers',
    text: 'Ponude',
    icon: 'mdi-basket',
    to: '/offers',
  },
  {
    id: 'messages',
    text: 'Obavjesti',
    icon: 'mdi-message-text',
    to: '/messages',
  },
  {
    id: 'account',
    text: 'Račun',
    icon: 'mdi-account',
    to: '/account',
  },
]

const route = useRoute();

const hiddenRoutes = ['/login', '/register'];
const shouldHideNavBar = computed(() => hiddenRoutes.includes(route.path));
</script>

<template>
  <v-app-bar v-if="$vuetify.display.mdAndUp" class="px-md-4 bg-primary" density="default" elevation="0">
    <RouterLink to="/" class="text-decoration-none d-flex flex-fill align-center logo-opacity">
      <v-img
        class="me-sm-8 mx-4"
        max-width="50"
        src="/logo.png"
      />
      <v-app-bar-title class="text-white text-h4 font-weight-medium">
        Gastrozoom
      </v-app-bar-title>
    </RouterLink>

    <v-spacer/>

    <v-btn
      v-for="button in (user ? userItems : guestItems)"
      :key="button.id"
      color="primary"
      class="me-2 text-none"
      variant="flat"
      rounded="lg"
      :to="button.to"
      :prepend-icon="button.icon"
    >
      <span>{{ button.text }}</span>
    </v-btn>
  </v-app-bar>


  <v-bottom-navigation v-if="$vuetify.display.smAndDown && !shouldHideNavBar" bg-color="transparent" elevation="0" mode="shift"
                       class="w-100 h-auto pt-12">
    <v-row justify="center">
      <v-col cols="11" class="mb-6 pa-4 w-auto bg-white custom-shadow custom-radius d-flex justify-center">
        <v-btn
          v-for="button in (user ? userItems : guestItems)"
          :key="button.id"
          :to="button.to"
          size="small"
          rounded="lg"
          color="primary"
          class="text-primary mx-1"
        >
          <v-icon>{{ button.icon }}</v-icon>
          <span>{{ button.text }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>

<style scoped>
.logo-opacity {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}

.logo-opacity:hover {
  opacity: 70%;
}

.custom-radius {
  border-radius: 24px;
}

.custom-shadow {
  box-shadow: 0px 0px 32px 8px #ECEFF1;
}
</style>

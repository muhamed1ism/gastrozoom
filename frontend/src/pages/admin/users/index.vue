<template>
  <v-container fluid class="mt-6 mb-16">
    <v-row class="d-flex align-center py-6" justify="center">
      <v-col cols="12" sm="8" lg="6" class="d-flex">
        <BackButton />
        <div class="d-flex align-center pl-6">
          <h1 class="text-h5 text-md-h4 font-weight-medium">Users</h1>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center my-4 mx-2 justify-space-between">
      <v-col class="d-flex justify-end align-center" cols="12" sm="8" lg="6" offset-sm="2" offset-lg="3">
        <v-text-field
          v-model="search"
          class="custom-text-field elevation-0 bg-secondary rounded-xl pl-8 pr-4 pb-2"
          append-inner-icon="mdi-magnify"
          label="Search"
          variant="plain"
          density="comfortable"
          clearable
          rounded
          hide-details
        />
      </v-col>
      <v-col class="12" sm="10" lg="8" offset-sm="1" offset-lg="2">
        <v-data-table :headers="headers" :items="users.users" :search="search" multi-sort :items-per-page="10">

          <template v-slot:item.name="{ item }">
            <div class="truncate-name-column">{{ item.name }}</div>
          </template>

          <template v-slot:no-data>
            <p>No users</p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-menu location="bottom" offset="8">
              <template v-slot:activator="{ props }">
                <v-btn append-icon="mdi-dots-vertical" v-bind="props" value="Role" class="custom-radius" color="primary"
                       variant="tonal"
                >
                  Role
                </v-btn>
              </template>
              <v-list rounded="xl" elevation="0" bg-color="primary" variant="flat">
                <v-list-item
                  class="bg-primary"
                  v-for="(item, index) in roleMenu"
                  :key="index"
                  @click="item.action"
                >
                  <v-list-item-title><v-icon class="mr-1" :icon="item.icon"/> {{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
import {useUserStore} from "@/stores/user";

const users = ref([]);
const search = ref("");

const headers = [
  { title: "ID", text: "ID", value: "id", sortable: true },
  { title: "Name", text: "Name", value: "name", sortable: true },
  { title: "Email", text: "Email", value: "email", sortable: true },
  { title: "Role", text: "Role", value: "role", sortable: true },
  {
    title: "Actions",
    text: "Actions",
    value: "actions",
    sortable: false,
    align: "center",
  },
];

const setRoleUser = async (id) => {
  await userStore.updateUserRole(id, "USER");
}

const setRoleAdmin = async (id) => {
  await userStore.updateUserRole(id, "ADMIN");
}

const setRoleWorker = async (id) => {
  await userStore.updateUserRole(id, "WORKER");
}

const roleMenu = [
  { title: "User", icon: "mdi-account", action: setRoleUser },
  { title: "Admin", icon: "mdi-account-cog", action: setRoleAdmin },
  { title: "Worker", icon: "mdi-account-hard-hat", action: setRoleWorker },
];

const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(async () => {
  if (authStore.auth.role !== 'ADMIN') await router.push('/');
  try {
    await userStore.fetchUsers();
    users.value = userStore.users;
    console.log(users.value);
  } catch (e) {
    console.error(e);
  }
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

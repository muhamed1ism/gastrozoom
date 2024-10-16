import {defineStore} from "pinia";
import axios from "axios";
import {useAuthStore} from "@/stores/auth";

const apiUrl = "http://localhost:4000/user";

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const authStore = useAuthStore();
        const token = authStore.auth.token;
        const res = await axios.get(`${apiUrl}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          this.users = res.data;
        }
      } catch (error) {
        console.log("Failed to fetch users: ", error);
        throw error;
      }
    },

    async updateUserRole(id, role) {
      try {
        const authStore = useAuthStore();
        const token = authStore.auth.token;
        await axios.put(`${apiUrl}/${id}`, {role}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log("Failed to update user role: ", error);
        throw error;
      }
    },
  },
});

import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const apiUrl = import.meta.env.VITE_API_URL_ORDERS;

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    order: null,
  }),

  actions: {
    async fetchOrders() {
      try {
        const authStore = useAuthStore();
        const token = authStore.auth.token;
        const res = await axios.get(`${apiUrl}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          this.orders = res.data;
        }
      } catch (error) {
        console.log("Failed to fetch orders: ", error);
        throw error;
      }
    },

    async fetchOrderById(id) {
      try {
        const authStore = useAuthStore();
        const token = authStore.auth.token;
        const res = await axios.get(`${apiUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          this.order = res.data;
        }
      } catch (error) {
        console.log("Failed to fetch order: ", error);
        throw error;
      }
    },

    async createOrder(orderData) {
      try {
        const authStore = useAuthStore();
        const token = authStore.auth.token;
        const res = await axios.post(`${apiUrl}/create`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {
          this.orders.push(res.data);
        }
      } catch (error) {
        console.log("Failed to create order: ", error);
        throw error;
      }
    },

    async updateOrder(id, status) {
      try {
        const authStore = useAuthStore();
        const token = authStore.auth.token;
        const res = await axios.put(`${apiUrl}/${id}`, { status }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          const index = this.orders.findIndex(order => order.id === id);
          if (index !== -1) {
            this.orders[index] = res.data;
          }
        }
      } catch (error) {
        console.log("Failed to update order: ", error);
        throw error;
      }
    },
  },
});

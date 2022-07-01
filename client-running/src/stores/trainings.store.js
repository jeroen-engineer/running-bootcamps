import { defineStore } from "pinia";
import { useAuthStore } from "@/stores";

import axios from "axios";

const baseUrl = "http://localhost:5000/api/users";

export const useTrainingsStore = defineStore({
  id: "trainings",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    trainings: [],
    training: {},
    loading: false,
  }),
  getters: {},
  actions: {
    async getTrainings() {
      try {
        const res = await axios.get("http://localhost:5000/api/trainings");
        this.trainings = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getTrainingById(id) {
      this.loading = true;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/trainings/${id}`
        );
        this.training = res.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async deleteTraining(id) {
      const storeAuth = useAuthStore();
      try {
        await axios.delete(`http://localhost:5000/api/trainings/${id}`, {
          headers: {
            Authorization: `Bearer ${storeAuth.user.token}`,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.getTrainings();
        this.router.push("/");
      }
    },
    async updateTraining(id, payload) {
      const storeAuth = useAuthStore();
      try {
        await axios.put(`http://localhost:5000/api/trainings/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${storeAuth.user.token}`,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.getTrainings();
        this.router.push("/");
      }
    },
  },
});

import { defineStore } from "pinia";

import axios from "axios";

const baseUrl = "http://localhost:5000/api/users";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
  }),
  actions: {
    async register(name, email, password) {
      const { data } = await axios.post(`${baseUrl}`, {
        name,
        email,
        password,
      });

      // update pinia state
      this.user = data;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(data));

      // redirect to previous url or default to home page
      this.router.push("/");
    },
    async login(email, password) {
      const { data } = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      // update pinia state
      this.user = data;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(data));

      // redirect to previous url or default to home page
      this.router.push("/");
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      this.router.push("/login");
    },
  },
});

<script setup>
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const logoutUser = () => {
  return authStore.logout();
};
</script>
<template>
  <nav class="w-full h-16 bg-brand-turqoise-1 py-6">
    <div class="flex h-full items-center">
      <div class="flex ml-10">
        <router-link to="/">Home</router-link>
      </div>
      <div class="flex ml-auto items-center">
        <router-link v-if="!user" to="/login" class="mr-5">Login</router-link>
        <router-link
          v-if="!user"
          to="/register"
          class="mr-10 bg-brand-purple-1 hover:bg-brand-purple-2 text-brand-white-1 px-3 py-2 rounded"
          >Register</router-link
        >
        <div class="flex ml-auto items-center">
          <div v-if="user" class="mr-5">Hi {{ user.name }}</div>
          <router-link
            v-if="user && user.isAdmin"
            to="/create-training"
            class="mr-5"
            >create-training</router-link
          >

          <button
            v-if="user"
            @click="logoutUser"
            class="bg-brand-orange-1 hover:bg-brand-orange-2 mr-10 px-3 py-2 rounded"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

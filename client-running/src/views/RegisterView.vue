<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores";

const name = ref("");
const email = ref("");
const password = ref("");

const handleSubmit = () => {
  const authStore = useAuthStore();

  return authStore.register(name.value, email.value, password.value);
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-brand-white-1">
    <div
      class="px-8 py-6 mx-4 mt-4 text-left bg-brand-white-2 shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3"
    >
      <div class="flex justify-center"></div>
      <h3 class="text-2xl font-bold text-center">Register</h3>
      <form @submit.prevent="handleSubmit">
        <div class="mt-4">
          <div>
            <label class="block" for="Name">Name</label>
            <input
              v-model="name"
              type="text"
              placeholder="Name"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div class="mt-4">
            <label class="block" for="email">Email</label>
            <input
              v-model="email"
              type="text"
              placeholder="Email"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div class="mt-4">
            <label class="block">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div class="flex">
            <button
              class="w-full px-6 py-2 mt-4 text-white bg-brand-yellow-1 rounded hover:bg-brand-yellow-2"
            >
              Create Account
            </button>
          </div>
          <div class="mt-6 text-grey-dark">
            Already have an account?
            <router-link
              to="/login"
              class="text-brand-blue-1 hover:underline"
              href="#"
            >
              Log in
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

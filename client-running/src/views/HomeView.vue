<script setup>
import { onMounted } from "vue";
import axios from "axios";

import { useAuthStore, useTrainingsStore } from "@/stores";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const trainingsStore = useTrainingsStore();
const { trainings } = storeToRefs(trainingsStore);

onMounted(() => {
  trainingsStore.getTrainings();
});

const handleSubmit = async (id) => {
  console.log("klik");
  const payload = {
    user: user.value._id,
    name: user.value.name,
  };

  await axios.post(
    `http://localhost:5000/api/trainings/${id}/reserve-spot`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
    }
  );
  router.push("/");
};
</script>

<template>
  <main class="flex flex-col bg-brand-white-2">
    <section class="flex flex-col pt-10 pb-20">
      <div v-if="trainings" class="grid grid-cols-12">
        <div class="col-start-1 col-span-2"></div>
        <div
          v-for="training in trainings"
          :key="training._id"
          class="col-start-3 col-span-8"
        >
          <div
            class="flex flex-col border shadow-md hover:shadow-xl border-brand-turqoise-1 bg-brand-white-3 hover:bg-brand-white-4 hover:cursor-pointer rounded m-5 px-5 py-3"
          >
            <div class="flex w-full">
              <div class="flex w-6/12">
                <h1 class="text-2xl text-brand-purple-1">
                  {{ training.title }}
                </h1>
              </div>
              <div class="flex w-6/12 justify-end">
                <p class="text-xl text-brand-orange-1">
                  {{ training.category }}
                </p>
              </div>
            </div>
            <p
              class="text-lg my-3 border-t border-b border-brand-turqoise-1 py-3"
            >
              {{ training.description }}
            </p>
            <div class="flex w-full">
              <div class="flex w-6/12">
                <p>Price: € {{ training.price }}</p>
              </div>
              <div class="flex w-6/12 justify-end">
                <p>Max participants: {{ training.maxRunners }}</p>
              </div>
            </div>
            <div class="py-2">
              <p>Location: {{ training.location }}</p>
              <p class="pb-1 pt-2">trainer: {{ training.trainer }}</p>
            </div>
            <div class="flex w-full border-t border-brand-turqoise-1">
              <div class="flex w-6/12 items-center pt-3">
                <p class="">Date: {{ training.date }}</p>
                <p class="ml-5">Time: {{ training.time }}</p>
                <p class="ml-5">12 places available</p>
              </div>
              <div class="w-6/12 flex justify-end pt-3">
                <router-link
                  :to="{ name: 'SingleTraining', params: { id: training._id } }"
                  class="bg-brand-turqoise-1 hover:bg-brand-turqoise-2 px-3 py-2 rounded items-center"
                >
                  More info
                </router-link>
                <button
                  @click="handleSubmit(training._id)"
                  class="bg-brand-yellow-1 hover:bg-brand-yellow-2 px-3 py-2 rounded items-center ml-5"
                >
                  Reserve a spot
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-start-11 col-span-2"></div>
      </div>
    </section>
  </main>
</template>

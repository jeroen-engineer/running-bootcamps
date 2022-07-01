<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTrainingsStore, useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";

const trainingsStore = useTrainingsStore();
const { training, loading } = storeToRefs(trainingsStore);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();
const trainingId = route.params.id;

const handleDelete = (id) => {
  trainingsStore.deleteTraining(id);
};

onMounted(() => {
  trainingsStore.getTrainingById(trainingId);
});
</script>
<template>
  <div v-if="!loading">
    <h1>Single Training</h1>
    <div class="flex m-2">
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
        <p class="text-lg my-3 border-t border-b border-brand-turqoise-1 py-3">
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
            <button
              class="bg-brand-yellow-1 hover:bg-brand-yellow-2 px-3 py-2 rounded items-center"
            >
              Reserve a spot
            </button>
          </div>
        </div>
      </div>

      <div v-for="participant in training.participants">
        People going: {{ participant.name }}
      </div>
    </div>
    <div
      v-if="user && user.isAdmin"
      class="flex w-4/12 border border-brand-yellow-1 m-5 px-5 py-3"
    >
      <span
        @click="handleDelete(training._id)"
        class="bg-brand-orange-1 hover:bg-brand-orange-2 px-3 py-2 rounded items-center cursor-pointer"
        >Delete Training</span
      >
      <router-link
        to="/update-training"
        class="bg-brand-turqoise-2 hover:bg-brand-turqoise-1 px-3 py-2 rounded items-center ml-5"
        >Update Training</router-link
      >
    </div>
  </div>
</template>

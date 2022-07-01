<script setup>
import { ref } from "vue";
import { useTrainingsStore, useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";

const trainingsStore = useTrainingsStore();
const { training, loading } = storeToRefs(trainingsStore);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const title = ref(training.value.title);
const category = ref(training.value.category);
const description = ref(training.value.description);
const trainer = ref(training.value.trainer);
const price = ref(training.value.price);
const maxRunners = ref(training.value.maxRunners);
const location = ref(training.value.location);
const date = ref(training.value.date);
const time = ref(training.value.time);

const handleUpdateTraining = (id) => {
  trainingsStore.updateTraining(id, {
    user: user.value._id,
    title: title.value,
    category: category.value,
    description: description.value,
    trainer: trainer.value,
    price: price.value,
    maxRunners: maxRunners.value,
    location: location.value,
    date: date.value,
    time: time.value,
  });
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-brand-white-1">
    <div
      class="px-8 py-6 mx-4 mt-4 text-left bg-brand-white-2 shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3"
    >
      <div class="flex justify-center"></div>
      <h3 class="text-2xl font-bold text-center">Update Training</h3>
      <form @submit.prevent="handleUpdateTraining(training._id)">
        <div class="mt-5">
          <div>
            <label class="block mt-5" for="Title">title</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="text"
              v-model="title"
            />
          </div>
          <div>
            <label class="block mt-5" for="Category">category</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="text"
              v-model="category"
            />
          </div>
          <div>
            <label class="block mt-5" for="Description">description</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="text"
              v-model="description"
            />
          </div>
          <div>
            <label class="block mt-5" for="Trainer">trainer</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="text"
              v-model="trainer"
            />
          </div>
          <div>
            <label class="block mt-5" for="Price">price</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="text"
              v-model="price"
            />
          </div>
          <div>
            <label class="block mt-5" for="maxRunners">Max runners</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="text"
              v-model="maxRunners"
            />
          </div>
          <div>
            <label class="block mt-5" for="Location">location</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="text"
              v-model="location"
            />
          </div>
          <div>
            <label class="block mt-5" for="Date">date</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="date"
              v-model="date"
            />
          </div>
          <div>
            <label class="block m-5" for="Time">time</label>
            <input
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              p-3
              type="time"
              v-model="time"
            />
          </div>
          <div class="flex justify-end">
            <button
              class="px-3 py-2 rounded bg-brand-yellow-1 hover:bg-brand-yellow-2 mt-5"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

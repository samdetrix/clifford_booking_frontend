<template>
  <div class="container mx-auto p-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <div
        class="bg-gray dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      >
        <div class="px-6 py-4">
          <form class="bg-gray shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <!-- Error and Success Flash Messages -->
            <div>
              <!-- Error Flash Message -->
              <div
                v-if="errorFlash"
                class="bg-red-500 text-white p-4 mb-4 rounded"
              >
                <p>{{ errorFlash }}</p>
              </div>

              <!-- Success Flash Message -->
              <div
                v-if="successFlash"
                class="bg-green-500 text-white p-4 mb-4 rounded"
              >
                <p>{{ successFlash }}</p>
              </div>
            </div>

            <!-- Accommodation Select -->
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="accommodationSelect"
              >
                Accommodation
              </label>
              <select
                v-model="selectedAccommodationId"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="accommodationSelect"
              >
                <option value="" disabled>Select Accommodation</option>
                <option
                  v-for="accommodation in accommodations"
                  :key="accommodation.id"
                  :value="accommodation.id"
                  class="text-black"
                >
                  {{ accommodation.name }}
                </option>
              </select>
            </div>

            <!-- Contract Rate -->
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="contractRate"
              >
                Contract Rate
              </label>
              <input
                v-model="contract_rate"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="contractRate"
                type="number"
                placeholder="150.00"
              />
            </div>

            <!-- Start Date -->
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="startDate"
              >
                Start Date
              </label>
              <input
                v-model="start_date"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="startDate"
                type="date"
                placeholder="2024-02-01"
              />
            </div>

            <!-- End Date -->
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="endDate"
              >
                End Date
              </label>
              <input
                v-model="end_date"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="endDate"
                type="date"
                placeholder="2024-02-15"
              />
            </div>

            <!-- Contract Status -->
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="contractStatus"
              >
                Contract Status
              </label>
              <select
                v-model="status"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="contractStatus"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>

            <!-- Notes -->
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="notes"
              >
                Notes
              </label>
              <textarea
                v-model="notes"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="notes"
                rows="4"
                placeholder="Additional notes about the contract"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
              <button
                @click.prevent="createContract"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Contract
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ... (rest of the component remains the same) -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedAccommodationId: "",
      accommodations: [],
      errorFlash: null,
      successFlash: null,
      contract_rate: "",
      start_date: "",
      end_date: "",
      status: "active",
      notes: "",
    };
  },
  mounted() {
    this.fetchAccommodations();
  },
  methods: {
    async fetchAccommodations() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/accommodations"
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.accommodations
        ) {
          this.accommodations = response.data.data.accommodations;

          this.accommodations.forEach((accommodation) => {
            console.log(
              `Accommodation Name: ${accommodation.name}, ID: ${accommodation.id}`
            );
          });

          console.log(response.data);
        } else {
          console.error("No accommodations data found in the response");
        }
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    },

    async createContract() {
      try {
        const userId = localStorage.getItem("user_id");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/contracts",
          {
            accommodation_id: this.selectedAccommodationId,
            travel_agent_id: userId,
            contract_rate: this.contract_rate,
            start_date: this.start_date,
            end_date: this.end_date,
            status: this.status,
            notes: this.notes,
          }
        );

        if (response.data.status === "success") {
          console.log(response.data);
          this.$router.push({
            name: "Contracts",
            query: { successFlash: response.data.message },
          });
        } else {
          this.errorFlash = response.data.message;
        }
      } catch (error) {
        console.error("Error creating contract:", error);
        this.errorFlash = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

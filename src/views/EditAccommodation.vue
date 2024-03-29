<template>
  <div class="container mx-auto p-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      >
        <div class="px-6 py-4">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <!-- Error Flash Message -->
              <div v-if="errorFlash" class="bg-red-500 text-white p-4 mb-4 rounded">
                <p>{{ errorFlash }}</p>
              </div>
          
              <!-- Success Flash Message -->
              <div v-if="successFlash" class="bg-green-500 text-white p-4 mb-4 rounded">
                <p>{{ successFlash }}</p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <!-- Row 1 -->
              <div class="col-span-3">
                <!-- Accommodation Name -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                  >
                    Name
                  </label>
                  <input
                    v-model="selectedAccommodation.name"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Luxury Suite"
                  />
                </div>
              </div>

              <!-- Row 2 -->
              <div class="col-span-3">
                <!-- Standard Rack Rate -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="standardRackRate"
                  >
                    Standard Rack Rate
                  </label>
                  <input
                    v-model="selectedAccommodation.standard_rack_rate"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="standardRackRate"
                    type="number"
                    placeholder="250.00"
                  />
                </div>
              </div>

              <!-- Row 3 -->
              <div class="col-span-3">
                <!-- Status -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="status"
                  >
                    Status
                  </label>
                  <select
                    v-model="selectedAccommodation.status"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="status"
                  >
                    <option value="available">Available</option>
                    <option value="maintenance">Under Maintenance</option>
                    <option value="booked">Booked</option>
                  </select>
                </div>
              </div>

              <!-- Row 4 -->
              <div class="col-span-2">
                <!-- Capacity -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="capacity"
                  >
                    Capacity
                  </label>
                  <input
                    v-model="selectedAccommodation.capacity"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="capacity"
                    type="number"
                    placeholder="2"
                  />
                </div>
              </div>

              <!-- Row 5 -->
              <div class="col-span-1">
                <!-- Wi-Fi Availability -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="wifiAvailability"
                  >
                    Wi-Fi Availability
                  </label>
                  <input
                    v-model="selectedAccommodation.is_wifi_available"
                    class="mr-2"
                    id="wifiAvailability"
                    type="checkbox"
                  />
                  <label for="wifiAvailability">Yes</label>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="parkingAvailability"
                  >
                    Parking Availability
                  </label>
                  <input
                    v-model="selectedAccommodation.is_parking_available"
                    class="mr-2"
                    id="parkingAvailability"
                    type="checkbox"
                  />
                  <label for="parkingAvailability">Yes</label>
                </div>
              </div>

              <!-- Row 6 -->
              <div class="col-span-1">
                <!-- Parking Availability -->
              </div>

              <!-- Row 7 -->
              <div class="col-span-3">
                <!-- Description -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="description"
                  >
                    Description
                  </label>
                  <textarea
                    v-model="selectedAccommodation.description"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    rows="4"
                    placeholder="Spacious suite with a stunning view"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
              <button
                @click.prevent="updateAccommodation"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Accommodation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedAccommodation: {},
      errorFlash: null,
      successFlash: null,
    };
  },
  mounted() {
    this.fetchSelectedAccommodation();
  },
  methods: {
    async fetchSelectedAccommodation() {
      try {
        const accommodationId = this.$route.params.id;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/accommodations/${accommodationId}`
        );
        console.log(response.data);
        this.selectedAccommodation = response.data.accommodation;
      } catch (error) {
        console.error("Error fetching selected accommodation:", error);
      }
    },
    getStatusBadgeClass(status) {
      return {
        "bg-green-500": status === "available",
        "bg-yellow-500": status === "maintenance",
        "bg-red-500": status === "booked",
        "text-white": true,
        "px-2": true,
        "py-1": true,
        "rounded-full": true,
        "text-xs": true,
        "mr-2": true,
      };
    },
    async updateAccommodation() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/accommodations/${this.selectedAccommodation.id}`,
          this.selectedAccommodation
        );

        console.log("Accommodation updated successfully:", response.data);

        if (response.data.status === "success") {
          // Success Flash
          this.$router.push({
            name: "Valert",
            query: { successFlash: response.data.message },
          });
        } else {
          // Error Flash
          this.$toast.error(response.data.message, {
            position: "bottom-center",
          });
        }
      } catch (error) {
        console.error("Error updating accommodation:", error);

        // Error Flash
        this.$toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

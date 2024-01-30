<template>
  <div class="container mx-auto p-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div class="px-6 py-4">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div class="row">
                <div class="col-3">

                </div>
                <div class="col-3">
                  
                </div>
                <div class="col-3">
                  
                </div>
              </div>
              <!-- Accommodation Name -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
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
        
              <!-- Standard Rack Rate -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="standardRackRate">
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
        
              <!-- Status -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
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
        
              <!-- Capacity -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="capacity">
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
        
              <!-- Wi-Fi Availability -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="wifiAvailability">
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
        
              <!-- Parking Availability -->
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="parkingAvailability">
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
        
              <!-- Amenities -->
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="amenities">
                  Amenities
                </label>
                <input
                  v-model="selectedAccommodation.amenities"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amenities"
                  type="text"
                  placeholder="TV, minibar, free toiletries"
                />
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
    };
  },
  mounted() {
    this.fetchSelectedAccommodation();
  },
  methods: {
    async fetchSelectedAccommodation() {
      try {
        const accommodationId = this.$route.params.id; // Get the ID from the route params
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
      // Example: Apply badges based on status
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
        // Optionally, you can redirect to another page or perform other actions
      } catch (error) {
        console.error("Error updating accommodation:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

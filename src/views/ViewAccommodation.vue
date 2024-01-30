<template>
  <div class="container mx-auto p-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      >
        <div class="px-6 py-4">
          <h3 class="text-xl font-semibold mb-2 text-white">
            {{ selectedAccommodation.name }}
          </h3>
        </div>
        <div class="px-6 py-4">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Parameter</th>
                <th scope="col" class="px-6 py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Name
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ selectedAccommodation.name }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Description
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ selectedAccommodation.description }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Standard Rack Rate
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ selectedAccommodation.standard_rack_rate }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Status
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  <!-- Example: Apply badges or icons based on status -->
                  <span
                    :class="getStatusBadgeClass(selectedAccommodation.status)"
                  >
                    {{ selectedAccommodation.status }}
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Capacity
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ selectedAccommodation.capacity }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Is WiFi Available
                </td>
                <td class="px-6 py-3">
                  <span
                    v-if="selectedAccommodation.is_wifi_available"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    Yes
                  </span>
                  <span
                    v-else
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >
                    No
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Is Parking Available
                </td>
                <td class="px-6 py-3">
                  <span
                    v-if="selectedAccommodation.is_parking_available"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    Yes
                  </span>
                  <span
                    v-else
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >
                    No
                  </span>
                </td>
              </tr>

              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Amenities
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ selectedAccommodation.amenities }}
                </td>
              </tr>
            </tbody>
          </table>
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
  },
};
</script>

<style scoped></style>

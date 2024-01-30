<template>
  <div class="container mx-auto p-8">
    <h2 class="text-2xl font-semibold mb-4 text-white">Accommodations</h2>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
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
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Standard Rack Rate</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="accommodation in accommodations.data.accommodations"
            :key="accommodation.id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ accommodation.name }}
            </td>
            <td class="px-6 py-4">{{ accommodation.description }}</td>
            <td class="px-6 py-4">{{ accommodation.standard_rack_rate }}</td>
            <td class="px-6 py-4">
              <span
                v-if="accommodation.status === 'available'"
                class="bg-green-500 text-white px-2 py-1 rounded-full"
              >
                Available
              </span>
              <span
                v-else-if="accommodation.status === 'booked'"
                class="bg-blue-500 text-white px-2 py-1 rounded-full"
              >
                Booked
              </span>
              <span
                v-else-if="accommodation.status === 'maintenance'"
                class="bg-red-500 text-white px-2 py-1 rounded-full"
              >
                Maintenance
              </span>
            </td>
            <td class="px-6 py-4">
              <router-link
                :to="{
                  name: 'ViewAccommodation',
                  params: { id: accommodation.id },
                }"
              >
                <button
                  class="inline-block bg-green-500 text-white py-1 px-2 rounded-full text-xs font-medium mr-2 hover:bg-green-700"
                >
                  View
                </button>
              </router-link>
              <router-link
                :to="{
                  name: 'EditAccommodation',
                  params: { id: accommodation.id },
                }"
              >
                <button
                  class="inline-block bg-blue-500 text-white py-1 px-2 rounded-full text-xs font-medium mr-2 hover:bg-blue-700"
                >
                  Edit
                </button>
              </router-link>

              <button
                @click.prevent="deleteAccommodation(accommodation.id)"
                class="inline-block bg-red-500 text-white py-1 px-2 rounded-full text-xs font-medium mr-2 hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      accommodations: { data: { accommodations: [] } },
      errorFlash: null,
      successFlash: null,
    };
  },
  mounted() {
    this.fetchAccommodations();
  },
  methods: {
    async fetchAccommodations() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/accommodations/"
        );
        console.log(response.data);
        this.accommodations = response.data;
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    },
    viewAccommodation(accommodationId) {
      console.log("Viewing accommodation:", accommodationId);
    },

    editAccommodation(accommodation) {
      this.$router.push({
        name: "edit-accommodation",
        params: { id: accommodation.id },
      });
    },

    deleteAccommodation(accommodationId) {
      // Handle the delete action
      if (confirm("Are you sure you want to delete this accommodation?")) {
        axios
          .delete(`http://127.0.0.1:8000/api/accommodations/${accommodationId}`)
          .then((response) => {
            console.log("Accommodation deleted successfully:", response.data);
            // Optionally, you can refresh the accommodations list
            this.fetchAccommodations();
          })
          .catch((error) => {
            console.error("Error deleting accommodation:", error);
          });
      }
    },
  },
};
</script>

<style scoped></style>

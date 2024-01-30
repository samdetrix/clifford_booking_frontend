<template>
  <div class="container mx-auto p-8">
    <h2 class="text-2xl font-semibold mb-4 text-white">Contracts</h2>

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
          <div
            v-if="successFlash"
            class="bg-green-500 text-white p-4 mb-4 rounded"
          >
            <p>{{ successFlash }}</p>
          </div>
        </div>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Accommodation Name</th>
            <th scope="col" class="px-6 py-3">Travel Agent</th>
            <th scope="col" class="px-6 py-3">Contract Rate</th>
            <th scope="col" class="px-6 py-3">Start Date</th>
            <th scope="col" class="px-6 py-3">End Date</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Notes</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="contract in contracts.data"
            :key="contract.id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ contract.accommodation.name }}
            </td>
            <td class="px-6 py-4">{{ contract.travel_agent.name }}</td>
            <td class="px-6 py-4">{{ contract.contract_rate }}</td>
            <td class="px-6 py-4">
              {{ new Date(contract.start_date).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4">
              {{ new Date(contract.end_date).toLocaleDateString() }}
            </td>

            <td class="px-6 py-4">
              <span
                v-if="contract.status === 'active'"
                class="bg-green-500 text-white px-2 py-1 rounded-full"
              >
                Active
              </span>
            </td>
            <td class="px-6 py-4">{{ contract.notes }}</td>
            <td class="px-6 py-4">
                <div class="flex">
                  <router-link
                    :to="{
                      name: 'ViewContract',
                      params: { id: contract.id },
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
                      name: 'EditContract',
                      params: { id: contract.id },
                    }"
                  >
                    <button
                      class="inline-block bg-blue-500 text-white py-1 px-2 rounded-full text-xs font-medium mr-2 hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </router-link>
                  <button
                    @click.prevent="deleteContract(contract.id)"
                    class="inline-block bg-red-500 text-white py-1 px-2 rounded-full text-xs font-medium mr-2 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
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
      contracts: { data: [] },
      errorFlash: null,
      successFlash: null,
    };
  },
  mounted() {
    this.fetchContracts();
  },
  methods: {
    async fetchContracts() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/contracts/"
        );
        console.log(response.data);
        this.contracts = response.data;
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    },
    deleteContract(contractId) {
      // Handle the delete action
      if (confirm("Are you sure you want to delete this contract?")) {
        axios
          .delete(`http://127.0.0.1:8000/api/accommodations/${contractId}`)
          .then((response) => {
            console.log("Contract deleted successfully:", response.data);
            this.fetchContracts();
          })
          .catch((error) => {
            console.error("Error deleting contract:", error);
          });
      }
    },
  },
};
</script>

<style scoped></style>

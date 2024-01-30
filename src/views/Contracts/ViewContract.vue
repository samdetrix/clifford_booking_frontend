<template>
  <div class="container mx-auto p-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      >
        <div class="px-6 py-4">
          <h3 class="text-xl font-semibold mb-2 text-white">
            <span :class="getStatusBadgeClass(contract.status)">
             Status  {{ contract && contract.status ? contract.status : 'Contract Status not available' }}
            </span>
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
            <tbody v-if="contract">
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Start Date
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ formatReadableDate(contract.start_date) }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  End Date
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ formatReadableDate(contract.end_date) }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Contract Rate
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ contract.contract_rate }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Notes
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{ contract.notes }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Accommodation Name
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{
                    contract.accommodation && contract.accommodation.name
                      ? contract.accommodation.name
                      : "Accommodation Name not available"
                  }}
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Agent Name
                </td>
                <td class="px-6 py-3 text-gray-500 dark:text-gray-400">
                  {{
                    contract.travel_agent && contract.travel_agent.name
                      ? contract.travel_agent.name
                      : "Agent Name not available"
                  }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td
                  colspan="2"
                  class="px-6 py-3 text-gray-500 dark:text-gray-400"
                >
                  Contract data not available
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
      contract: {},
    };
  },
  mounted() {
    this.fetchContract();
  },
  methods: {
    async fetchContract() {
      try {
        const contractId = this.$route.params.id;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/contracts/${contractId}`
        );
        this.contract = response.data.contract;
      } catch (error) {
        console.error("Error fetching contract:", error);
      }
    },
    formatReadableDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getStatusBadgeClass(status) {
      switch (status) {
        case "active":
          return "bg-green-500 text-white rounded-full";
        case "expired":
          return "bg-red-500 text-white rounded-full";
        case "canceled":
          return "bg-gray-500 text-white rounded-full";
        default:
          return "bg-gray-500 text-white rounded-full";
      }
    },
  },
};
</script>

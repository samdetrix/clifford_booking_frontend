<template>
  <div class="container mx-auto p-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
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
            <div class="grid grid-cols-2 gap-4">
              <!-- Row 1 -->
              <!-- <h3>{{contract.accomodation.name}}</h3> -->
              <h4> Contract for {{
                contract.accommodation && contract.accommodation.name
                  ? contract.accommodation.name
                  : "Accommodation Name not available"
              }}</h4>
              <div class="col-span-2">
                <!-- Contract Rate -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="contractRate"
                  >
                    Contract Rate
                  </label>
                  <input
                    v-model="contract.contract_rate"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contractRate"
                    type="number"
                    placeholder="150.00"
                  />
                </div>
              </div>

              <!-- Row 2 -->
              <div class="col-span-1">
                <!-- Start Date -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="startDate"
                  >
                    Start Date
                  </label>
                  <input
                    v-model="contract.start_date"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="startDate"
                    type="date"
                    placeholder="2024-02-01"
                  />
                </div>
              </div>

              <!-- Row 3 -->
              <div class="col-span-1">
                <!-- End Date -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="endDate"
                  >
                    End Date
                  </label>
                  <input
                    v-model="contract.end_date"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="endDate"
                    type="date"
                    placeholder="2024-02-15"
                  />
                </div>
              </div>

              <!-- Row 4 -->
              <div class="col-span-2">
                <!-- Contract Status -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="contractStatus"
                  >
                    Contract Status
                  </label>
                  <select
                    v-model="contract.status"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contractStatus"
                  >
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
              </div>

              <!-- Row 5 -->
              <div class="col-span-2">
                <!-- Notes -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="notes"
                  >
                    Notes
                  </label>
                  <textarea
                    v-model="contract.notes"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="notes"
                    rows="4"
                    placeholder="Additional notes about the contract"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
              <button
                @click.prevent="updateContract"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Contract
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
      contract: {
        contract_rate: null,
        start_date: null,
        end_date: null,
        status: null,
        notes: null,
      },
      errorFlash: null,
      successFlash: null,
    };
  },
  mounted() {
    this.fetchContract();
  },
  methods: {
    async fetchContract() {
      try {
        const contractId = this.$route.params.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/contracts/${contractId}`);
        this.contract = response.data.contract;
        console.log(response.data.contract)
      } catch (error) {
        console.error("Error fetching contract:", error);
      }
    },
    async updateContract() {
      try {
        const contractId = this.$route.params.id;
        const response = await axios.put(`http://127.0.0.1:8000/api/contracts/${contractId}`, this.contract);

        console.log("Contract updated successfully:", response.data);

        if (response.data.status === "success") {
          // Success Flash
          this.$router.push({
            name: "Contracts",
            query: { successFlash: response.data.message },
          });
        } else {
          // Error Flash
          this.$toast.error(response.data.message, {
            position: "bottom-center",
          });
        }
      } catch (error) {
        console.error("Error updating contract:", error);

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

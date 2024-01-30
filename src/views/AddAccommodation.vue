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
                    v-model="name"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    required
                    placeholder="Enter Name"
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
                    v-model="standard_rack_rate"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="standardRackRate"
                    type="number"
                    placeholder="Rack rate"
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
                    v-model="status"
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
                    v-model="capacity"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="capacity"
                    type="number"
                    placeholder="capacity"
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
                    v-model="is_wifi_available"
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
                    v-model="is_parking_available"
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
                    v-model="description"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    rows="4"
                    placeholder="Description"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="col-span-3">
                <!-- Description -->
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="amenities"
                  >
                    Amenities
                  </label>
                  <textarea
                    v-model="amenities"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="amenities"
                    required
                    rows="4"
                    placeholder="Amenities"
                  ></textarea>
                </div>
              </div>
            </div>
            <!-- Submit Button -->
            <div class="flex items-center justify-between">
              <button
                @click.prevent="createAccommodation"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Accommodation
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
      name: "",
      standard_rack_rate: 0,
      status: "available",
      is_wifi_available: false,
      is_parking_available: false,
      capacity: 0,
      description: "",
      amenities: "",

      errorFlash: "",
      successFlash: "",
    };
  },
  methods: {
    createAccommodation() {
      const user_id = localStorage.getItem("user_id");

      const postData = {
        name: this.name,
        standard_rack_rate: this.standard_rack_rate,
        status: this.status,
        capacity: this.capacity,
        is_wifi_available: this.is_wifi_available,
        is_parking_available: this.is_parking_available,
        description: this.description,
        amenities: this.amenities,
        created_by: user_id ? parseInt(user_id) : null,
      };
      console.log(postData);

      axios
        .post("http://127.0.0.1:8000/api/accommodations/", postData)
        .then((response) => {
          this.successFlash = "Accommodation created successfully!";
          this.$router.push({ name: "Valert" });
        })
        .catch((error) => {
          this.errorFlash = "Error creating accommodation: " + error.message;
        });
    },
  },
};
</script>

<style scoped></style>

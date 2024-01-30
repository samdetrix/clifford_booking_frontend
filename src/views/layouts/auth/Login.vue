<template>
  <form @submit.prevent="login">
    <div
      class="form-body lg:max-w-xl mx-auto lg:p-20 p-8 lg:mt-20 mt-5 space-y-8"
    >
      <div class="form-head cursor-pointer" @click="$router.push('/')">
        <img src="../../../assets/logo/logo.svg" alt="" class="w-10" />
      </div>
      <div
        v-if="successMessage"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {{ errorMessage }}
      </div>
      <div class="space-y-3">
        <h2 class="dark:text-white font-semibold text-gray-800 text-4xl">
          Welcome, to Clifford Booking App<span class="text-primary">.</span>
        </h2>
        <p class="dark:text-gray-400 text-gray-700">
          Please enter your account to continue.
        </p>
      </div>

      <div class="space-y-5">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="email"
            v-model="email"
            name="floating_email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Email address</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="password"
            v-model="password"
            name="floating_password"
            id="floating_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Password</label
          >
        </div>
      </div>

      <button
        type="submit"
        class="text-white bg-primary hover:bg-primary/80 p-3 w-full rounded-md"
      >
        Login, to continue
      </button>
      <p class="dark:text-white text-center text-gray-700">
        Don't have an account?<button
          type="button"
          @click="$router.push('/auth/register')"
          class="ml-2 text-primary"
        >
          Register here
        </button>
      </p>
    </div>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

// State for success and error messages
const successMessage = ref("");
const errorMessage = ref("");

const login = async () => {
  try {
    const payload = {
      email: email.value,
      password: password.value,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/",
      payload
    );

    // Save token, user name, and email to local storage
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("userName", response.data.data.user.name);
    localStorage.setItem("userEmail", response.data.data.user.email);
    localStorage.setItem("user_id", response.data.data.user.id);

    successMessage.value = "Login successful";

    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);

    // Set error message
    errorMessage.value = "Invalid credentials";
  }
};
</script>

<style scoped>
.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
.bg-wave {
  background: radial-gradient(
      circle at top left,
      transparent 25%,
      #4f46e5 25.5%,
      #4f46e5 36%,
      transparent 37%,
      transparent 100%
    ),
    radial-gradient(
      circle at bottom right,
      transparent 34%,
      #4f46e5 34.5%,
      #4f46e5 45.5%,
      transparent 46%,
      transparent 100%
    );
  background-size: 6em 6em;
  opacity: 1;
}
</style>

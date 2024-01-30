import { createRouter, createWebHistory } from "vue-router";

// Default Pages
import Dashboard from "../views/Dashboard.vue";
// Component Pages
import Login from "../views/layouts/auth/Login.vue";
import Register from "../views/layouts/auth/Register.vue";
import Valert from "../views/components/accomodations.vue";
import ViewAccommodation from "../views/ViewAccommodation.vue";
import EditAccommodation from "../views/EditAccommodation.vue";

var appname = " - Booking App";

const routes = [
  // Routes
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { title: "Login" + appname, hideNav: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dashboard " + appname, requiresAuth: true },
  },
  {
    path: "/accomodation",
    name: "Valert",
    component: Valert,
    meta: { title: "Accomodations" + appname, requiresAuth: true },
  },
  {
    path: "/view-accommodation/:id",
    name: "ViewAccommodation",
    component: ViewAccommodation,
    meta: { title: "View Accommodation" },
  },
  {
    path: "/edit-accommodation/:id",
    name: "EditAccommodation",
    component: EditAccommodation,
    meta: { title: "Edit Accommodation" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");

    if (!token) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

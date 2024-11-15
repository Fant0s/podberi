import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/v-Viewer.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/pages/HomePage.vue"),
      },
    ],
  },
  {
    path: "/kreditnie-karty",
    name: "kreditnie-karty",
    component: () => import("../views/v-Viewer.vue"),
    children: [
      {
        path: "",
        name: "kreditnie-karty",
        component: () => import("@/pages/CreditCardPage.vue"),
      },
      {
        path: "/kreditnie-karty/:slug",
        name: "credit-card",
        component: () => import("@/pages/CreditCardItemPage.vue"),
      },
    ],
  },
  {
    path: "/debetovie-karty",
    name: "debetovie-karty",
    component: () => import("../views/v-Viewer.vue"),
    children: [
      {
        path: "",
        name: "debetovie-karty",
        component: () => import("@/pages/DebitCardPage.vue"),
      },
      {
        path: "/debetovie-karty/:slug",
        name: "debit-card",
        component: () => import("@/pages/DebitCardItemPage.vue"),
      },
    ],
  },
  {
    path: "/zaimy",
    name: "zaimy",
    component: () => import("../views/v-Viewer.vue"),
    children: [
      {
        path: "",
        name: "zaimy",
        component: () => import("@/pages/LoanPage.vue"),
      },
    ],
  },
  {
    path: "/rko",
    name: "rko",
    component: () => import("../views/v-Viewer.vue"),
    children: [
      {
        path: "",
        name: "rko",
        component: () => import("@/pages/RKOPage.vue"),
      },
      {
        path: "/rko/:slug/:main",
        name: "rko-card-main",
        component: () => import("@/pages/RKOItemPageMain.vue"),
      },
      {
        path: "/rko/:slug/:other",
        name: "rko-card-other",
        component: () => import("@/pages/RKOItemPageOther.vue"),
      },
    ],
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/v-Viewer.vue"),
    children: [
      {
        path: "",
        name: "blog",
        component: () => import("@/pages/BlogPage.vue"),
      },
    ],
  },
  {
    path: "/tekhnicheskie-raboty",
    name: "tekhnicheskie-raboty",
    component: () => import("../views/v-Viewer.vue"),
    children: [
      {
        path: "/tekhnicheskie-raboty",
        name: "tekhnicheskie-raboty",
        component: () => import("@/pages/TechWorksPage.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () => import("@/pages/Error404Page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    return window.scrollTo(0, 0);
  },
});

router.beforeEach((to) => {
  if (to.path === "/auth/vk") {
    axios
      .get(
        `https://api.podberiru.ru/auth/provider/vk/process?${
          to.fullPath.split("?")[1]
        }`
      )
      .then((response) => {
        localStorage.setItem("vkData", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.replace("https://test.podberiru.ru/debetovie-karty");
  }
});

export default router;

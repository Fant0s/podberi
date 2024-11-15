import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/index.sass";
import router from "./router";
import api from "@/api/api.js";
import axios from "axios";
import { createHead } from "@vueuse/head";
import store from "@/store/index";

const axiosInstance = axios.create(api);
const head = createHead();
const app = createApp(App);

app.config.globalProperties.$api = { ...axiosInstance };

app.use(router).use(head).use(store).mount("#app");

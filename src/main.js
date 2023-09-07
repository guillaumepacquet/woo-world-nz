import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

console.log(`process.env.VUE_APP_API_URL`);
Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.filter("teamName", function (value) {
  if (!value) return "";
  value = value.toString();
  value = value.split("_").pop();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("float", function (value) {
  if (!value) return 0;
  return value.toFixed(2);
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

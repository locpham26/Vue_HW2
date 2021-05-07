import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import { Table, Button, Row, Col, Modal, Input, Space } from "ant-design-vue";

Vue.use(Table);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Input);
Vue.use(Space);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

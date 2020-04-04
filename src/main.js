import Vue from 'vue'
import App from 'src/App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Layout,
  Icon,
} from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(Layout.name, Layout);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
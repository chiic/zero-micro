import Vue from 'vue'
import App from './App.vue'
import { start } from 'zero-micro';

start();


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app-main')

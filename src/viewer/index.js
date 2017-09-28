import Vue from 'vue';
import store from './store';
import App from './App.vue';

const app = new Vue({
  store,
  ...App,
});

app.$mount('#app');

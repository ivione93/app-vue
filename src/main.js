import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import VueTextareaAutosize from "vue-textarea-autosize";
Vue.use(VueTextareaAutosize);

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfEtbGZ2NXJdCLkWd752O8UPlN02b_1XA",
  authDomain: "prueba-firebase-41574.firebaseapp.com",
  databaseURL: "https://prueba-firebase-41574.firebaseio.com",
  projectId: "prueba-firebase-41574",
  storageBucket: "prueba-firebase-41574.appspot.com",
  messagingSenderId: "762193692223",
  appId: "1:762193692223:web:7c46262dae4e41da475a8a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

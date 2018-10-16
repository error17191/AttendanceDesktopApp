// import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
window.access_token = localStorage.getItem('access_token');
window.auth_user = JSON.parse(localStorage.getItem('auth_user'));


window.axios = require('axios');
if (window.access_token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.access_token;
}

import Echo from 'laravel-echo'
import VueElementLoading from 'vue-element-loading';

Vue.component('VueElementLoading', VueElementLoading);
import Multiselect from 'vue-multiselect';

Vue.component('multiselect', Multiselect)

window.io = require('socket.io-client');
window.Echo = new Echo({
    broadcaster: 'socket.io',
    auth:
        {
            headers:
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
        },
    host: "http://localhost" + ':6001'
});
window.makeRequest = (params) => {
    if (params.method == 'get' && !params.cache) {
        // params.url = params.url + '?t=' + new Date().getTime();
    }
    params.url=url(params.url);
    return new Promise((resolve) => {
        let promise = axios.request(params)
            .then(resolve)
            .catch((error) => {
                //error.response.status
                // window.location.reload();
            })
    });
};




window.qrcode = require('qrcode-generator');

import Login from './components/Login';
import Home from './components/Home';

Vue.component('login', Login);
import VueRouter from 'vue-router';

window.router = new VueRouter({
    routes: [
        {
            path: '',
            component: Home,
            name: 'home'
        },
        {
            path: 'login',
            component: Login,
            name: 'login'
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name == 'login') {
        next();
        return;
    }
    if (access_token != null && auth_user != null) {
        next();
    }else {
        router.push({name: 'login'});
    }
});

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
Vue.use(VueRouter);
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


window.app =new Vue({
    router,
    el: '#app',
    data: () => ({
        drawer: null,
    }),

    props: {
        source: String
    },
});
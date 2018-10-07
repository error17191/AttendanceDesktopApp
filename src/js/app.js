// import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


new Vue({
    el: '#app',
    data: () => ({
        drawer: null
    }),

    props: {
        source: String
    }
})
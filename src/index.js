import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'

import './assets/style/test.css';

const vm = new Vue({
    el: '#app',
    router,
    render: (h) => h(App)  // 通过创建DOM元素返回参数h将App挂载，h即为hyperscript，用来实现虚拟DOM的
});
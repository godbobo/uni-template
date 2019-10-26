import Vue from 'vue'
import App from './App'
import router from './router'
import cuCustom from './colorui/components/cu-custom.vue'
import bMessage from './components/b-message/b-message.vue'

// 使用自定义导航栏
Vue.component('cu-custom', cuCustom)
// 使用自定义消息提示
Vue.component('b-message', bMessage)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

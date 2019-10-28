import Vue from 'vue'
import App from './App'
import router from './utils/bobo-router'
import cuCustom from './colorui/components/cu-custom.vue'
import boboMessage from './components/bobo-message/bobo-message.vue'

// 使用自定义导航栏
Vue.component('cu-custom', cuCustom)
// 使用自定义消息提示
Vue.component('message', boboMessage)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

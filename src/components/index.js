import myBread from '@/components/mybread.vue'
import myChannel from '@/components/my-channel.vue'
export default {
  install (Vue) {
    Vue.component('my-bread', myBread)
    Vue.component('my-channel', myChannel)
  }
}

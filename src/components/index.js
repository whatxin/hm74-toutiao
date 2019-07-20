import myBread from '@/components/mybread.vue'
import myChannel from '@/components/my-channel.vue'
import myImage from '@/components/my-image.vue'
export default {
  install (Vue) {
    Vue.component('my-bread', myBread)
    Vue.component('my-channel', myChannel)
    Vue.component('my-image', myImage)
  }
}

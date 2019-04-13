import Vue from 'vue'

Vue.prototype.$bus = new Vue()


 // 自定義名稱 'messsage:push'
 // this.$bus.$emit('message:push',message,status)
 // message(string): 傳入參數(內容)
 // status:(string): Alert樣式
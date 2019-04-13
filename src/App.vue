<template>
  <div id="app">
    <router-view msg="router-view的首頁"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  // created(){
  //   const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUS}/products`
    
  //   // console.log(process.env.VUE_APP_API,process.env.VUE_APP_CUS) 
  //   this.$http.get(api).then((response)=>{
  //     console.log(response.data)
  //   })
  // }
}
</script>

<style lang="scss">
  @import './assets/all';
</style>

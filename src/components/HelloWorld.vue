<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    signout(){
      const api = `${process.env.VUE_APP_API}/logout`
      const vm = this

      this.$http.post(api).then((response)=>{
        console.log(response.data)
        if(response.data.success){  
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!--  scoped 是把所有樣式封裝在此元件, 其他地方不能用 -->
<style scoped>  
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>    

<script>
import sidebar from './sidebar'
import Navbar from './Navbar'
import Alert from './AlertMessage'

export default {
  components:{
    Navbar,
    sidebar,
    Alert
  }
}
</script>
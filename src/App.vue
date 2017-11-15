<template>
  <div id="app" v-if='data_ok'>
    <header>
      <top-bar :seller = 'seller' class='header'></top-bar>
    </header>
    
    <section class="main">
      <router-view :seller='seller'></router-view>
    </section>
    <v-footer :deliveryPrice = 'seller.deliveryPrice' :minPrice='seller.minPrice'></v-footer>
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import router from './router/index'
import topBar from './components/topBar/topBar'
import vFooter from './components/footer/footer'
import shoppingCart from './components/shoppingCart/shoppingCart'
export default {
  name: 'app',
  data(){
    return {
      seller:null,
      data_ok:false
    }
  },
  components:{
    topBar,
    vFooter,
    shoppingCart
  },
  created(){
    this.$axios.get('./api/seller').then((res)=>{
      this.seller = res.data.data;
      this.data_ok = true;
    })
  }
}
</script>

<style lang='scss'>
#app {
  position:relative;
  height:100%;
  display: flex;
  flex-flow:column nowrap;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .main{
    height:100%;
    overflow:hidden;
  }
}
</style>

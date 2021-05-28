<template>
  <div>
    <div id="app">
      <Header class="header" v-show="$route.name !== 'Login' && $route.name !== 'Register' && $route.name !== 'Home'"></Header>
      <!--    <Header></Header>-->
      <router-view :key="$route.fullPath"/>
    </div>
  </div>

</template>

<script>
import Header from "./components/Header";
export default {
  components: {Header}
}

</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  min-width: 1200px;
  padding-left: calc(100vw - 100%);
}
.header{
  background: white;
  z-index: 999;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>

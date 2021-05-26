<template>
  <div>
    <div id="app">
      <Header v-show="$route.name !== 'Login' && $route.name !== 'Register' && $route.name !== 'Home'"></Header>
      <!--    <Header></Header>-->
      <router-view/>
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
</style>

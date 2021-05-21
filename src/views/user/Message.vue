<template>
  <div id="wrapper">
<!--    <Header></Header>-->
    <div class="message-container">
      <el-card class="message-content"></el-card>
    </div>
  </div>
</template>

<script>
// import Header from "../../components/Header";
export default {
  name: "Message",
  components: {
    // Header
  }
}
</script>

<style scoped>
.message-content{
  margin: 20px auto;
  width: 1500px;
  padding: 0;
  border-radius: 15px;
  border: 1px solid white;
}
</style>
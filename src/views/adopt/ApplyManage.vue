<template>
  <div>
<!--    <Header></Header>-->
    <el-card class="manage-container">
      <h2 style="margin-bottom: 20px">申请管理</h2>
      <el-tabs v-model="activeTab" @tab-click="clickTab">
        <!-- 我的申请-->
        <el-tab-pane label="我的申请" name="myApply">
          <MyApply ref="myApply"></MyApply>
        </el-tab-pane>
        <!-- 用户申请-->
        <el-tab-pane label="用户申请" name="otherApply">
          <ReceivedApply ref="otherApply"></ReceivedApply>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import Header from "../../components/Header";
import MyApply from "../../components/MyApply";
import ReceivedApply from "../../components/ReceivedApply";
import duplicate from "../../store/duplicate";
export default {
  ...duplicate,
  name: "ApplyManage",
  components: {
    // Header,
    MyApply,
    ReceivedApply
  },
  data() {
    return{
      activeTab: 'myApply',
    }
  },
  methods: {
    clickTab() {
      console.log(this.activeTab)
      if (this.activeTab === "myApply"){
        this.$refs.myApply.getMyApplyList();
      }else {
        this.$refs.otherApply.getOtherApplyList();
      }
    }
  }
}
</script>

<style scoped>
.manage-container{
  width: 1500px;
  margin: 20px auto 10px auto;
  border-radius: 15px;
  border: 1px solid white;
}
</style>
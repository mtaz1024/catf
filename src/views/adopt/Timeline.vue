<template>
  <div id="wrapper">
<!--    <Header></Header>-->
    <el-card class="time-container">
      <div class="timeline-content">
        <el-timeline>
          <el-timeline-item>
            <el-card>
              <el-form>
                <el-form-item>
                  <el-input type="text" placeholder="写点什么！"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="textarea" placeholder="写点什么！"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-button>提交</el-button>
              </el-form>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
// import Header from "../../components/Header";
export default {
  name: "Timeline",
  // components:{
  //   Header
  // }
}
</script>

<style scoped>
.time-container{
  width: 1500px;
  margin: 20px auto;
  padding: 0;
  border-radius: 15px;
  border: 1px solid white;
}
.timeline-content{
  width: 800px;
  margin: auto;
}
</style>
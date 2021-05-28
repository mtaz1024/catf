<template>
  <div id="wrapper">
    <div class="timeline-content">
      <el-timeline>
        <!-- 新建 -->
        <el-timeline-item>
          <el-card>
            <el-collapse>
              <el-collapse-item name="1">
                <template slot="title">
                  <i class="el-icon-circle-plus"> 点击记录</i>
                </template>
                <el-form :model="newEvent" ref="newEvent">
                  <el-form-item label="标题" prop="eventTitle" required>
                    <el-input v-model="newEvent.eventTitle" type="text" placeholder="写点什么！"></el-input>
                  </el-form-item>
                  <el-form-item label="内容" prop="eventContent">
                    <el-input v-model="newEvent.eventContent" type="textarea" placeholder="写点什么！" :autosize="{minRows:4,maxRows:8}"></el-input>
                  </el-form-item>
                  <el-button @click="submit" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold">提交</el-button>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-timeline-item>
        <!-- 过往的 -->
        <el-timeline-item v-for="(item, index) in eventList" :key="index" :timestamp="item.eventTime" placement="top">
          <el-card>
            <H4>{{ item.eventTitle }}</H4>
            <p class="c_break">{{ item.eventContent }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return{
      adoptId: 0,
      eventList: [],
      newEvent: {
        eventTitle: '',
        eventContent: '',
      }
    }
  },
  methods: {
    getAll(){
      this.$api.event.getAll({
        adoptId: this.adoptId
      }).then(res => {
        if (res.data.code === 200){
          this.eventList = res.data.data.reverse()
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(fail => {
        this.$message.error(fail)
      })
    },
    submit() {
      this.newEvent.adoptId = this.adoptId
      this.$refs.newEvent.validate(valid => {
        if (valid){
          this.$api.event.save(this.newEvent)
              .then(res => {
                if (res.data.code === 200){
                  this.$message.success("记录成功！")
                  this.$refs.newEvent.resetFields()
                  this.getAll()
                } else {
                  this.$message.error(res.data.message)
                }
              })
              .catch(fail => {
                this.$message.error(fail)
              })
        } else {
          this.$message.error("请正确填写标题！")
        }
      })

    }
  },
  mounted() {
    this.adoptId = this.$route.query.adoptId
    this.getAll()
  }
}
</script>

<style scoped>
.time-container{
  /*width: 1500px;*/
  /*margin: 20px auto;*/
  /*padding: 0;*/
  border-radius: 15px;
  border: 1px solid white;
}
.timeline-content{
  width: 800px;
  margin: 30px auto;
}
.el-card{
  border-radius: 15px;
  border: 1px solid white;
}
.c_break{
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
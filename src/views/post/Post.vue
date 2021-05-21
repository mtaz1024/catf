<template>
  <div id="wrapper">
<!--    <Header></Header>-->
    <div class="post-container">
      <div class="left-part">
        <el-card class="post-content">
          <div>
            <h2 style="margin-bottom: 40px">{{ post.postTitle }}</h2>
          </div>
          <div class="pic-content">
            <el-carousel height="300px" indicator-position="outside" arrow="always">
              <el-carousel-item v-for="item in urlList" :key="item">
                <el-image :src="item" fit="contain"
                          style="width: 600px; height: 300px"></el-image>
              </el-carousel-item>
            </el-carousel>
<!--            <el-image :src="post.catPic" style="width: 400px; height: 300px" fit="cover"></el-image>-->
          </div>
          <div class="info-content">
            <div>
              姓名:
              <span>{{ post.catName }}</span>
            </div>
            <div>
              种类:
              <span>{{ post.catType }}</span>
            </div>
            <div>
              年龄:
              <span>{{ post.catYear + " + " + post.catMonth }}</span>
            </div>
            <div>
              性别:
              <span>{{ post.catGender }}</span>
            </div>
            <div>
              绝育情况:
              <span>{{ post.catDesexing }}</span>
            </div>
            <div>
              疫苗情况:
              <span>{{ post.catVaccination }}</span>
            </div>
            <div>
              驱虫情况:
              <span>{{ post.catDeworming }}</span>
            </div>
            <div>
              健康情况: <span>{{ post.catHealth }}</span>
            </div>
            <div>
              介绍: <span>{{ post.catInfo }}</span>
            </div>
            <!-- 按钮 -->
            <div class="button" style="text-align: right; margin-top: 20px">
              <el-button @click="chat"  style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold">聊天</el-button>
              <el-button @click="adopt"  style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold" v-if="isApplying===0">领养</el-button>
              <el-button @click="adopt" disabled
                         style="background-color: black; border-color: black; color: #efc239;font-weight: bold" v-if="isApplying===1">已发送申请</el-button>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-part">
        <el-card class="poster-content">
          <div style="text-align: left">
            <div class="poster-avatar">
              <el-avatar :src="poster.avatar" :size="60" circle></el-avatar>
            </div>
            <div class="poster-info">
              <div>
                <span style="font-size: 24px">{{ poster.username }}</span>
              </div>
              <div>
                <span style="font-size: 18px">{{ (String)(post.releaseTime).substr(0,10) }}发布</span>
              </div>
            </div>
          </div>

        </el-card>
        <el-card class="relate-content">
          相关猫猫推荐
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
// import Header from "../../components/Header";
export default {
  name: "Post",
  components: {
    // Header
  },
  data() {
    return {
      postId: '',
      post: {},
      urlList: [],
      poster: {},
      isApplying: 0
    }
  },
  methods: {
    getPost() {
      var that = this
      this.$api.post.getForm({
        postId: that.postId,
        userId: that.$store.state.user.userId
      }).then(res => {
        if (res.data.code === 200){
          that.post = res.data.data.form;
          that.isApplying = res.data.data.applying;
          this.getPoster()
        }else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      }).catch(fail=>{
        this.$message({
          type: "error",
          message: fail
        })
      })
    },
    getPoster() {
      var that = this
      console.log("posterId:" + this.post.posterId)
      this.$api.profile.getProfile({
        userId: that.post.posterId
      }).then(res => {
        if (res.data.code === 200){
          that.poster = res.data.data
        }else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      }).catch(fail=>{
        this.$message({
          type: "error",
          message: fail
        })
      })
    },
    getImage(){
      var that = this
      this.$api.post.getImage({
        postId: this.postId
      }).then(res => {
        if (res.data.code === 200){
          console.log(res.data.data)
          that.urlList = res.data.data
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
    chat(){
      console.log("chat")
      this.$notify.error({
        title: '错误',
        message: '该功能暂未开放',
        position: "top-left"
      })
    },
    adopt() {
      console.log("adopt")
      var that = this
      this.$api.adopt.apply({
        postId: that.postId,
        posterId: that.post.posterId,
        userId: that.$store.state.user.userId
      })
      .then(res => {
        if (res.data.code === 200){
          this.$message({
            message: '申请成功！',
            type: 'success'
          })
          that.getPost()
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          })
        }
      })
      .catch(fail => {
        this.$message({
          message: fail,
          type: "error"
        })
      })
    }
  },
  mounted() {
    this.postId = this.$route.query.postId
    console.log("id为" + this.postId)
    this.getPost()
    this.getImage()
  }
}
</script>

<style scoped>
/*整体设计*/
.post-container{
  width: 1500px;
  margin: 20px auto;
}
.post-content, .poster-content, .relate-content{
  padding: 0;
  border-radius: 15px;
  border: 1px solid white;
}
.relate-content{
  margin-top: 20px;
}
.left-part{
  width: 1150px;
  display: inline-block;
  vertical-align: top;
  float: left;
}
.right-part{
  width: 330px;
  display: inline-block;
  vertical-align: top;
  float: right;
}
/*post设计*/
.pic-content{
  width: 600px;
  display: inline-block;
  float: left;
  vertical-align: top;
}
.info-content{
  width: 400px;
  display: inline-block;
  /*float: right;*/
  vertical-align: top;
  text-align: left;
  line-height: 34px;
  color: #505458;
}
.info-content span{
  float: right;
  font-weight: bold;
}

/*发布者信息*/
.poster-avatar{
  display: inline-block;
  vertical-align: middle;
  padding-right: 20px;
  /*margin-left: 10px;*/
  margin-right: 20px;
  border-right: #e8be3d 2px solid;
}
.poster-info{
  display: inline-block;
  vertical-align: middle;
  line-height: 24px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
</style>
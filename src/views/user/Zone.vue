<template>
  <div class="wrapper">
    <!-- 用户基本信息 -->
    <div class="zone-r">
      <div class="info-container">
        <el-avatar :src="user.avatar" :size="80"></el-avatar>
        <div class="username">{{ user.username }}</div>
        <div class="info" v-if="user.info !== null">{{ user.info }}</div>
<!--        <el-divider></el-divider>-->
        <div class="basic-info">
          <div class=" basic-con">{{ user.livingCon|getString("living") }}</div>
          <el-divider direction="vertical"></el-divider>
          <div class=" basic-con">{{ user.workCon |getString("work") }}</div>
          <el-divider direction="vertical"></el-divider>
          <div class=" basic-con">{{ user.catCon|getString("cat") }}</div>
        </div>
<!--        <el-divider></el-divider>-->
        <div class="join-date" v-if="user.joinDate!==null">{{ user.joinDate }} 加入</div>
        <div class="address" v-if="user.province!== null">来自 {{ user.province | getAddress( user.city, user.district )}}</div>
        </div>
    </div>
    <!-- 其他信息 -->
    <div class="zone-l">
      <div class="post-container">
        <div class="post-content" v-if="postList.length > 0">
          <div style="font-weight: bold; margin-bottom: 10px">相关帖子</div>
          <div class="post-item" v-for="(item, index) in postList" :key="index" @click="toPost(item.postId)">
            <div class="post-title">{{ item.postTitle }}</div>
            <el-image fit="cover" :src="item.catPic" style="width: 270px; height: 180px"></el-image>
            <el-divider class="post-divider" v-if="index!==postList.length-1"></el-divider>
          </div>
        </div>
        <div class="no-post-tip" v-if="postList.length === 0">
          暂时没有相关帖子
        </div>
      </div>
    </div>
    <!-- 动态 -->
    <div class="zone-c">
      <!-- 新建 -->
      <div class="create_container" v-if="isMe">
        <div class="create_content">
          <div class="title"></div>
          <div class="input">
            <el-form :model="newBlog" ref="newBlog">
<!--              <el-form-item prop="blogContent">-->
                <el-input type="textarea" v-model="newBlog.blogContent" :autosize="{ minRows: 4}"></el-input>
<!--              </el-form-item>-->
            </el-form>
          </div>
          <div class="func">
            <div class="submit">
              <el-button size="small" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold; font-size: 14px"
                         @click="submit">发布</el-button>
            </div>
            <div class="kind">
              <el-upload
                  class="upload-demo"
                  :limit=9
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :file-list="fileList"
                  list-type="picture">
                <div class="s_txt1 picture"><i class="el-icon-picture icon"></i><span class="add_picture">图片</span></div>
                <!--              <el-button size="small" type="primary"  style="background-color: black; border-color: black; color: #efc239;font-weight: bold">点击上传图片</el-button>-->
                <!--                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>-->
              </el-upload>

            </div>
            <div></div>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="blogs" v-if="blogList.length > 0">
        <BlogCard v-for="(item, index) in blogList" :key="index"
                  :user="user" :blog="item" :is-me="isMe"></BlogCard>
      </div>
      <!-- 没有动态 -->
      <div class="no-result-tip" v-if="blogList.length === 0">
        <div class="no-result-tip-warning">
          暂时没有动态...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from "../../components/BlogCard";
import {CodeToText} from "element-china-area-data";
import duplicate from "../../store/duplicate";
export default {
  name: "Zone",
  components: {
    BlogCard
  },
  data() {
    return {
      userId: 0,
      isMe: false,
      user: {},
      blogList: [],
      postList: [],
      newBlog: {
        blogContent: '',
      },
      uploadUrl: "http://localhost:8081/api/image/uploadImage",
      fileList: [],
      fileUrlList: []
    }
  },
  methods: {
    getProfile(userId) {
      this.$api.profile.getProfile({
        userId: userId
      }).then(res => {
        if (res.data.code === 200){
          this.user = res.data.data
        } else {
          this.$message.error(res.data.message())
        }
      })
    },
    getAll() {
      this.$api.blog.getAll({
        userId: this.userId
      })
      .then(res => {
        if (res.data.code === 200){
          let allBlogList = res.data.data.reverse()
          if (!this.isMe){
            allBlogList = allBlogList.filter(o => o.hidden===0)
          }
          console.log("dd")
          this.blogList = allBlogList
          console.log(this.blogList)
          console.log("dd")
        }
      })
    },
    getPost(){
      this.$api.post.getTopPost({
        userId: this.userId
      })
      .then(res => {
        if (res.data.code === 200){
          this.postList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
      .catch(fail => {
        this.$message.error(fail)
      })
    },
    submit() {
      console.log("fileUrlList:")
      console.log(this.fileUrlList)
      this.newBlog.userId = this.$store.state.user.userId
      this.newBlog.urlList = this.fileUrlList
      this.$api.blog.save(this.newBlog)
      .then(res => {
        if (res.data.code === 200){
          this.$message.success("发布成功")
          this.getAll()
          this.fileUrlList = []
          this.fileList = []
          // this.$refs.newBlog.resetFields()
          this.newBlog.blogContent = ''
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log("remove")
      var i = this.fileUrlList.indexOf(file.response.data)
      this.fileUrlList.splice(i, 1)
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      this.fileUrlList.push(response.data)
    },
    handleError(err, file, fileList){
      this.$message.error(err)
      console.log(file)
      console.log(fileList)
    },
    toPost(postId){
      this.$router.push({
        path: '/post',
        query: {
          postId: postId
        }
      })
    }
  },
  filters: {
    getAddress(province, city, district){
      if (CodeToText[province] === "全部"){
        return CodeToText[province]
      }
      if (CodeToText[city] === "全部"){
        return CodeToText[province] + " " +CodeToText[city]
      }
      return CodeToText[province] + " " +CodeToText[city] + " " + CodeToText[district]
    },
    getString(number, select) {
      if (select === "living"){
        return duplicate.data().livingSelect.find(o => o.value === number).label
      } else if(select === "work"){
        return duplicate.data().workSelect.find(o => o.value === number).label
      } else if(select === "cat"){
        return duplicate.data().catSelect.find(o => o.value === number).label
      }

    },
  },
  mounted() {
    this.userId = this.$route.query.userId;
    this.isMe = (parseInt(this.userId) === this.$store.state.user.userId);
    console.log(this.isMe)
    this.getProfile(this.userId)
    this.getAll()
    this.getPost()
  }
}
</script>

<style scoped>
/*整体*/
.wrapper{
  width: 1328px;
  margin: auto;
}
/*右侧*/
.zone-r{
  width: 352px;
  float: right;
  position: -webkit-sticky;
  position: sticky;
  top: 76px;
}
.info-container{
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  padding: 10px;
}
.username{
  font-size: 24px;
  font-weight: bold;
}
.basic-info{
  /*height: 20px;*/
  line-height: 30px;
  text-align: left;
}
.basic-info li{
  list-style: none;
  float:left;
}
.el-divider{
  margin: 0;
  width: 3px;
  /*height: 20px;*/
}
.basic-con{
  text-align: center;
  display: inline-block;
  width: 108px;
  font-weight: bold;
  font-size: 14px;
  color: #efc239;
}

.info{
  text-align: center;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: grey;
}
.join-date, .address{
  margin-top: 10px;
  font-size: 13px;
  color: grey;
}
/*左侧*/
.zone-l{
  float: left;
  width: 352px;
  position: -webkit-sticky;
  position: sticky;
  top: 76px;
}
.post-container{
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  padding: 10px;
}
.post-item :hover{
  cursor: pointer;
}
.post-title{
  text-align: left;
  /*font-size: 18px;*/
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 30px;
  color: grey;
}
.post-divider{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 330px;
  height: 2px;
}
.no-post-tip{
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: bold;
}
/*中间*/
.zone-c{
  width: 602px;
  /*float: left;*/
  margin: auto;
}
.create_container{
  /*min-height: 165px;*/
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  margin-top: 15px;
}
.create_content{
  padding: 15px 10px 10px;
}
.func{
  margin-top: 10px;
  height: 34px;
}
.submit{
  float: right;
  /*padding-top: 5px;*/
}
.kind{
  float: left;
  /*height: 24px;*/
  padding-top: 6px;
}
.upload-demo{
  /*float: left;*/
  position: absolute;
}
.picture{
  /*float: left;*/
}
.add_picture{
  position: relative;
  bottom: 4px;
  left: 4px;
}
.s_txt1{
  font-size: 14px;
  line-height: 24px;
}
.icon{
  font-size: 24px;
}
.no-result-tip{
  /*width: 500px;*/
  text-align: center;
  margin: 150px auto;
}
.no-result-tip-warning{
  /*text-align:center;*/
  position: relative;
  right: 3px;
  color: #2c3e50;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 0;
}
</style>

<style>
.el-upload-list--picture .el-upload-list__item {
  overflow: hidden;
  z-index: 999;
}
</style>
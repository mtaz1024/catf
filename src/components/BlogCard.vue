<template>
  <div class="blog-card">
    <div  v-if="isMe">
      <div class="card-func">
        <el-popover
            placement="bottom"
            width="100"
            trigger="hover">
          <div>
            <div class="select hover" @click="deleteHandler">删除</div>
            <div class="select hover" @click="hiddenHandler" v-if="blog.hidden===0">设为仅自己可见</div>
          </div>

          <div class="hover" slot="reference"><i class="el-icon-arrow-down"></i></div>
        </el-popover>

      </div>
      <span style="float: right; display: inline-block; font-size: 12px; margin-right: 5px; color: grey"
            v-if="blog.hidden === 1">仅自己可见</span>
    </div>

    <div class="card-avatar">
      <el-avatar class="avatar" :src="user.avatar" :size="50"></el-avatar>
    </div>
    <div class="card-detail">
      <!-- 用户名 -->
      <div class="card-info f14 fb">
        <span class="username">{{ user.username }}</span>
      </div>
      <!-- 时间 -->
      <div class="card-from s_txt2">
        <span class="time">{{ blog.blogTime }}</span>
      </div>
      <!-- 文本 -->
      <div class="card-text f14">
        <span>{{ blog.blogContent }}</span>
      </div>
      <!-- 图片 -->
      <div class="card-media">
        <div v-if="blog.urlList.length===1" class="single-pic hover" @click="view(blog.urlList[0])">
          <el-image :src="blog.urlList[0]" fit="cover"></el-image>
        </div>
        <ul v-if="blog.urlList.length>=2" class="pic-list">
          <li v-for="(eachUrl,index) in blog.urlList" @click="view(eachUrl)" :key="index" class="hover">
            <el-image :src=eachUrl alt="图片" fit="cover" ></el-image>
          </li>
        </ul>
      </div>
    </div>
  <el-dialog :visible.sync="pictureVisible" style="text-align: center">
    <el-image :src="openUrl"></el-image>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    isMe: {
      type: Boolean
    },
    user: {},
    blog: {}
  },
  data() {
    return {
      pictureVisible: false,
      openUrl: '',
    }
  },
  methods: {
    view(url){
      console.log("打开了图片！")
      this.openUrl = url
      this.pictureVisible = true
    },
    deleteHandler() {
      this.$confirm('此操作将永久删除该动态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.blog.deleteBlog({
          blogId: this.blog.blogId
        }).then(res => {
          if (res.data.code === 200){
            this.$message.success("已成功删除！")
            this.$parent.getAll()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    hiddenHandler() {
      var that = this
      this.$confirm('转为仅自己可见后无法再次转为公开, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.blog.hidden({
          blogId: this.blog.blogId
        }).then(res => {
          if (res.data.code === 200){
            this.$message.success("已成功转为仅自己可见！")
            that.$parent.getAll()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消！'
        });
      });

    }

  }
}
</script>

<style scoped>
.blog-card{
  width: 560px;
  text-align: left;
  padding: 20px 20px 4px;
  background: #fff;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  margin: 10px auto 10px;
}

/*card-func*/
.card-func{
  float: right;
}

/*card-avatar*/
.card-avatar{
  float: left;
  width: 50px;
}
/*card-detail*/
.card-detail{
  margin-left: 60px;
}
.card-info{
  margin: 0 0 3px;
  padding: 5px 0 0;
}
.card-from{
  margin-bottom: 2px;
}
.card-text{
  padding-top: 2px;
  margin-bottom: 2px;
  overflow: hidden;
  line-height: 23px;
  word-wrap: break-word;
}
.s_txt2{
  color: #808080;
  text-decoration: none;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  font-size: 12px;
}
.f14{
  font-size: 14px;
}
.fb{
  font-weight: bold;
}

/*card-image*/
.pic-list{
  width: 342px;
  overflow: hidden;
}
.pic-list li{
  float: left;
  list-style: none;
  margin-right: 4px;
}
ul{
  padding-left: 0;
  margin-top: 0;
}
.pic-list .el-image{
  width: 110px;
  height: 110px;
}
.single-pic{
  max-height: 223px;
  overflow: hidden;
  text-align: left;
  margin-bottom: 20px;
}
.single-pic .el-image{
  width: 167px;
  vertical-align: top;
}
.hover:hover{
  cursor: pointer;
}
.select{
  padding-top: 5px;
  padding-bottom: 5px;
}
.select:hover{
  font-weight: bold;
}
</style>
<style>
.el-popover {
  min-width: 10px;
  padding: 10px 10px 10px 10px;
}
</style>
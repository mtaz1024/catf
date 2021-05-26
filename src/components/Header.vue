<template>
  <div class="wrapper">
    <el-card class="header">
      <!-- LOGO -->
      <el-col :span="8">
        <el-image
            style="width: 60px; height: 60px"
            :src="logoUrl" @click="urlHandler('/index')"></el-image>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="8">
        <div style="margin-top: 10px;">
          <el-input placeholder="请输入搜索内容" v-model="searchWord" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-col>
      <!-- 用户设置 -->
      <el-col :span="8" style="float: right">
        <!-- 消息 -->
        <el-badge :value="12" class="item" style="position: relative; right: 40px; bottom: 15px">
          <el-button size="mini" class="el-icon-bell" @click="message"
                     style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold;">
          </el-button>
        </el-badge>
        <!-- 发布按钮 -->
        <el-button size="mini" class="el-icon-circle-plus-outline" @click="release"
                   style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold;
                   position: relative;bottom: 15px;right: 15px">
        </el-button>
        <!-- 头像&其他功能入口 -->
        <el-popover
            placement="top-start"
            width="60"
            trigger="click">
          <div style="margin: 8px 3px 8px 3px; text-align: center; line-height: 20px; font-size: 16px; letter-spacing: 3px">
            <ul class="manage-list" v-for="(item, index) in urlList" :key="index" @click="urlHandler(item.url)">
              <el-icon :class=item.icon style="margin-right: 5px"></el-icon>
              {{ item.value }}
            </ul>
          </div>
            <!-- 通过 slot="reference" 指明这是出发popover的元素 -->
            <el-avatar slot="reference" :size="50" :src=avatarUrl @error="errorHandler"
                       style="position: relative; top: 5px" ref="popover">
              <el-avatar :size="50">User</el-avatar> <!-- 用户未设置头像时显示 -->
            </el-avatar>
        </el-popover>
        <!-- 登出按钮 -->
        <div class="logout-button" @click="logout">Logout</div>
      </el-col>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      logoUrl: require('../assets/cat-init.jpg'),
      avatarUrl: this.$store.state.user.avatar,
      urlList: [
        {
          value: '个人信息',
          url: '/profile',
          icon: 'el-icon-user-solid'
        },
        {
          value: '申请信息',
          url: '/applyManage',
          icon: 'el-icon-s-order'
        },
        {
          value: '发布管理',
          url: '/postManage',
          icon: 'el-icon-s-tools'
        },
        {
          value: '领养中心',
          url: '/adoptManage',
          icon: 'el-icon-s-claim'
        }
      ],
      searchWord: ''
    }
  },
  methods: {
    errorHandler() {
      return true;
    },
    urlHandler(url){
      this.$router.push(url)
    },
    logout() {
      this.$store.commit('logout')
      this.$router.replace("/login")
      // this.$api.user.logout().then(res => {
      //   if (res.data.code === 200){
      //     this.$store.commit('logout')
      //     this.$router.replace("/login")
      //   }
      // })
    },
    search(){
      console.log("输入了：" + this.searchWord)
      this.$message({
        type: "error",
        message: '该功能暂未开放'
      })
    },
    release(){
      console.log("release")
      this.$router.push('/create')
    },
    message() {
      this.$message({
        type: "error",
        message: '该功能暂未开放'
      })
    }
  }
}
</script>

<style scoped>
.header{
  margin: 10px auto;
  width: 1500px;
  height: 60px;
  border-radius: 15px;
  border: 1px solid white;
}
>>>.el-card__body{
  padding: 0;
}
.logout-button{
  height: 20px;
  display: inline-block;
  cursor: pointer;
  font-weight: bolder;
  position: relative;
  bottom: 13px;
  left: 13px;
}
.logout-button:hover{
  color: #efc239;
}
.manage-list{
  margin: 0;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
}
.manage-list:hover{
  font-weight: bold;
}
</style>
<style>
/*.el-popover{*/
/*  min-width: 50px;*/
/*  padding: 0;*/
/*}*/
</style>
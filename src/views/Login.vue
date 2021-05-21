<template>
  <div id="wrapper">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login-title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return{
      loginForm: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      console.log("login...")
      var that = this
      this.$api.user.login({
        username: that.loginForm.username,
        password: that.loginForm.password
      }).then(response => {
        if (response.data.code === 200){
          console.log(response.data.data)
          that.$store.commit("login", response.data.data)
          var path = this.$route.query.redirect // 经过拦截器判断之后，获得将要去的地址
          this.$router.replace({
            path: path === '/' || path === undefined ? '/index' : path
          })
          // that.$router.replace({
          //   path: '/index'
          // })
        } else if (response.data.code === 400){
          this.$message({
            type: "error",
            message: '用户名或密码错误！'
          })
        }
      }).catch(fail => {
        console.log(fail)
        this.$message({
          type: "error",
          message: '用户名或密码错误！'
        })
      })
    }
  }
}
</script>

<style scoped>
#wrapper{
  background: url("../assets/login-background.jpg") no-repeat;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>
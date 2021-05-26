<template>
  <div id="wrapper">
    <el-form class="login-container" label-position="left" label-width="0px"
             ref="loginForm" :rules="fieldRules" :model="loginForm">
      <h2 class="login-title">系统登录</h2>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width:30%;background-color: black; border-color: black; color: #efc239;font-weight: bold; font-size: 16px"
                   @click.native.prevent="reset" round>重 置</el-button>
        <el-button type="primary" style="width: 30%;background-color: #efc239; border-color: #efc239; color: black; font-weight: bold; font-size: 16px"
                   v-on:click="login" :loading="loading" round>登 录</el-button>
      </el-form-item>
      <el-form-item class="register-item" style="margin: 0 0 0 2px;">
        <el-checkbox class="login_remember" v-model="checked"
                     label-position="left"><span style="color: #505458">记住密码</span>
        </el-checkbox>
        <span style="color: #505458;margin-left: 130px">还没有账号?</span>
        <router-link to="/register">
          <el-button type="text">立即注册</el-button>
        </router-link>
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
      },
      fieldRules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: ['blur', 'change'] }
        ]
      },
      loading: false,
      checked: false
    }
  },
  methods: {
    login() {
      console.log("login...")
      var that = this
      this.$refs.loginForm.validate(valid => {
        if (valid){
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
        } else {
          this.$message.error("请填写完整的登录信息！")
        }
      })

    },
    reset() {
      this.$refs.loginForm.resetFields()
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
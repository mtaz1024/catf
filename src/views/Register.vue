<template>
  <div id="wrapper">
    <el-form class="register-container" label-position="left" label-width="0px">
      <h3 class="register-title">系统注册</h3>
      <el-form-item>
        <el-input type="text" v-model="registerForm.username"
                  auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="registerForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return{
      registerForm: {}
    }
  },
  methods: {
    register() {
      var that = this
      this.$api.user.register(that.registerForm)
      .then(res => {
        if (res.data.code === 200){
          this.$message({
            type: "success",
            message: '注册成功'
          })
        } else {
          this.$message({
            type: "error",
            message: 'register error'
          })
        }
      })
    }
  },
}
</script>

<style scoped>
#wrapper{
  background: url("../assets/login-background.jpg") no-repeat;
  /*background-position: center;*/
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.register-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register-title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
<template>
  <div id="wrapper">
    <el-form class="register-container" label-position="left" label-width="0px"
             :model="registerForm" :rules="fieldRules" ref="registerForm">
      <h2 class="register-title">系统注册</h2>
      <el-form-item prop="username">
        <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" v-model="registerForm.password2"  auto-complete="off" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input type="text" v-model="registerForm.phone"  auto-complete="off" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="registerForm.email"  auto-complete="off" placeholder="邮箱号"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width:30%;background-color: black; border-color: black; color: #efc239;font-weight: bold; font-size: 16px"
                   @click.native.prevent="reset" round>重 置</el-button>
        <el-button type="primary" style="width: 30%;background-color: #efc239; border-color: #efc239; color: black; font-weight: bold; font-size: 16px"
                   v-on:click="register" :loading="loading" round>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (value !== '') {
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('邮箱不合法'));
          }
        }
        callback();
      }
    }
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (value !== '') {
          var reg=/^1[3456789]\d{9}$/;
          if(!reg.test(value)){
            callback(new Error('手机号不合法'));
          }
        }
        callback();
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.password2 !== '') {
          this.$refs.registerForm.validateField('password2');
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        console.log(value)
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password){
        console.log(value)
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return{
      registerForm: {
        username: '',
        password: '',
        password2: '',
        phone: '',
        email: ''
      },
      password2: '',
      fieldRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            // message: '请输入密码',
            trigger: ['blur', 'change']
          }
        ],
        password2: [
          {
            required: true,
            validator: validatePass2,
            // message: '请再次填写密码',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            required: true,
            validator: validateMobilePhone,
            // message: '请输入正确完整的手机号',
            trigger: ['blur', 'change']
          }
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            // message: '请输入正确完整的邮箱号',
            trigger: ['blur', 'change']
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          delete this.registerForm.password2
          let userInfo = this.registerForm
          this.$api.user.register(userInfo)
          .then(res => {
            if (res.data.code === 200){
              this.$message.success("注册成功，正在跳转登录页！")
              this.$router.push("/login")
            } else {
              this.$message.error(res.data.message)
            }
          })
          .catch(fail => {
            console.log(fail)}
          )
        } else {
          this.$message.error("请正确填写注册信息！")
        }
      })
    },
    reset() {
      this.$refs.registerForm.resetFields();
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
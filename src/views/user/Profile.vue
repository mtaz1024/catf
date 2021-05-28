<template>
  <div id="wrapper">
      <el-card class="profile-container" >
        <H2  style="margin-bottom: 20px">个人信息</H2>
        <div>
          <el-upload
              class="avatar-uploader"
              :action=uploadUrl
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <el-avatar v-if="userProfile.avatar" :size="100" :src=userProfile.avatar></el-avatar>
            <el-avatar v-else :size="100" class="el-icon-plus avatar-uploader-icon">点击上传</el-avatar>
          </el-upload>
          <div style="font-size: 12px;color: grey">点击头像可进行修改</div>
        </div>
        <el-card class="info-container" shadow="never">
          <el-form :model="userProfile" :rules="fieldRules" ref="userProfile"
                   label-position="right" label-width="70px">
            <el-form-item label="用户ID" prop="userId">
              <el-input type="text" v-model="userProfile.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="注册日期" prop="joinDate">
              <el-input type="text" v-model="userProfile.joinDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input type="text" v-model="userProfile.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="userProfile.username" :disabled="readMode"></el-input>
            </el-form-item>
            <el-form-item label="个人介绍" prop="info">
              <el-input type="textarea" v-model="userProfile.info" :disabled="readMode"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="userProfile.password" :disabled="readMode"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userProfile.email" :disabled="readMode" ></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="more-info-container" shadow="never">
          <el-form v-model="userProfile" label-position="right" label-width="70px">
            <el-form-item label="真实姓名" prop="realName">
              <el-input type="text" v-model="userProfile.realName" disabled></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="identity">
              <el-input type="text" v-model="userProfile.identity" disabled></el-input>
            </el-form-item>
            <el-form-item label="微博" prop="weibo">
              <el-input type="text" v-model="userProfile.weibo" disabled></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
<!--              <el-input type="text" v-model="userProfile.address" :disabled="readMode"></el-input>-->
              <el-cascader size="large" :options="option" :disabled="addressReadMode"
                           v-model="selectedOptions" @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="居住情况" prop="livingCon">
              <el-select v-model="userProfile.livingCon" placeholder="请选择" :disabled="readMode">
                <el-option v-for="item in livingSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作情况" prop="workCon">
              <el-select v-model="userProfile.workCon" placeholder="请选择" :disabled="readMode">
                <el-option v-for="item in workSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="养猫情况" prop="catCon">
              <el-select v-model="userProfile.catCon" placeholder="请选择" :disabled="readMode">
                <el-option v-for="item in catSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
        <div class="change-tool">
          <el-button v-if="readMode" @click="change"  type="info" style="background-color: black; border-color: black; color: #efc239;font-weight: bold">修改信息</el-button>
          <el-button v-if="!readMode" @click="cancel"  type="success" style="background-color: black; border-color: black; color: #efc239;font-weight: bold">取消修改</el-button>
          <el-button v-if="!readMode" @click="submit"  type="success" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold">提交信息</el-button>
        </div>
      </el-card>

    </div>
<!--  </div>-->
</template>

<script>
import duplicate from "../../store/duplicate";
import { regionDataPlus } from 'element-china-area-data'
export default {
  ...duplicate,
  name: "Profile",
  components: {
    // Header
  },
  data () {
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
    return {
      userId: this.$store.state.user.userId,
      livingSelect: duplicate.data().livingSelect,
      workSelect: duplicate.data().workSelect,
      catSelect: duplicate.data().catSelect,
      userProfile: {},
      option: regionDataPlus,
      selectedOptions: [],
      readMode: true,
      addressReadMode: false,
      uploadUrl: "http://localhost:8081/api/profile/avatar/save?userId=" + this.$store.state.user.userId,
      fieldRules: {
        email: [
          {
            // required: true,
            validator: validateEmail,
            // message: '请输入正确完整的邮箱号',
            trigger: ['blur', 'change']
          }
        ]
      },

    }
  },
  methods: {
    getProfile(){
      var that = this
      this.$api.profile.getProfile({
        userId: this.$store.state.user.userId
      }).then(res => {
        if (res.data.code === 200){
          that.userProfile = res.data.data
          that.userProfile.joinDate = that.userProfile.joinDate.toString().substr(0, 10)
          console.log(that.userProfile.province)
          console.log(that.userProfile.city)
          console.log(that.userProfile.district)
          that.selectedOptions.push(that.userProfile.province)
          if (that.userProfile.province !==""){
            that.selectedOptions.push(that.userProfile.city)
            if (that.userProfile.city !== ""){
              that.selectedOptions.push(that.userProfile.district)
            }
          }
          console.log(that.selectedOptions)
          that.addressReadMode = true
          that.$store.commit("login", res.data.data)
          console.log(res.data)
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      }).catch(fail => {
        this.$message({
          type: "error",
          message: fail
        })
      })
    },
    change() {
      this.readMode = false
      this.addressReadMode = false
    },
    submit() {
      this.readMode = true;
      this.addressReadMode = true
      var that = this
      this.$api.profile.saveProfile(that.userProfile)
      .then(res => {
        if (res.data.code === 200){
          this.$message({
            type: "success",
            message: "信息修改成功！"
          })
        } else {
          this.$message({
            type: "error",
            message: "信息修改失败。"
          })
        }
      }).catch(fail => {
        this.$message({
          type: "error",
          message: fail
        })
      })
    },
    cancel(){
      this.getProfile()
      this.readMode = true
      this.addressReadMode = true
    },
    handleAvatarSuccess(res, file) {
      this.userProfile.avatar = URL.createObjectURL(file.raw);
      this.getProfile()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleChange(value) {
      console.log(value)
      this.userProfile.province = this.selectedOptions[0]
      if (this.userProfile.province === undefined){
        this.userProfile.province = ''
      }
      this.userProfile.city = this.selectedOptions[1]
      if (this.userProfile.city === undefined){
        this.userProfile.city = ''
      }
      this.userProfile.district = this.selectedOptions[2]
      if (this.userProfile.district === undefined){
        this.userProfile.district = ''
      }
    }
  },
  filters: {
    getTime(datetime){
      return datetime.toString().substr(0, 10)
    }
  },
  mounted() {
    console.log("用户ID：" + this.$store.state.user.userId)
    console.log("用户名：" + this.$store.state.user.username)
    this.getProfile()
  }
}
</script>

<style scoped>
.profile-container{
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  margin: 15px auto;
  width: 1500px;
}
.change-tool{
  /*text-align: right;*/
  width: 1200px;
  margin: auto;
}
.info-container, .more-info-container{
  display: inline-block;
  width: 600px;
  border: none;
  vertical-align: top;
  text-align: left;
}
.info-container>>>.el-card__body, .more-info-container>>>.el-card__body{
  margin: auto 60px;
  /*width: 400px;*/
}
</style>

<style>
.el-popover {
  min-width: 10px;
  padding: 10px 10px 10px 10px;
}
</style>
<template>
  <div id="wrapper">
<!--    <Header></Header>-->
<!--    <div class="profile-container">-->
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
          <el-form v-model="userProfile" label-position="right" label-width="70px">
            <el-form-item label="用户ID">
              <el-input type="text" v-model="userProfile.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="注册日期">
              <el-input type="text" v-model="userProfile.joinDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input type="text" v-model="userProfile.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input type="text" v-model="userProfile.username" :disabled="read_mode"></el-input>
            </el-form-item>
            <el-form-item label="个人介绍">
              <el-input type="text" v-model="userProfile.info" :disabled="read_mode"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="text" v-model="userProfile.password" :disabled="read_mode"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input type="text" v-model="userProfile.email" :disabled="read_mode"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="more-info-container" shadow="never">
          <el-form v-model="userProfile" label-position="right" label-width="70px">
            <el-form-item label="真实姓名">
              <el-input type="text" v-model="userProfile.realName" disabled></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input type="text" v-model="userProfile.identity" disabled></el-input>
            </el-form-item>
            <el-form-item label="微博">
              <el-input type="text" v-model="userProfile.weibo" disabled></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="text" v-model="userProfile.address" :disabled="read_mode"></el-input>
            </el-form-item>
            <el-form-item label="居住情况">
              <!--            <el-input type="text" v-model="userProfile.living_con" disabled></el-input>-->
              <el-select v-model="userProfile.livingCon" placeholder="请选择" :disabled="read_mode">
                <el-option v-for="item in livingSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作情况">
              <!--            <el-input type="text" v-model="userProfile.work_con" disabled></el-input>-->
              <el-select v-model="userProfile.workCon" placeholder="请选择" :disabled="read_mode">
                <el-option v-for="item in workSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="养猫情况">
              <!--            <el-input type="text" v-model="userProfile.cat_con" disabled></el-input>-->
              <el-select v-model="userProfile.catCon" placeholder="请选择" :disabled="read_mode">
                <el-option v-for="item in catSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
        <div class="change-tool">
          <el-button v-if="read_mode" @click="change"  type="info" style="background-color: black; border-color: black; color: #efc239;font-weight: bold">修改信息</el-button>
          <el-button v-if="!read_mode" @click="submit"  type="success" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold">提交信息</el-button>
        </div>
      </el-card>

    </div>
<!--  </div>-->
</template>

<script>
import duplicate from "../../store/duplicate";

// import Header from "../../components/Header";

export default {
  ...duplicate,
  name: "Profile",
  components: {
    // Header
  },
  data () {
    return {
      userId: this.$store.state.user.userId,
      livingSelect: duplicate.data().livingSelect,
      workSelect: duplicate.data().workSelect,
      catSelect: duplicate.data().catSelect,
      userProfile: {},
      read_mode: true,
      uploadUrl: "http://localhost:8081/api/profile/avatar/save?userId=" + this.$store.state.user.userId
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
      this.read_mode = false;
    },
    submit() {
      this.read_mode = true;
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
  border: 1px solid white;
  margin: 20px auto;
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
<template>
  <div id="wrapper">
<!--    <Header></Header>-->
    <div class="create-container">
      <el-card class="create-content">
        <h2 style="margin-bottom: 40px">创建领养贴</h2>
        <div style="margin: auto 200px">
          <el-form v-model="postForm" label-position="right" label-width="100px">
            <div class="left-part">
            <el-form-item label="标题">
              <el-input type="text" v-model="postForm.postTitle"
                        maxlength="20"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="猫咪名字">
              <el-input type="text" v-model="postForm.catName"
                        maxlength="20"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="猫咪描述">
              <el-input type="textarea" v-model="postForm.catInfo"
                        :autosize="{ minRows: 4}"
                        maxlength="250"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
              <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  list-type="picture">
                <el-button size="small" type="primary"  style="background-color: black; border-color: black; color: #efc239;font-weight: bold">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
              </el-upload>
            </el-form-item>

            </div>
            <div class="right-part">
            <el-form-item label="猫咪种类">
              <el-select v-model="postForm.catType">
                <el-option v-for="item in typeSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="猫咪年龄1">
              <el-select v-model="postForm.catMonth">
                <el-option v-for="item in monthSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="猫咪年龄2">
              <el-select v-model="postForm.catYear">
                <el-option v-for="item in yearSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="猫咪性别">
              <el-select v-model="postForm.catGender">
                <el-option v-for="item in genderSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="绝育情况">
              <el-select v-model="postForm.catDesexing">
                <el-option v-for="item in desexingSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="疫苗情况">
              <el-select v-model="postForm.catVaccination">
                <el-option v-for="item in vaccinationSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="驱虫情况">
              <el-select v-model="postForm.catDeworming">
                <el-option v-for="item in dewormingSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="健康情况">
              <el-select v-model="postForm.catHealth">
                <el-option v-for="item in healthSelect" :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-form>
        </div>
        <div style="clear: both; margin: auto">
          <el-button type="button" @click="submit" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold;">提交</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// import Header from "../../components/Header";
import duplicate from "../../store/duplicate";
export default {
  ...duplicate,
  name: "Create",
  components: {
    // Header
  },
  data () {
    return {
      uploadUrl: "http://localhost:8081/api/post/image/upload",
      fileList: [],
      fileUrlList: [],
      postForm: {
        postTitle: '',
        catType: 1,
        catMonth: 1,
        catYear: 1,
        catGender: 1,
        catDesexing: 1,
        catVaccination: 1,
        catDeworming: 1,
        catHealth: 1,
        catName: '',
        catInfo: '',
        catPic: ''
      },
      typeSelect: duplicate.data().typeSelect,
      monthSelect: duplicate.data().monthSelect,
      yearSelect: duplicate.data().yearSelect,
      genderSelect: duplicate.data().genderSelect,
      desexingSelect: duplicate.data().desexingSelect,
      vaccinationSelect: duplicate.data().vaccinationSelect,
      dewormingSelect: duplicate.data().dewormingSelect,
      healthSelect: duplicate.data().healthSelect,
    }
  },
  methods: {
    submit() {
      console.log("fileUrlList:")
      console.log(this.fileUrlList)
      this.postForm.posterId = this.$store.state.user.userId
      var that = this
      this.$api.post.createForm(that.postForm)
      .then(res => {
        if (res.data.code === 200){
          this.$message({
            type: "success",
            message: '提交成功'
          })
          var postId = res.data.data.postId
          that.submitImage(postId)
        }else {
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
    submitImage(postId){
      console.log(this.fileUrlList)
      var that = this
      this.$api.post.createImage(
          that.fileUrlList,
          {
            postId: postId
          }
      )
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
    }
  },
}
</script>

<style scoped>
.create-content{
  margin: 20px auto;
  width: 1500px;
  padding: 0;
  border-radius: 15px;
  border: 1px solid white;
}
.left-part, .right-part{
  display: inline-block;
  width: 500px;
  vertical-align: top;
}
.left-part{
  float: left;
}
.right-part{
  float: right;
}
</style>
<template>
  <div>
    <div>
      <el-form v-model="MyPostForm" label-position="right" label-width="100px" :disabled="MyReadMode">
        <div class="left-part">
          <el-form-item label="标题">
            <el-input type="text" v-model="MyPostForm.postTitle"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="猫咪名字">
            <el-input type="text" v-model="MyPostForm.catName"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="猫咪描述">
            <el-input type="textarea" v-model="MyPostForm.catInfo"
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
            <el-select v-model="MyPostForm.catType">
              <el-option v-for="item in typeSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="猫咪年龄1">
            <el-select v-model="MyPostForm.catMonth">
              <el-option v-for="item in monthSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="猫咪年龄2">
            <el-select v-model="MyPostForm.catYear">
              <el-option v-for="item in yearSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="猫咪性别">
            <el-select v-model="MyPostForm.catGender">
              <el-option v-for="item in genderSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绝育情况">
            <el-select v-model="MyPostForm.catDesexing">
              <el-option v-for="item in desexingSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="疫苗情况">
            <el-select v-model="MyPostForm.catVaccination">
              <el-option v-for="item in vaccinationSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驱虫情况">
            <el-select v-model="MyPostForm.catDeworming">
              <el-option v-for="item in dewormingSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="健康情况">
            <el-select v-model="MyPostForm.catHealth">
              <el-option v-for="item in healthSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="clear: both; margin: auto; text-align: center">
      <el-button v-if="MyReadMode" type="button" size="small" @click="edit" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold;">编辑</el-button>
      <el-button v-if="!MyReadMode" type="button" size="small" @click="submit" style="background-color: black ;border-color: black; color: #efc239; font-weight: bold;">提交</el-button>
    </div>
  </div>
</template>

<script>
import duplicate from "../store/duplicate";

export default {
  props: {
    postForm: Object,
  },
  ...duplicate,
  name: "PostInfo",
  data() {
    return {
      MyPostForm: {},
      MyReadMode: true,
      uploadUrl: "http://localhost:8081/api/post/image/upload",
      fileList: [],
      fileUrlList: [],
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
    getImage(postId){
      var that = this
      this.$api.post.getImage({
        postId: postId
      }).then(res => {
        if (res.data.code === 200){
          var len = res.data.data.length
          that.fileUrlList = res.data.data
          for (let i = 0; i < len; i++) {
            that.fileList.push({
              name: i,
              url: res.data.data[i]
            })
          }
          console.log(that.fileList)
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
    edit() {
      this.MyReadMode = false
    },
    submit() {
      this.MyReadMode = true
      var that = this
      this.$api.post.updateForm(that.MyPostForm)
      .then(res => {
        if (res.data.code === 200){
          this.$message({
            type: "success",
            message: '提交成功'
          })
          that.submitImage()
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
    submitImage() {
      console.log(this.fileUrlList)
      var that = this
      this.$api.post.updateImage(that.fileUrlList,{
        postId: that.MyPostForm.postId
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log("remove")
      var i;
      if (file.response === undefined){
        console.log("只能用url 不能用response")
        i = this.fileUrlList.indexOf(file.url)
      } else {
        console.log('这是新上传的文件')
        i = this.fileUrlList.indexOf(file.response.data)
      }
      this.fileUrlList.splice(i, 1)
      console.log(this.fileUrlList)
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      console.log("response")
      console.log(response)
      console.log("file")
      console.log(file)
      console.log("fileList")
      console.log(fileList)
      this.fileUrlList.push(response.data)
    }
  },
  mounted() {
    this.MyPostForm = this.postForm
    this.MyReadMode = true
    console.log(this.MyReadMode)
    this.getImage(this.MyPostForm.postId)
  }
}
</script>

<style scoped>
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
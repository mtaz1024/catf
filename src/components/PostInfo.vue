<template>
  <div>
    <div>
      <el-form :model="MyPostForm" label-position="right" label-width="100px" ref="MyPostForm" :disabled="readMode">
        <div class="left-part">
          <el-form-item label="标题" prop="postTitle">
            <el-input type="text" v-model="MyPostForm.postTitle"
                      maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="猫咪名字" prop="catName">
            <el-input type="text" v-model="MyPostForm.catName"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="猫咪描述" prop="catInfo">
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
          <el-form-item label="区域" prop="selectedOptions">
            <el-cascader size="large" :options="option"
                         v-model="MyPostForm.selectedOptions" @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="猫咪种类" prop="catType">
            <el-select v-model="MyPostForm.catType">
              <el-option v-for="item in typeSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="猫咪年龄" prop="catAge">
            <el-select v-model="MyPostForm.catAge">
              <el-option v-for="item in ageSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="猫咪性别" prop="catGender">
            <el-select v-model="MyPostForm.catGender">
              <el-option v-for="item in genderSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绝育情况" prop="catDesexing">
            <el-select v-model="MyPostForm.catDesexing">
              <el-option v-for="item in desexingSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="疫苗情况" prop="catVaccination">
            <el-select v-model="MyPostForm.catVaccination">
              <el-option v-for="item in vaccinationSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驱虫情况" prop="catDeworming">
            <el-select v-model="MyPostForm.catDeworming">
              <el-option v-for="item in dewormingSelect" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="健康情况" prop="catHealth">
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
      <el-button v-if="readMode" type="button" size="small" @click="edit" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold;">编辑</el-button>
      <el-button v-if="!readMode" type="button" size="small" @click="cancel" style="background-color: black ;border-color: black; color: #efc239; font-weight: bold;">取消</el-button>
      <el-button v-if="!readMode" type="button" size="small" @click="submit" style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold;">提交</el-button>
    </div>
  </div>
</template>

<script>
import duplicate from "../store/duplicate";
import { regionDataPlus } from 'element-china-area-data'
export default {
  props: {
    postForm: Object,
  },
  ...duplicate,
  name: "PostInfo",
  data() {
    return {
      MyPostForm: {},
      readMode: false,
      addressReadMode: false,
      uploadUrl: "http://localhost:8081/api/post/image/upload",
      fileList: [],
      fileUrlList: [],
      typeSelect: duplicate.data().typeSelect,
      ageSelect: duplicate.data().ageSelect,
      monthSelect: duplicate.data().monthSelect,
      yearSelect: duplicate.data().yearSelect,
      genderSelect: duplicate.data().genderSelect,
      desexingSelect: duplicate.data().desexingSelect,
      vaccinationSelect: duplicate.data().vaccinationSelect,
      dewormingSelect: duplicate.data().dewormingSelect,
      healthSelect: duplicate.data().healthSelect,
      option: regionDataPlus,
      // selectedOptions: ["130000", "130100", "130103"]
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
      this.readMode = false
    },
    submit() {
      this.readMode = true
      var that = this
      this.MyPostForm.postProvince = this.MyPostForm.selectedOptions[0]
      this.MyPostForm.postCity = this.MyPostForm.selectedOptions[1]
      this.MyPostForm.postDistrict = this.MyPostForm.selectedOptions[2]
      delete this.MyPostForm.selectedOptions
      console.log(this.MyPostForm)
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
    },
    handleChange(value) {
      console.log(value)
      console.log(this.selectedOptions)
    },
    cancel() {
      var selectedOptions = [];
      if (this.postForm.postProvince !== null){
        selectedOptions.push(this.postForm.postProvince)
      }
      if (this.postForm.postCity !== null){
        selectedOptions.push(this.postForm.postCity)
      }
      if (this.postForm.postDistrict !== null){
        selectedOptions.push(this.postForm.postDistrict)
      }
      this.postForm.selectedOptions = selectedOptions
      this.MyPostForm = this.postForm
      console.log(this.MyPostForm.selectedOptions)
      this.getImage(this.MyPostForm.postId)
      this.readMode = true
    }
  },
  mounted() {
    this.readMode = true
    var selectedOptions = [];
    selectedOptions.push(this.postForm.postProvince)
    if (this.postForm.postProvince !== ""){
      selectedOptions.push(this.postForm.postCity)
      if(this.postForm.postCity !== ""){
        selectedOptions.push(this.postForm.postDistrict)
      }
    }
    this.postForm.selectedOptions = selectedOptions
    this.MyPostForm = this.postForm
    console.log(this.MyPostForm.selectedOptions)
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
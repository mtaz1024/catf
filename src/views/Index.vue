<template>
  <div id="index-wrapper">
    <!-- header -->
<!--    <Header></Header>-->

    <div class="container">
      <!-- select -->
      <div class="select-container">
        <div class="select-content">
          <div class="select-item" v-for="(list, index) in searchList" :key="index">
            <div style="display: inline-block">{{ list.name + "："}}</div>
            <el-checkbox-group v-model="list.checkList" style="display: inline-block">
              <el-checkbox v-for="(item, index) in list.list" :key=index :label="item.number" @change="search">{{ item.value }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="address-item">
            <span>区域：</span>
            <el-cascader v-model="selectedOptions"
                         size="large" :options="option" @change="search"></el-cascader>
          </div>
        </div>

      </div>

      <!-- result -->
      <el-card class="result-container" :body-style="{padding: 0}">
        <div class="result-box" style="margin: 10px auto;">
            <el-card class="result-item" v-for="(item, index) in resultList" :key="index" @click.native="toPost(item)"
                     shadow="hover"
                     :body-style="{padding: 0}">
              <el-image :src="item.catPic" fit="cover" style="width: 252px; height: 200px;"></el-image>
              <div>{{ item.postTitle }}</div>
            </el-card>
          <div class="no-result-tip" v-if="totalCount===0">
            <p class="no-result-tip-warning">No Result</p>
            <p style="margin-top: 8px">抱歉，没有找到相关结果。</p>
            <p>期待您的发帖！</p>
          </div>
        </div>
        <div style="height: 10px;clear: bottom"></div>
      </el-card>

      <!-- pagination -->
      <div class="pagination-box" style="margin: 10px auto">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="search"
            :hide-on-single-page=true
            :current-page.sync=currentPage
            :page-size=10
            :total=totalCount>
        </el-pagination>
      </div>


    </div>

  </div>
</template>

<script>
import duplicate from "../store/duplicate";
import { regionDataPlus } from 'element-china-area-data'
// import Header from "../components/Header";
export default {
  ...duplicate,
  name: "Index",
  components: {
    // Header
  },
  data () {
    return {
      searchList: duplicate.data().searchList,
      resultList: [],
      currentPage: 1,
      totalCount: 20,
      option: regionDataPlus,
      selectedOptions: [""]
    }
  },
  methods: {
    search() {
      console.log("种类：" + this.searchList[0].checkList.toString())
      console.log("年龄：" + this.searchList[1].checkList.toString())
      console.log("性别：" + this.searchList[2].checkList.toString())
      console.log(this.selectedOptions)
      var that = this
      this.$api.search.search({
        type: that.searchList[0].checkList,
        gender: that.searchList[2].checkList,
        age: that.searchList[1].checkList,
        address: that.selectedOptions
      },{
        page: that.currentPage
      }).then(res => {
        if (res.data.code === 200){
          console.log(res.data.data)
          that.resultList = res.data.data.list
          that.totalCount = res.data.data.total
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
    toPost(post){
      var postId = post.postId
      this.$router.push({
        path: '/post',
        query: {
          postId: postId
        }
      })
    },
    handleChange(value) {
      console.log(value)
    }
  },
  mounted() {
    this.search()
  }
}
</script>

<style scoped>
.select-container, .result-container{
  margin: 15px auto;
  width: 1500px;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
}
/*搜索处*/
.select-content{
  padding: 10px 10px;
}
.select-item, .address-item{
  margin-left: 20px;
  padding-top: 10px;
  height: 24px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
}
.address-item{
  height: 40px;
}
/*结果处*/
.result-box{
  width: 1460px;
}
.result-item{
  display: inline-block;
  float: left;
  margin: 10px 20px;
  height: 250px;
  width: 250px;
}
.no-result-tip{
  /*width: 500px;*/
  text-align: center;
  margin: 50px auto;
}
.no-result-tip-warning{
  /*text-align:center;*/
  position: relative;
  right: 3px;
  color: #efc239;
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 0;
}
</style>
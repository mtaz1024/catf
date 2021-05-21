<template>
  <div id="index-wrapper">
    <!-- header -->
<!--    <Header></Header>-->

    <div class="container">
      <!-- select -->
      <el-card class="select-container">
        <div class="select-item" v-for="(list, index) in searchList" :key="index">
          <div style="display: inline-block">{{ list.name + "："}}</div>
          <el-checkbox-group v-model="list.checkList" style="display: inline-block">
            <el-checkbox v-for="(item, index) in list.list" :key=index :label="item.number" @change="search(list)">{{ item.value }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-card>

      <!-- result -->
      <el-card class="result-container" :body-style="{padding: 0}">
        <div class="result-box" style="margin: 10px auto;">
            <el-card class="result-item" v-for="(item, index) in resultList" :key="index" @click.native="toPost(item)"
                     shadow="hover"
                     :body-style="{padding: 0}">
              <el-image :src="item.catPic" fit="cover" style="width: 252px; height: 200px;"></el-image>
              <div>{{ item.postTitle }}</div>
            </el-card>
        </div>
        <div style="height: 10px;clear: bottom"></div>
      </el-card>

      <!-- pagination -->
      <div class="pagination-box" style="margin: 10px auto">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="search"
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
      totalCount: 20
    }
  },
  methods: {
    search() {
      console.log("种类：" + this.searchList[0].checkList.toString())
      console.log("年龄：" + this.searchList[1].checkList)
      console.log("性别：" + this.searchList[2].checkList)
      var that = this
      this.$api.search.search({
        type: that.searchList[0].checkList.toString(),
        // age: that.searchList[1].checkList,
        gender: that.searchList[2].checkList.toString(),
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
    }
  },
  mounted() {
    this.search()
  }
}
</script>

<style scoped>
.select-container, .result-container{
  margin: 20px auto;
  width: 1500px;
  border-radius: 15px;
  border: 1px solid white;
}
/*.result-container>>>.el-card__body{*/
/*  padding: 0;*/
/*}*/
/*.result-item>>>.el-card__body{*/
/*  padding: 20px;*/
/*}*/
/*.select-container >>>.el-card__body{*/
/*  padding-left: 39px;*/
/*} 被下面的代替 */
.select-item{
  margin-left: 20px;
  padding-top: 10px;
  height: 24px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
}
.result-box{
  width: 1460px;
  /*margin: 0 auto;*/
  /*margin-top: 10px;*/
  /*text-align: center;*/
}
.result-item{
  display: inline-block;
  float: left;
  margin: 10px 20px;
  height: 250px;
  width: 250px;
}
</style>
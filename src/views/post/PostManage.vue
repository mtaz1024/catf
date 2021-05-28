<template>
  <div>
<!--    <Header></Header>-->
    <el-card class="manage-container">
      <H2  style="margin-bottom: 20px">发布管理</H2>
      <div class="manage-content">
        <div style="text-align: left; margin-bottom: 10px">
          <el-button
              size="small"
              style="background-color: black; border-color: black; color: #efc239;font-weight: bold"
              @click="toggleSelection()">取消选择</el-button>
          <el-button
              size="small"
              style="background-color: black; border-color: black; color: #efc239;font-weight: bold"
              @click="batchDelete">批量删除</el-button>
          <el-button
              size="small"
              style="float:right; background-color: black; border-color: black; color: #efc239;font-weight: bold"
              @click="allDelete">一键全部删除</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="postList"
            stripe
            border
            :default-sort="{prop: 'postId', order: 'ascending'}"
            @selection-change="handleSelectionChange"
            @sort-change="sort"
            style="width: 100%">
          <!-- 多选 -->
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <!-- 序号 -->
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <!-- 扩展 -->
          <el-table-column type="expand" label="展开" width="50px">
            <template slot-scope="props">
              <div style="width: 1200px; margin: auto">
                <PostInfo :post-form="props.row"></PostInfo>
              </div>
            </template>
          </el-table-column>
          <!-- 图片 -->
          <el-table-column label="主图"
                           prop="catPic"
                           width="130">
            <template slot-scope="scope">
              <el-image :src=scope.row.catPic style="height: 80px;width: 109px"
                        @click="toPost(scope.row.postId)" class="post-image" v-if="(scope.row.catPic!==''&&scope.row.catPic!==null)">
              </el-image>
              <div class="post-image"
                   v-if="(scope.row.catPic===''||scope.row.catPic===null)" @click="toPost(scope.row.postId)">暂无</div>
            </template>
          </el-table-column>
          <!-- 标题 -->
          <el-table-column label="标题"
                           prop="postTitle"
                           sortable
                           width="200" @click="toPost()" class="post-title-co">
            <template slot-scope="scope" class="post-title-tem">
              <div class="hover-txt" style="font-weight: bold;" @click="toPost(scope.row.postId)">{{ scope.row.postTitle }}</div>
            </template>
          </el-table-column>
          <!-- 猫咪名字 -->
          <el-table-column label="猫咪名字"
                           prop="catName"
                           sortable
                           width="110">
          </el-table-column>
          <!-- 性别 -->
          <el-table-column label="猫咪性别"
                           prop="catGender"
                           sortable
                           width="110">
            <template slot-scope="scope">
              <div> {{ scope.row.catGender|getString("gender") }}</div>
            </template>
          </el-table-column>
          <!-- 种类 -->
          <el-table-column label="猫咪种类"
                           prop="catType"
                           sortable
                           width="110">
            <template slot-scope="scope">
              <div> {{ scope.row.catType|getString("type") }}</div>
            </template>
          </el-table-column>
          <!-- 绝育情况 -->
          <el-table-column label="绝育情况"
                           prop="catDesexing"
                           sortable
                           width="110">
            <template slot-scope="scope">
              <div> {{ scope.row.catDesexing|getString("desex") }}</div>
            </template>
          </el-table-column>
          <!-- 健康 -->
          <el-table-column label="健康情况"
                           prop="catHealth"
                           sortable
                           width="110">
            <template slot-scope="scope">
              <div> {{ scope.row.catHealth|getString("health") }}</div>
            </template>
          </el-table-column>
          <!-- 发布时间 -->
          <el-table-column label="发布时间"
                           prop="releaseTime"
                           sortable
                           width="200">
            <template slot-scope="scope">
              <div> {{ scope.row.releaseTime|fixTime }}</div>
            </template>
          </el-table-column>
          <!-- 申请情况 -->
          <el-table-column label="申请情况"
                           prop="isAdopt"
                           sortable
                           width="110">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isAdopt === 0">
                <div style="font-weight: bold"> {{ scope.row.isAdopt|getString("state") }}</div>
              </el-tag>
              <el-tag type="warning" v-if="scope.row.isAdopt === 1">
                <div style="font-weight: bold"> {{ scope.row.isAdopt|getString("state") }}</div>
              </el-tag>
              <el-tag type="success" v-if="scope.row.isAdopt === 2">
                <div style="font-weight: bold"> {{ scope.row.isAdopt|getString("state") }}</div>
              </el-tag>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold"
                  type="danger"
                  @click="oneDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-card>
    <div class="pagination-box" style="margin: 5px auto">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :hide-on-single-page="true"
          :current-page.sync=currentPage
          :page-size=5
          :total=totalCount>
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import Header from "../../components/Header";
import PostInfo from "../../components/PostInfo";
import duplicate from "../../store/duplicate";
export default {
  ...duplicate,
  name: "PostManage",
  components: {
    // Header,
    PostInfo
  },
  data() {
    return {
      typeSelect: duplicate.data().typeSelect,
      monthSelect: duplicate.data().monthSelect,
      yearSelect: duplicate.data().yearSelect,
      genderSelect: duplicate.data().genderSelect,
      desexingSelect: duplicate.data().desexingSelect,
      vaccinationSelect: duplicate.data().vaccinationSelect,
      dewormingSelect: duplicate.data().dewormingSelect,
      healthSelect: duplicate.data().healthSelect,
      postList: [],
      postSelectList: [],
      multipleSelection: [],
      currentPage: 1,
      totalCount: 0,
      sortProp: '',
      sortOrder: '',
    }
  },
  methods: {
    getPostList() {
      var that = this
      this.$api.post.getPostByUser({
        userId: that.$store.state.user.userId,
        page: that.currentPage,
        prop: that.sortProp,
        order: that.sortOrder
      }).then(res => {
        if (res.data.code === 200){
          console.log(res.data.data)
          that.postList = res.data.data.list
          that.totalCount = res.data.data.total
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    oneDelete(index, post) {
      var that = this
      this.$api.post.deleteOnePost({
        postId: post.postId,
      }).then(res => {
        if (res.data.code === 200){
          this.$message.success({
            message: '成功删除'
          })
          that.getPostList();
        }else{
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
    batchDelete() {
      var postIdList = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        postIdList.push(this.multipleSelection[i].postId)
      }
      var that = this
      this.$api.post.deleteBatchPost(postIdList)
      .then(res => {
        if (res.data.code === 200){
          that.getPostList()
        }else{
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
    allDelete() {
      var that = this
      this.$api.post.deleteAllPost({
        userId: that.$store.state.user.userId
      }).then(res => {
        if (res.data.code === 200){
          that.postList = []
        }else{
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
    changePage() {
      this.getPostList()
    },
    sort(column){
      console.log("column")
      console.log(column)
      if (column.order === null){
        console.log("转为默认排序")
        this.sortProp = "postId";
        this.sortOrder = "ascending"
        this.getPostList()
      } else {
        this.sortProp = column.prop
        this.sortOrder = column.order
        this.getPostList()
      }
    },
    toPost(postId) {
      this.$router.push({
        path: '/post',
        query: {
          postId: postId
        }
      })
    }
  },
  filters: {
    getString(number, select) {
      if (select === "gender"){
        return duplicate.data().genderSelect.find(o => o.value === number).label
      } else if (select === "type"){
        return duplicate.data().typeSelect.find(o => o.value === number).label
      } else if (select === "desex"){
        return duplicate.data().desexingSelect.find(o => o.value === number).label
      } else if (select === "health"){
        return duplicate.data().healthSelect.find(o => o.value === number).label
      } else if (select === "state"){
        return duplicate.data().postState.find(o => o.value === number).label
      }

    },
    fixTime(str){
      console.log("str类型" + typeof str)
      if (typeof str === "object"){
        return "暂无时间"
      } else {
        return str.substr(0,10);
      }
    }
  },
  mounted() {
    this.sortProp = "postId";
    this.sortOrder = "ascending"
    this.getPostList()
  }
}
</script>

<style scoped>
.manage-container{
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  margin: 15px auto 10px auto;
  width: 1500px;
}
.post-image:hover{
  cursor: pointer;
}
.hover-txt:hover{
  cursor: pointer;
}
</style>

<style>
.el-popover {
  min-width: 10px;
  padding: 10px 10px 10px 10px;
}
</style>
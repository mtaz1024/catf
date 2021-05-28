<template>
  <div>
<!--    <Header></Header>-->
    <el-card class="manage-container">
      <h2 style="margin-bottom: 20px">领养历史</h2>
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
            :data="adoptList"
            stripe
            border
            :default-sort="{prop: 'adoptId', order: 'ascending'}"
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
          <!-- 图片 -->
          <el-table-column label="主图"
                           prop="catPic"
                           width="130">
            <template slot-scope="scope">
              <el-image :src=scope.row.catPic style="height: 80px;width: 109px"
                        class="image-content" @click="toPost(scope.row.postId)">
              </el-image>
            </template>
          </el-table-column>
          <!-- 标题 -->
          <el-table-column label="发布标题"
                           prop="postTitle"
                           sortable
                           width="120">
            <template slot-scope="scope">
              <div class="hover-txt" style="font-weight: bold" @click="toPost(scope.row.postId)">{{ scope.row.postTitle }}</div>
            </template>
          </el-table-column>
          <!-- 发布者 -->
          <el-table-column label="发布者"
                           prop="posterName"
                           sortable
                           width="120">
            <template slot-scope="scope">
              <div class="hover-txt" style="font-weight: bold" @click="toZone(scope.row.posterId)">{{ scope.row.posterName }}</div>
            </template>
          </el-table-column>
          <!-- 发布时间 -->
          <el-table-column label="发布时间"
                           prop="releaseTime"
                           sortable
                           width="120">
          </el-table-column>
          <!-- 领养时间-->
          <el-table-column label="领养时间"
                           prop="adoptTime"
                           sortable
                           width="280">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" >
            <template slot-scope="scope">
<!--              <el-button-->
<!--                  size="mini"-->
<!--                  style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold"-->
<!--                  type="danger"-->
<!--                  @click="oneDelete(scope.$index, scope.row)">删除</el-button>-->
              <el-button
                  size="mini"
                  style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold"
                  type="danger"
                  @click="edit(scope.$index, scope.row)">去记录</el-button>
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

import duplicate from "../../store/duplicate";
export default {
  ...duplicate,
  name: "AdoptManage",
  components: {
    // Header
  },
  data() {
    return {
      adoptList: [],

      multipleSelection: [],
      currentPage: 1,
      totalCount: 0,
      sortProp: '',
      sortOrder: '',
    }
  },
  methods: {
    getAdoptList() {
      var that = this
      this.$api.adopt.getAdopt({
        userId: that.$store.state.user.userId,
        page: that.currentPage,
        prop: that.sortProp,
        order: that.sortOrder
      }).then(res => {
        if (res.data.code === 200){
          console.log(res.data.data)
          that.adoptList = res.data.data.list
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
    oneDelete(index, adopt) {
      var that = this
      this.$api.adopt.deleteOne({
        adoptId: adopt.adoptId,
      }).then(res => {
        if (res.data.code === 200){
          that.getAdoptList()
        }else{
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
    batchDelete() {
      var adoptIdList = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        adoptIdList.push(this.multipleSelection[i].adoptId)
      }
      var that = this
      this.$api.adopt.deleteBatch(adoptIdList)
      .then(res => {
        if (res.data.code === 200){
          that.getAdoptList()
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
      this.$api.adopt.deleteAll({
        userId: that.$store.state.user.userId
      }).then(res => {
        if (res.data.code === 200){
          that.adoptList = []
        }else{
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
    changePage() {
      // this.getAdoptList()
      this.getAdoptList()
    },
    sort(column){
      console.log("column")
      console.log(column)
      if (column.order === null){
        console.log("转为默认排序")
        this.sortProp = "adoptId";
        this.sortOrder = "ascending"
        // this.getAdoptList()
        this.getAdoptList()
      } else {
        this.sortProp = column.prop
        this.sortOrder = column.order
        // this.getAdoptList()
        this.getAdoptList()
      }
    },
    edit(index, adopt){
      console.log(index, adopt);
      // this.$message({
      //   type: "error",
      //   message: '该功能暂未开放'
      // })
      this.$router.push({
        path: '/timeline',
        query: {
          adoptId: adopt.adoptId
        }
      })
    },
    toPost(postId){
      this.$router.push({
        path: '/post',
        query: {
          postId: postId
        }
      })
    },
    toZone(userId){
      this.$router.push({
        path: '/zone',
        query: {
          userId: userId
        }
      })
    }
  },
  mounted() {
    this.sortProp = "adoptId"
    this.sortOrder = "ascending"
    // this.getAdoptList()
    this.getAdoptList()
  }
}
</script>

<style scoped>
.manage-container{
  width: 1500px;
  margin: 15px auto 10px auto;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
}
.image-content :hover{
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
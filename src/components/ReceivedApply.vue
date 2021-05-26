<template>
  <div class="manage-content">
    <!-- 操作 -->
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
    <!-- 表格 -->
    <el-table
        ref="multipleTable"
        :data="otherApplyList"
        stripe border
        :default-sort="{prop: 'adoptId', order: 'descending'}"
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
      <el-table-column label="标题"
                       prop="postTitle"
                       width="120">
      </el-table-column>
      <!-- 猫咪名字 -->
      <el-table-column label="猫咪名字"
                       prop="catName"
                       width="120">
      </el-table-column>
      <!-- 申请者 -->
      <el-table-column label="申请者"
                       prop="applierName"
                       sortable
                       width="120">
        <template slot-scope="scope">
          <div style="font-weight: bold" @click="toHomePage(scope.row.applierId)">{{ scope.row.applierName }}</div>
        </template>
      </el-table-column>
      <!-- 申请时间 -->
      <el-table-column label="申请时间"
                       prop="applyTime"
                       sortable
                       width="440">
      </el-table-column>
      <!-- 申请状态-->
      <el-table-column label="申请状态"
                       prop="adoptState"
                       sortable
                       width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.adoptState === 0">
            <div style="font-weight: bold">{{ scope.row.adoptState|getApplyState }}</div>
          </el-tag>
          <el-tag type="danger" v-if="scope.row.adoptState === 1">
            <div style="font-weight: bold">{{ scope.row.adoptState|getApplyState }}</div>
          </el-tag>
          <el-tag type="success" v-if="scope.row.adoptState === 2">
            <div style="font-weight: bold">{{ scope.row.adoptState|getApplyState }}</div>
          </el-tag>
          <el-tag type="info" v-if="scope.row.adoptState === 3">
            <div style="font-weight: bold">{{ scope.row.adoptState|getApplyState }}</div>
          </el-tag>
          <el-tag type="warning" v-if="scope.row.adoptState === 4">
            <div style="font-weight: bold">{{ scope.row.adoptState|getApplyState }}</div>
          </el-tag>
          <!--                  <div>{{ scope.row.adoptState|getApplyState }}</div>-->
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <div v-if="scope.row.adoptState === 0">
            <el-button
                :disabled="scope.row.adoptState !== 0"
                size="mini"
                style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold"
                type="danger"
                @click="refuse(scope.$index, scope.row)">拒绝</el-button>
            <el-button
                :disabled="scope.row.adoptState !== 0"
                size="mini"
                style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold"
                type="danger"
                @click="pass(scope.$index, scope.row)">同意</el-button>
          </div>
          <div v-if="scope.row.adoptState === 1">
            <el-button
                disabled
                size="mini"
                style="background-color: black; border-color: black; color: #efc239;font-weight: bold"
                type="danger"
                @click="refuse(scope.$index, scope.row)">已拒绝</el-button>
          </div>
          <div v-if="scope.row.adoptState === 2">
            <el-button
                disabled
                size="mini"
                style="background-color: black; border-color: black; color: #efc239;font-weight: bold"
                type="danger"
                @click="refuse(scope.$index, scope.row)">已通过</el-button>
          </div>
          <div v-if="scope.row.adoptState === 3">
            <el-button
                disabled
                size="mini"
                style="background-color: black; border-color: black; color: #efc239;font-weight: bold"
                type="danger"
                @click="refuse(scope.$index, scope.row)">已取消</el-button>
          </div>
          <div v-if="scope.row.adoptState === 4">
            <el-button
                disabled
                size="mini"
                style="background-color: black; border-color: black; color: #efc239;font-weight: bold"
                type="danger"
                @click="refuse(scope.$index, scope.row)">已停止</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" style="margin: 5px auto">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :hide-on-single-page="true"
          :current-page.sync=currentPage
          :page-size=10
          :total=totalCount>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import duplicate from "../store/duplicate";

export default {
  name: "ReceivedApply",
  data() {
    return {
      otherApplyList: [],

      multipleSelection: [],
      currentPage: 1,
      totalCount: 0,
      sortProp: '',
      sortOrder: '',
    }
  },
  methods: {
    getOtherApplyList() {
      var that = this
      this.$api.adopt.getOtherApply({
        userId: that.$store.state.user.userId,
        page: that.currentPage,
        prop: that.sortProp,
        order: that.sortOrder
      }).then(res => {
        if (res.data.code === 200){
          console.log(res.data.data)
          that.otherApplyList = res.data.data.list
          that.totalCount = res.data.data.total
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },
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
    batchDelete() {
      this.$message({
        type: "error",
        message: '该功能暂未开放'
      })
      // var adoptIdList = []
      // for (let i = 0; i < this.multipleSelection.length; i++) {
      //   adoptIdList.push(this.multipleSelection[i].adoptId)
      // }
      // var that = this
      // this.$api.adopt.deleteBatch(adoptIdList)
      // .then(res => {
      //   if (res.data.code === 200){
      //     that.getAdoptList()
      //   }else{
      //     this.$message({
      //       type: "error",
      //       message: res.data.message
      //     })
      //   }
      // })
    },
    allDelete() {
      this.$message({
        type: "error",
        message: '该功能暂未开放'
      })
      // var that = this
      // this.$api.adopt.deleteAll({
      //   userId: that.$store.state.user.userId
      // }).then(res => {
      //   if (res.data.code === 200){
      //     that.adoptList = []
      //   }else{
      //     this.$message({
      //       type: "error",
      //       message: res.data.message
      //     })
      //   }
      // })
    },
    changePage() {
      this.getOtherApplyList()
    },
    sort(column){
      console.log("column")
      console.log(column)
      if (column.order === null){
        console.log("转为默认排序")
        this.sortProp = "adoptId";
        this.sortOrder = "descending"
        this.getOtherApplyList()
      } else {
        this.sortProp = column.prop
        this.sortOrder = column.order
        this.getOtherApplyList()
      }
    },
    refuse(index, apply) {
      console.log(index, apply)
      this.$api.adopt.refuse({
        adoptId: apply.applyId
      })
      .then(res => {
        if (res.data.code === 200){
          this.$message({
            type: "success",
            message: '已拒绝该申请'
          })
          this.getOtherApplyList()
        }else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
      .catch(fail => {
        this.$message({
          type: "error",
          message: fail
        })
      })
    },
    pass(index, apply){
      console.log(index, apply);
      this.$api.adopt.pass({
        adoptId: apply.applyId
      })
      .then(res => {
        if (res.data.code === 200){
          this.$message({
            type: "success",
            message: '已通过该申请'
          })
          this.getOtherApplyList()
        }else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
      .catch(fail => {
        this.$message({
          type: "error",
          message: fail
        })
      })
    },
    toHomePage(userId){
      this.$message.error({
        message: "userId" + userId
      })
    },
    toPost(postId){
      this.$router.push({
        path: '/post',
        query: {
          postId: postId
        }
      })
    }
  },
  filters: {
    getApplyState(state){
      const map = new Map(duplicate.data().applyState)
      return map.get(state)
    }
  },
  mounted() {
    this.sortProp = "adoptId"
    this.sortOrder = "descending"
    this.getOtherApplyList()
  }
}
</script>

<style scoped>
.image-content :hover{
  cursor: pointer;
}
</style>
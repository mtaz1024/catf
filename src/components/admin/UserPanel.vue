<template>
  <div class="user-container">
    <el-table ref="userTable"
              :data="userList"
              stripe
              style="width: 100%"
              :default-sort="{ prop: 'userId', order: 'ascending'}"
              @selection-change="handleSelection"
              @sort-change="sort">
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
<!--      <el-table-column type="expand" label="展开" width="50px">-->
<!--        <template slot-scope="props">-->
<!--          <div style="width: 1200px; margin: auto">-->
<!--            <PostInfo :post-form="props.row"></PostInfo>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <!-- 头像 -->
      <el-table-column label="头像"
                       prop="avatar"
                       header-align="center"
                       width="80">
        <template slot-scope="scope">
          <div class="avatar" @click="toZone(scope.row.userId)">
            <!-- 有头像 -->
            <el-avatar :size="60" :src=scope.row.avatar v-if="(scope.row.avatar!==''&&scope.row.avatar!==null)"></el-avatar>
            <!-- 无头像 -->
            <el-avatar :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" v-if="(scope.row.avatar===''||scope.row.avatar===null)"></el-avatar>
<!--            <div v-if="(scope.row.avatar===''||scope.row.avatar===null)" style="text-align: center"><img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></div>-->
          </div>
        </template>
      </el-table-column>
      <!-- 用户名 -->
      <el-table-column label="用户名"
                       prop="username"
                       sortable
                       width="100">
        <template slot-scope="scope" class="post-title-tem">
          <div class="hover-txt" style="font-weight: bold;" @click="toZone(scope.row.userId)">{{ scope.row.username }}</div>
        </template>
      </el-table-column>
      <!-- 注册时间 -->
      <el-table-column label="注册时间"
                       prop="joinDate"
                       sortable
                       width="200">
      </el-table-column>
      <!-- 角色 -->
      <el-table-column label="角色"
                       prop="role"
                       sortable
                       width="110">
        <template slot-scope="scope">
          <div> {{ scope.row.role|getString("role") }}</div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" >
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--              size="mini"-->
<!--              style="background-color: #efc239; border-color: #efc239; color: black; font-weight: bold"-->
<!--              type="danger"-->
<!--              @click="oneDelete(scope.$index, scope.row)">删除</el-button>-->
<!--        </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import duplicate from "../../store/duplicate";

export default {
  name: "UserPanel",
  data() {
    return {
      userList: [],
      currentPage: 1
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList(){
      this.$api.admin.getAllUser({
        userId: this.$store.state.user.userId,
        // page: this.currentPage
        // prop: this
        // order: this
      })
      .then(res => {
        if (res.data.code === 200){
          this.userList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleSelection() {

    },
    sort() {

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
  filters: {
    getString(number, select){
      if (select === "role"){
        // return duplicate.data().roleSelect.get(number)

        const map = new Map(duplicate.data().roleSelect)
        return map.get(number)
      }
    }
  }
}
</script>

<style scoped>
.hover-txt:hover{
  cursor: pointer;
}
</style>
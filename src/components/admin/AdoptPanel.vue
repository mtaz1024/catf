<template>
  <div class="adopt-container">
    <el-table ref="adoptTable"
              :data="adoptList"
              stripe
              style="width: 100%"
              :default-sort="{ prop: 'adoptId', order: 'ascending'}"
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
<!--      <el-table-column label="主图"-->
<!--                       prop="catPic"-->
<!--                       header-align="center"-->
<!--                       width="80">-->
<!--        <template slot-scope="scope">-->
<!--          <div class="avatar" @click="toPost(scope.row.postId)">-->
<!--            &lt;!&ndash; 有主图 &ndash;&gt;-->
<!--            <el-image :size="60" :src=scope.row.catPic v-if="(scope.row.catPic!==''&&scope.row.catPic!==null)"></el-image>-->
<!--            &lt;!&ndash; 无主图 &ndash;&gt;-->
<!--            <el-image :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" v-if="(scope.row.catPic===''||scope.row.catPic===null)"></el-image>-->
<!--            &lt;!&ndash;            <div v-if="(scope.row.avatar===''||scope.row.avatar===null)" style="text-align: center"><img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></div>&ndash;&gt;-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <!--标题 -->
      <el-table-column label="id"
                       prop="adoptId"
                       sortable
                       width="100">
        <template slot-scope="scope">
          <div class="hover-txt" style="font-weight: bold;" @click="toPost(scope.row.postId)">{{ scope.row.adoptId }}</div>
        </template>
      </el-table-column>
      <!-- 发布时间 -->
      <el-table-column label="申请时间"
                       prop="adoptTime"
                       sortable
                       width="200">
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态"
                       prop="adoptState"
                       sortable
                       width="110">
        <template slot-scope="scope">
          <div>{{ duplicate.data().adoptState.find(o => o.value === scope.row.adoptState).label }}</div>
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
  name: "AdoptPanel",
  data() {
    return {
      adoptList: [],
      currentPage: 1,
      duplicate: duplicate
    }
  },
  mounted() {
    this.getAdoptList()
  },
  methods: {
    getAdoptList(){
      this.$api.admin.getAllAdopt({
        userId: this.$store.state.user.userId,
        // page: this.currentPage
        // prop: this
        // order: this
      })
          .then(res => {
            if (res.data.code === 200){
              this.adoptList = res.data.data
            } else {
              this.$message.error(res.data.message)
            }
          })
    },
    handleSelection() {

    },
    sort() {

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
    getString(number, select){
      if (select === "role"){const map = new Map(duplicate.data().roleSelect)
        return map.get(number)
      } else if (select === 'isAdopt'){
        return duplicate.data().postState.find(o => o.value === number).label
      }
    }
  }
}
</script>

<style scoped>

</style>
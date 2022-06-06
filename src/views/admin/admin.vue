<template>
  <div>
    <!--    <Header status="2"></Header>-->
    <el-container style="width: 1500px; margin: 15px auto">
      <!-- 侧边栏 -->
      <el-aside style="width: 14%">
        <el-menu default-active="2-1">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>系统管理</template>
            <el-menu-item index="1-1" @click="changeState('1-1')">
              <template slot="title">用户管理</template>
            </el-menu-item>
            <el-menu-item index="1-2" @click="changeState('1-2')">
              <template slot="title">发帖管理</template>
            </el-menu-item>
            <el-menu-item index="1-3" @click="changeState('1-3')">
              <template slot="title">领养管理</template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>权限管理</template>
            <el-menu-item index="2-1" @click="changeState('2-1')">
              <template slot="title">用户认证</template>
            </el-menu-item>
            <el-menu-item index="2-2" @click="changeState('2-2')">
              <template slot="title">用户权限</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <UserPanel v-if="state === '1-1'"></UserPanel>
        <PostPanel v-if="state === '1-2'"></PostPanel>
        <AdoptPanel v-if="state ==='1-3'"></AdoptPanel>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import UserPanel from "../../components/admin/UserPanel";
import PostPanel from "../../components/admin/PostPanel";
import AdoptPanel from "../../components/admin/AdoptPanel";
export default {
  name: "admin",
  components: {
    AdoptPanel,
    PostPanel,
    UserPanel
  },
  data(){
    return {
      state: '1-1'

    }
  },
  methods:{
    changeState(id){
      this.state = id
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
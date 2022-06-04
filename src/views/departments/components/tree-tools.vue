<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%;"
  >
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ nodeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { Reqdeldepartment } from '@/api/departments'
export default {
  name: 'TreeTools',
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      required: false
    }

  },

  methods: {

    async handleCommand(type) {
      if (type === 'add') {
        // console.log('add')
        this.$emit('add-depts', this.nodeData)
      } else if (type === 'edit') {
        // console.log('编辑')
        this.$emit('edit-depts', this.nodeData)
      } else if (type === 'del') {
        const res = this.$confirm('你确定要删除吗？').catch(err => err)
        if (res === 'cancel') return
        await Reqdeldepartment(this.nodeData.id)
        this.$message.success('删除部门成功')
        // 2. 重新获取最新刷新视图 子传父 通知父组件index.vue 重新获取数据
        this.$emit('del-depts')
      }
    }
  }
}
</script>

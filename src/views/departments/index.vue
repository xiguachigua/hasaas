<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card v-loading="loading" class="tree-card">
        <!-- 主体 -->
        <TreeTools
          :node-data="company"
          :is-root="true"
          @add-depts="addDepts"
        />
        <!-- 列表部分 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          default-expand-all
        >
          <template #default="{data}">
            <!-- 用了一个行列布局 -->
            <TreeTools
              :node-data="data"
              @edit-depts="handleAddDepts"
              @add-depts="addDepts"
              @del-depts="getDepartement()"
            />
          </template>
        </el-tree>
        <!-- 弹出框 -->
        <AddDept
          ref="deft"
          :list="list"
          :show-dialog.sync="showDialog"
          :node-data="nodeData"
          @add-depts="getDepartement"
          @close-dalog="showDialog"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { Reqgetdepartment } from '@/api/departments'
import { transLisToTree } from '@/utils'
export default {
  name: 'DepartmentsIndex',
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      list: [],
      // 弹出框控制变量
      showDialog: false,
      departs: [],
      nodeData: {},
      company: {},
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      loading: false
    }
  },
  created() {
    this.getDepartement()
  },
  methods: {
    // 编辑
    handleAddDepts(nodeData) {
      this.showDialog = true
      this.nodeData = nodeData
      this.$nextTick(() => {
        this.$refs.deft.getDepartDetail()
      })
    },
    async getDepartement() {
      this.loading = true
      const { data: { depts, companyName }} = await Reqgetdepartment()
      this.list = depts// 列表式数据
      this.departs = transLisToTree(depts, '')
      this.company = { name: companyName, manager: '负责人', id: '' }
      this.loading = false
    },

    addDepts(data) {
      this.showDialog = true
      this.nodeData = data
    }

  }
}
</script>

  <style scoped lang="scss">
.tree-card {
  padding: 30px 30px;
  font-size:14px;
}
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>

<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <PageTools>
        <!-- 具名插槽 -->
        <!-- <template v-solt:left> -->
        <template #left>
          <span> 本月: 社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>

      <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" type="index" sortable="" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column label="聘用形式" :formatter="formOfEmployment" prop="formOfEmployment" sortable="" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template #default="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="Delete(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>

      </el-card>

      <!-- 弹窗1 给父组件传递的prop时, 加上 .sync 修饰符 -->
      <AddEmployee :show-dialog.sync="showDialog" />

    </div>
  </div>
</template>

<script>
// 导入
import AddEmployee from './components/add-employee.vue'
import { reqGetEmployeeList, reqDelEmployee } from '@/api/employees'
// 默认到入
import EmployyeeEnum from '@/api/constant/employees'
export default {
  name: 'EmployeesIndex',
  components: {
    AddEmployee

  },
  data() {
    return {
      list: [],
      page: 1, // 当前页
      pageSize: 10, // 每页条数
      total: 0, // 总数
      loading: false,
      showDialog: false // 控制弹窗
    }
  },
  created() {
    this.getUserEmp()
  },
  methods: {
    // 删除
    async   Delete(id) {
      const res = await this.$confirm('你确定要删除吗?,提示消息').catch(err => err)
      if (res === 'cancel') return
      await reqDelEmployee(id)
      this.getUserEmp()
      this.$message.success('删除成功')
    },
    // 格式化聘用形式
    formOfEmployment(row, column, cellvalue, index) {
      const obj = EmployyeeEnum.hireType.find(item => item.id === cellvalue)
      return obj ? obj.value : '未知'
    },
    // 获取员工列表
    async getUserEmp() {
      this.loading = true
      const { data: { rows, total }} = await reqGetEmployeeList(this.page, this.pageSize)
      this.list = rows
      this.total = total
      this.loading = false
    },
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getUserEmp()
    }

  }

}
</script>

<style>

</style>

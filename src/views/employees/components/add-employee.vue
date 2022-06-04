<template>
  <el-dialog title="新增员工" :visible="showDialog" top="8vh" @close="closeDialog()" @click.native="clickDialog()">
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width:50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in Employees.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width:50%"
          placeholder="请选择部门"
          @click.native.stop="getDepartments()"
        />
        <div v-if="showTree" class="tree-box">
          <el-tree
            v-loading="loading"
            :data="treeData"
            :props="{ label: 'name' }"
            @node-click="selectNode"
          />
        </div>

      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="ADDgetEmployees">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import Employees from '@/api/constant/employees'
import { Reqgetdepartment } from '@/api/departments'
import { transLisToTree } from '@/utils/index'
import { reqGetDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import { AddEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Employees, // 调用js
      loading: false,
      showTree: false,
      treeData: [], // 定义数组接收树形数据,
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 提交
    ADDgetEmployees() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return
        await AddEmployee(this.formData)
        this.$message.success('提交成功')
        this.closeDialog()
        // 更新数据
        this.$parent.getUserEmp
        // 父向子传值 1.自定义属性  2.this.$children
        // 子传父传值 2.自定义事件  2.this.$parent
      })
    },
    // 判断树状结构
    selectNode(data) {
      // 子节点  数据data   点击没有孩子直接赋值      有孩子false执行点击其他的    --> data的孩子   孩子的孩子
      // console.log(data, data.children)
      if (data.children && data.children.length > 0) return
      this.formData.departmentName = data.name
      this.showTree = false
    },
    // input隐藏  阻止冒泡
    clickDialog() {
      this.showTree = false
    },

    created() {
      this.getEmployee()
    },
    async getDepartments() {
      // 显示隐藏input
      this.showTree = !this.showTree
      if (!this.showTree) return
      this.loading = true
      const { data } = await Reqgetdepartment()
      this.treeData = transLisToTree(data.depts, '')
      this.loading = false
    },
    // 子传父
    closeDialog() {
      this.$refs.addForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getEmployee() {
      const { data: { depts }} = await reqGetDepartments()
      // depts是数组 但不是树形, 需要转换成属性结构, 才能被 el-tree 展示
      this.treeData = tranListToTreeData(depts, '')
      console.log(this.treeData)
    }
  }

}
</script>
<style lang="scss" scoped>
  .tree-box {
  position: absolute;
  width: 50%;
  min-height: 50px;
  left: 0;
  top: 45px;
  z-index: 100;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 5px;
  overflow: hidden;
  background-color: #fff;
}
</style>

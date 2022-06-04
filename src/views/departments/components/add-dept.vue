
<template>
  <el-dialog
    :title="showTitle"
    :visible="showDialog"
    :show-dialog.sync="showDialog"
    @close="handleClose"
    @open="handleOpen"
  >
    <!-- 表单区域 model  rules   prop  v-model-->
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="refForm" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :value="item.username"
            :label="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button type="primary" size="small" @click="clickSubmit">确定</el-button>
      <el-button size="small" @click="handleClose">取消</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { reqGetSimple } from '@/api/employees'
import { reqAddDepartments, reqGetDepartments, reqPutDepartments } from '@/api/departments'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      //   require:''
      default: true
    },
    // nodeData父部门的信息   父亲是中介
    nodeData: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      required: true
    }

  },

  data() {
    // 部门名称不能与父部门中的子部门名称相同
    // 解决方案 :找pid 与nodeName.id相同的数据
    // 这个函数的目的是 去找 同级部门下(父id相同) 是否有重复的部门名称
    const checkName = (rule, value, callback) => {
      let arr = []
      // 1.过滤父部门的id 找到所有的子部门
      // 根据新增的  编辑的id是不一样的
      if (this.form.id) {
        if (value === this.nodeData.name) {
          callback()
          return
        }
        arr = this.list.filter(item => item.pid === this.nodeData.pid)
      } else {
        arr = this.list.filter(item => item.pid === this.nodeData.id)
      }

      // 筛选
      const isRepeat = arr.some(item => item.name === value)
      // 2.判断输入部门名称是否在子部门数组中里面
      isRepeat ? callback(new Error('部门名称重复')) : callback()
      // 按照场景来理解  思路
      /* 1.过滤父部门的id 找到所有的子部门
         2.判断输入部门名称是否在子部门数组中里面
       */
    }
    const checkCode = (rule, value, callback) => {
      if (this.form.id && value === this.nodeData.code) {
        callback()
        return
      }
      const isRepeat = this.list.some(item => item.code === value)
      isRepeat ? callback(new Error('编码重复 ')) : callback()
    }
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍}
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          {
            validator: checkCode, trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      },
      peoples: []
    }
  },
  computed: {
    showTitle() {
      return this.form.id ? '编辑部门' : '新增部门'
    }
  },

  /* 点击新增  弹出框显示  传数据  tree-tools.vue
      1.   this.$emit('add-depts', this.nodeData)// 单向数据流

  --->index.vue 父组件
      1.  @add-depts="addDepts"
      2. addDepts(data) {
       // a.显示弹出框
       // b.把父部门的数据传到弹出框
       this.nodeData = data}
      3.  nodeData: {},
      4. :node-data="nodeData"
  --->add-dept.vue  父传子props
      1.nodeData: {
          type: Object,
          require: true
        },
 */
  // 渲染部门负责人
  created() {
    this.handleOpen()
  },
  methods: {
    async   handleOpen() {
      const { data: res } = await reqGetSimple()
      this.peoples = res
    },
    async getDepartDetail() {
      const { data: res } = await reqGetDepartments(this.nodeData.id)
      this.form = res
    },
    // 取消
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.refForm.resetFields()
      this.form = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    // 提交表单
    clickSubmit() {
    // console.log('提交')
      this.$refs.refForm.validate(async value => {
        if (!value) return
        if (this.form.id) {
          await reqPutDepartments(this.form)
          this.$message.success('修改成功')
        } else {
          await reqAddDepartments({ ...this.form, pid: this.nodeData.id })
          this.$message.success('新增更新')
        }

        // 1.通知父组件更新
        this.$emit('add-depts')
        // 2.关闭弹窗
        this.handleClose()
      })
    }
  }
}
/* tree-tools.vue  添加子部门
 1.@command="handleCommand"
 2. this.$emit('add-depts')
 子传父

 --->  index.vue
 1.import AddDept from './components/add-dept.vue'
 1. @del-depts="getDepartement()"
 2.:show-dialog="showDialog" --->  封装的组件弹出来
 3. @close-dalog="showDialog=false" --->true

 父传另外一个儿子
 ---> (弹框出来)add-dept.vue
 1. props: {
    showDialog: {
      type: Boolean,
      //   require:''
      default: true
    },
 2. :show-dialog="showDialog"--->true
 3.弹出来 */
</script>

<style scoped lang="scss">

</style>

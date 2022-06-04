<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <!-- 左侧 -->
          <el-tab-pane label="角色管理" name="third">
            <!-- 新增按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="clickShowAdd "
            >新增角色</el-button>
            <!-- 表格 -->
            <el-table v-loading="loading" :data="roleList" class="addBtn" border stripe>
              <el-table-column :index="indexMethod" label="序号" width="100" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <!-- 作用域插槽   默认插槽  () -->
                <template v-slot="{row}">

                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--分页 -->
            <!--
               属性:
                 1. current-page 标记当前页 (谁高亮)
                 2. page-sizes 可供选择的每页条数列表
                 3. page-size 起作用的每页条数
                 4. layout 布局, 控制是展示的控件列表布局
                 5. total 总条数
               方法:
                 @size-change="handleSizeChange" 每页条数变化
                 @current-change="handleCurrentChange" 当前页变化
             -->
            <el-pagination
              :current-page="page"
              :page-sizes="[2, 4, 7, 19]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />

          </el-tab-pane>

          <el-tab-pane label="公司信息" name="company">
            <!-- 警告信息 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <!--     新增弹出框   :visible.sync="showDialog"    .sync->关闭功能内部处理  -->
        <el-dialog :title="showTitle" :visible="showDialog" @close="closeDialog">
          <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="form.description" placeholder="请输入角色描述" />
            </el-form-item>
          </el-form>

          <template #footer>
            <el-button @click="btnCancel">取消</el-button>
            <el-button type="primary" @click="clickSubmit">确认</el-button>
          </template>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllRoleList, reqDeleteRole, reqAddRole,
  reqGetRoleDetail, reqUpdateRole } from '@/api/setting'
import { reqGetCompanyById } from '@/api/company'
export default {
  name: 'SettingsIndex',
  data() {
    return {
      activeName: 'third',
      page: 1, // 当前页
      pagesize: 10, // 每页条数
      total: 0, // 总条数
      roleList: [],
      loading: false,
      // 控制弹出框显示隐藏
      showDialog: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }
        ]
      },
      companyInfo: {} // /公司详情信息
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    showTitle() {
      return this.form.id ? '编辑角色' : '添加角色'
    }
  },
  created() {
    this.getRoList()
    this.getCompany()
  },
  methods: {
    // 获取公司信息
    async getCompany() {
      const { data: res } = await reqGetCompanyById(this.userInfo.companyId)
      this.companyInfo = res
    },
    // 编辑
    async  editRole(id) {
      this.clickShowAdd()
      const { data: res } = await reqGetRoleDetail(id)
      // console.log(res)
      this.form = res
    },
    // 提交
    clickSubmit() {
      this.$refs.roleForm.validate(async valid => {
        if (!valid) return
        // 判断有id编辑
        if (this.form.id) {
          // 编辑数据
          await reqUpdateRole(this.form)
          // 提示编辑
          this.$message.success('编辑成功')
        } else {
          // 发送
          await reqAddRole(this.form)
          // 提示
          this.$message.success('新增成功')
        }

        // 关闭弹窗清空数据
        this.btnCancel()
        // 刷新数据
        this.getRoList()
      })
    },

    // 取消
    btnCancel() {
      // 关闭弹框
      this.closeDialog()
      // 重置表单
      this.$refs.roleForm.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    // /控制弹框
    closeDialog() {
      this.showDialog = false
    },
    clickShowAdd() {
      this.showDialog = true
    },
    // 删除按钮
    async  delRole(id) {
      const res = await this.$confirm('你确定要删除吗?,提示消息').catch(err => err)
      if (res === 'cancel') return
      await reqDeleteRole(id)
      // 提示
      this.$message.success('删除成功')
      // 解决删除是的小bug
      if (this.roleList.length === 1 && this.page > 1) { this.page-- }
      // 刷新数据
      this.getRoList()
    },
    async    getRoList() {
      this.$loading = true
      const { data: { rows, total }} = await getAllRoleList(this.page, this.pagesize)
      this.total = total
      this.roleList = rows
      this.$loading = false
    },
    // 每页显示条数时触发
    handleSizeChange(newSize) {
      // console.log(`当前页: ${newSize}`)
      this.pagesize = newSize
      this.getRoList()
    },
    // 页码值改变是触发
    handleCurrentChange(newPage) {
      // console.log(`每页 ${newPage} 条`)
      this.page = newPage
      this.getRoList()
    },
    // 自定义索引值
    // 按照顺序排列
    indexMethod(index) {
      return (this.page - 1) * this.pagesize + index + 1
    }

  }
}
</script>
<style lang="scss" scoped>
  .addBtn{
    margin-bottom: 15px ;
  }
</style>


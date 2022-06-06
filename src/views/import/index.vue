<template>
  <UploadExcel :on-success="UpExsuccess" />
  <!-- 全局组件 -->
</template>

<script>
import { reqAddEmployeeBatch } from '@/api/employees'
export default {
  name: 'Import',
  methods: {
    UpExsuccess({ header, results }) {
      if (this.$route.query.type === 'user') {
        this.getExcal(header, results)
      }
    },
    async getExcal(header, results) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      //   console.log(header, results)
      const arr = []
      results.forEach(item => {
        const obj = {}
        for (const k in item) {
          const cofiye = userRelations[k]
          if (['timeOfEntry', 'correctionTime'].includes(cofiye)) {
            obj[cofiye] = this.formatExcelDate(item[k], '-')
          } else {
            obj[cofiye] = item[k]
          }
        }
        console.log(obj)
        arr.push(obj)
      })
      await reqAddEmployeeBatch(arr)
      this.$message.success('成功')
      this.$router.push('/employees')
    },
    formatExcelDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
        // 2020-10-10
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
      // 20201010
    }
  }
}
</script>

<style>

</style>

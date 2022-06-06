<template>
  <div class="upload-box">
    <el-upload
      action="#"
      list-type="picture-card"
      :on-remove="handleRemove"
      :on-preview="preview"
      :file-list="fileList"
      :limit="limit"
      :class="{disabled:fileNumber}"
      :http-request="handleRequest"
      :on-change="handleChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog width="600px" top="8vh" title="图片预览" :visible.sync="showDialog">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
var cos = new COS({
  // SecretId: 'COS_SECRETID', // 身份识别 ID
  // SecretKey: 'COS_SECRETKEY' // 身份密钥
  // 自己的
  SecretId: 'AKIDhBPN4UdU5PUIq8AuObXCbjbCWaOvBBvO',
  SecretKey: 'EApFOGrBE1XnkSt3wYtymJZZIkvpSoth'
  // SecretId: 'AKIDUC4FnBH7i130JXUAZhY7PRCgGchUBFD',
  // SecretKey: 'jBMHvHNDm45qLYU9XeU2KL5YjeIf1bAS'

})
import COS from 'cos-js-sdk-v5'
export default {
  name: 'ImagUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [
        { url: 'https://changzipi-1312329344.cos.ap-nanjing.myqcloud.com/43132ea4600625009c5a568d8e28d50701e8--2758934243.jpg' },
        { url: 'https://changzipi-1312329344.cos.ap-nanjing.myqcloud.com/43132ea4600625009c5a568d8e28d50701e8--2758934243.jpg' }
      ],
      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    fileNumber() {
      return this.fileList.length >= this.limit
    }
  },
  methods: {
    // 隐藏加号

    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    // 校验
    beforeUpload(file) {
      // 1. 限制文件类型 file.type
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传的图片格式, 必须是jpg, gif, bmp, png的格式!')
        return false
      }
      // 2. 限制文件大小 file.size
      if (file.size / 1024 / 1024 >= 5) {
        this.$message.error('上传头像过大, 超过了5M, 必须5M以内')
        return false
      }
      return true
    },
    // 图片预览
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除
    handleRemove(file, fileList) {
    //   console.log(file)
    //   this.fileList = this.fileList.filter(item => item.uid === file.uid)
      this.fileList = [...fileList]
    //   console.log(fileList)
    },
    // 图片上传
    handleRequest(obj) {
      console.log('上传成功', obj)

      // 上传到云服务器

      // cos.putObject({
      //   Bucket: 'hrsaas74-1306928155', /* 填入自己的存储桶必须 */
      //   Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
      //   Key: parseInt(Math.random() * 10000) + obj.file.name, /* 必须 */
      //   StorageClass: 'STANDARD',
      //   Body: obj.file // 上传文件对象
      // }, function(err, data) {
      //   console.log(err || data)
      // })
      cos.putObject({
        Bucket: 'changzipi-1312329344', /* 填入自己的存储桶必须 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: parseInt(Math.random() * 10000) + obj.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: obj.file // 上传文件对象
      }, (err, data) => {
        // console.log(err || data)
        if (err) return
        // 图片上传成功
        const fileObj = this.fileList.find(item => item.uid === obj.file.uid)
        // 1.图片状态 status变为success
        fileObj.status = 'success'
        // 2. 腾讯云图片地址替换预览地址
        fileObj.url = 'https://' + data.Location
        this.$message.success('上传成功')
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.disabled{
    ::v-deep{
      .el-upload--picture-card{
          display: none;
    }
    }
}
 </style>

<template>
  <el-card>
    <div class="page-tools">
      <!-- 左侧 -->
      <div class="left">
        <!--
              左边右边的内容不是写死的, 而是通过插槽定制的, 且如果左侧插槽没有传, 那么左边的tips就没有必要显示了
           `tips`: 通过 $slots 可以拿到所有的插槽列表,  `$slot.插槽名`  可以用于判断该插槽是否传值
           -->
        <div v-if="$slots.left" class="tips">
          <i class="el-icon-info" />
          <slot name="left" />
        </div>
      </div>
      <div class="right">
        <!-- 右侧 -->
        <slot name="right" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PagTools'
}
</script>

<style lang="scss" scoped>
.page-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tips {
    line-height: 34px;
    padding: 0px 15px;
    border-radius: 5px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
    i {
      margin-right: 10px;
      color: #409eff;
    }
  }
}
</style>

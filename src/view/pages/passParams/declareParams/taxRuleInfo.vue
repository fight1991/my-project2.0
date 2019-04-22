<template>
  <section class='sys-main'>
    <el-row>
      <el-form :model="taxForm" label-width="300px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="商品编号">
              <span>123</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </section>
</template>
<script>
export default {
  data () {
    return {
      taxForm: {

      }
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
</style>

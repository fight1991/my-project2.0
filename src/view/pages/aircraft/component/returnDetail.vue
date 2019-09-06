<template>
  <section class='airvehicle-return'>
    <div>
      <el-row style="margin-bottom:15px;">
        <div class="aireturn-btn">
          <el-button size="mini" class='icon-btn' @click="refresh"><i class="fa fa-refresh"></i>刷新</el-button>
          <el-button size="mini" class='icon-btn' @click="closeTemplate"><i class="fa fa-close"></i>关闭</el-button>
        </div>
        <div class="aireturn-title">航空器回执</div>
      </el-row>
      <el-row>
        <el-table class='sys-table-table dec-table' border highlight-current-row size="mini" :data="resultList">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column label="申报对象" min-width="150">
            <template slot-scope="scope">
              海关
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="回执时间" align="center" min-width="150"></el-table-column>
          <el-table-column prop="rcptStatusValue" label="回执状态" align="left" min-width="150"></el-table-column>
          <el-table-column prop="rcptCntt" align="left" label="回执内容" min-width="200"></el-table-column>
        </el-table>
      </el-row>
    </div>
  </section>
</template>
<script>
import util from '@/common/util'
export default {
  data () {
    return {
      resultList: []
    }
  },
  props: ['data', 'pid', 'type'],
  created () {
    this.resultList = util.isEmpty(this.data) ? [] : this.data
  },
  methods: {
    refresh () {
      let data = {
        pid: this.pid,
        type: this.type
      }
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/cds/common/getCdsRecords',
        data: data,
        router: this.$router,
        success: (res) => {
          this.resultList = util.isEmpty(res.result) ? [] : res.result
        }
      })
    },
    closeTemplate () {
      this.$emit('colseTemplate')
      this.resultList = []
    }
  }
}
</script>
<style lang="less" scoped>
@import (less) '../css/common.less';
</style>

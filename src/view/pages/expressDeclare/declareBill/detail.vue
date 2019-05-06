<template>
  <section class='sys-main'>
    <!-- 返回按钮 -->
    <el-row>
      <el-col :span='12' :xs='24'>
        <span @click="$router.go(-1)" class="sys-back-btn"><i class="back-btn"></i>返回</span>
      </el-col>
      <el-col :span='12' :xs='24'>
        <div style="text-align: right;"><el-button size="mini" type="primary" @click="declare">申报</el-button></div>
      </el-col>
    </el-row>
    <!-- 返回按钮 end-->
    <el-row>
      <div class='query-body'>
        <el-row class="form-table-panel">
          <el-form :model="headData" label-width="150px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="申报地海关">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="录入单位">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="操作员">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="">
                  <span class="no-input"></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <div class='query-body'>
        <el-row class="form-table-panel">
          <el-form :model="headData" label-width="150px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="海关编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预录入号码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="KJ编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进出口日期">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="进出口标志">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总运单号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分运单号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进出口岸代码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="报关类别">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报单位类别">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="监管方式">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="指运港(装货港)">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="运输工具名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输工具航次(班)号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输方式代码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="收发货人编码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收发货人名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收发货人性质">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="贸易国(地区，起/抵运地)">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="货主单位地区代码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="货主单位代码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="货主单位名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="征免性质分类">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成交方式">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="码头/货场代码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="主要货物名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="包装种类">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成交方式">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="码头/货场代码">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="主要货物名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="包装种类">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </el-row>
  </section>
</template>
<script>
export default {
  data () {
    return {
      headData: {

      }
    }
  },
  methods: {
    // 申报
    declare () {

    }
  }
}
</script>
<style lang="less" scoped>
.sys-back-btn{
  display: inline-block;
  font-size: 13px;
  color: @font-color-main;
  cursor: pointer;
  .back-btn{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background: url('../../../../assets/img/icon/back.png') no-repeat center center;
    background-size: 100%;
    vertical-align: middle;
  }
}
.no-input{
  display: inline-block;
}
.mg-b-20{
  margin-bottom: 20px;
}
</style>

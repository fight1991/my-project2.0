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
                <el-form-item label="进出口口岸">
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
                <el-form-item label="申报状态">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="总运单号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="舱单进出口标志">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="统一编号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输工具航次(班)号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="中文运输工具名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文运输工具名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进港日期">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="起运港/抵运港">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="分运单总数">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总重量(公斤)">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总件数">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输方式">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="记录类型">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报日期">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
        <el-row class="mg-b-20">
          <el-table class='sys-table-table express-table' :data="detailList" border highlight-current-row size="mini">
            <el-table-column label="顺序号" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="分运单号" min-width="130">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="主要货物名称" min-width="160">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="件数" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="重量" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="价值" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="币制" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="申报日期" min-width="130">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="form-table-panel">
          <el-form :model="bodyData" label-width="150px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="顺序号">
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
                <el-form-item label="主要货物名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="件数">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="重量(公斤)">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价值">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="币制">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="申报日期">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="">
                  <span class="no-input"></span>
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

      },
      detailList: [],
      bodyData: {

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

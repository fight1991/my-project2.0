<template>
  <section>
    <div class='border'>
      <el-form :model="goodsDialog" ref="goodsDialog" :rules="dialogRule" size="mini" label-position="right">
        <el-row>
          <el-col :span="21" :offset="3">
            <el-row :gutter="10" style="margin-bottom:10px" v-for="(item2,index) in goodsDialog.goods" :key="index">
              <el-col :span="7">
                <el-form-item :prop="'goods.'+index+'.gNo'" :rules="dialogRule.gNo">
                  <el-input size="mini" clearable v-model="item2.gNo" placeholder="请输入商品编号" :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-input size="mini" clearable v-model="item2.gName" placeholder="请输入商品名称" :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :prop="'goods.'+index+'.declaredQuantity'" :rules="dialogRule.declaredQuantity">
                  <el-input size="mini" clearable v-model="item2.declaredQuantity" placeholder="请输入申报数量" :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button type="text" title="删除" @click="deleteGood(index)"  v-if="goodsDialog.goods.length > '1'"><i class="fa fa-times-circle-o"></i></el-button>
              </el-col>
            </el-row>
            <el-row>
              <span class="license-add" @click="addGood"><img class="pointer" src="../../../../../../assets/img/icon/btn-add.png"/><span>填写更多涉证商品</span></span>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="sys-dialog-footer" style="text-align:center;">
        <el-button class="layer-btn-primary" @click="saveForm(item)">确定</el-button>
        <el-button class="layer-btn" @click="cancleForm">取消</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import validator from '../../../../../../common/validator'
import util from '../../../../../../common/util'
export default {
  name: 'goods-dialog',
  props: {
    init: {
      type: Object,
      default () {
        return {
          item: ''
        }
      }
    }
  },
  data () {
    return {
      dialogRule: {
        gNo: [{ required: true, validator: this.checkValid, message: '请输入商品编号', trigger: 'blur' }],
        declaredQuantity: [{ required: true, validator: validator.Zz0, message: '请输入申报数量', trigger: 'blur' }]
      },
      goodsDialog: {
        goods: [{
          gNo: '',
          gName: '',
          declaredQuantity: ''
        }]
      }
    }
  },
  mounted () {
    // this.item = this.init.item
  },
  methods: {
    // 校验
    checkValid (rule, value, callback) {
      if (util.isEmpty(value)) {
        this.$refs['goodsDialog'].clearValidate()
        callback(new Error(''))
      } else {
        const pattern = /^[A-Za-z\u4e00-\u9fa5]+$/
        if (!pattern.test(value)) {
          this.$refs['goodsDialog'].clearValidate()
          callback(new Error(''))
        } else {
          callback()
        }
      }
    },
    // 更多商品
    addGood () {
      this.goodsDialog.goods.push({
        gNo: '',
        gName: '',
        declaredQuantity: ''
      })
    },
    // 删除商品
    deleteGood (index) {
      this.goodsDialog.goods.splice(index, 1)
    },
    // 保存
    saveForm (item) {
      this.$refs['goodsDialog'].validate((valId) => {
        if (!valId) {
          return false
        }
        this.$emit('backDatas', {item: util.simpleClone(this.goodsDialog.goods)})
      })
    },
    // 取消
    cancleForm () {
      this.$emit('cancLeData')
    }
  }
}

</script>
<style lang='less' scoped>
// .border{
//     border: 1px solid #B7B7B7;
//     border-bottom: 0;
//   }
</style>

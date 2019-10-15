
<template>
  <section>
    <el-dialog
      title="取值xlsx测试"
      :visible.sync="userTemplateVisabled"
      :show-close='false'
      :modal-append-to-body='false'
      class='sys-dec-class'
      width="80%">
      <el-upload
          ref="upload"
          action="/wm/upload/"
          :show-file-list="false"
          :on-change="readExcel"
          :auto-upload="false">
        <el-button
            slot="trigger"
            icon="el-icon-upload"
            size="small"
            type="primary">
          上传文件
        </el-button>
        <el-button size="small" @click="getText">获取A1</el-button>
      </el-upload>
    </el-dialog>
  </section>
</template>
<script>
import XLSX from 'xlsx'
export default {
  name: '',
  data () {
    return {
      workbook: {}
    }
  },
  created () {

  },
  mounted () {
    this.$refs.upload.$el.querySelector('.el-upload__input').addEventListener('change', e => {
      this.readExcel(e)
    })
  },
  methods: {
    readExcel (file) {
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          this.workbook = XLSX.read(data, {
            type: 'binary'
          })
          // for (let sheet in this.workbook.Sheets) {
          //   const sheetArray = XLSX.utils.sheet_to_json(this.workbook.Sheets[sheet])
          //   console.log(sheetArray)
          // }
        } catch (e) {
          this.messgeTips('文件类型不正确！')
          return false
        }
      }
      // fileReader.readAsBinaryString(file.raw)
    },
    getText () {
      let firstSsheetName = this.workbook.SheetNames[0]
      let addressOfCell = 'A1'
      /* Get worksheet */
      let worksheet = this.workbook.Sheets[firstSsheetName]
      /* Find desired cell */
      let desiredCell = worksheet[addressOfCell]
      /* Get the value */
      let desiredValue = (desiredCell ? desiredCell.v : undefined)
      if (desiredValue) {
        alert(desiredValue)
      } else {
        alert('没有当前值')
      }
    }
  }
}
</script>
<style scoped lang="less">

</style>

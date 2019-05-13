// 定义form表单 label的统一宽度
const labelWidth = {
  data () {
    return {
      labelWidth: {
        seven: '110px', // label 7个字的宽度 超过6个字折行,配合css使用
        six: '', // label 6个字的宽度
        five: '',
        four: '',
        three: '',
        two: ''
      }
    }
  }
}

export { labelWidth }

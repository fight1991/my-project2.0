<template>
  <div class="aboutUs">
    <!-- 背景图区域 -->
    <div class="banner none">
      <img :src="bannerList[2]" alt="">
    </div>
    <!-- 公司简介 -->
    <div class="companyIntro">
      <div class="title">
          <p class="big">公司简介</p>
          <p class="light">COMPANY PROFILE</p>
      </div>
      <div class="detail mainer clearfix">
        <div class="text fl">
          <h3>朗新金关信息科技有限公司</h3>
          <p>朗新金关科技有限公司成立于2006年，公司从事海关管辖的加工贸易企业电子联网、关务管理、核查核销等关务专业软件开发及海关内部管理系统的软件开发；公司取得中国电子口岸认证的《电子联网资格认定证书》根据海关总署数据中心颁发的2007年115号文件，朗新金关成为全国13家具有合格资质的联网软件软件供应商。</p>
          <p>朗新金关不仅作为国家“单一窗口”标准版建设的主要力量，另外依托开发优势为各地方智慧口岸建设提供方案设计、系统设计、运维服务等方面的能力输出。并且将以移动、智能、协同为创新应用亮点，从报关行、货代、货主、供应商、监管机构等多位视角，打造形成围绕通过物流生态圈的线上关务服务平台。</p>
          <h3 style="margin-top:20px">朗新科技集团</h3>
          <p>朗新金关信息科技有限公司是朗新科技集团创新业务板块的重要组成部分，着力于以创新思维提供新外贸信息化的整理解决方案。</p>
          <p>朗新科技（股票代码：300682）语出《淮南子》：“日出天霁，朗而新之”，公司注册资本36000万，员工2000人，专业提供众多领域的应用解决方案，主要业务涉及电信、电力、供应链管理、人力资源管理、关务管理、大数据应用等。</p>
          <p>朗新科技获得“国家发改委”、“财政部”、“信息产业部”、“商务部”、“国家税务总局”五部委颁发的“国家规划布布局内重点软件企业证书”，跻身“中国软件产业最大规模前100家企业”。</p>
        </div>
        <div class="photo fr">
          <img src="@/assets/www-img/images/gongsijianjiepeitu.png" alt="">
        </div>
      </div>
    </div>
    <!-- 联系我们区域 -->
    <div class="contactUs">
      <!-- <div class="title">
        <p class="big">联系我们</p>
        <p class="light">CONTACT US</p>
      </div> -->
      <div class="nameCard mainer">
        <!-- <img src="@/assets/www-img/images/map.png" alt=""> -->
        <e-chart :datas='mapChartData' :reset='resetChartData' height="1000px"></e-chart>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../common/eventBus'
export default {
  data () {
    return {
      bannerList: ['@/assets/www-img/images/banner01.png', '@/assets/www-img/images/banner02.png', '@/assets/www-img/images/banner03.png'],
      formData: {
        name: '',
        mobile: '',
        code: '',
        corpName: '',
        email: ''
      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      timerId: 0, // 存储定时器的值
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {pattern: /^[(\u4e00-\u9fa5)|(a-zA-Z0-9)]+$/, message: '姓名不能包含特殊字符', trigger: 'blur'},
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {pattern: /^(1)(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
        ],
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入4位验证码', trigger: 'blur' },
          {pattern: /^\d{4}$/, message: '请输入4位数字', trigger: 'blur'}
        ],
        email: [
          {pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱', trigger: 'blur'}
        ]
      },
      resetChartData: '',
      mapChartData: {} // 地图
    }
  },
  mounted () {
    this.doInitMap()
    window.onresize = () => {
      return (() => {
        this.resetChartData = Math.random()
      })()
    }
    if (this.$route.hash) { // 说明是点击预约按钮跳转过来的,则定位到锚点
      eventBus.$emit('custormAnchor', 'anchor')
    }
  },
  methods: {
    // 初始化地图信息
    doInitMap () {
      this.mapChartData = {
        title: {
          text: ''
        },
        // backgroundColor: '#FFFFFF',
        tooltip: {
          trigger: 'item',
          formatter: function (param) {
            return param.name
          }
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [{
              // feature是特征，element是元素
              'featureType': 'water', // 水
              'elementType': 'all',
              'stylers': {
                'color': '#9DDDFB'
              }
            }, {
              'featureType': 'land', // 陆地
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'boundary', // 边界
              'elementType': 'geometry',
              'stylers': {
                'color': '#064f85'
              }
            }, {
              'featureType': 'railway', // 铁路
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'highway', // 高速及国道
              'elementType': 'all',
              'stylers': {
                'color': '#fdfdfd'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial', // 城市主路
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'poi', // 定位
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'building', // 建筑物
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'label',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#999999'
              }
            }]
          }
        },
        series: [
          {
            name: '集团驻地',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: [{'name': '朗新科技股份有限公司-上海分公司', 'value': ['121.48789948569473', '31.24916171001514']}],
            symbolSize: function (val) {
              return 8
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'purple',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            }
          },
          {
            name: '报关协会',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [{'name': '深圳报关协会', 'value': ['114.0259736573215', '22.546053546205247']}],
            symbolSize: function (val) {
              return 8
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#0A3DFB',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            }
          }
        ]
      }
    },
    orderNow () { // 立即预约请求
      this.$refs['Form'].validate(async valid => {
        if (valid) {
          // 发送ajax请求
          let {data} = await this.axios.post('/login/login/addAppointment',
            this.formData
          )
          console.log(data)
          if (data.code === '0000') { // 成功
            this.$message({
              type: 'success',
              message: '预约成功'
            })
            // 重置表单
            this.$refs['Form'].resetFields()
            // 清空定时器和重置验证码按钮
            clearInterval(this.timerId)
            this.timerId = 0
            this.totalTime = 60
            this.content = '发送验证码'
          } else if (data.code === '0001') { // 验证码失效
            this.formData.code = ''
            this.$message({
              type: 'error',
              message: data.message
            })
            // 移除表单校验结果
            this.$refs['Form'].clearValidate('code')
            this.$refs['mobileCode'].focus()
          } else {
            this.$message({
              type: 'error',
              message: data.message + ',请稍后再试'
            })
          }
        }
      })
    },
    async sendCode () { // 获取验证码请求
      let mobile = this.formData.mobile
      let reg = /^(1)(3|4|5|6|7|8|9)\d{9}$/
      if (!mobile) {
        this.$message({
          type: 'error',
          message: '请输入手机号'
        })
        return
      }
      if (!reg.test(mobile)) {
        return
      }
      // 倒计时开启
      this.countDown()
      // 发送请求 获取验证码
      let {data} = await this.axios.post('/login/login/getValidateCode', {
        mobile,
        type: 'subscribe'
      })
      if (data.code === '0000') {
        this.$message({
          type: 'success',
          message: data.message
        })
      }
    },
    countDown () { // 倒计时功能
    // 如果发现有定时器运行 return
      if (this.timerId) return
      this.content = this.totalTime + 's后重新发送'
      this.timerId = setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          // 清除定时器
          clearInterval(this.timerId)
          this.timerId = 0
          this.totalTime = 60
          this.content = '点击重新发送'
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
// 公司简介区域
.companyIntro {
  margin: 60px 0;
}
.big {
    font-size: 22px;
    color: #2E2E2E;
    font-weight: bold;
    text-align: center;
  }
.light {
    color: #999;
    font-size: 16px;
    text-align: center;
    margin: 5px 0 20px 0;
  }
  .detail {
    h3 {
      color: black;
      font-size: 16px;
      font-weight: bold;
      margin: 10px 0;
    }
    p {
      text-indent: 1em;
      line-height: 26px;
    }
    .text {
      width: 70%;
      padding-right: 30px;
    }
    .photo {
      width: 30%;
    }
  }
  // 联系我们区域
  .contactUs {
    padding: 60px 0;
    .light {
      margin-bottom: 0;
    }
  }
  // 在线预约区域
  .orderInline {
    padding-top: 20px;
    padding-bottom: 40px;
    .line {
      height: 0;
      border-top: 1px solid #ccc;
      width: 550px;
      margin: 20px auto;
      text-align: center;
      span {
        display: block;
        background: #fff;
        width: 460px;
        margin: 0 auto;
        margin-top: -10px;
        color: #999;
      }
    }
    .btn-now {
      padding: 20px 0;
      text-align: center;
      button {
        background-color: #FF7200;
        width: 200px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .sendCode {
      position: absolute;
      right: 28px;
      top: 8px;
      border: none;
      border-left: 1px solid #ccc;
      border-radius: 0;
      box-sizing: border-box;
      padding: 5px 5px 5px 10px;
    }
  }
</style>

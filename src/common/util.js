export default {
  // 是否为空：true为空-false不为空
  isEmpty: function (obj) {
    if (obj === null || obj === undefined || obj === '') {
      return true
    }
    return false
  },
  // 检测系统的平台
  checkSys: function () {
    let ua = navigator.userAgent.toLowerCase()
    let sys = 'pc'
    if (ua.indexOf('micromessenger') !== -1) {
      sys = 'wx'
    } else if (ua.indexOf('android') > -1 || ua.indexOf('Linux') > -1) {
      sys = 'android'
    } else if (ua.indexOf('iphone') > -1) {
      sys = 'ios'
    } else if (ua.indexOf('windows phone') > -1) {
      sys = 'winphone'
    }
    return sys
  },
  /** 日期格式化
   * value:值；format：yyyy-MM-dd hh:mm:ss
  */
  dateFormat: function (value, format = 'yyyy-MM-dd hh:mm:ss') {
    if (!this.isEmpty(value)) {
      let time
      if (!value) return ''
      if (typeof value === 'string') {
        value = value.split('.')[0]
        time = new Date(value.replace(/-/g, '/').replace(/T|Z/g, ' ').trim())
      } else if (typeof value === 'object') {
        time = new Date(value)
      }
      let o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o) { if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    } else {
      format = ''
    }
    return format
  },
  // 金额格式化：带千分符+两位小数
  formatMoney: (value, decimals = 2, dec = '.', sep = ',') => {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
    value = (value + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+value) ? 0 : +value
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let s = ''
    let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec)
      return '' + Math.round(n * k) / k
    }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    var re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      if ((s[1] || '').length < 2) {
        s[1] += new Array(2 - s[1].length + 1).join('0')
      }
    }
    return s.join(dec)
  },
  // 对象深拷贝
  simpleClone: function (data) {
    var obj = {}
    obj = JSON.parse(JSON.stringify(data))
    return obj
  },
  // 字符串截取+省略号
  getStrByNum: function (value, num) {
    let str = ''
    if (value !== null && value !== '' && value !== undefined) {
      str = value.length < num ? value : value.substring(0, num - 1) + '···'
    }
    return str
  },
  // 删除数组某个值
  removeByValue: function (obj, val) {
    for (var i = 0; i < obj.length; i++) {
      if (obj[i] === val) {
        obj.splice(i, 1)
        break
      }
    }
  },
  // 预览文件
  fileView: function (url) {
    let width = 800
    let height = 500
    let top = (window.screen.availHeight - height) / 2
    let left = (window.screen.availWidth - width) / 2
    window.open(url, '文件查看', 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ',toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no')
  },
  // 获取N天后的日期
  getNdayDate: function (startDay, days) {
    var d = startDay
    var year = d.getFullYear()
    var mon = d.getMonth() + 1
    var day = d.getDate()
    if (day <= days) {
      if (mon > 1) {
        mon = mon - 1
      } else {
        year = year - 1
        mon = 12
      }
    }
    d.setDate(d.getDate() + days)
    year = d.getFullYear()
    mon = d.getMonth() + 1
    day = d.getDate()
    return year + '/' + (mon < 10 ? ('0' + mon) : mon) + '/' + (day < 10 ? ('0' + day) : day)
  },
  /**
 * 获取去除token的地址
 */
  delTokenUrl: function () {
    let url = window.location.href
    let callbackUrl = url.split('?')[0]
    if (url.indexOf('?') !== -1) {
      let obj = this.GetRequest()
      if (Object.keys(obj).length > 0) {
        callbackUrl += '?'
        let x = 1
        for (let item in obj) {
          if (item !== 'token') {
            if (x === 1) {
              callbackUrl += item + '=' + obj[item]
            } else {
              callbackUrl += ':::' + item + '=' + obj[item]
            }
            x++
          }
        }
      }
    }
    return callbackUrl
  },
  /**
 * 截取ip地址后面的参数的对象
 */
  GetRequest () {
    let url = location.search // 获取url中"?"符后的字串
    let theRequest = {}
    if (url.indexOf('?') !== -1) {
      let str = url.substr(1)
      let strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest
  },
  encode: function (input) {
    var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = this.utf8Encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    }
    return output
  },
  utf8Encode: function (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  },
  /**
   * @description 通过文件名的后缀得出 文件类型
   * @param {String} fileName 文件名 带文件后缀 如 111.pdf  222.xls 333.jpeg
   * @return {String} 返回 文件类型  或者空
   */
  getFileTypeByName: function (fileName) {
    let computFileType = ''
    let type = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
    switch (type) {
      case 'xls':
        computFileType = 'application/vnd.ms-excel'
        break
      case 'xlsx':
        computFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        break
      case 'doc':
        computFileType = 'application/msword'
        break
      case 'docx':
        computFileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        break
      case 'jpg':
        computFileType = 'image/jpeg'
        break
      case 'jpeg':
        computFileType = 'image/jpeg'
        break
      case 'png':
        computFileType = 'image/png'
        break
      case 'gif':
        computFileType = 'image/gif'
        break
      case 'bmp':
        computFileType = 'image/bmp'
        break
      case 'pdf':
        computFileType = 'application/pdf'
        break
      default :
        computFileType = ''
    }
    return computFileType
  }
}
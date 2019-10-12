import Vue from 'vue'
import config from '../config/config'
let currentConfig = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']
export default {
  checkRights (successCallback) {
    Vue.prototype.$post({
      url: 'API@/login/corpTenantAccount/operatePower',
      data: {
      },
      other: (res) => {
        if (res && res.success === 'false') {
          Vue.prototype.$alert(res.message, '提示', {
            confirmButtonText: '立即充值',
            type: 'warning',
            callback: action => {
              if (action === 'confirm') {
                let goChargeUrl = '/serviceCenter/recharge?showMenu=false'
                if (currentConfig.SYSID !== 'common') {
                  goChargeUrl = currentConfig['COMMON'] + goChargeUrl
                }
                window.open(goChargeUrl, '_blank')
              }
            }
          })
        }
      },
      success: (res) => {
        if (res && res.success === 'true') {
          successCallback && successCallback()
        }
      }
    })
  }
}

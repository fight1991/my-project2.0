const edocCodeSpecial = {
  '00000001': 'order',
  '00000002': 'license'
}
let edocCodes
export default {
  edocCodeHandle (result) {
    console.log(result)
    edocCodes = result && result.map(item => {
      return {
        ...item,
        relatedBusiness: edocCodeSpecial[item.codeField] ? edocCodeSpecial[item.codeField] : 'common'
      }
    })
    return edocCodes
  },
  getEdocCodesByRelatedBusiness (relatedBusiness = 'common') {
    if (!edocCodes) {
      edocCodes = window.localStorage.getItem('SAAS_EDOC_CODE')
    }
    return edocCodes.filter(item => (item.relatedBusiness === 'common' || item.relatedBusiness === relatedBusiness))
  }
}

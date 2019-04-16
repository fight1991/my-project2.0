function checkMenuCode (val) {
  let menuCode = JSON.parse(window.localStorage.getItem('menuCodes'))
  // console.log(menuCode[val], val)
  return menuCode[val] === 'true'
}
function isIE () {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true
  } else {
    return false
  }
}

export default {
  install (Vue) {
    Vue.directive('permissions', {
      bind: (el, binding) => {
        if (!checkMenuCode(binding.value)) {
          if (isIE()) {
            el.removeNode(true)
          } else {
            // el.remove()
          }
        }
      }
    })
  }
}

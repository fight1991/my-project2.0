import {decHeadItems} from './decHeadConstants'
import {decListItems} from './decListConstants'
import {containerItems} from './containerConstants'

function generateTable (items, object = {}) {
  let result = []
  items && items.forEach(item => {
    let itemCode = item.key
    result.push({
      ...item,
      cellSetting: object[itemCode + 'Cell'] || '',
      cellRule: object[itemCode + 'Fit'] ? +object[itemCode + 'Fit'] : 1,
      preview: object[itemCode + 'View'] || ''
    })
  })
  return result
}

export default{
  generateDecHeadTable (data) {
    return generateTable(decHeadItems, data)
  },
  generateDecListTable (data) {
    return generateTable(decListItems, data)
  },
  generateContainerTable (data) {
    return generateTable(containerItems, data)
  }
}

// 导入moment
import moment from 'moment'

// 格式化日期
export function formatDate(value, str = 'YYYY年MM月DD日') {
  return moment(value).format(str)
}

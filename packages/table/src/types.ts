export interface TableOptions {
  label: string,
  prop?: string,
  width?: string | number,
  align?: 'left' | 'center' | 'right',
  type?: 'default' | 'selection' | 'index' | 'expand',
  index?: string,
  columnKey?: string,
  minWidth?: string | number,
  fixed?: 'left' | 'right' | boolean,
  renderHeader?: (data: { column: any, $index: number }) => void,
  sortable?: boolean | string,
  sortMethod?: <T = any>(a: T, b: T) => number,
  sortBy?: Function | string | Object,
  sortOrders?: Object,
  resizable?: boolean,
  formatter?: Function,
  showOverflowTooltip?: boolean | Object,
  headerAlign?: 'left' | 'center' | 'right',
  selectable?: Function,
  reserveSelection?: boolean,
  filters?: Array<{text: string, value: string}>,
  
  slot?: string
  // 是否代表操作项
  action?: boolean
  // 是否是可编辑单元格
  editable?: boolean
}
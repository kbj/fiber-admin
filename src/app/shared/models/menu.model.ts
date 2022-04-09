export interface MenuTreeModel {
  id: number
  sequence: number
  parentId: number
  isHide: boolean
  type: number
  name: string
  icon?: string
  path?: string
  level: number
  open?: boolean
  children?: MenuTreeModel[]
}

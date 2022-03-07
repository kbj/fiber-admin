import {IconDefinition} from '@ant-design/icons-angular'
import * as AllIcons from '@ant-design/icons-angular/icons'
// import {LockOutline, MobileOutline, UserOutline} from '@ant-design/icons-angular/icons'

/**
 * 图标的静态导入
 */
// export const ZorroIcons: IconDefinition[] = [UserOutline, MobileOutline, LockOutline]

/**
 * 导入全部图标
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
export const ZorroIcons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key])

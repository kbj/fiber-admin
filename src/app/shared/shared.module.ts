import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ZorroModules} from './register-zorro-modules'
import {NzIconModule} from 'ng-zorro-antd/icon'
import {ZorroIcons} from './register-zorro-icons'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ComponentsModule} from './components/components.module'

/**
 * SharedModule 应该 包含 Angular 通用模块
 *  (例如：CommonModule、FormsModule、RouterModule、ReactiveFormsModule)、第三方通用依赖模块、所有组件（自己写的非业务相关的通用组件）、指令、管道；
 * SharedModule应该导出所有包含模块
 * SharedModule 不应该 有providers属性
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    NzIconModule.forChild(ZorroIcons),
    FormsModule,
    ReactiveFormsModule,
    ...ZorroModules
  ],
  exports: [CommonModule, ComponentsModule, NzIconModule, FormsModule, ReactiveFormsModule, ...ZorroModules]
})
export class SharedModule {}

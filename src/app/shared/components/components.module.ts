import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableListComponent } from './table-list/table-list.component'
import { ZorroModules } from '../register-zorro-modules'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { ZorroIcons } from '@shared/register-zorro-icons'
import { QueryFormComponent } from './query-form/query-form.component'
import { AddEditFormComponent } from '@shared/components/add-edit-form/add-edit-form.component'

const components = [TableListComponent, QueryFormComponent, AddEditFormComponent]

/**
 * 通用组件模块
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...ZorroModules, NzIconModule.forChild(ZorroIcons)],
  exports: components
})
export class ComponentsModule {}

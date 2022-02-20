import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZorroModules } from './register-zorro-modules'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { ZorroIcons } from './register-zorro-icons'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [],
  imports: [CommonModule, NzIconModule.forChild(ZorroIcons), FormsModule, ReactiveFormsModule, ...ZorroModules],
  exports: [...ZorroModules, NzIconModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ZorroModules } from './register-zorro-modules'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { ZorroIcons } from './register-zorro-icons'

@NgModule({
  declarations: [],
  imports: [CommonModule, NzIconModule.forChild(ZorroIcons), ...ZorroModules],
  exports: [...ZorroModules, NzIconModule]
})
export class SharedModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RoleRoutingModule } from './role-routing.module'
import { RoleComponent } from './role.component'
import { SharedModule } from '../../../shared/shared.module'

@NgModule({
  declarations: [RoleComponent],
  imports: [CommonModule, RoleRoutingModule, SharedModule]
})
export class RoleModule {}

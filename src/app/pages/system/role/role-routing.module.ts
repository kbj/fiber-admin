import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoleComponent } from '@pages/system/role/role.component'
import Constant from '@core/config/constant.config'

const routes: Routes = [
  {
    path: '',
    data: { [Constant.ComponentKey]: 'role' },
    component: RoleComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoleComponent } from '@pages/system/role/role.component'

const routes: Routes = [
  {
    path: '',
    data: {},
    component: RoleComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}

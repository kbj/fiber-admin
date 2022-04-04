import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from '@pages/main/main.component'
import { AuthGuard } from '@core/auth'

const routes: Routes = [
  {
    path: '',
    data: {},
    component: MainComponent,
    canActivateChild: [...AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'system/role',
        loadChildren: () => import('../system/role/role.module').then((m) => m.RoleModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

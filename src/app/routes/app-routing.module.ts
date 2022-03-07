import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BaseGuard, LoginGuard } from '@core/auth'

const routes: Routes = [
  // 主页面
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // 登录模块
  {
    path: 'login',
    canActivate: [...BaseGuard],
    canActivateChild: [...BaseGuard],
    canDeactivate: [...BaseGuard],
    loadChildren: () => import('@pages/login/login.module').then((m) => m.LoginModule)
  },
  // 主页面
  {
    path: 'main',
    canActivate: [...BaseGuard, ...LoginGuard],
    canActivateChild: [...BaseGuard, ...LoginGuard],
    canDeactivate: [...BaseGuard],
    loadChildren: () => import('@pages/main/main.module').then((m) => m.MainModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

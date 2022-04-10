import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoadMainGuard } from '@core/guard'

const routes: Routes = [
  // 主页面
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // 登录模块
  {
    path: 'login',
    loadChildren: () => import('@pages/login/login.module').then((m) => m.LoginModule)
  },
  // 主页面
  {
    path: 'main',
    canActivate: [...LoadMainGuard],
    loadChildren: () => import('@pages/main/main.module').then((m) => m.MainModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

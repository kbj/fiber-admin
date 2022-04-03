import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '@pages/home/home.component'
import Constant from '@core/config/constant.config'

const routes: Routes = [
  {
    path: '',
    data: { [Constant.ComponentKey]: 'home' },
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

import { NgModule } from '@angular/core'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { SharedModule } from '../../shared/shared.module'
import { NavMenuComponent } from './nav-menu/nav-menu.component'

@NgModule({
  declarations: [MainComponent, NavMenuComponent],
  imports: [SharedModule, MainRoutingModule]
})
export class MainModule {}

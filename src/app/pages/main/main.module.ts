import { NgModule } from '@angular/core'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { SharedModule } from '../../shared/shared.module'
import { NavMenuComponent } from './nav-menu/nav-menu.component'
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { ToolbarComponent } from './toolbar/toolbar.component'

@NgModule({
  declarations: [MainComponent, NavMenuComponent, NavHeaderComponent, ToolbarComponent],
  imports: [SharedModule, MainRoutingModule]
})
export class MainModule {}

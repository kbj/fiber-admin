import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, BrowserAnimationsModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

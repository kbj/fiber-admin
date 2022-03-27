import {APP_INITIALIZER, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {CoreModule} from '@core/core.module'
import {SharedModule} from './shared/shared.module'
import {HttpClientModule} from '@angular/common/http'
import httpInterceptorProviders from './core/interceptor'
import {SystemInitService} from '@services/init/system-init.service'

// 在系统启动需要初始化的服务信息
const INIT_SERVICES_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: (systemInit: SystemInitService) => () => systemInit.load(),
    deps: [SystemInitService],
    multi: true
  }
]

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule, BrowserAnimationsModule, CoreModule],
  providers: [...httpInterceptorProviders, ...INIT_SERVICES_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}

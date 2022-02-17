import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'

// 设置成中文环境
registerLocaleData(zh)

@NgModule({
  declarations: [],
  providers: [
    // 引入antd相关配置
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  imports: [CommonModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`)
    }
  }
}

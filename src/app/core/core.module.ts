import {NgModule, Optional, SkipSelf} from '@angular/core'
import {registerLocaleData} from '@angular/common'
import zh from '@angular/common/locales/zh'
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n'
import {NZ_CONFIG} from 'ng-zorro-antd/core/config'
import {ngZorroConfig} from './config/ng-zorro.config'

// 设置成中文环境
registerLocaleData(zh)

/**
 * CoreModule应该 只保留providers属性
 * 在core中属于单例
 */
@NgModule({
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }, // 引入antd国际化相关配置
    { provide: NZ_CONFIG, useValue: ngZorroConfig } // 引入antd的全局配置
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`)
    }
  }
}

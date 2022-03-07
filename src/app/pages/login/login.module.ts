import {NgModule} from '@angular/core'
import {LoginComponent} from './login.component'
import {RouterModule, Routes} from '@angular/router'
import {LoginPanelComponent} from './login-panel/login-panel.component'
import {SharedModule} from '../../shared/shared.module'
import {LoginAccountComponent} from './login-account/login-account.component'
import {LoginPhoneComponent} from './login-phone/login-phone.component'

// login模块的路由定义
const loginRoutes: Routes = [{ path: '', component: LoginComponent }]

@NgModule({
  declarations: [LoginComponent, LoginPanelComponent, LoginAccountComponent, LoginPhoneComponent],
  imports: [SharedModule, RouterModule.forChild(loginRoutes)]
})
export class LoginModule {}

import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import LoginAccount from '../model/login-account'
import { NgForm } from '@angular/forms'
import validateUtils from '@utils/validate.util'
import { LoginService } from '@services/login/login.service'

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginAccountComponent implements AfterViewInit {
  // 登录表单的实体
  loginAccount: LoginAccount
  // 拿到表单的实体内容
  @ViewChild('loginForm') loginForm!: NgForm
  // 视图是否已经初始化完毕
  private isInit: boolean = false

  constructor(private loginService: LoginService) {
    this.loginAccount = new LoginAccount()
  }

  ngAfterViewInit(): void {
    this.isInit = true
  }

  // 使用账号密码登录的方式
  public loginAction(rememberMe: boolean) {
    if (!this.isInit) {
      return
    }
    // 校验表单
    if (!this.loginForm.valid) {
      // 手动触发所有校验
      validateUtils.validateFormAllFields(this.loginForm.form.controls)
      return
    }
    // 赋值进实体
    this.loginAccount.rememberMe = rememberMe
    // 调用服务去访问登录接口
    this.loginService.accountLogin(this.loginAccount)
  }
}

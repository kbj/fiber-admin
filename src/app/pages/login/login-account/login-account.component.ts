import { Component, OnInit } from '@angular/core'
import { LoginAccount } from '../model/login-account'

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.less']
})
export class LoginAccountComponent implements OnInit {
  loginAccount: LoginAccount

  constructor() {
    this.loginAccount = new LoginAccount()
  }

  ngOnInit(): void {}

  // 使用账号密码登录的方式
  public loginAction(rememberMe: boolean) {
    // 赋值进实体
    this.loginAccount.rememberMe = rememberMe
    // 校验表单
  }
}

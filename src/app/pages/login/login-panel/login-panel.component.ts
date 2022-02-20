import { Component, OnInit, ViewChild } from '@angular/core'
import { LoginAccountComponent } from '../login-account/login-account.component'

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.less']
})
export class LoginPanelComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @ViewChild(LoginAccountComponent)
  private loginAccountComponent!: LoginAccountComponent

  // 是否记住账号
  rememberMe: boolean = false

  // 点击登录的点击事件方法
  handleLoginClick() {
    this.loginAccountComponent.loginAction(this.rememberMe)
  }
}

import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { LoginAccountComponent } from '../login-account/login-account.component'

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPanelComponent implements OnInit {
  // 是否记住账号
  rememberMe: boolean = false
  @ViewChild(LoginAccountComponent)
  private loginAccountComponent!: LoginAccountComponent

  constructor() {}

  ngOnInit(): void {}

  // 点击登录的点击事件方法
  handleLoginClick() {
    this.loginAccountComponent.loginAction(this.rememberMe)
  }
}

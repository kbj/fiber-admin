import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { UserStoreService } from '@store/user-store.service'
import { LoginService } from '@services/login/login.service'

@Component({
  selector: 'app-nav-header-toolbar',
  templateUrl: './nav-header-toolbar.component.html',
  styleUrls: ['./nav-header-toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderToolbarComponent implements OnInit {
  // 页面右上角字母
  userName: string = ''

  constructor(private userStore: UserStoreService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.userStore.userInfo.subscribe((info) => {
      if (info) {
        this.userName = info.name.trim()
      }
    })
  }

  /**
   * 退出登录方法
   */
  logout() {
    this.loginService.logout()
  }
}

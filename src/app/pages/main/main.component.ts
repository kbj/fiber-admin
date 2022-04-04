import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'
import { fadeRouteAnimation } from '../../animations/fade.animation'
import { RouterOutlet } from '@angular/router'
import { DestroyService } from '@services/common/destroy.service'
import { HttpClient } from '@angular/common/http'
import { UserStoreService } from '@store/user-store.service'
import { LoginService } from '@services/login/login.service'
import Constant from '@core/config/constant.config'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  animations: [fadeRouteAnimation],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public globalCollapse = this.othersStore.globalCollapse

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userStore: UserStoreService,
    private othersStore: OthersStoreService
  ) {}

  ngOnInit(): void {
    // 请求菜单
    this.loginService.getMenuTreeList()
  }

  // 收缩伸展事件绑定当前状态
  collapseSize(value: boolean) {
    this.globalCollapse.next(value)
  }

  // 加载路由
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.[Constant.CacheKey] !== false
  }
}

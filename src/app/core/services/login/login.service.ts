import { Injectable } from '@angular/core'
import LoginAccount from '@pages/login/model/login-account'
import { HttpClient } from '@angular/common/http'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Router } from '@angular/router'
import { ResponseModel } from '@models/response.model'
import { UserInfo } from '@models/user.model'
import { OthersStoreService } from '@store/others-store.service'
import { finalize } from 'rxjs'
import localCache from '@utils/cache.util'
import Constant from '@core/config/constant.config'
import { UserStoreService } from '@store/user-store.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
    private othersStore: OthersStoreService,
    private userStore: UserStoreService
  ) {}

  /**
   * 账号密码方式登录
   * @param loginAccount 提交参数
   */
  accountLogin(loginAccount: LoginAccount) {
    this.othersStore.globalSpin.next(true) // 显示全局加载框
    this.http
      .post<ResponseModel<UserInfo>>('login', loginAccount)
      .pipe(finalize(() => this.othersStore.globalSpin.next(false)))
      .subscribe((resp) => {
        // 登录成功
        this.message.success(`欢迎您！${resp.data.name}`)

        // 保存用户名和token
        this.userStore.userInfo.next(resp.data)
        this.userStore.token.next(resp.data.token)
        localCache.setCache(Constant.LocalStorageAuthorizationKey, resp.data.token)
        localCache.setCache(Constant.LocalStorageUserInfoKey, resp.data)

        // 跳转
        this.router.navigate(['main'])
      })
  }
}

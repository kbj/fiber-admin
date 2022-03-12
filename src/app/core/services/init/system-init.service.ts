import {Injectable} from '@angular/core'
import {UserStoreService} from '@store/user-store.service'
import localCache from '@utils/cache.util'
import Constant from '@core/config/constant.config'
import {UserInfo} from '@models/user.model'

/**
 * 系统初始化所需的信息
 */
@Injectable({
  providedIn: 'root'
})
export class SystemInitService {
  constructor(private userStore: UserStoreService) {}

  load() {
    this.loadUserInfo()
    console.log('初始化完成!')
  }

  /**
   * 初始化用户信息
   * @private
   */
  private loadUserInfo() {
    const userInfo = localCache.getCache<UserInfo>(Constant.LocalStorageUserInfoKey)
    if (userInfo) {
      this.userStore.userInfo.next(userInfo)
    }
    const token = localCache.getCache<String>(Constant.LocalStorageAuthorizationKey)
    if (token) {
      this.userStore.token.next(token)
    }
  }
}

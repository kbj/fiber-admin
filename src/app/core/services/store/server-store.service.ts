import {Injectable} from '@angular/core'
import {environment} from 'src/environments/environment'

/**
 * 存储服务器相关配置信息的服务
 */
@Injectable({
  providedIn: 'root'
})
export class ServerStoreService {
  constructor() {}

  /**
   * 根据当前环境获取当前服务的基础路径
   */
  public BASE_URL(): string {
    if (environment.production) {
      // 生产环境
      return 'http://127.0.0.1:8080/'
    } else {
      // 开发测试环境
      return 'http://127.0.0.1:8080/'
    }
  }
}

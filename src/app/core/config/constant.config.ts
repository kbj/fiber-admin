import { environment } from '../../../environments/environment'

export default class Constant {
  public static LocalStorageAuthorizationKey = 'authorization' // 本地存储Authorization请求头的key
  public static LocalStorageUserInfoKey = 'userInfo' // 本地存储用户登录信息的key

  public static BaseUrl = () => {
    if (environment.production) {
      // 生产环境
      return 'http://127.0.0.1:8080/'
    } else {
      // 开发测试环境
      return 'http://127.0.0.1:8080/'
    }
  }
}

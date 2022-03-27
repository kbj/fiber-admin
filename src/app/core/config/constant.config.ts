import { environment } from '../../../environments/environment'

export default class Constant {
  public static LocalStorageAuthorizationKey = 'authorization' // 本地存储Authorization请求头的key
  public static LocalStorageUserInfoKey = 'userInfo' // 本地存储用户登录信息的key

  public static SessionStorageMenuListKey = 'MenuList' // session中存储菜单列表结构
  public static SessionStorageMenuTreeListKey = 'MenuTreeList' // session中存储菜单树结构

  public static MessageNotAuthentication = '您暂时没有访问此资源的权限！' // 无权限访问的提示语

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

export default class Constant {
  public static LocalStorageAuthorizationKey = 'authorization' // 本地存储Authorization请求头的key
  public static LocalStorageUserInfoKey = 'userInfo' // 本地存储用户登录信息的key

  public static SessionStorageMenuListKey = 'MenuList' // session中存储菜单列表结构
  public static SessionStorageMenuTreeListKey = 'MenuTreeList' // session中存储菜单树结构

  public static MessageNotAuthentication = '您暂时没有访问此资源的权限！' // 无权限访问的提示语

  public static CacheKey = 'cache' // 放置在路由data中判断是否需要缓存的key

  public static YYYY_MM_DD_HH_MM_SS = 'yyyy-MM-dd HH:mm:ss' // 时间格式
}

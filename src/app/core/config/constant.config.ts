export default class Constant {
  public static CACHE_KEY_AUTHORIZATION = 'authorization' // 缓存token的key
  public static CACHE_KEY_USER_INFO = 'userInfo' // 缓存用户登录信息的key
  public static CACHE_KEY_REMEMBER_ME = 'rememberMe' // 缓存用户记住登录信息的key
  public static CACHE_KEY_MENU_LIST = 'MenuList' // 缓存菜单列表结构Key
  public static CACHE_KEY_MENU_TREE_LIST = 'MenuTreeList' // 缓存菜单树结构key

  public static MessageNotAuthentication = '您暂时没有访问此资源的权限！' // 无权限访问的提示语

  public static ROUTE_DATA_CACHE_KEY = 'cache' // 放置在路由data中判断是否需要缓存的key

  public static YYYY_MM_DD_HH_MM_SS = 'yyyy-MM-dd HH:mm:ss' // 时间格式

  public static NOT_COLLAPSE_ITEM_NUMBER = 3 // 列表查询表单中不需要展开的表单项数目

  public static HTTP_DEFAULT_TIMEOUT = 30000 // HTTP客户端的超时时间，单位毫秒

  public static HEADER_Authorization = 'Authorization' // Header中的Token字段名
}

/**
 * session storage 缓存
 */
class SessionCache {
  // 保存缓存
  setCache(key: string, value: unknown) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存
  getCache<T>(key: string): T | undefined {
    const value = window.sessionStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return undefined
    }
  }

  // 删除缓存
  deleteCache(key: string) {
    window.sessionStorage.removeItem(key)
  }

  // 清空缓存
  clearCache() {
    window.sessionStorage.clear()
  }
}

export default new SessionCache()

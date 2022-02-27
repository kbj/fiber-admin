/**
 * LocalStorage缓存
 */
class LocalCache {
  // 保存缓存
  setCache(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存
  getCache(key: string): unknown {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return undefined
    }
  }

  // 删除缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()

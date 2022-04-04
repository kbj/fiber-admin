import { silentEvent } from 'ng-zorro-antd/core/util'

class EventUtil {
  /**
   * 阻止原生事件
   * @param e
   */
  stopEvent(e: Event): void {
    silentEvent(e)
    // e.stopPropagation();
    // e.preventDefault();
  }
}

export default new EventUtil()

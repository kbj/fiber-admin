import { Injectable } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { CommonBreakPoints } from '@shared/models/common.model'
import { BehaviorSubject } from 'rxjs'

/**
 * 有关窗口（响应式）的相关服务
 */
@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  /**
   * 定义当前激活的栅格
   */
  private _currentBreakPoint = new BehaviorSubject<CommonBreakPoints>(CommonBreakPoints.Xxl)

  get currentBreakPoint(): BehaviorSubject<CommonBreakPoints> {
    return this._currentBreakPoint
  }

  set currentBreakPoint(value: BehaviorSubject<CommonBreakPoints>) {
    this._currentBreakPoint = value
  }

  /**
   * 自定义栅格边界定义，同步zorro所用的bootstrap4规范
   * https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints
   */
  private displayBreakPoints: { [key: string]: [CommonBreakPoints, [number, number]] } = {
    '(max-width: 575.98px)': [CommonBreakPoints.Xs, [0, 575.98]],
    '(min-width: 576px) and (max-width: 767.98px)': [CommonBreakPoints.Sm, [576, 767.98]],
    '(min-width: 768px) and (max-width: 991.98px)': [CommonBreakPoints.Md, [768, 991.98]],
    '(min-width: 992px) and (max-width: 1199.98px)': [CommonBreakPoints.Lg, [992, 1199.98]],
    '(min-width: 1200px) and (max-width: 1599.98px)': [CommonBreakPoints.Xl, [1200, 1599.98]],
    '(min-width: 1600px)': [CommonBreakPoints.Xxl, [1600, 9999]]
  }

  /**
   * 监听浏览器宽度变化对应的栅格变化
   */
  listenWindowBreakPoint() {
    this.breakpointObserver.observe(Object.keys(this.displayBreakPoints)).subscribe((result) => {
      Object.keys(this.displayBreakPoints).forEach((item) => {
        if (result.breakpoints[item]) {
          // 匹配到栅格枚举，更新当前枚举状态
          this.currentBreakPoint.next(this.displayBreakPoints[item][0])
        }
      })
    })
  }
}

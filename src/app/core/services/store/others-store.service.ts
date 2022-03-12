import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

/**
 * 一些零散的配置服务
 */
@Injectable({
  providedIn: 'root'
})
export class OthersStoreService {
  constructor() {}

  // 控制展示全局加载框
  private _globalSpin = new BehaviorSubject<boolean>(false)

  get globalSpin(): BehaviorSubject<boolean> {
    return this._globalSpin
  }

  set globalSpin(value: BehaviorSubject<boolean>) {
    this._globalSpin = value
  }

  // 控制菜单栏是否收缩
  private _globalCollapse = new BehaviorSubject<boolean>(false)

  get globalCollapse(): BehaviorSubject<boolean> {
    return this._globalCollapse
  }

  set globalCollapse(value: BehaviorSubject<boolean>) {
    this._globalCollapse = value
  }
}

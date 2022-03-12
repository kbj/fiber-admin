import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'
import { NavigationEnd, Router } from '@angular/router'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { filter } from 'rxjs'

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
    <div
      *ngIf="loading$ | async"
      style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);"
    >
      <div style="position:absolute;top: 50%;left:50%;margin:-16px 0 0 -16px;">
        <nz-spin nzSize="large"></nz-spin>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  loading$ = this.othersStore.globalSpin.asObservable()

  constructor(private othersStore: OthersStoreService, private router: Router) {}

  ngOnInit(): void {
    // 当路由页面检测到离开的时候需要把全局加载弹框设置为false
    this.router.events
      .pipe(filter((event: NzSafeAny) => event instanceof NavigationEnd))
      .subscribe((event: NzSafeAny) => {
        this.othersStore.globalSpin.next(false)
      })
  }
}

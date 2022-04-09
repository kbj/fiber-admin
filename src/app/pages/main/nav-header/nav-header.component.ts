import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'
import { UserStoreService } from '@store/user-store.service'
import { DestroyService } from '@services/common/destroy.service'
import { takeUntil } from 'rxjs'

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.less'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderComponent implements OnInit {
  // 是否折叠的状态
  isCollapse = this.othersStore.globalCollapse
  // 面包屑信息
  breadcrumbs: string[] = []

  constructor(
    private othersStore: OthersStoreService,
    private userStore: UserStoreService,
    private destroy: DestroyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 面包屑内容更新订阅
    this.userStore.breadcrumbLists
      .asObservable()
      .pipe(takeUntil(this.destroy))
      .subscribe((lists) => {
        this.breadcrumbs = lists
        this.cdr.markForCheck()
      })
  }

  // 点击折叠的按钮
  changeCollapse() {
    this.isCollapse.next(!this.isCollapse.getValue())
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'
import { fadeRouteAnimation } from '../../animations/fade.animation'
import { RouterOutlet } from '@angular/router'
import { takeUntil } from 'rxjs'
import { DestroyService } from '@services/common/destroy.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  animations: [fadeRouteAnimation],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  isCollapse = false
  private globalCollapse = this.othersService.globalCollapse

  constructor(private othersService: OthersStoreService, private destroy: DestroyService) {}

  ngOnInit(): void {
    // 监听收缩与否的状态改变
    this.globalCollapse
      .asObservable()
      .pipe(takeUntil(this.destroy))
      .subscribe((a) => (this.isCollapse = a))
  }

  // 收缩伸展事件绑定当前状态
  collapseSize(value: boolean) {
    this.globalCollapse.next(value)
  }

  // 加载路由
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['key']
  }
}

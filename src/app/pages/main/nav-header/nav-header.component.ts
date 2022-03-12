import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderComponent implements OnInit {
  // 是否折叠的状态
  isCollapse = this.othersStore.globalCollapse

  constructor(private othersStore: OthersStoreService) {}

  ngOnInit(): void {}

  // 点击折叠的按钮
  changeCollapse() {
    this.isCollapse.next(!this.isCollapse.getValue())
  }
}

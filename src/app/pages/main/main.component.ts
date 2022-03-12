import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  isCollapse = false
  private globalCollapse = this.othersService.globalCollapse

  constructor(private othersService: OthersStoreService) {}

  ngOnInit(): void {
    // 监听收缩与否的状态改变
    this.globalCollapse.asObservable().subscribe((a) => (this.isCollapse = a))
  }

  // 收缩伸展事件绑定当前状态
  collapseSize(value: boolean) {
    this.globalCollapse.next(value)
  }
}

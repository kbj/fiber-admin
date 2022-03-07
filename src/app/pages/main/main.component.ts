import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersService } from '@store/others.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  isCollapse = this.othersService.globalCollapse

  constructor(private othersService: OthersService) {}

  ngOnInit(): void {}

  // 收缩伸展事件绑定当前状态
  collapseSize(isCollapse: boolean) {
    this.isCollapse.next(isCollapse)
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersService } from '@store/others.service'

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderComponent implements OnInit {
  // 是否折叠的状态
  isCollapse = this.othersService.globalCollapse

  constructor(private othersService: OthersService) {}

  ngOnInit(): void {}

  // 点击折叠的按钮
  changeCollapse() {
    this.isCollapse.next(!this.isCollapse.getValue())
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { UserStoreService } from '@store/user-store.service'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // 伸缩隐藏定义的动画
    trigger('collapseAnimation', [
      state(
        'open',
        style({
          transform: 'translate3d(0,0,0)'
        })
      ),
      state(
        'close',
        style({
          transform: 'translate3d(-1.6rem,0,0)'
        })
      ),
      transition('open<=>close', [animate('0.25s')])
    ])
  ]
})
export class NavMenuComponent implements OnInit {
  // 是否处于隐藏或者展开状态
  isCollapse = this.othersStore.globalCollapse
  // 菜单列表
  menuTreeList = this.userStore.menuTreeList

  constructor(private othersStore: OthersStoreService, private userStore: UserStoreService) {}

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersService } from '@store/others.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MenuModel } from '../../../shared/models/menu.model'

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
  isCollapse = this.othersService.globalCollapse
  menus: MenuModel[] = [
    {
      name: '首页',
      icon: 'home',
      level: 1,
      path: '/main/index'
    },
    {
      name: '系统管理',
      icon: 'team',
      level: 1,
      children: [
        {
          name: '用户管理',
          level: 2,
          icon: 'user'
        },
        {
          name: '角色管理',
          level: 2,
          icon: 'user'
        }
      ]
    }
  ]

  constructor(private othersService: OthersService) {}

  ngOnInit(): void {}
}

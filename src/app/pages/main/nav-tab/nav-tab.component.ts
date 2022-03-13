import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { DestroyService } from '@services/common/destroy.service'
import { filter, takeUntil } from 'rxjs'

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.less'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavTabComponent implements OnInit {
  constructor(private router: Router, private destroy: DestroyService, private activatedRoute: ActivatedRoute) {
    // 路由跳转成功后记录路由信息添加的路由标签页的数组中
    this.router.events
      .pipe(
        takeUntil(this.destroy),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((date) => {
        console.log(date)
      })
  }

  ngOnInit(): void {}
}

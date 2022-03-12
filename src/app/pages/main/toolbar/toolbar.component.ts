import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { UserStoreService } from '@store/user-store.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  // 页面右上角字母
  userName: string = ''

  constructor(private userStore: UserStoreService) {}

  ngOnInit(): void {
    this.userStore.userInfo.subscribe((info) => {
      if (info) {
        this.userName = info.name.trim()
      }
    })
  }
}

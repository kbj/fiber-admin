import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.component.html',
  styleUrls: ['./login-phone.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPhoneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

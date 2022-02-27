import { Injectable } from '@angular/core'
import { LoginAccount } from '@pages/login/model/login-account'
import { HttpClient } from '@angular/common/http'
import { NzMessageService } from 'ng-zorro-antd/message'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private message: NzMessageService) {}

  /**
   * 账号密码方式登录
   * @param loginAccount 提交参数
   */
  accountLogin(loginAccount: LoginAccount) {
    this.http.post('login', loginAccount).subscribe()
  }
}

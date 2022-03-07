import { NprogressGuard } from './nprogress.guard'
import { LoginAuthGuard } from '@core/auth/login-auth.guard'

export const BaseGuard = [NprogressGuard]
export const LoginGuard = [LoginAuthGuard]

import { LoginAuthGuard } from '@core/auth/login-auth.guard'
import { MenuAuthGuard } from '@core/auth/menu-auth.guard'

export const BaseGuard = []
export const AuthGuard = [MenuAuthGuard]
export const LoadGuard = [LoginAuthGuard]

import { LoginAuthGuard } from '@core/guard/login-auth.guard'
import { MenuAuthGuard } from '@core/guard/menu-auth.guard'
import { MainInitLoadingGuard } from '@core/guard/main-init-loading.guard'

export const BaseGuard = []
export const AuthGuard = [MenuAuthGuard]
export const LoadMainGuard = [LoginAuthGuard, MainInitLoadingGuard]

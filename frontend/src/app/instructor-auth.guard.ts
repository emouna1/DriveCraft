import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { inject } from '@angular/core';

export const instructorAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (userService.isLoggedIn() && userService.getCurrentUserRole() === 'instructor' && userService.getCurrentUserStatus() === 'active') {
    return true;

  }else{
    router.navigate(['/', state.url]);
  return false;
}
};

import { AuthService } from 'src/app/auth-service.service';
import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (!userService.isLoggedIn()) {
    router.navigate(['/', state.url]);
    return false;
  }
  return true;
};
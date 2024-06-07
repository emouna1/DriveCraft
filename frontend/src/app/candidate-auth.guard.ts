
import { AuthService } from 'src/app/auth-service.service';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { Observable } from 'rxjs';

export const candidateAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
    const userService = inject(AuthService);
    const router = inject(Router);
  
    if (userService.isLoggedIn() && userService.getCurrentUserRole() === 'student' && userService.getCurrentUserStatus() === 'active') {
      const cin = userService.getCurrentUserCIN();
      if (cin !== null) {
        const enrolled =  userService.checkCandidateEnrollment(cin); 
        console.log(enrolled)// Assuming checkCandidateEnrollment returns a Promise<boolean>
        return enrolled;
      } else {
        router.navigate(['/', state.url]);
        return false;
      }
    } else {
      router.navigate(['/', state.url]);
      return false;
    }
  };
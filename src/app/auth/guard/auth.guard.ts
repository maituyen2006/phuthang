import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (localStorage.getItem('CURRENT_ADMIN')) {
      // logged in so return true
      this.route.queryParams.subscribe(params => {
        const returnUrl = params['returnUrl'];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate(['/verified']);
        }
      })
      return false;
    }

    // not logged in so redirect to login page with the return url
    return true;
  }

}

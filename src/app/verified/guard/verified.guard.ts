import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuard implements CanActivate {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (localStorage.getItem('CURRENT_ADMIN')) {
      // logged in so return true
      const auth = JSON.parse(localStorage.getItem('CURRENT_ADMIN'));
      const moduleUrls: string[] = auth.moduleUrls;
      const currentUrl = state.url.replace('/verified', '');
      if (moduleUrls && moduleUrls.indexOf(currentUrl) >= 0) {
        return true;
      } else {
        this.snackBar.open('Bạn không có quyền truy cập module này!', 'Đóng', {
          panelClass: ['style-error'],
          duration: 2500
        });
        localStorage.removeItem('CURRENT_ADMIN');
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }

    // not logged in so redirect to login page with the return url ?returnUrl=/verified/roles
    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}

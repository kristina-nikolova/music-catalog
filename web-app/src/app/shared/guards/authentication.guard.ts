import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthClientService } from '@shared/services';

@Injectable()
export class CanActivateIfAuthenticated implements CanActivate {
  constructor(private _authService: AuthClientService, private _router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.isAuthenticated()) {
      if (isDevMode()) {
        console.warn('Only logged in users have access to this screen.');
      }
      this._router.navigate([`/login`], {
        queryParams: {
          returnPath: _state.url
        }
      });
      return false;
    }

    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenS: TokenService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //let h = this.tokenS.getRole();
      //console.log( h );
      if (!this.tokenS.getToken()) { 
        return true;
      }
      else { 
        let role = this.tokenS.getRole();
        if(role == 'mission') this.router.navigate(['/me']);
        else if(role == 'admin') this.router.navigate(['/admin']);
        else if(role == 'job') this.router.navigate(['/cv']);
        return true;
      }
  }
  
}

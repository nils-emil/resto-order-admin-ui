import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from "../httpservice/login.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.loginService.getCurrentUser()
        .subscribe(success => {
          this.loginService.setCurrentUser(success)
          console.log("success")
          resolve(true);
        },
        error =>  {
          this.router.navigate(['login']);
          resolve(false);
        })
    });
  }

}

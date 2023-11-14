import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtToken } from '../utilities/jwt-token';
import { Roles } from '../utilities/role';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DispatcherGuard implements CanActivate {
	constructor(private router:Router,private userservice: AuthService, private route:ActivatedRoute){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let token=new JwtToken();
		try{
			if(token.expired)
			{
				localStorage.removeItem("token")
				this.userservice.isLoginSubject.next(false)
				this.router.navigate(["login"]);
			}
			let role=token.data.role as string;
			if(role!=Roles.DISPATCHER_NAME)
				throw new Error();
			return true;
		}
		catch(error){
			
			this.router.navigate([this.router.url]);
			return false;
		}
  }
  
}

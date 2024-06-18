import { Injectable } from '@angular/core';
// import { DeprecatedAuthenticationService } from '../core/service/deprecated_authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import User from '../../model/user';
// import {Person} from '../../model/person/person.model'
// import { AuthenticationService } from '../authenticator/authentication.service';
import { UserService } from './user.service';
import { User } from '../utils/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  current!: User;
  
  constructor(
    // private authenticationService: DeprecatedAuthenticationService, 
    // private authenticationService: AuthenticationService,
    private usersService: UserService,
    private router: Router
  ) { 
    this.usersService.current.subscribe(current => {
      this.current = current;
      console.log('user updated in this.current', this.current);
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("canActive",this.current);
    
    if (this.current && this.current.id) {
      console.log("canActive",true);
      return true;
    } else {
      console.log("canActive",false);
      this.router.navigate(['/home'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}

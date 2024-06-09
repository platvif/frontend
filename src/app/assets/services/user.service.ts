import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../utils/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  current: BehaviorSubject<User> = new BehaviorSubject<User>({}); 

  constructor() { }

  setCurrentUser(user:User) {
    this.current.next(user);
    console.log('this.current.user => ', this.current.value);
  }
}

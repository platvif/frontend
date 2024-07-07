import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../utils/user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  // ngOnInit() {
  //   // this.verifyUserLoged().then((user) {

  //   // })
  // }

  async registerUser(body:any) {
    await this.httpClient.post('http://localhost:3000/api/user/register', body).toPromise()
    .then(res => {
      console.log('Usuario Registrado con exito!', res);
    }).catch((error) => {
      console.error('No ha sido posible registrar al usuario, verifique los datos e intentelo nuevamente', error);
    })
  }

  async loginUser(body:any, rememberMe:boolean) {
    if(rememberMe) {
      this.setIdentifier(body);
    }
    return await this.httpClient.post('http://localhost:3000/api/user/login', body).toPromise();
  }

  async updateUser(body:User, id:any) {
    
    return await this.httpClient.put(`http://localhost:3000/api/user/update/${id}`, body).toPromise().then((res) => {
      console.log('res', res);
    })
  }

  setIdentifier(identifier:any) {
    window.localStorage.setItem('USER_IDENTIFIER', JSON.stringify(identifier.mail));
    window.localStorage.setItem('USER_PASSWORD', identifier.pass);
    window.localStorage.setItem('REMEMBER_ME', 'true');
  }

  verifyUserLoged() {
    let identifier = JSON.parse(window.localStorage.getItem('USER_IDENTIFIER') || '');
    let password = window.localStorage.getItem('USER_PASSWORD') ?? '';

    let body = {
      mail: identifier,
      pass: password
    }

    return this.loginUser(body, false);
  }

  isUserLoged() {
    return window.localStorage.getItem('REMEMBER_ME');
  }

  cleanUserLoged() {
    localStorage.clear();
  }
}

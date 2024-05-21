import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  async registerUser(body:any) {
    await this.httpClient.post('http://localhost:3000/api/user/register', body).toPromise()
    .then(res => {
      console.log('Usuario Registrado con exito!', res);
    }).catch((error) => {
      console.error('No ha sido posible registrar al usuario, verifique los datos e intentelo nuevamente', error);
    })
  }

  async loginUser(body:any) {
    return await this.httpClient.post('http://localhost:3000/api/user/login', body).toPromise();
  }
}

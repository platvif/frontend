import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/assets/services/authentication.service';
import { UserService } from 'src/app/assets/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!:FormGroup;
  identifier:any;

  rememberMe:boolean = false;

  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController,
    private route: Router,
    private userService: UserService,
    private loadingController: LoadingController
  ) {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit() {
    if(this.authService.isUserLoged()) {
      this.onVerifyUserLoged();
    }
  }

   async onSubmit() {
    if (this.form?.valid) {
      console.log('Formulario Valido: ', this.form?.value);
      try {
        const loading = await this.loadingController.create({
          message: 'Loading',
          duration: 1000,
        });
        await loading.present();
        const login:any = await this.authService.loginUser(this.form?.value, this.rememberMe);
        console.log('Usuario Logueado exitosamente!', login);
        const successToast = await this.toastController.create({
          message: 'Your user has logged with success! Enjoy using PlatVif... 😊',
          color: 'secondary',
          duration: 2000,
          animated: true,
          header: 'Bienvenido a PlatVif!',
          position: 'middle'
        })
        successToast.present();
        this.form.reset();
        this.userService.setCurrentUser(login);

        // this.identifier = login;

        this.route.navigateByUrl('/reserves');

      } catch (error) {
        console.error('No se ha podido realizar el login.', error);
        const warningToast = await this.toastController.create({
          message: 'login failed, check your information and try again... 😪',
          color: 'danger',
          duration: 3500,
          animated: true,
          header: 'Revise sus datos!',
          position: 'middle'
        })      
        warningToast.present();
      }
    } else {
      const warningToast = await this.toastController.create({
        message: 'No se ha podido hacer el logueo con exito, revise sus datos nuevamente... 😪',
        color: 'danger',
        duration: 3500,
        animated: true,
        header: 'Revise sus datos!',
        position: 'middle'
      })      
      warningToast.present();
    }
   }

   async onVerifyUserLoged() {
    console.log('Verificando si el usuario se encuentra en Local Storage...');
    const loading = await this.loadingController.create({
      message: 'Loading',
      duration: 3000
    })
    await loading.present();
    this.authService.verifyUserLoged().then((user:any) => {
      console.log('El usuario se encuentra en Local Storage y esta autenticado.');
      this.userService.setCurrentUser(user);
      this.route.navigateByUrl('/reserves');
      loading.dismiss();
    }).catch(error => {
      console.log('Error al acceder al usuario en localstorage');
    })
   }
}

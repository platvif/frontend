import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/assets/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!:FormGroup;

  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController,
    private route: Router,
  ) {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit() {}

   async onSubmit() {
    if (this.form?.valid) {
      console.log('Formulario Valido: ', this.form?.value);
      try {
        const login = await this.authService.loginUser(this.form?.value);
        console.log('Usuario Registrado exitosamente!', login);
        
        const successToast = await this.toastController.create({
          message: 'Su usuario se ha logueado con Exito! Bienvenido a PlatVif... ',
          color: 'secondary',
          duration: 2000,
          animated: true,
          header: 'Bienvenido a PlatVif!',
          position: 'middle'
        })
        successToast.present();
        this.route.navigateByUrl('/reserves');
      } catch (error) {
        console.error('No se ha podido realizar el login.', error);
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
}

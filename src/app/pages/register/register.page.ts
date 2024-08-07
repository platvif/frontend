import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/assets/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
   }

  ngOnInit() {}

  async onSubmit() {
    if (this.form?.valid) {
      console.log('Formulario valido: ', this.form?.value);
      await this.authService.registerUser(this.form?.value).then((res:any) => {
        console.log('Usuario registrado correctamente.', res);
      }).catch((error:any) => {
        console.error('Imposible de crear el usuario', error);
      })

      const successToast = await this.toastController.create({
        message: 'Your user is registered with success! Now go to the login to start using PlatVif 😊',
        color: 'secondary',
        duration: 3500,
        animated: true,
        header: 'Registro hecho con exito!',
        position: 'middle'
      })      
      successToast.present();
    } else {
      console.log('formulario invalido');
      const warningToast = await this.toastController.create({
        message: 'Register failed, check your information and try again... 😪',
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

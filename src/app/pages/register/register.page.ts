import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/assets/authentication.service';


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
      await this.authService.registerUser(this.form?.value).then(res => {
        console.log('Usuario registrado correctamente.', res);
      }).catch(error => {
        console.error('Imposible de crear el usuario', error);
      })

      const successToast = await this.toastController.create({
        message: 'Su usario se ha registrado con exito! Dirijase al login para continuar con la operacion 😊',
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
        message: 'No se ha podido realizar el registro, revise los identificadores nuevamente... 😪',
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

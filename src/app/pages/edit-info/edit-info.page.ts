import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/assets/services/authentication.service';
import { UserService } from 'src/app/assets/services/user.service';
import { User } from 'src/app/assets/utils/user';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})
export class EditInfoPage implements OnInit {
  user?:User;
  selfie?: any;
  form!:FormGroup;

  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController,
    private route: Router,
    private userService: UserService,
  ) { 
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      cover: new FormControl('', [Validators.required]),
      selfie: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      favorite_res: new FormControl('')  // Campo opcional sin validadores
    })
  }

  ngOnInit() {
    this.userService.current.subscribe((res) => {
      this.user = res;

      if (this.user) {
        this.form.patchValue({
          id: this.user.id ,
          cover: this.user.cover || '',
          selfie: this.user.selfie || '',
          name: this.user.name,
          lastname: this.user.lastname,
          mail: this.user.mail,
          phone: this.user.phone,
          location: this.user.location,
          favorite_res: this.user.favorite_res
        });
      }
    })
    console.log('this.user en edit-info', this.user);
  }

  async getImage() {
    console.log('button clicked');
    const camera = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt // Esto permite al usuario elegir entre la cámara y la galería
    })
    this.selfie = camera.base64String;
    console.log(this.selfie);
  }

  async onSubmit() {
    console.log(this.form);
    if(this.form?.valid) {
      console.log('Formulario Valido: ', this.form?.value);
      try {
        const updateUser = await this.authService.updateUser(this.form?.value, this.user?.id);
        console.log('Usuario actualizado correctamente!', updateUser);
        const successToast = await this.toastController.create({
          message: 'Su informacion se actualizo con exito! 😊',
          color: 'secondary',
          duration: 2000,
          animated: true,
          header: 'Informacion exitosa',
          position: 'bottom'
        })
        successToast.present();
        this.route.navigateByUrl('/reserves');
        console.log('Usuario update?', this.user);
      } catch (error) {
        console.error('No se ha podido realizar el login.', error);
        const warningToast = await this.toastController.create({
          message: 'No se ha podido hacer el actualizar los datos con exito, intentelo nuevamente nuevamente... 😪',
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
        message: 'No se ha podido hacer el actualizar los datos con exito, intentelo nuevamente nuevamente... 😪',
        color: 'danger',
        duration: 3500,
        animated: true,
        header: 'Revise sus datos!',
        position: 'middle'
      })      
      warningToast.present();
      console.log('Algo paso aqui.')
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/assets/services/user.service';
import { User } from 'src/app/assets/utils/user';

@Component({
  selector: 'app-form-reserve',
  templateUrl: './form-reserve.component.html',
  styleUrls: ['./form-reserve.component.scss'],
})
export class FormReserveComponent  implements OnInit {

  restaurant:any;
  form!:FormGroup;
  isFilled:boolean = false;
  isTimePickerOpen = false;
  selectedTime!: string;
  user!:User;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private userService: UserService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.userService.current.subscribe((res) => {
      this.user = res;
    });
    this.restaurant = this.navParams.get('restaurant');
    console.log('restaurant:', this.restaurant);

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      hour: new FormControl('', [Validators.required]),
      people: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit() {}

  closeModal() { 
    this.modalController.dismiss();
  }

  fillFormWithUserInfo() {
    this.form.patchValue({
      name: this.user.name,
      lastname: this.user.lastname,
      mail: this.user.mail,
      phone: this.user.phone,
      // date: this.user.date,
      // hour: this.user.hour,
      // people: this.user.people
    });

    this.isFilled = true;
  }

  openTimePicker() {
    this.isTimePickerOpen = true;
  }

  onTimeSelected(event:any) {
    this.selectedTime = event.detail.value;
    this.form.controls['hour'].setValue(this.selectedTime);
  }

  onTimePickerDismiss(event:any) {
    this.isTimePickerOpen = false;
  }

  async onSubmit(){
    if(this.form?.valid || this.restaurant?.phone) {
            console.log('Phone: ', this.restaurant.phone);
            const loading = await this.loadingController.create({
              message: 'Loading',
              duration: 1000,
            });
            await loading.present(); 
            const phoneNumber = `${this.restaurant?.phone}`;
            const message = `Hola, este es un mensaje de WhatsApp.`;
            const waMessage = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        
            window.open(waMessage, '_blank'); // Abre el enlace de WhatsApp en una nueva pestaña

    } else {
      const warningToast = await this.toastController.create({
        message: 'No se pudo hacer la reserva, intentelo de nuevo mas tarde...',
        duration: 3000,
        animated: true,
        header: 'Ha ocurrido un error...',
        position: 'middle'
      })
      warningToast.present();
    }
  }

}

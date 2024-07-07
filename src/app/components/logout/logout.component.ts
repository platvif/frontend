import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/assets/services/authentication.service';
import { UserService } from 'src/app/assets/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private route: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  logout(){
    this.popoverController.dismiss();
    this.authService.cleanUserLoged();
    this.userService.deleteUser();
    this.route.navigateByUrl('/login');
    if(this.route.url == 'login') {
      window.location.reload();
    }
  }

}

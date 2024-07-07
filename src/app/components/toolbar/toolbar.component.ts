import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent  implements OnInit {

  @Input() route: any = '';
  @Input() backButton?: any = false;

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  async onViewOptions(event:any) {
    const popover = await this.popoverController.create({
      component: LogoutComponent,
      translucent: true,
      event: event,
      mode: 'ios',
      componentProps: {}
    })
    await popover.present();
  }

}

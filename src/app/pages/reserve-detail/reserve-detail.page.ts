import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.page.html',
  styleUrls: ['./reserve-detail.page.scss'],
})
export class ReserveDetailPage implements OnInit {

  id!:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
    });

    console.log(this.id);

    
  }

}

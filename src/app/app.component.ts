import { Component, OnInit, OnDestroy } from '@angular/core';
import { authservice } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  constructor(private authService :authservice){}
  ngOnInit(){
    this.authService.autologin();
  }

  
}

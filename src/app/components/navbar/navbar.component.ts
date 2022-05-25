import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isExpanded: boolean = false;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authSrv.logout();
  }

  isLogged(){
    return this.authSrv.isLogged()
  }

}

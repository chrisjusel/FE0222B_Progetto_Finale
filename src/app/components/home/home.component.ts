import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  checkIfUserIsLoggedIn(){
    console.log(this.authSrv.isLogged);
    return this.authSrv.isLogged;
  }

  redirectIfLogged(){
    this.router.navigate(['/dashboard']);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { Utente } from '../models/utente';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pathApi: string;
  private authSubject = new BehaviorSubject<null|Utente>(null);
  user$ = this.authSubject.asObservable();

  isLogged: boolean = false;

  jwtHelper = new JwtHelperService();

  autologoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.pathApi = environment.pathApi
    this.restoreUser()
  }

  login(data: {username: string; password: string}){
    return this.http.post<Utente>(`${this.pathApi}/api/auth/login`, data).pipe(
      tap((data) => {
        this.isLogged = true;
        this.authSubject.next(data);
        const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
        this.autoLogout(expirationDate)
      }), catchError(this.errors)
    );
  }

  signup(data: {username: string; email: string; password: string; nome: string; cognome: string, role: any[]}){
    return this.http.post(`${this.pathApi}/api/auth/signup`, data)
  }

  logout(){
    this.isLogged = false;
    this.authSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    if(this.autologoutTimer){
      clearTimeout(this.autologoutTimer);
    }
  }

  autoLogout(expirationDate: Date){
    const expirationMilliseconds = expirationDate.getTime() - new Date().getTime();
    this.autologoutTimer = setTimeout(() => {
      this.logout();
    }, expirationMilliseconds);
  }

  restoreUser(){
    const loggedUserData = localStorage.getItem('user');
    if(!loggedUserData) return;
    const user: Utente = JSON.parse(loggedUserData);
    this.isLogged = true;
    if(this.jwtHelper.isTokenExpired(user.accessToken)){
      return
    }
    this.authSubject.next(user)
    const expirationDate = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date
    this.autoLogout(expirationDate);
  }

  private errors(err: any) {
    switch (err.error) {
      case "Email and password are required":
        return throwError("Email e password sono obbligatorie");
        break;
      case "Email already exists":
        return throwError("Esiste già un utente con questa mail");
        break;
      case "Email format is invalid":
        return throwError("La mail inserita non è valida");
        break;
      case "Cannot find user":
        return throwError("Non esiste alcun utente registrato con questa email");
        break;

      default:
        return throwError("Errore nella chiamata");
        break;
    }
  }
}

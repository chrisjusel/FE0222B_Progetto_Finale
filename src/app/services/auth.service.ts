import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { Utente } from '../models/utente';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pathApi: string;
  private authSubject = new BehaviorSubject<null|Utente>(null);
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user));

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
  }

  login(data: {username: string; password: string}){
    console.log(data);
    return this.http.post<Utente>(`${this.pathApi}/api/auth/login`, data);
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

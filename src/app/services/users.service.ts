import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utente } from '../models/utente';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users!: Utente[];
  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllUsers(){
    return this.http.get<any>(`${this.pathApi}/api/users`);
  }
}

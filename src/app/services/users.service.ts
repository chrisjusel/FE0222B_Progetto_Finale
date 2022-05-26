import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllUsers(pageIndex: number, itemNumber: number){
    return this.http.get<any>(`${this.pathApi}/api/users?page=${pageIndex}&size=${itemNumber}`);
  }
}

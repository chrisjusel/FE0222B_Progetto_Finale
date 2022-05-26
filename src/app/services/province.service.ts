import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getProvinciaById(idProvincia: number){
    return this.http.get<any>(`${this.pathApi}/api/province/${idProvincia}`);
  }
}

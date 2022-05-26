import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingsService {

  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllBillings(clientId: number, pageIndex: number, itemNumber: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture/cliente/${clientId}?page=${pageIndex}&size=${itemNumber}`);
  }
}

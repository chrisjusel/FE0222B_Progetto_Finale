import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fattura } from '../models/fattura';

@Injectable({
  providedIn: 'root'
})
export class BillingsService {

  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllBillingsByClientId(clientId: number, pageIndex: number, itemNumber: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture/cliente/${clientId}?page=${pageIndex}&size=${itemNumber}`);
  }

  getAllBillings(pageIndex: number, pageSize: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture?page=${pageIndex}&size=${pageSize}`);
  }

  deleteBilling(billingId: number){
    return this.http.delete<any>(`${this.pathApi}/api/fatture/${billingId}`);
  }

  getStateTypes(){
    return this.http.get<any>(`${this.pathApi}/api/statifattura`);
  }

/*   createBilling(){
    return this.http.post<any>(`${this.pathApi}/api/statifattura`);
  } */

  modifyBilling(billingId: number, data:Fattura){
    return this.http.put<any>(`${this.pathApi}/api/fatture`, data);
  }

  getBillingById(billingId: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture/${billingId}`);
  }
}

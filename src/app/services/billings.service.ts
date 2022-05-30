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
    return this.http.get<any>(`${this.pathApi}/api/fatture/cliente/${clientId}?page=${pageIndex}&size=${itemNumber}&sort=id,ASC`);
  }

  getAllBillings(pageIndex: number, pageSize: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture?page=${pageIndex}&size=${pageSize}&sort=id,ASC`);
  }

  deleteBilling(billingId: number){
    return this.http.delete<any>(`${this.pathApi}/api/fatture/${billingId}`);
  }

  getStateTypes(){
    return this.http.get<any>(`${this.pathApi}/api/statifattura`);
  }

  createBilling(data: any){
    return this.http.post(`${this.pathApi}/api/fatture/`, data);
  }

  modifyBilling(billingId: number, data:any){
    console.log(data);
    return this.http.put<any>(`${this.pathApi}/api/fatture/${billingId}`, data);
  }

  getBillingById(billingId: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture/${billingId}`);
  }

  getBillingByStato(stateId: number, pageIndex: number, pageSize: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture/stato/${stateId}?page=${pageIndex}&size=${pageSize}&sort=id,ASC`);
  }

  getBillingByImportBetween(importFrom: number, importTo: number, pageIndex: number, pageSize: number){
    return this.http.get<any>(`${this.pathApi}/api/fatture/importo/?from=${importFrom}&to=${importTo}&page=${pageIndex}&size=${pageSize}&sort=importo,ASC`);
  }

  getBillings(){
    return this.http.get<any>(`${this.pathApi}/api/fatture?size=1500`);
  }
}

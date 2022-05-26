import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllClients(pageIndex: number, pageSize: number){
    return this.http.get<any>(`${this.pathApi}/api/clienti?page=${pageIndex}&size=${pageSize}`);
  }

  modifyClient(clientId: number, data: Cliente){
    return this.http.put<any>(`${this.pathApi}/api/clienti/${clientId}`, data);
  }

  getClientById(clientId: number){
    return this.http.get<any>(`${this.pathApi}/api/clienti/${clientId}`);
  }

  getClientTypes(){
    return this.http.get<any>(`${this.pathApi}/api/clienti/tipicliente`);
  }
}

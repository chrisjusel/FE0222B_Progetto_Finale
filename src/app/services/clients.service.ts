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
    return this.http.get<any>(`${this.pathApi}/api/clienti?page=${pageIndex}&size=${pageSize}&sort=id,ASC`);
  }

  modifyClient(clientId: number, data: Cliente){
    return this.http.put<any>(`${this.pathApi}/api/clienti/${clientId}`, data);
  }

  createClient(data: Cliente){
    return this.http.post<Cliente>(`${this.pathApi}/api/clienti/`, data)
  }

  getClientById(clientId: number){
    return this.http.get<any>(`${this.pathApi}/api/clienti/${clientId}`);
  }

  getClientTypes(){
    return this.http.get<any>(`${this.pathApi}/api/clienti/tipicliente`);
  }

  deleteClient(clientId: number){
    return this.http.delete<any>(`${this.pathApi}/api/clienti/${clientId}`);
  }

  getByRagioneSocialeContains(substring: string, pageIndex: number, pageSize: number, sort: string){
    return this.http.get<any>(`${this.pathApi}/api/clienti/ragionesociale?nome=${substring}&sort=ragioneSociale,${sort}&page=${pageIndex}&size=${pageSize}`);
  }

  getByDataInserimentoBetween(dataFrom: string, dataTo: string, pageIndex: number, pageSize: number){
    return this.http.get<any>(`${this.pathApi}/api/clienti/datainserimento?from=${dataFrom}&to=${dataTo}&page=${pageIndex}&size=${pageSize}`);
  }
}

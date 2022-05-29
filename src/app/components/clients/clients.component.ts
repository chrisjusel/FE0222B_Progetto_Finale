import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form!: FormGroup;
  clients!: Cliente[];

  response: any;

  pageIndex: number = 0;
  pageSize: number = 5;
  totalElements!: number;

  activateDialog = false;

  sub!: Subscription

  filterRagioneSociale = false;
  filterDataBetween = false;

  filterSelectedDataFrom!: string;
  filterSelectedDataTo!: string;


  constructor(private fb: FormBuilder, private clientsSrv: ClientsService, private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.inizializzaForm();
    this.sub = this.activeRoute.url.subscribe((res) => {
      if(res[0].path == 'clients'){
        this.getAllClients(this.pageIndex, this.pageSize)
      }
    });
  }

  activateFilterRagioneSociale(){
    if(this.filterRagioneSociale){
      this.filterRagioneSociale = false;
    } else {
      this.filterRagioneSociale = true;
      this.filterDataBetween = false;
    }
  }

  activatefilterDataBetween(){
    if(this.filterDataBetween){
      this.filterDataBetween = false;
    } else {
      this.filterDataBetween = true;
      this.filterRagioneSociale = false;
    }
  }

  filterOnSubmit(form: any){
    console.log(this.form.value.ragsoc);
    if(this.filterRagioneSociale == true){
      this.getByRagioneSocialeContains(this.pageIndex, this.pageSize);
    } else if(this.filterDataBetween == true){
      this.getByDataInserimentoBetween(this.pageIndex, this.pageSize);
    }
  }

  getByRagioneSocialeContains(pageIndex: number, pageSize: number){
    this.clientsSrv.getByRagioneSocialeContains(this.form.value.ragsoc, pageIndex, pageSize, "ASC").subscribe((res) => {
      this.response = res;
      this.clients = res.content;
      this.totalElements = this.response.totalElements;
    });
  }

  getByDataInserimentoBetween(pageIndex: number, pageSize: number){
    this.clientsSrv.getByDataInserimentoBetween(this.adaptDataFormatToAPI(this.form.value.dataFrom), this.adaptDataFormatToAPI(this.form.value.dataTo), pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.clients = res.content;
      this.totalElements = this.response.totalElements;
    })
  }

  inizializzaForm(){
    this.form = this.fb.group({
      ragsoc: new FormControl(''),
      dataFrom: new FormControl(''),
      dataTo: new FormControl('')
    })
  }

  adaptDataFormatToAPI(data: Date){
    let temp: string;
    let tempDay = data.getDate();
    let tempMonth = data.getMonth()+1;
    let tempYear = data.getFullYear()
    temp = `${tempDay}.${tempMonth}.${tempYear}`
    return temp;
  }

  getAllClients(pageIndex: number, pageSize: number){
    return this.clientsSrv.getAllClients(pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.clients = res.content;
      this.totalElements = this.response.totalElements;
    })
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(this.pageIndex);
    console.log(this.pageSize);
    if (event.pageIndex > this.pageIndex) {
      if(this.filterRagioneSociale == true){
        this.getByRagioneSocialeContains(this.pageIndex, this.pageSize);
      }
      else if(this.filterDataBetween == true){
        this.getByDataInserimentoBetween(this.pageIndex, this.pageSize);
      } else {
        this.getAllClients(this.pageIndex, this.pageSize);
      }
    } else {
      if(this.filterRagioneSociale == true){
        this.getByRagioneSocialeContains(this.pageIndex, this.pageSize);
      }
      else if(this.filterDataBetween == true){
        this.getByDataInserimentoBetween(this.pageIndex, this.pageSize);
      } else {
        this.getAllClients(this.pageIndex, this.pageSize);
      }
    }
  }

  deleteClient(clientId: number){
    this.clientsSrv.deleteClient(clientId).subscribe((res) => {
      this.activateDialog = true;
      this.getAllClients(this.pageIndex, this.pageSize);
    })
  }

  closeDialog(){
    this.activateDialog = false;
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

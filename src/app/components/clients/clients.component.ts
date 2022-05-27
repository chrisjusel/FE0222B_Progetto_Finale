import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router, RouterEvent } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clients!: Cliente[];

  response: any;

  pageIndex: number = 0;
  pageSize: number = 5;
  totalElements!: number;

  activateDialog = false;

  constructor(private clientsSrv: ClientsService, private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getAllClients(this.pageIndex, this.pageSize);

    this.activeRoute.url.subscribe((res) => {
      console.log(res)
      if(res[0].path == 'clients'){
        this.getAllClients(this.pageIndex, this.pageSize)
      }
    });
  }

  getAllClients(pageIndex: number, pageSize: number){
    return this.clientsSrv.getAllClients(pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.clients = res.content;
      this.totalElements = this.response.totalElements;
      console.log(this.response);
    })
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(this.pageIndex);
    console.log(this.pageSize);
    if (event.pageIndex > this.pageIndex) {
      this.getAllClients(this.pageIndex, this.pageSize);
    } else {
      this.getAllClients(this.pageIndex, this.pageSize);
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
}

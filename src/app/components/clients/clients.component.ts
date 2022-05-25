import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente } from 'src/app/models/cliente';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //clients!: Cliente[];
  constructor(private clientsSrv: ClientsService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(){
    return this.clientsSrv.getAllClients().subscribe((res) => {
      let clients: Cliente[] = res.content;
    })
  }

}

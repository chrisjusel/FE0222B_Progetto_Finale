import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Fattura } from 'src/app/models/fattura';
import { BillingsService } from 'src/app/services/billings.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.scss']
})
export class BillingsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  billings!: Fattura[];
  clientId!: number;
  client!: Cliente;

  sub!: Subscription;

  response: any;

  pageIndex: number = 0;
  pageSize: number = 10;
  totalElements!: number;

  constructor(private router: ActivatedRoute, private billingSrv: BillingsService, private clientSrv: ClientsService) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params) => {
      this.clientId = +params['idClient'];
      if(this.clientId != 0){
        this.getAllBillings(this.clientId, this.pageIndex, this.pageSize);
        this.getClientbyId(this.clientId)
      }

    })

    this.sub = this.router.url.subscribe((res) => {
      if(res[0].path == 'clients'){
        this.getAllBillings(this.clientId, this.pageIndex, this.pageSize)
      }
    });
  }

  getAllBillings(clientId: number, pageIndex: number, pageSize: number){
    return this.billingSrv.getAllBillingsByClientId(clientId, pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.billings = res.content;
      this.totalElements = this.response.totalElements;
    })
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (event.pageIndex > this.pageIndex) {
      this.getAllBillings(this.clientId, this.pageIndex, this.pageSize);
    } else {
      this.getAllBillings(this.clientId, this.pageIndex, this.pageSize);
    }
  }

  deleteBilling(billingId: number){
    this.billingSrv.deleteBilling(billingId).subscribe(() => {
      this.getAllBillings(this.clientId, this.pageIndex, this.pageSize);
    });
  }

  onDestroy(){
    this.sub.unsubscribe();
  }

  getClientbyId(clientId: number){
    this.clientSrv.getClientById(clientId).subscribe((res) => {
      this.client = res;
    })
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Fattura } from 'src/app/models/fattura';
import { BillingsService } from 'src/app/services/billings.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-global-billings',
  templateUrl: './global-billings.component.html',
  styleUrls: ['./global-billings.component.scss']
})
export class GlobalBillingsComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  billings!: Fattura[];

  response: any;

  pageIndex: number = 0;
  pageSize: number = 5;
  totalElements!: number;
  clickedBilling!: Fattura;

  activateDialog = false;

  constructor(private billingsSrv: BillingsService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllClients(this.pageIndex, this.pageSize);
  }

  getAllClients(pageIndex: number, pageSize: number){
    return this.billingsSrv.getAllBillings(pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.billings = res.content;
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

  deleteBilling(billingId: number){
    this.billingsSrv.deleteBilling(billingId).subscribe((res) => {
      this.activateDialog = true;
      this.getAllClients(this.pageIndex, this.pageSize);
    })
  }

  closeDialog(){
    this.activateDialog = false;
  }
}

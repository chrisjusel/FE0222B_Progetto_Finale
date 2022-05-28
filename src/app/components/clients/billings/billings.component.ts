import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/models/fattura';
import { BillingsService } from 'src/app/services/billings.service';

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.scss']
})
export class BillingsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  billings!: Fattura[];
  clientId!: number;

  sub!: Subscription;

  response: any;

  pageIndex: number = 0;
  pageSize: number = 10;
  totalElements!: number;

  constructor(private router: ActivatedRoute, private billingSrv: BillingsService) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params) => {
      this.clientId = +params['idClient'];
      if(this.clientId != 0){
        this.getAllBillings(this.clientId, this.pageIndex, this.pageSize);
      }
    })
  }

  getAllBillings(clientId: number, pageIndex: number, pageSize: number){
    return this.billingSrv.getAllBillingsByClientId(clientId, pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.billings = res.content;
      this.totalElements = this.response.totalElements;
      console.log(this.billings);
    })
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(this.pageIndex);
    console.log(this.pageSize);
    if (event.pageIndex > this.pageIndex) {
      this.getAllBillings(this.clientId, this.pageIndex, this.pageSize);
    } else {
      this.getAllBillings(this.clientId, this.pageIndex, this.pageSize);
    }
  }

  onDestroy(){
    this.sub.unsubscribe();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  states!: any[];

  response: any;

  pageIndex: number = 0;
  pageSize: number = 5;
  totalElements!: number;
  clickedBilling!: Fattura;

  activateDialog = false;

  sub!: Subscription;

  form!: FormGroup

  filterTutteFatture = false;
  filterByState = false;
  filterImportoBetween = false;

  constructor(private fb: FormBuilder, private billingsSrv: BillingsService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllStates();
    this.inizializzaForm();
    this.sub = this.activeRoute.url.subscribe((res) => {
      if(res[0].path == 'billings'){
        this.getAllBillings(this.pageIndex, this.pageSize)
      }
    });
  }

  getAllBillings(pageIndex: number, pageSize: number){
    return this.billingsSrv.getAllBillings(pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.billings = res.content;
      this.totalElements = this.response.totalElements;
    })
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(this.pageIndex);
    console.log(this.pageSize);
    if (event.pageIndex > this.pageIndex) {
      if(this.filterByState){
        this.getBillingsByState(this.form.value.stateId, this.pageIndex, this.pageSize);
      }
      else if(this.filterTutteFatture){
        this.getAllBillings(this.pageIndex, this.pageSize);
      }else if(this.filterImportoBetween){
        this.getBillingsByImportBetween(this.form.value.importFrom, this.form.value.importTo, this.pageIndex, this.pageSize);
      } else {
        this.getAllBillings(this.pageIndex, this.pageSize);
      }
    } else {
      if(this.filterByState == true){
        this.getBillingsByState(this.form.value.stateId, this.pageIndex, this.pageSize);
      }
      else if(this.filterTutteFatture){
        this.getAllBillings(this.pageIndex, this.pageSize);
      }else if(this.filterImportoBetween){
        this.getBillingsByImportBetween(this.form.value.importFrom, this.form.value.importTo, this.pageIndex, this.pageSize);
      } else {
        this.getAllBillings(this.pageIndex, this.pageSize);
      }
    }
  }

  deleteBilling(billingId: number){
    this.billingsSrv.deleteBilling(billingId).subscribe((res) => {
      this.activateDialog = true;
      this.getAllBillings(this.pageIndex, this.pageSize);
    })
  }

  closeDialog(){
    this.activateDialog = false;
  }

  filterOnSubmit(form: any){
    if(this.filterByState == true){
      this.getBillingsByState(this.form.value.stateId, this.pageIndex, this.pageSize);
    } else if(this.filterTutteFatture == true){
      this.getAllBillings(this.pageIndex, this.pageSize);
    } else if(this.filterImportoBetween == true){
      this.getBillingsByImportBetween(this.form.value.importFrom, this.form.value.importTo, this.pageIndex, this.pageSize);
    } else {
      this.getAllBillings(this.pageIndex, this.pageSize)
    }
  }

  inizializzaForm(){
    this.form = this.fb.group({
      stateId: new FormControl(''),
      importFrom: new FormControl('', Validators.required),
      importTo: new FormControl('', Validators.required)
    })
  }

  getAllStates(){
    this.billingsSrv.getStateTypes().subscribe((res) => {
      this.states = res.content;
      console.log(this.states);
    })
  }

  activateFilterStatoFattura(){
    if(this.filterByState){
      this.filterByState = false;
    } else {
      this.filterByState = true;
      this.filterTutteFatture = false;
      this.filterImportoBetween = false;
    }
  }

  activateFilterTutteFatture(){
    if(this.filterTutteFatture){
      this.filterTutteFatture = false;
    } else {
      this.filterTutteFatture = true;
      this.filterByState = false;
      this.filterImportoBetween = false;
    }
  }

  activateFilterImportoBetween(){
    if(this.filterImportoBetween){
      this.filterImportoBetween = false;
    } else {
      this.filterImportoBetween = true;
      this.filterTutteFatture = false;
      this.filterByState = false;
    }
  }

  getBillingsByState(stateId: number, pageIndex: number, pageSize: number){
    this.billingsSrv.getBillingByStato(stateId, pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.billings = res.content;
      this.totalElements = this.response.totalElements;
    })
  }

  getBillingsByImportBetween(importFrom: number, importTo: number, pageIndex: number, pageSize: number){
    this.billingsSrv.getBillingByImportBetween(importFrom, importTo, pageIndex, pageSize).subscribe((res) => {
      this.response = res;
      this.billings = res.content;
      this.totalElements = this.response.totalElements;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/models/fattura';
import { BillingsService } from 'src/app/services/billings.service';
import { AppComponent } from 'src/app/app.component';
import { PreviousRouteService } from 'src/app/services/previous-route.service';


@Component({
  selector: 'app-modify-billing',
  templateUrl: './modify-billing.component.html',
  styleUrls: ['./modify-billing.component.scss']
})
export class ModifyBillingComponent implements OnInit {

  previousUrl!: string;

  form!: FormGroup;
  states!: any[];
  activateDialog = false;
  billingToModify!: Fattura;
  paramURL!: number;

  previousURL!: string;

  sub!: Subscription;

  formattedData!: string;

  constructor(private fb: FormBuilder, private billingsSrv: BillingsService, private activeRoute: ActivatedRoute, private router: Router, private previousRoute: PreviousRouteService) {
    this.previousURL = previousRoute.getPreviousURL();
  }


  ngOnInit(): void {
    this.inizializzaForm();
    this.getBillingState();
    this.getBillingIdFromURL();
    this.getBillingById(this.paramURL);
  }

  inizializzaForm(){
    this.form = this.fb.group({
      id: new FormControl('', Validators.required)
    })
  }

  packaging(){
    let send: any = this.billingToModify;
    send.cliente = {
      id: send.cliente.id
    }
    send.stato.id = this.form.value.id;
    console.log(send)
    return send;
  }

  onSubmit(form: any){
    console.log(this.form.value);
    let send = this.packaging();
    this.billingsSrv.modifyBilling(this.paramURL, send).subscribe((res) => {
      console.log(res);
      this.router.navigate([this.previousURL]);
    });
  }

  onChange(){}

  getBillingState(){
    this.billingsSrv.getStateTypes().subscribe((res) => {
      this.states = res.content;
      console.log(this.states);
    })
  }

  getBillingById(billingId: number){
    this.billingsSrv.getBillingById(billingId).subscribe((res) => {
      this.billingToModify = res;
      console.log(this.billingToModify)
      this.formattedData = new Date(this.billingToModify.data).toLocaleDateString('it-IT');
    })
  }

  getBillingIdFromURL(){
    this.sub = this.activeRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.paramURL = +params['id'];
    });
  }

  closeDialog(){
    this.router.navigate([this.previousURL]);
  }
}

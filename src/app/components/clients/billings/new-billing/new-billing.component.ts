import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/models/fattura';
import { BillingsService } from 'src/app/services/billings.service';

@Component({
  selector: 'app-new-billing',
  templateUrl: './new-billing.component.html',
  styleUrls: ['./new-billing.component.scss']
})
export class NewBillingComponent implements OnInit {

  form!: FormGroup;
  states!: any[];


  clientId!: number;
  sub!: Subscription;

  constructor(private fb: FormBuilder, private billingsSrv: BillingsService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe((params) => {
      this.clientId = +params['id'];
      this.inizializzaForm();
      this.getBillingState();
    })
  }

  getBillingState(){
    this.billingsSrv.getStateTypes().subscribe((res) => {
      this.states = res.content;
      console.log(this.states);
    })
  }

  packaging(){
    let send: any = this.form.value;
    send.cliente = {
      id: this.clientId
    }
    send.anno = +this.form.value.anno;
    send.importo = +this.form.value.importo;
    send.numero = +this.form.value.numero;
    send.data = new Date (this.form.value.data).toISOString();
    send.stato.id = +this.form.value.stato.id

    return send;
  }

  inizializzaForm(){
    this.form = this.fb.group({
      anno: new FormControl('', [Validators.required]),
      data: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      importo: new FormControl('', Validators.required),
      stato: this.fb.group({
        id: new FormControl('')
      })
    })
  }

  onSubmit(form: any){
    let send = this.packaging();
    console.log(send);
    this.billingsSrv.createBilling(send).subscribe((res) => {
      console.log(res);
      this.router.navigate([`billings/client-billings/${this.clientId}`])
    })
  }
}

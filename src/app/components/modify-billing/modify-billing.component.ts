import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BillingsService } from 'src/app/services/billings.service';

@Component({
  selector: 'app-modify-billing',
  templateUrl: './modify-billing.component.html',
  styleUrls: ['./modify-billing.component.scss']
})
export class ModifyBillingComponent implements OnInit {

  form!: FormGroup;
  states!: any[];
  activateDialog = false;

  constructor(private fb: FormBuilder, private billingsSrv: BillingsService) { }

  ngOnInit(): void {
    this.inizializzaForm();
    this.getBillingState();
  }

  inizializzaForm(){
    this.form = this.fb.group({
      anno: new FormControl('', [Validators.required]),
      data: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      importo: new FormControl('', Validators.required),
      stato: {}
    })
  }

  onSubmit(form: any){}

  onChange(){}

  getBillingState(){
    this.billingsSrv.getStateTypes().subscribe((res) => {
      this.states = res.content;
      console.log(this.states);
    })
  }
  closeDialog(){
    this.activateDialog = false;
  }
}

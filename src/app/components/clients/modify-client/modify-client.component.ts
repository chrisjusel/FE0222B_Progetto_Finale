import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrls: ['./modify-client.component.scss']
})
export class ModifyClientComponent implements OnInit {

  form!: FormGroup;
  clientType!: string[];

  constructor(private fb: FormBuilder, private clientsSrv: ClientsService) { }

  ngOnInit(): void {
    this.getClientTypes();
    this.inizializzaForm();
  }

  inizializzaForm(){
    this.form = this.fb.group({
      ragioneSociale: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tipoCliente: new FormControl('', [Validators.required]),
      pec: new FormControl(''),
      telefono: new FormControl(''),
      nomeContatto: new FormControl(''),
      cognomeContatto: new FormControl(''),
      telefonoContatto: new FormControl(''),
      emailContatto: new FormControl(''),
      indirizzoSedeOperativa: this.fb.group({
        via: new FormControl(''),
        civico: new FormControl(''),
        cap: new FormControl(''),
        localita: new FormControl(''),
        comune: this.fb.group({
          id: new FormControl(''),
          nome: '',
          provincia: {}
        })
      })
    })
  }

  getClientTypes(){
    this.clientsSrv.getClientTypes().subscribe((res) => {
      this.clientType = res;
    })
  }

  onSubmit(form: any){}

}

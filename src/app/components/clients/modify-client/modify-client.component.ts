import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrls: ['./modify-client.component.scss']
})
export class ModifyClientComponent implements OnInit {

  form!: FormGroup;
  clientType!: string[];
  comuni!: any[];
  provincia!: any[];
  response!: any;
  nomeProvincia!: string;

  constructor(private fb: FormBuilder, private clientsSrv: ClientsService, private comuniSrv: ComuniService, private provinceSrv: ProvinceService) { }

  ngOnInit(): void {
    this.getAllComuni();
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
      emailContatto: new FormControl('', [Validators.required]),
      indirizzoSedeOperativa: this.fb.group({
        via: new FormControl(''),
        civico: new FormControl(''),
        cap: new FormControl(''),
        localita: new FormControl(''),
        comune: this.fb.group({
          id: new FormControl('', [Validators.required]),
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

  getAllComuni(){
    this.comuniSrv.getAllComuni().subscribe((res) => {
      this.comuni = res.content;
      console.log(this.comuni);
    })
  }
  onSubmit(form: any){

    let send = this.form.value;
    send.indirizzoSedeOperativa.comune.provincia = this.provincia;
    send.indirizzoSedeOperativa.comune.nome = this.getNomeComuneById(send.indirizzoSedeOperativa.comune.id);
    console.log(send);
    //gli passo solo l'id del comune
  }

  getProvinciaByComuneId(comuneId: number){
    for(let i=0; i<this.comuni.length; i++){
      if(this.comuni[i].id == comuneId){
        return this.comuni[i].provincia.id;
      }
    }
  }

  getNomeComuneById(comuneId: number){
    for(let i=0; i<this.comuni.length; i++){
      if(this.comuni[i].id == comuneId){
        return this.comuni[i].nome;
      }
    }
  }

  onChange(){
    let provinciaId = this.getProvinciaByComuneId(this.form.value.indirizzoSedeOperativa.comune.id);
    this.provinceSrv.getProvinciaById(provinciaId).subscribe((res) => {
      this.nomeProvincia = res.nome;
      this.provincia = res;
    });
  }
}

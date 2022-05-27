import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClientsService } from 'src/app/services/clients.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { ProvinceService } from 'src/app/services/province.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrls: ['./modify-client.component.scss'],
})
export class ModifyClientComponent implements OnInit {
  form!: FormGroup;
  clientType!: string[];
  comuni!: any[];
  provincia!: any[];
  response!: any;
  nomeProvincia!: string;
  clientToModify!: Cliente;
  clientId!: number;
  sub!: Subscription;
  activateDialog = false;



  constructor(
    private fb: FormBuilder,
    private clientsSrv: ClientsService,
    private comuniSrv: ComuniService,
    private provinceSrv: ProvinceService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(queryParams => {
      this.getAllComuni();
      this.getClientTypes();
      this.inizializzaForm();
      this.getClientIdFromURL();
      this.fillModifyForm();
    });
  }


  inizializzaForm() {
    this.form = this.fb.group({
      ragioneSociale: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      tipoCliente: new FormControl('', [Validators.required]),
      pec: new FormControl('', Validators.email),
      telefono: new FormControl(''),
      nomeContatto: new FormControl(''),
      cognomeContatto: new FormControl(''),
      telefonoContatto: new FormControl(''),
      emailContatto: new FormControl('', [Validators.required, Validators.email]),
      indirizzoSedeOperativa: this.fb.group({
        via: new FormControl(''),
        civico: new FormControl(''),
        cap: new FormControl(''),
        localita: new FormControl(''),
        comune: this.fb.group({
          id: new FormControl('', [Validators.required]),
          nome: '',
          provincia: null,
        }),
      }),
    });
  }

  getClientTypes() {
    this.clientsSrv.getClientTypes().subscribe((res) => {
      this.clientType = res;
    });
  }

  getAllComuni() {
    this.comuniSrv.getAllComuni().subscribe((res) => {
      this.comuni = res.content;
      console.log(this.comuni);
    });
  }

  onSubmit(form: any) {
    let send = this.form.value;
    send.indirizzoSedeOperativa.comune.provincia = this.provincia;
    send.indirizzoSedeOperativa.comune.nome = this.getNomeComuneById(
      send.indirizzoSedeOperativa.comune.id
    );
    if(this.clientId == 0){
      this.clientsSrv.createClient(send).subscribe((res) => {
        console.log(res);
        this.openDialog();
      });

    } else {
      this.clientsSrv.modifyClient(this.clientId, send).subscribe((res) => {
        console.log(res);
        this.openDialog();
      });
    }
  }



  getProvinciaByComuneId(comuneId: number) {
    for (let i = 0; i < this.comuni.length; i++) {
      if (this.comuni[i].id == comuneId) {
        return this.comuni[i].provincia.id;
      }
    }
  }

  getNomeComuneById(comuneId: number) {
    for (let i = 0; i < this.comuni.length; i++) {
      if (this.comuni[i].id == comuneId) {
        return this.comuni[i].nome;
      }
    }
  }

  onChange() {
    let provinciaId = this.getProvinciaByComuneId(
      this.form.value.indirizzoSedeOperativa.comune.id
    );
    this.provinceSrv.getProvinciaById(provinciaId).subscribe((res) => {
      this.nomeProvincia = res.nome;
      this.provincia = res;
      console.log(this.provincia)
    });

  }

  fillModifyForm(){
    if(this.clientId != 0){
      this.restoreClientDatas(this.clientId);
    }
  }

  getClientIdFromURL(){
    this.sub = this.activeRoute.params.subscribe((params) => {
      this.clientId = +params['id'];
    });
  }


  restoreClientDatas(clinetId: number) {
    this.clientsSrv.getClientById(clinetId).subscribe((res) => {
      this.clientToModify = res;
      console.log(this.clientToModify);
      this.form.patchValue({
        ragioneSociale: this.clientToModify.ragioneSociale,
        partitaIva: this.clientToModify.partitaIva,
        email: this.clientToModify.email,
        tipoCliente: this.clientToModify.tipoCliente,
        pec: this.clientToModify.pec,
        telefono: this.clientToModify.telefono,
        nomeContatto: this.clientToModify.nomeContatto,
        cognomeContatto: this.clientToModify.cognomeContatto,
        telefonoContatto: this.clientToModify.telefonoContatto,
        emailContatto: this.clientToModify.emailContatto,
        indirizzoSedeOperativa: {
          via: this.clientToModify.indirizzoSedeOperativa.via,
          cap: this.clientToModify.indirizzoSedeOperativa.cap,
          civico: this.clientToModify.indirizzoSedeOperativa.civico,
          localita: this.clientToModify.indirizzoSedeOperativa.localita
        },
      });
    });
  }

  openDialog(){
    this.activateDialog = true;
  }

  closeDialog(){
    this.activateDialog = false;
    this.router.navigate(['/clients']);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

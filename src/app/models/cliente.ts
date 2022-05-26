import { Comune } from "./comune";

export interface Cliente {
  email: string;
  id: number;
  partitaIva: string;
  ragioneSociale: string;
  tipOCliente: string;
  pec: string;
  telefono: string;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: string;
  emailContatto: string;
  indirizzoSedeOperativa: {
    id: number;
    via: string;
    civico: string;
    cap: string;
    localita: string;
    comune: string;
  };
  indirizzoSedeLegale: {
    id: number;
    via: string;
    civico: string;
    cap: string;
    localita: string;
    comune: Comune;
  };
}

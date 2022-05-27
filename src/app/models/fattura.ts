import { Cliente } from "./cliente";

export interface Fattura {
  anno: number;
  cliente: Cliente;
  data: Date;
  id: number;
  importo: number;
  numero: number;
  stato: {
    id: number;
    nome: string;
  }
}

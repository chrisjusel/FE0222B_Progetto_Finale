import { Cliente } from "./cliente";

export interface Fattura {
  anno: number;
  cliente: Cliente;
  data: Date;
  id: number;
  importo: number;
  stato: {
    id: number;
    nome: string;
  }
}

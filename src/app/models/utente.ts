export interface AuthData {
  accessToken: string;
  email: string;
  id: number;
  roles: string[];
  tokenType: string;
  username: string;
}

export interface SingupData {
  username: string;
  email: string;
  password: string;
  role: string[];
  nome: string;
  cognome: string;
}

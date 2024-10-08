export interface Client {
  clientId: number,
  clientName: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  nit: string,
  address: string,
  isActive: boolean,
  createdAt: Date,
}
  
export interface ClientResponse {
  ok: boolean;
  status: number;
  message: string;
  data: Client[];
}

export interface DeactivateClientResponse {
  ok: boolean;
  status: number;
  message: string;
}
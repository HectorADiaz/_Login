export interface Client {
  clientId: number,
  clientName: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  nit: string,
  address: string,
  isActive: boolean
}
  
export interface ClientResponse {
  ok: boolean;
  status: number;
  message: string;
  data: Client[];
}
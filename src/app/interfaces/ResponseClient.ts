
import { Client } from "./Client";
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
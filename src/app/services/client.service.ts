import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';
import { Client } from '../interfaces/Client';
import { ClientResponse, DeactivateClientResponse } from '../interfaces/ResponseClient';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private http = inject (HttpClient);
  private baseUrl: String = appsettings.apiUrl;

  constructor() { } 

  getClients(): Observable<ClientResponse>{
    return this.http.get<ClientResponse>(`${this.baseUrl}client`)
  }

  addClient(objeto: Client): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(`${this.baseUrl}clients`,objeto)
  }

  editClient(objeto: Client): Observable<ClientResponse> {
    return this.http.put<ClientResponse>(`${this.baseUrl}client`,objeto)
  }

  disableClient(id: number): Observable<ClientResponse> {
    return this.http.patch<ClientResponse>(`${this.baseUrl}client/${id}`, {});
  }

  } 

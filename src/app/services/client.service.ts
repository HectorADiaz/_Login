import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';
import { Client } from '../interfaces/Client';
import { ClientResponse } from '../interfaces/ResponseClient';
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

}

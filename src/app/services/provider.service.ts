import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';
import { Observable } from 'rxjs';
import { ProviderResponse } from '../interfaces/ResponseProvider';
import { Provider } from '../interfaces/Provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private http = inject(HttpClient);
  private baseUrl : String = appsettings.apiUrl;

  constructor() { }

  getProvider() : Observable<ProviderResponse>{
    return this.http.get<ProviderResponse>(`${this.baseUrl}provider`)
  }
  addProvider(objeto: Provider) : Observable<ProviderResponse>{
    return this.http.post<ProviderResponse>(`${this.baseUrl}provider`,objeto)
  }
  editProvider(objeto: Provider) : Observable<ProviderResponse>{
    return this.http.put<ProviderResponse>(`${this.baseUrl}provider`,objeto)
  }
  disableProvider(id: number) : Observable<ProviderResponse>{
    return this.http.patch<ProviderResponse>(`${this.baseUrl}provider/${id}`, {})
  }



}

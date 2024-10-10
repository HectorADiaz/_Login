import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';
import { Observable } from 'rxjs';
import { ProviderResponse } from '../interfaces/ResponseProvider';

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



}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private http = inject(HttpClient);
  private baseUrl : String = appsettings.apiUrl;
  constructor() { }


  getBank() : Observable<BankResponse>{
    return this.http.get<BankResponse>(`${this.baseUrl}bank`)
  }
  

}

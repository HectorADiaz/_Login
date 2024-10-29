import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';
import { BankResponse } from '../interfaces/BankResponse';
import { Observable } from 'rxjs/internal/Observable';
import { AccountTypeResponse } from '../interfaces/AccountTypeResponse';

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

  getAccountType() : Observable<AccountTypeResponse>{
    return this.http.get<AccountTypeResponse>(`${this.baseUrl}accountType`)
  }
  

}

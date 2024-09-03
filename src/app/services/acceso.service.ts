import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';
import { Login } from '../interfaces/Login';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private http = inject(HttpClient);
  private baseUrl: string =appsettings.apiUrl;

  // Esta el la segunda Opcion 

  // private baseUrl: string = appsettings.apiUrl;
  // Inyección de HttpClient a través del constructor
  // constructor(private http: HttpClient) { }
 
  constructor() { }

  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}login`,objeto)
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';
import { Login } from '../interfaces/Login';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterResponse, ResponseAcceso } from '../interfaces/ResponseAcceso';
import { User } from '../interfaces/User';

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

  
  register(objeto: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}users`,objeto)
  }

  // http://localhost:3000/api/v1/users
  // http://localhost:3000/api/v1/login

  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}login`,objeto)
  }
}

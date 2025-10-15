import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class InicioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerDatosInicio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inicio/inicio/data_prueba`);
  }
}

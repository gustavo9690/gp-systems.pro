import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';
import { jwtDecode } from 'jwt-decode';


 interface TokenPayload {
  id: number;
  usuario: string;
  exp: number; 
  }

@Injectable({ providedIn: 'root' })

export class AuthService {
  private apiUrl = environment.apiUrl+'Usuario/auth/';

  constructor(private http: HttpClient) {}

  login(data:{}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}acceder`, data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // true si existe, false si no
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch (e) {
      return false;
    }
  }

  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.apiUrl}refresh`, {}, {
      headers: {
        Authorization: refresh || ''
      }
    });
  }

  setAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token'); // o sessionStorage.removeItem('token');
    localStorage.removeItem('usuario'); // si guardaste más datos
  }


}

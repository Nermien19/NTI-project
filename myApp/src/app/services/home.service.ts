// src/app/services/home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/admin/home';

  constructor(private http: HttpClient) {}

  getHome(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addHome(home: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, home);
  }

  updateHome(id: string, home: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, home);
  }

  deleteHome(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

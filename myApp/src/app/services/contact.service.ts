import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:3000/admin/contact';

  constructor(private http: HttpClient) { }

  getContact(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateContact(contactData: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, contactData);
  }

  submitEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/emails`, { email });
  }

  deleteEmail(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/emails/${id}`);
  }
}

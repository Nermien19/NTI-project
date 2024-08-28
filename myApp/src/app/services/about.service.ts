// // src/app/services/about.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AboutService {
//   // private apiUrl = 'http://localhost:3000/admin';

//   // constructor(private http: HttpClient) {}

//   // getAbout(): Observable<any> {
//   //   return this.http.get(`${this.apiUrl}`);
//   // }

//   // addAbout(about: any): Observable<any> {
//   //   return this.http.post(`${this.apiUrl}`, about);
//   // }

//   // updateAbout(id: string, about: any): Observable<any> {
//   //   return this.http.put(`${this.apiUrl}/${id}`, about);
//   // }

//   // deleteAbout(id: string): Observable<any> {
//   //   return this.http.delete(`${this.apiUrl}/${id}`);
//   // }


//   private apiUrl = 'http://localhost:3000/admin/about'; // Ensure this matches your Express routes

//   constructor(private http: HttpClient) {}

//   getAbout(): Observable<any> {

//     return this.http.get(`${this.apiUrl}`);
//   }

//   addAbout(about: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}`, about);
//   }

//   updateAbout(id: string, about: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, about);
//   }

//   deleteAbout(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'http://localhost:3000/admin/about';

  constructor(private http: HttpClient) {}

  getAbout(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addAbout(about: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, about);
  }

  updateAbout(id: string, about: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, about);
  }

  deleteAbout(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


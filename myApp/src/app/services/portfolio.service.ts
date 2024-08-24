import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = 'http://localhost:3000/admin/portfolio';

  constructor(private http: HttpClient) {}

  getPortfolio(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addPortfolio(portfolioData: any): Observable<any> {
    return this.http.post(this.baseUrl, portfolioData);
  }

  updatePortfolio(id: string, portfolioData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, portfolioData);
  }

  deletePortfolio(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  addProject(portfolioId: string, projectData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('popup', projectData.popup);
    if (projectData.image) {
      formData.append('image', projectData.image);
    }
    return this.http.post(`${this.baseUrl}/${portfolioId}/project`, formData);
  }

  deleteProject(portfolioId: string, projectId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${portfolioId}/project/${projectId}`);
  }

  updateProject(portfolioId: string, projectId: string, projectData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('popup', projectData.popup);
    if (projectData.image) {
      formData.append('image', projectData.image);
    }
    return this.http.put(`${this.baseUrl}/${portfolioId}/project/${projectId}`, formData);
  }
//   deleteProject(portfolioId: string, projectData: any): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/${portfolioId}/project`, projectData);
// }

// deleteProject(portfolioId: string, projectId: string): Observable<any> {
//   return this.http.delete(`${this.baseUrl}/${portfolioId}/project/${projectId}`);
// }
}

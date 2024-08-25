import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private baseUrl = 'http://localhost:3000/admin/skills';

  constructor(private http: HttpClient) {}

  getSkills(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addSkillSection(skillsData: any): Observable<any> {
    return this.http.post(this.baseUrl, skillsData);
  }

  updateSkillSection(id: string, skillsData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, skillsData);
  }

  deleteSkillSection(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addSkill(skillSectionId: string, skillData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', skillData.name);
    formData.append('description', skillData.description);
    if (skillData.image) {
      formData.append('image', skillData.image);
    }
    return this.http.post(`${this.baseUrl}/${skillSectionId}/skill`, formData);
  }

  updateSkill(skillSectionId: string, skillId: string, skillData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', skillData.name);
    formData.append('description', skillData.description);
    if (skillData.image) {
      formData.append('image', skillData.image);
    }
    return this.http.put(`${this.baseUrl}/${skillSectionId}/skill/${skillId}`, formData);
  }

  deleteSkill(skillSectionId: string, skillId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${skillSectionId}/skill/${skillId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Projeto } from '../../../models/projeto.model';

@Injectable({
  providedIn: 'root',
})
export class ProjetosService {
  private apiUrl = `${environment.apiUrl}/projetos`;

  constructor(private http: HttpClient) {}

  // Get all projects
  getAll(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl);
  }

  // Get project by ID
  getById(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.apiUrl}/${id}`);
  }

  // Create new project
  post(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.apiUrl, projeto);
  }

  // Update existing project
  put(id: number, projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.apiUrl}/${id}`, projeto);
  }

  // Delete project
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
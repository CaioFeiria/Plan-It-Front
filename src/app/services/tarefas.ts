import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Tarefa } from '../../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  private apiUrl = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient) {}

  // Get all tasks
  getAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  // Get task by ID
  getById(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  // Create new task
  post(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  // Update existing task
  put(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
  }

  // Delete task
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get tasks by project
  getByProject(projetoId: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}/projeto/${projetoId}`);
  }

  // Get tasks by responsible user
  getByResponsible(responsavelId: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}/responsavel/${responsavelId}`);
  }
}
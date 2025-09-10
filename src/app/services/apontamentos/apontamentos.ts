import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Apontamento } from '../../../models/apontamento.model';
import { Tarefa } from '../../../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class ApontamentosService {
  private apiUrl = `${environment.apiUrl}/apontamentos`;

  constructor(private http: HttpClient) {}

  // Create apontamento (associate task to user)
  criarApontamento(usuarioId: number, tarefaId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${usuarioId}/tarefas/${tarefaId}`, {});
  }

  // List apontamentos by user (get user's tasks)
  listarApontamentosDoUsuario(usuarioId: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}/usuarios/${usuarioId}`);
  }

  // Get all apontamentos
  getAll(): Observable<Apontamento[]> {
    return this.http.get<Apontamento[]>(this.apiUrl);
  }

  // Get apontamento by ID
  getById(id: number): Observable<Apontamento> {
    return this.http.get<Apontamento>(`${this.apiUrl}/${id}`);
  }

  // Delete apontamento (remove task association from user)
  delete(usuarioId: number, tarefaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${usuarioId}/tarefas/${tarefaId}`);
  }
}
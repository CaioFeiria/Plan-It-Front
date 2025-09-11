import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TarefasService } from '../../services/tarefas';
import { Tarefa } from '../../../models/tarefa.model';

@Component({
  selector: 'app-tarefas',
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.css'
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];

  constructor(
    private tarefasService: TarefasService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefasService.getAll().subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    });
  }

  criarTarefa() {
    this.router.navigate(['/tarefas/nova']);
  }

  editarTarefa(id: number) {
    this.router.navigate(['/tarefas/editar', id]);
  }

  excluirTarefa(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta tarefa?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.tarefasService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Tarefa excluída com sucesso!'
            });
            this.carregarTarefas();
          },
          error: (error) => {
            console.error('Erro ao excluir tarefa:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao excluir tarefa!'
            });
          }
        });
      }
    });
  }
}

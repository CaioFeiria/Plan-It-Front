import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjetosService } from '../../services/projetos/projetos';
import { Projeto } from '../../../models/projeto.model';

@Component({
  selector: 'app-projetos',
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css'
})
export class ProjetosComponent implements OnInit {
  projetos: Projeto[] = [];

  constructor(
    private projetosService: ProjetosService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.projetosService.getAll().subscribe({
      next: (projetos) => {
        this.projetos = projetos;
      },
      error: (error) => {
        console.error('Erro ao carregar projetos:', error);
      }
    });
  }

  criarProjeto() {
    this.router.navigate(['/projetos/novo']);
  }

  editarProjeto(id: number) {
    this.router.navigate(['/projetos/editar', id]);
  }

  excluirProjeto(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este projeto?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.projetosService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Projeto excluído com sucesso!'
            });
            this.carregarProjetos();
          },
          error: (error) => {
            console.error('Erro ao excluir projeto:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao excluir projeto!'
            });
          }
        });
      }
    });
  }
}

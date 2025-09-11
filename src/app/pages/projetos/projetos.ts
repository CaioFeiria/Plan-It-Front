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

  // Métodos para emojis e cores dos projetos
  getProjectEmoji(id: number): string {
    const emojis = ['🚀', '💼', '🎯', '📊', '🔧', '🌟', '⚡', '🎨', '📱', '🌐', '🔬', '🎪', '🏗️', '📈', '🎭', '🔍'];
    return emojis[id % emojis.length];
  }

  getProjectColor(emojiOrId: string | number): string {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600', 
      'bg-purple-100 text-purple-600',
      'bg-orange-100 text-orange-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600',
      'bg-yellow-100 text-yellow-600',
      'bg-red-100 text-red-600',
      'bg-teal-100 text-teal-600',
      'bg-cyan-100 text-cyan-600',
      'bg-lime-100 text-lime-600',
      'bg-amber-100 text-amber-600',
      'bg-emerald-100 text-emerald-600',
      'bg-violet-100 text-violet-600',
      'bg-rose-100 text-rose-600',
      'bg-sky-100 text-sky-600'
    ];
    
    if (typeof emojiOrId === 'string') {
      // Se for emoji, usar hash do emoji para determinar cor
      const emojiHash = emojiOrId.split('').reduce((hash, char) => {
        return hash + char.charCodeAt(0);
      }, 0);
      return colors[emojiHash % colors.length];
    } else {
      // Se for ID, usar o ID diretamente
      return colors[emojiOrId % colors.length];
    }
  }
}

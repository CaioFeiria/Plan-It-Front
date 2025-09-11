import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TarefasService } from '../../services/tarefas';
import { UserService } from '../../services/user/user';
import { ApontamentosService } from '../../services/apontamentos/apontamentos';
import { Tarefa } from '../../../models/tarefa.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-tarefas',
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TooltipModule, 
    ConfirmDialogModule,
    DialogModule,
    SelectModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.css'
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  usuarios: Usuario[] = [];
  tarefasComUsuarios: any[] = [];
  
  // Modal de atribuição
  mostrarModalAtribuicao = false;
  tarefaSelecionada: Tarefa | null = null;
  usuarioSelecionado: Usuario | null = null;

  constructor(
    private tarefasService: TarefasService,
    private userService: UserService,
    private apontamentosService: ApontamentosService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarTarefas();
    this.carregarUsuarios();
  }

  carregarTarefas() {
    this.tarefasService.getAll().subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
        this.carregarTarefasComUsuarios();
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    });
  }

  carregarUsuarios() {
    this.userService.getAll().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  carregarTarefasComUsuarios() {
    this.tarefasComUsuarios = this.tarefas.map(tarefa => ({
      ...tarefa,
      usuarioAtribuido: null
    }));

    // Carregar apontamentos para cada tarefa
    this.tarefasComUsuarios.forEach(tarefa => {
      this.apontamentosService.getAll().subscribe({
        next: (apontamentos) => {
          const apontamento = apontamentos.find(ap => ap.tarefa.id === tarefa.id);
          if (apontamento) {
            tarefa.usuarioAtribuido = apontamento.usuario;
          }
        }
      });
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

  // Métodos para atribuição de tarefas
  abrirModalAtribuicao(tarefa: Tarefa) {
    this.tarefaSelecionada = tarefa;
    this.usuarioSelecionado = null;
    this.mostrarModalAtribuicao = true;
  }

  fecharModalAtribuicao() {
    this.mostrarModalAtribuicao = false;
    this.tarefaSelecionada = null;
    this.usuarioSelecionado = null;
  }

  onUsuarioChange(event: any) {
    const usuarioId = parseInt(event.target.value);
    this.usuarioSelecionado = this.usuarios.find(u => u.id === usuarioId) || null;
  }

  atribuirTarefa() {
    if (this.tarefaSelecionada && this.usuarioSelecionado) {
      this.apontamentosService.criarApontamento(
        this.usuarioSelecionado.id!,
        this.tarefaSelecionada.id!
      ).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Tarefa atribuída com sucesso!'
          });
          this.carregarTarefas();
          this.fecharModalAtribuicao();
        },
        error: (error) => {
          console.error('Erro ao atribuir tarefa:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atribuir tarefa!'
          });
        }
      });
    }
  }

  removerAtribuicao(tarefa: any) {
    if (tarefa.usuarioAtribuido) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja remover a atribuição desta tarefa?',
        header: 'Confirmar Remoção',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.apontamentosService.delete(
            tarefa.usuarioAtribuido.id,
            tarefa.id
          ).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Atribuição removida com sucesso!'
              });
              this.carregarTarefas();
            },
            error: (error) => {
              console.error('Erro ao remover atribuição:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao remover atribuição!'
              });
            }
          });
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApontamentosService } from '../../services/apontamentos/apontamentos';
import { TarefasService } from '../../services/tarefas';
import { UserService } from '../../services/user/user';
import { Apontamento } from '../../../models/apontamento.model';
import { Tarefa } from '../../../models/tarefa.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-apontamentos',
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
  templateUrl: './apontamentos.html',
  styleUrl: './apontamentos.css'
})
export class ApontamentosComponent implements OnInit {
  apontamentos: Apontamento[] = [];
  tarefas: Tarefa[] = [];
  usuarios: Usuario[] = [];
  
  // Modal de criação/edição
  mostrarModalApontamento = false;
  apontamentoSelecionado: Apontamento | null = null;
  tarefaSelecionada: Tarefa | null = null;
  usuarioSelecionado: Usuario | null = null;
  modoEdicao = false;

  constructor(
    private apontamentosService: ApontamentosService,
    private tarefasService: TarefasService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarApontamentos();
    this.carregarTarefas();
    this.carregarUsuarios();
  }

  carregarApontamentos() {
    this.apontamentosService.getAll().subscribe({
      next: (apontamentos) => {
        this.apontamentos = apontamentos;
      },
      error: (error) => {
        console.error('Erro ao carregar apontamentos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar apontamentos!'
        });
      }
    });
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

  // Métodos para gerenciar apontamentos
  criarApontamento() {
    this.apontamentoSelecionado = null;
    this.tarefaSelecionada = null;
    this.usuarioSelecionado = null;
    this.modoEdicao = false;
    this.mostrarModalApontamento = true;
  }

  editarApontamento(apontamento: Apontamento) {
    this.apontamentoSelecionado = apontamento;
    this.tarefaSelecionada = apontamento.tarefa;
    this.usuarioSelecionado = apontamento.usuario;
    this.modoEdicao = true;
    this.mostrarModalApontamento = true;
  }

  fecharModalApontamento() {
    this.mostrarModalApontamento = false;
    this.apontamentoSelecionado = null;
    this.tarefaSelecionada = null;
    this.usuarioSelecionado = null;
    this.modoEdicao = false;
  }

  onTarefaChange(event: any) {
    const tarefaId = parseInt(event.target.value);
    this.tarefaSelecionada = this.tarefas.find(t => t.id === tarefaId) || null;
  }

  onUsuarioChange(event: any) {
    const usuarioId = parseInt(event.target.value);
    this.usuarioSelecionado = this.usuarios.find(u => u.id === usuarioId) || null;
  }

  salvarApontamento() {
    if (this.tarefaSelecionada && this.usuarioSelecionado) {
      if (this.modoEdicao && this.apontamentoSelecionado) {
        // Para edição, primeiro remove o apontamento antigo e cria um novo
        this.apontamentosService.delete(
          this.apontamentoSelecionado.usuario.id!,
          this.apontamentoSelecionado.tarefa.id!
        ).subscribe({
          next: () => {
            this.criarNovoApontamento();
          },
          error: (error) => {
            console.error('Erro ao remover apontamento antigo:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar apontamento!'
            });
          }
        });
      } else {
        this.criarNovoApontamento();
      }
    }
  }

  private criarNovoApontamento() {
    if (this.tarefaSelecionada && this.usuarioSelecionado) {
      this.apontamentosService.criarApontamento(
        this.usuarioSelecionado.id!,
        this.tarefaSelecionada.id!
      ).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: this.modoEdicao ? 'Apontamento editado com sucesso!' : 'Apontamento criado com sucesso!'
          });
          this.carregarApontamentos();
          this.fecharModalApontamento();
        },
        error: (error) => {
          console.error('Erro ao salvar apontamento:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao salvar apontamento!'
          });
        }
      });
    }
  }

  excluirApontamento(apontamento: Apontamento) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este apontamento?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.apontamentosService.delete(
          apontamento.usuario.id!,
          apontamento.tarefa.id!
        ).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Apontamento excluído com sucesso!'
            });
            this.carregarApontamentos();
          },
          error: (error) => {
            console.error('Erro ao excluir apontamento:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao excluir apontamento!'
            });
          }
        });
      }
    });
  }
}

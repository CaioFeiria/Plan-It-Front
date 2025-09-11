import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user/user';
import { ApontamentosService } from '../../services/apontamentos/apontamentos';
import { Usuario } from '../../../models/usuario.model';
import { Tarefa } from '../../../models/tarefa.model';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, ConfirmDialogModule, DialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosComTarefas: any[] = [];
  
  // Modal de tarefas
  mostrarModalTarefas = false;
  usuarioSelecionado: Usuario | null = null;
  tarefasDoUsuario: Tarefa[] = [];

  constructor(
    private userService: UserService,
    private apontamentosService: ApontamentosService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.userService.getAll().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.carregarUsuariosComTarefas();
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  carregarUsuariosComTarefas() {
    this.usuariosComTarefas = this.usuarios.map(usuario => ({
      ...usuario,
      quantidadeTarefas: 0
    }));

    // Carregar quantidade de tarefas para cada usuário
    this.usuariosComTarefas.forEach(usuario => {
      this.apontamentosService.listarApontamentosDoUsuario(usuario.id!).subscribe({
        next: (tarefas) => {
          usuario.quantidadeTarefas = tarefas.length;
        }
      });
    });
  }

  criarUsuario() {
    this.router.navigate(['/usuarios/novo']);
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  excluirUsuario(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este usuário?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.userService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário excluído com sucesso!'
            });
            this.carregarUsuarios();
          },
          error: (error) => {
            console.error('Erro ao excluir usuário:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao excluir usuário!'
            });
          }
        });
      }
    });
  }

  // Métodos para visualizar tarefas do usuário
  visualizarTarefas(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    this.apontamentosService.listarApontamentosDoUsuario(usuario.id!).subscribe({
      next: (tarefas) => {
        this.tarefasDoUsuario = tarefas;
        this.mostrarModalTarefas = true;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas do usuário:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar tarefas do usuário!'
        });
      }
    });
  }

  fecharModalTarefas() {
    this.mostrarModalTarefas = false;
    this.usuarioSelecionado = null;
    this.tarefasDoUsuario = [];
  }
}

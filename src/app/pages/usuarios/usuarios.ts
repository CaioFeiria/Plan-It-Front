import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user/user';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private userService: UserService,
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
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
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
}

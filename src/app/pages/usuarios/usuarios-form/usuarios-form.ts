import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-usuarios-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios-form.html',
  styleUrl: './usuarios-form.css'
})
export class UsuariosFormComponent implements OnInit {
  usuarioForm!: FormGroup;
  isEditando = false;
  usuarioId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditando = true;
        this.usuarioId = +params['id'];
        this.carregarUsuario();
      }
    });
  }

  initForm() {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  carregarUsuario() {
    if (this.usuarioId) {
      this.userService.getById(this.usuarioId).subscribe({
        next: (usuario) => {
          this.usuarioForm.patchValue(usuario);
        },
        error: (error) => {
          console.error('Erro ao carregar usuário:', error);
        }
      });
    }
  }

  salvar() {
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;

      if (this.isEditando && this.usuarioId) {
        this.userService.put(this.usuarioId, usuarioData).subscribe({
          next: () => {
            this.router.navigate(['/usuarios']);
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
          }
        });
      } else {
        this.userService.post(usuarioData).subscribe({
          next: () => {
            this.router.navigate(['/usuarios']);
          },
          error: (error) => {
            console.error('Erro ao criar usuário:', error);
          }
        });
      }
    }
  }

  voltar() {
    this.router.navigate(['/usuarios']);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetosService } from '../../../services/projetos/projetos';
import { Projeto } from '../../../../models/projeto.model';

@Component({
  selector: 'app-projetos-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projetos-form.html',
  styleUrl: './projetos-form.css'
})
export class ProjetosFormComponent implements OnInit {
  projetoForm!: FormGroup;
  isEditando = false;
  projetoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetosService: ProjetosService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditando = true;
        this.projetoId = +params['id'];
        this.carregarProjeto();
      }
    });
  }

  initForm() {
    this.projetoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });
  }

  carregarProjeto() {
    if (this.projetoId) {
      this.projetosService.getById(this.projetoId).subscribe({
        next: (projeto) => {
          this.projetoForm.patchValue(projeto);
        },
        error: (error) => {
          console.error('Erro ao carregar projeto:', error);
        }
      });
    }
  }

  salvar() {
    if (this.projetoForm.valid) {
      const projetoData = this.projetoForm.value;

      if (this.isEditando && this.projetoId) {
        this.projetosService.put(this.projetoId, projetoData).subscribe({
          next: () => {
            this.router.navigate(['/projetos']);
          },
          error: (error) => {
            console.error('Erro ao atualizar projeto:', error);
          }
        });
      } else {
        this.projetosService.post(projetoData).subscribe({
          next: () => {
            this.router.navigate(['/projetos']);
          },
          error: (error) => {
            console.error('Erro ao criar projeto:', error);
          }
        });
      }
    }
  }

  voltar() {
    this.router.navigate(['/projetos']);
  }
}
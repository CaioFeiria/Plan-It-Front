import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefasService } from '../../../services/tarefas';
import { Tarefa } from '../../../../models/tarefa.model';
import { Prioridade } from '../../../../models/prioridade.enum';

@Component({
  selector: 'app-tarefas-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefas-form.html',
  styleUrl: './tarefas-form.css'
})
export class TarefasFormComponent implements OnInit {
  tarefaForm!: FormGroup;
  isEditando = false;
  tarefaId?: number;
  prioridades = Object.values(Prioridade);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefasService: TarefasService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditando = true;
        this.tarefaId = +params['id'];
        this.carregarTarefa();
      }
    });
  }

  initForm() {
    this.tarefaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: [''],
      prioridade: [''],
      dataConclusao: ['', [this.futureDateValidator]]
    });
  }

  futureDateValidator(control: any) {
    if (control.value) {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate <= today) {
        return { future: true };
      }
    }
    return null;
  }

  carregarTarefa() {
    if (this.tarefaId) {
      this.tarefasService.getById(this.tarefaId).subscribe({
        next: (tarefa) => {
          this.tarefaForm.patchValue({
            ...tarefa,
            dataConclusao: tarefa.dataConclusao ? new Date(tarefa.dataConclusao).toISOString().split('T')[0] : ''
          });
        },
        error: (error) => {
          console.error('Erro ao carregar tarefa:', error);
        }
      });
    }
  }

  salvar() {
    if (this.tarefaForm.valid) {
      const tarefaData = {
        ...this.tarefaForm.value,
        dataConclusao: this.tarefaForm.value.dataConclusao ? new Date(this.tarefaForm.value.dataConclusao) : null
      };

      if (this.isEditando && this.tarefaId) {
        this.tarefasService.put(this.tarefaId, tarefaData).subscribe({
          next: () => {
            this.router.navigate(['/tarefas']);
          },
          error: (error) => {
            console.error('Erro ao atualizar tarefa:', error);
          }
        });
      } else {
        this.tarefasService.post(tarefaData).subscribe({
          next: () => {
            this.router.navigate(['/tarefas']);
          },
          error: (error) => {
            console.error('Erro ao criar tarefa:', error);
          }
        });
      }
    }
  }

  voltar() {
    this.router.navigate(['/tarefas']);
  }
}
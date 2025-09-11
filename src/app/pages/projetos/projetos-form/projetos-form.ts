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
  
  availableEmojis = [
    '🚀', '💼', '🎯', '📊', '🔧', '🌟', '⚡', '🎨', 
    '📱', '🌐', '🔬', '🎪', '🏗️', '📈', '🎭', '🔍',
    '💡', '🎮', '🏆', '🎨', '🔒', '📝', '🎵', '🎬',
    '🏥', '🎓', '🍕', '☕', '🎂', '🎁', '🎉', '🎊'
  ];

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
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      emoji: ['', [Validators.required]]
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

  selecionarEmoji(emoji: string) {
    this.projetoForm.patchValue({ emoji });
  }

  getProjectColor(emoji: string): string {
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
    
    // Usar o índice do emoji no array para determinar a cor
    const emojiIndex = this.availableEmojis.indexOf(emoji);
    return colors[emojiIndex % colors.length];
  }
}
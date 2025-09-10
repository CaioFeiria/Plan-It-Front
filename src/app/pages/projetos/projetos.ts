import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projetos',
  imports: [CommonModule],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css'
})
export class ProjetosComponent {

  criarProjeto() {
    console.log('Criar novo projeto');
    // TODO: Implementar lógica para criar projeto
  }

}

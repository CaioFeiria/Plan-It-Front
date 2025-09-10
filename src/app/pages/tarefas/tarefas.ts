import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefas',
  imports: [CommonModule],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.css'
})
export class TarefasComponent {

  criarTarefa() {
    console.log('Criar nova tarefa');
    // TODO: Implementar lógica para criar tarefa
  }

}

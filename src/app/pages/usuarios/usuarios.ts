import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent {

  criarUsuario() {
    console.log('Criar novo usuário');
    // TODO: Implementar lógica para criar usuário
  }

}

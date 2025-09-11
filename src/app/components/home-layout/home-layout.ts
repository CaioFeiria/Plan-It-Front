import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';

@Component({
  selector: 'app-home-layout',
  imports: [
    CommonModule,
    Toolbar,
    RouterOutlet
],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayoutComponent {
  // Layout específico para a Home sem sidenav
}

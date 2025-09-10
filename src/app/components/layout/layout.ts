import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidenav } from '../sidenav/sidenav';
import { Toolbar } from '../toolbar/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Sidenav, Toolbar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  menuVisible: boolean = true;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}

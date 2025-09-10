import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Sidenav } from '../sidenav/sidenav';
import { Toolbar } from '../toolbar/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, ButtonModule, Sidenav, Toolbar, RouterOutlet],
  templateUrl: './layout.html',
})
export class Layout {
  visible: boolean = false;
}

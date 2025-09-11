import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NavigationCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  navigationCards: NavigationCard[] = [
    {
      title: 'Usuários',
      description: 'Gerencie usuários do sistema, visualize tarefas atribuídas e muito mais',
      icon: 'pi pi-users',
      route: '/usuarios',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Projetos',
      description: 'Organize e gerencie seus projetos de forma eficiente',
      icon: 'pi pi-folder',
      route: '/projetos',
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Tarefas',
      description: 'Crie, edite e atribua tarefas aos usuários do sistema',
      icon: 'pi pi-check-square',
      route: '/tarefas',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'Apontamentos',
      description: 'Gerencie a associação entre usuários e tarefas',
      icon: 'pi pi-link',
      route: '/apontamentos',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  currentTime = new Date();
  greeting = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateGreeting();
    // Atualizar cumprimento a cada minuto
    setInterval(() => {
      this.updateGreeting();
    }, 60000);
  }

  updateGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Bom dia';
    } else if (hour < 18) {
      this.greeting = 'Boa tarde';
    } else {
      this.greeting = 'Boa noite';
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getCurrentDate() {
    return this.currentTime.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { ProjetosComponent } from './pages/projetos/projetos';
import { TarefasComponent } from './pages/tarefas/tarefas';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rotas de autenticação
  { 
    path: 'auth', 
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/auth/register/register').then(m => m.RegisterComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  // Rotas principais (protegidas)
  {
    path: '',
    component: Layout,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/novo', loadComponent: () => import('./pages/usuarios/usuarios-form/usuarios-form').then(m => m.UsuariosFormComponent) },
      { path: 'usuarios/editar/:id', loadComponent: () => import('./pages/usuarios/usuarios-form/usuarios-form').then(m => m.UsuariosFormComponent) },
      { path: 'projetos', component: ProjetosComponent },
      { path: 'projetos/novo', loadComponent: () => import('./pages/projetos/projetos-form/projetos-form').then(m => m.ProjetosFormComponent) },
      { path: 'projetos/editar/:id', loadComponent: () => import('./pages/projetos/projetos-form/projetos-form').then(m => m.ProjetosFormComponent) },
      { path: 'tarefas', component: TarefasComponent },
      { path: 'tarefas/nova', loadComponent: () => import('./pages/tarefas/tarefas-form/tarefas-form').then(m => m.TarefasFormComponent) },
      { path: 'tarefas/editar/:id', loadComponent: () => import('./pages/tarefas/tarefas-form/tarefas-form').then(m => m.TarefasFormComponent) },
    ],
  },
  // Redirecionamento padrão para login
  { path: '**', redirectTo: 'auth/login' }
];

import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { ProjetosComponent } from './pages/projetos/projetos';
import { TarefasComponent } from './pages/tarefas/tarefas';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'projetos', component: ProjetosComponent },
      { path: 'tarefas', component: TarefasComponent },
    ],
  },
];

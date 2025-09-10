import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [],
  },
];

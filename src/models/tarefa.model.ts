import { Prioridade } from './prioridade.enum';
import { Projeto } from './projeto.model';
import { Usuario } from './usuario.model';

export interface Tarefa {
  id?: number;
  nome: string;
  descricao?: string;
  prioridade?: Prioridade;
  dataCriacao?: Date;
  dataConclusao?: Date;
  projeto?: Projeto;
  responsavel?: Usuario;
  usuarios?: Usuario[];
}

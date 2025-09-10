import { Usuario } from './usuario.model';
import { Tarefa } from './tarefa.model';

export interface Apontamento {
  id?: number;
  usuario: Usuario;
  tarefa: Tarefa;
  dataApontamento?: Date;
}

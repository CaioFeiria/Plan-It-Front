import { Tarefa } from "./tarefa.model";


export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  tarefas?: Tarefa[];
}

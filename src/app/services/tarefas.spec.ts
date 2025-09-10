import { TestBed } from '@angular/core/testing';
import { TarefasService } from './tarefas';

describe('TarefasService', () => {
  let service: TarefasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarefasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
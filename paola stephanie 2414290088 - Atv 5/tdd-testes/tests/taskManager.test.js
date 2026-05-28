import { describe, it, expect, beforeEach } from 'vitest';

import {
  validateTitle,
  createTask,
  addTask,
  toggleTask,
  removeTask,
  filterTasks,
  countTasks,
  countCompleted,
  countPending,
  resetId,
} from '../src/taskManager.js';

describe('validateTitle', () => {
  it('deve validar títulos corretos', () => {
    expect(validateTitle('Estudar')).toBe(true);
  });

  it('deve retornar false para título inválido', () => {
    expect(validateTitle('ab')).toBe(false);
  });
});

describe('createTask', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve criar tarefa corretamente', () => {
    const task = createTask('Nova tarefa');

    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Nova tarefa');
    expect(task.completed).toBe(false);
  });
});

describe('addTask', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve adicionar tarefa na lista', () => {
    const tasks = addTask([], 'Tarefa 1');

    expect(tasks).toHaveLength(1);
  });

  it('deve lançar erro para título inválido', () => {
    expect(() => addTask([], '')).toThrow();
  });
});

describe('toggleTask', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve alternar completed', () => {
    const task = createTask('Teste');

    const updated = toggleTask(task);

    expect(updated.completed).toBe(true);
  });
});

describe('removeTask', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve remover tarefa pelo id', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');

    const updated = removeTask(tasks, 1);

    expect(updated).toHaveLength(1);
  });
});

describe('filterTasks', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve filtrar tarefas concluídas', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');

    tasks = tasks.map((task) =>
      task.id === 1 ? toggleTask(task) : task
    );

    const completed = filterTasks(tasks, 'completed');

    expect(completed).toHaveLength(1);
  });
});

describe('countTasks', () => {
  it('deve contar tarefas', () => {
    resetId();

    let tasks = addTask([], 'T1');
    tasks = addTask(tasks, 'T2');

    expect(countTasks(tasks)).toBe(2);
  });
});

describe('countCompleted', () => {
  it('deve contar tarefas concluídas', () => {
    resetId();

    let tasks = addTask([], 'Tarefa');

    tasks = tasks.map((task) => toggleTask(task));

    expect(countCompleted(tasks)).toBe(1);
  });
});

describe('countPending', () => {
  it('deve contar tarefas pendentes', () => {
    resetId();

    let tasks = addTask([], 'T1');
    tasks = addTask(tasks, 'T2');

    tasks = tasks.map((task) =>
      task.id === 1 ? toggleTask(task) : task
    );

    expect(countPending(tasks)).toBe(1);
  });
});

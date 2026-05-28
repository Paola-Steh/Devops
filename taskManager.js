
// taskManager.js — Regras de negócio do gerenciador de tarefas
let _nextId = 1;

export function resetId() {
  _nextId = 1;
}

// Validação
export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  return title.trim().length >= 3;
}

// Criação
export function createTask(title, priority = 'medium') {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
    priority,
  };
}

export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido: deve ser uma string com pelo menos 3 caracteres.');
  }
  if (isDuplicate(tasks, title)) {
    throw new Error('Título duplicado: já existe uma tarefa com esse título.');
  }
  const newTask = createTask(title);
  return [...tasks, newTask];
}

// Alteração de estado - exercício A
export function toggleTask(task) {
  return { ...task, completed: !task.completed };
}

// ---------------------------------------------
// Remoção - exercício 1
export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// Filtros - exercício 2
export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter((t) => t.completed === true);
    case 'pending':
      return tasks.filter((t) => t.completed === false);
    case 'all':
    default:
      return [...tasks];
  }
}

// Contagens - exercício 3
export function countTasks(tasks) {
  return tasks.length;
}

export function countCompleted(tasks) {
  return tasks.filter((t) => t.completed === true).length;
}

export function countPending(tasks) {
  return tasks.filter((t) => t.completed === false).length;
}

// Prioridade - exercício 4
export function validatePriority(priority) {
  return ['low', 'medium', 'high'].includes(priority);
}

export function filterByPriority(tasks, priority) {
  return tasks.filter((t) => t.priority === priority);
}

// Duplicatas - exercício 5
export function isDuplicate(tasks, title) {
  if (typeof title !== 'string') return false;
  const normalized = title.trim().toLowerCase();
  return tasks.some((t) => t.title.trim().toLowerCase() === normalized);
}

// Ordenação - exercício 6
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
}

// Busca - exercício 7
export function searchTasks(tasks, query) {
  if (query === '') return [...tasks];
  const lowerQuery = query.toLowerCase();
  return tasks.filter((t) => t.title.toLowerCase().includes(lowerQuery));
}

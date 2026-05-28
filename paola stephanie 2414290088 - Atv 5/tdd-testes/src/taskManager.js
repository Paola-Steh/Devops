let nextId = 1;

export function resetId() {
  nextId = 1;
}

export function validateTitle(title) {
  if (typeof title !== 'string') {
    return false;
  }

  return title.trim().length >= 3;
}

export function createTask(title) {
  return {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };
}

export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }

  const newTask = createTask(title);

  return [...tasks, newTask];
}

export function toggleTask(task) {
  return {
    ...task,
    completed: !task.completed,
  };
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter((task) => task.completed);

    case 'pending':
      return tasks.filter((task) => !task.completed);

    default:
      return [...tasks];
  }
}

export function countTasks(tasks) {
  return tasks.length;
}

export function countCompleted(tasks) {
  return tasks.filter((task) => task.completed).length;
}

export function countPending(tasks) {
  return tasks.filter((task) => !task.completed).length;
}

import { getData } from '../utils/httpClient';
import { Todo } from '../types/Todo';

export function getAllTodos() {
  return getData<Todo[]>('/todos.json');
}

export function getActive() {
  return getAllTodos().then(todos =>
    todos.filter(todo => todo.completed === false),
  );
}

export function getCompleted() {
  return getAllTodos().then(todos => todos.filter(todo => todo.completed));
}

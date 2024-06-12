export interface Todo {
  id: string;
  name: string;
  created_on: number;
  completed: boolean;
}

export interface NewTodo {
  name: string;
  completed: false;
}

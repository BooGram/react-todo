export interface Todo {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface UpdateTodoDto {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: "open" | "in-progress" | "resolved" | "closed";
}

const STORAGE_KEY = "support_todos";

const getTodosFromStorage = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading todos from localStorage:", error);
    return [];
  }
};

const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
    throw new Error("Failed to save todos");
  }
};

const generateId = (): string => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const delay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createTodo = async (data: CreateTodoDto): Promise<Todo> => {
  await delay();

  const todos = getTodosFromStorage();

  const newTodo: Todo = {
    id: generateId(),
    ...data,
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveTodosToStorage(todos);

  return newTodo;
};

export const listTodos = async (): Promise<Todo[]> => {
  await delay();

  const todos = getTodosFromStorage();
  return todos.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

export const getTodo = async (id: string): Promise<Todo | null> => {
  await delay();

  const todos = getTodosFromStorage();
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    throw new Error(`Todo with ID ${id} not found`);
  }

  return todo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await delay();

  const todos = getTodosFromStorage();
  const filteredTodos = todos.filter((t) => t.id !== id);

  if (todos.length === filteredTodos.length) {
    throw new Error(`Todo with ID ${id} not found`);
  }

  saveTodosToStorage(filteredTodos);
};

export const clearAllTodos = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

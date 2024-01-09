import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { setItemsToLocalStorage } from "../Helper/helper";
import { v4 as uuidv4 } from "uuid";

type TodoContextType = {
  todoList: TodoListType[];
  addList: (listName: string) => void;
  removeList: (listId: string) => void;
  addTodo: (listId: string, title: string, description: string) => void;
  removeTodo: (listId: string, todoId: string) => void;
  editTodo: (
    listId: string,
    todoId: string,
    todoTitle: string,
    todoDescription: string
  ) => void;
};

type TOdosProviderProps = {
  children: ReactNode;
};

export type TodoType = {
  todoId: string;
  todoTitle: string;
  todoDescription: string;
};

export type TodoListType = {
  listId: string;
  listName: string;
  todos: TodoType[];
};

const TodoContext = createContext({} as TodoContextType);

function TodosProvider({ children }: TOdosProviderProps) {
  const [todoList, setTodoList] = useState<TodoListType[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      setTodoList(JSON.parse(data));
    }
  }, []);

  const addList = useCallback(
    (listName: string) => {
      setTodoList((lists) => {
        const listId = uuidv4();
        const newLists = [...lists, { listId, listName, todos: [] }];
        setItemsToLocalStorage("todos", newLists);
        return newLists;
      });
    },
    [todoList]
  );

  const removeList = useCallback(
    (listId: string) => {
      setTodoList((lists) => {
        const newLists = lists.filter((list) => list.listId !== listId);
        setItemsToLocalStorage("todos", newLists);
        return newLists;
      });
    },
    [todoList]
  );

  const addTodo = useCallback(
    (listId: string, title: string, description: string) => {
      setTodoList((lists) => {
        const list = lists.find((list) => list.listId === listId);
        if (list) {
          const todoId = uuidv4();
          list?.todos.push({
            todoId,
            todoTitle: title,
            todoDescription: description,
          });
        }
        setItemsToLocalStorage("todos", [...lists]);
        return [...lists];
      });
    },
    [todoList]
  );

  const removeTodo = useCallback(
    (listId: string, todoId: string) => {
      setTodoList((lists) => {
        const list = lists.find((list) => list.listId === listId);
        if (list) {
          list.todos = list?.todos.filter((todo) => todo.todoId !== todoId);
        }
        setItemsToLocalStorage("todos", [...lists]);
        return [...lists];
      });
    },
    [todoList]
  );

  const editTodo = useCallback(
    (
      listId: string,
      todoId: string,
      todoTitle: string,
      todoDescription: string
    ) => {
      setTodoList((lists) => {
        const todo = lists
          .find((list) => list.listId === listId)
          ?.todos.find((todo) => todo.todoId == todoId);

        if (todo) {
          todo.todoTitle = todoTitle;
          todo.todoDescription = todoDescription;
        }

        setItemsToLocalStorage("todos", [...lists]);
        return [...lists];
      });
    },
    [todoList]
  );

  return (
    <TodoContext.Provider
      value={{
        todoList,
        addList,
        removeList,
        addTodo,
        removeTodo,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

const useTodoList = () => {
  return useContext(TodoContext);
};

export default TodosProvider;
export { useTodoList };

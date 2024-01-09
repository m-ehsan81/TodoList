import { TodoListType } from "../context/TodosContext";

function setItemsToLocalStorage(key: string, data: TodoListType[]) {
  localStorage.setItem(key, JSON.stringify(data));
}
 export {setItemsToLocalStorage}
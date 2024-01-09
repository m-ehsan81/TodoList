import { useTodoList } from "../context/TodosContext";
import InputList from "./InputList";
import List from "./List";

function Lists() {
  const { todoList } = useTodoList();
  return (
    <div className="flex flex-row mt-8 overflow-x-auto h-[calc(100vh-6rem)]">
      {todoList.map((list) => (
        <List key={list.listId} list={list} />
      ))}
      <InputList />
    </div>
  );
}

export default Lists;

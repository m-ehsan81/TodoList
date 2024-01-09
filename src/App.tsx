import { Navigate, Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";
import NotFound from "./pages/404";
import TodosProvider from "./context/TodosContext";
import Layout from "./layout/Layout";

function App() {
  return (
    <TodosProvider>
      <Layout>
        <Routes>
          <Route index element={<Navigate to="/todos" />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </TodosProvider>
  );
}

export default App;

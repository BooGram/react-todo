import { Route, Routes} from "react-router-dom";
import TodoMutate from "./pages/TodoMutate";
import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetails";

export const AppRoutes = [];

export function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<TodoMutate/>} index />
            <Route path="/create" element={<TodoMutate />} />
            <Route path="/:id/edit" element={<TodoMutate />} />

            <Route path="/list" element={<TodoList />} />

            <Route path="/:id" element={<TodoDetails />} />
        </Routes>
  );
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import { todos } from "@/data/todos";
import { Todo } from "@/types/todoTypes";

interface TodoTableProps {
  limit?: number;
  title?: string;
}

const DataTable = ({ limit, title }: TodoTableProps) => {
  // Sort todos in descending order based on createdAt
  const sortedTodos: Todo[] = [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Filter todos to limit
  const filteredTodos = limit ? sortedTodos.slice(0, limit) : sortedTodos;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Todos"}</h3>
      <Table>
        <TableCaption>A list of your todos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Created At
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTodos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {todo.description}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {todo.completed ? "Completed" : "Pending"}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {new Date(todo.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link href={`/todos/edit/${todo.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                    Edit
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;

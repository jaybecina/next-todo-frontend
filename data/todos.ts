import { Todo } from "@/types/todoTypes";

export const todos: Todo[] = [
  {
    id: "c6ccd6d5-32c6-45ff-a4a6-59c98f61f881",
    title: "Complete Project Proposal",
    description: "Draft and finalize the Q3 project proposal",
    completed: false,
    userId: "789cd892-41c0-41b8-9ba6-0237fc9fdb78",
    createdAt: "2025-06-09T02:01:34.143Z",
    updatedAt: "2025-06-09T02:01:34.143Z",
  },
  {
    id: "c7dde6f5-42c7-46ff-b4b7-60c98f62f882",
    title: "Review Code Changes",
    description: "Review pending pull requests for the main repository",
    completed: true,
    userId: "789cd892-41c0-41b8-9ba6-0237fc9fdb78",
    createdAt: "2025-06-08T14:30:00.000Z",
    updatedAt: "2025-06-08T16:45:00.000Z",
  },
  {
    id: "f8eef7g6-52c8-47ff-c5c8-71d98f63f883",
    title: "Update Documentation",
    description: "Update API documentation with new endpoints",
    completed: false,
    userId: "789cd892-41c0-41b8-9ba6-0237fc9fdb78",
    createdAt: "2025-06-07T09:15:00.000Z",
    updatedAt: "2025-06-07T09:15:00.000Z",
  },
];

export default todos;

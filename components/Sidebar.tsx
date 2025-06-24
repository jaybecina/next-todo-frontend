import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  ListTodo,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Todo Navigation">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href="/">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <ListTodo className="mr-2 h-4 w-4" />
            <Link href="/todos">All Todos</Link>
          </CommandItem>
          <CommandItem>
            <CheckCircle className="mr-2 h-4 w-4" />
            <Link href="/todos/completed">Completed</Link>
          </CommandItem>
          <CommandItem>
            <Clock className="mr-2 h-4 w-4" />
            <Link href="/todos/pending">Pending</Link>
          </CommandItem>
          <CommandItem>
            <RefreshCw className="mr-2 h-4 w-4" />
            <Link href="/todos/recent">Recent</Link>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;

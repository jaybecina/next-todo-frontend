import { LayoutDashboard, ListTodo } from 'lucide-react'
import Link from 'next/link'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

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
            <Link href="/todos">Todos</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default Sidebar

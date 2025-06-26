'use client'

import Image from 'next/image'
import Link from 'next/link'
import logoWhite from '../assets/img/logo-white.png'
import logoDark from '../assets/img/logo.png'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeToggler from './ThemeToggler'
import { useTheme } from 'next-themes'
import useLogout from '@/hooks/useLogout'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

const Navbar = () => {
  const { theme } = useTheme()
  const handleLogout = useLogout()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const confirmLogout = async () => {
    setIsLoggingOut(true)
    await handleLogout()
    setIsLoggingOut(false)
    setShowConfirmModal(false)
  }

  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <Link href="/">
        <Image
          src={theme === 'dark' ? logoWhite : logoDark}
          alt="Logo"
          width={40}
          priority
        />
      </Link>

      <div className="flex items-center">
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-black">BT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowConfirmModal(true)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to logout?</p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={confirmLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  Logging out...
                  <Loader2 className="ml-2 animate-spin" />
                </>
              ) : (
                'Logout'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Navbar

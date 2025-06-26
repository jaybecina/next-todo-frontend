'use client'

import ThemeToggler from '@/components/ThemeToggler'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      storageKey="dashboard-theme"
    >
      <div className="h-[100vh] flex items-center justify-center relative">
        <div className="absolute bottom-5 right-0 text-white">
          <ThemeToggler />
        </div>
        {children}
      </div>
      <Toaster richColors />
    </ThemeProvider>
  )
}

export default AuthLayout

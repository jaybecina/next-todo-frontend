import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface CustomAlertProps {
  variant?: 'destructive' | 'default'
  className?: string
  title: string
  description: string
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  variant = 'default', // Default variant is now 'default' for success
  className = variant === 'destructive' ? 'border-red-500' : 'border-green-500', // Green border for success, red for error
  title,
  description,
}) => {
  return (
    <Alert variant={variant} className={className}>
      <AlertTitle
        className={
          variant === 'destructive' ? 'text-red-500' : 'text-green-500'
        }
      >
        {title}
      </AlertTitle>
      <AlertDescription
        className={
          variant === 'destructive' ? 'text-red-500' : 'text-green-500'
        }
      >
        {description}
      </AlertDescription>
    </Alert>
  )
}

export default CustomAlert

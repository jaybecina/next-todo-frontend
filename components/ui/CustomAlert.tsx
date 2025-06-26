import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface CustomAlertProps {
  variant?: 'destructive' | 'default'
  className?: string
  title: string
  description: string
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  variant = 'destructive',
  className = 'border-red-500',
  title,
  description,
}) => {
  return (
    <Alert variant={variant} className={className}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="text-white">{description}</AlertDescription>
    </Alert>
  )
}

export default CustomAlert

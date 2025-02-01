import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface UseAuthProps {
  required?: boolean
  redirectTo?: string
}

export const useAuth = ({ 
  required = false, 
  redirectTo = '/auth/signin' 
}: UseAuthProps = {}) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const isAuthenticated = !!session
  const isLoading = status === 'loading'

  useEffect(() => {
    if (isLoading) return

    if (required && !isAuthenticated) {
      router.push(`${redirectTo}?callbackUrl=${window.location.href}`)
    }
  }, [isLoading, isAuthenticated, required, router, redirectTo])

  return {
    session,
    isAuthenticated,
    isLoading
  }
}

export default useAuth
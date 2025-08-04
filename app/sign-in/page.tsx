
'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function SignInPage() {
  const supabase = createClient()

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
        },
      })
      
      if (error) {
        console.error('Sign-in error:', error)
      }
    } catch (err) {
      console.error('Unexpected sign-in error:', err)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={handleSignIn}>Sign in with Google</Button>
    </div>
  )
}

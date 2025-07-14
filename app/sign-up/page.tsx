
'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const supabase = createClient()

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })
      
      if (error) {
        console.error('Sign-up error:', error)
      }
    } catch (err) {
      console.error('Unexpected sign-up error:', err)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={handleSignUp}>Sign up with Google</Button>
    </div>
  )
}

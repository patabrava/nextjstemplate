
'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function SignInPage() {
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={handleSignIn}>Sign in with Google</Button>
    </div>
  )
}

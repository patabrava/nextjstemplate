
'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { getRedirectUrlWithNext, getRedirectUri, debugOAuthConfig } from '@/lib/auth-utils'
import { toast } from 'sonner'

export default function SignUpPage() {
  const supabase = createClient()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [dataConsent, setDataConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (provider: 'google' | 'apple') => {
    if (isLoading) return

    if (!termsAccepted || !dataConsent) {
      toast.error('Please accept the terms and data consent before signing up.')
      return
    }

    setIsLoading(true)
    
    try {
      // Debug OAuth configuration
      console.log('🚀 Initiating Supabase OAuth flow for provider:', provider)
      console.log('🔍 Current URL:', window.location.href)
      console.log('🔍 Expected Google Console URI: https://iskhqcoynbhhzawkutke.supabase.co/auth/v1/callback')
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // Redirect to our callback which will handle user creation properly
          redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard&accepted_terms=${termsAccepted}&data_consent=${dataConsent}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      // This will only log if there's an immediate error (not redirect)
      if (error) {
        console.error('❌ OAuth Request Failed:', {
          error,
          expectedSupabaseCallback: 'https://iskhqcoynbhhzawkutke.supabase.co/auth/v1/callback'
        })
        toast.error(error.message || 'Failed to sign up. Please check your configuration.')
      } else {
        console.log(`✅ ${provider} OAuth initiated successfully`)
      }
    } catch (err) {
      console.error('Unexpected sign-up error:', err)
      toast.error('An unexpected error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="max-w-md w-full space-y-4 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={() => handleSignUp('google')} 
            disabled={isLoading || !termsAccepted || !dataConsent}
            className="w-full"
          >
            {isLoading ? 'Signing up...' : 'Sign up with Google'}
          </Button>
          <Button 
            onClick={() => handleSignUp('apple')} 
            disabled={isLoading || !termsAccepted || !dataConsent}
            variant="outline"
            className="w-full"
          >
            Sign up with Apple
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I accept the{' '}
              <Link href="/terms-of-service" className="underline">
                Terms and Conditions
              </Link>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={dataConsent}
              onCheckedChange={(checked) => setDataConsent(checked as boolean)}
            />
            <Label htmlFor="consent" className="text-sm">
              I consent to data processing for analysis as described in the{' '}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}


import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const acceptedTerms = searchParams.get('accepted_terms')
  const dataConsent = searchParams.get('data_consent')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('🔍 Auth callback received:', {
    code: code ? 'present' : 'missing',
    error,
    errorDescription,
    acceptedTerms,
    dataConsent,
    origin,
    next,
    fullUrl: request.url,
    timestamp: new Date().toISOString()
  })

  // Handle OAuth errors from provider
  if (error) {
    console.error('OAuth provider error:', { error, errorDescription })
    const errorParams = new URLSearchParams({
      error,
      ...(errorDescription && { error_description: errorDescription })
    })
    return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams}`)
  }

  if (code) {
    try {
      const supabase = await createClient()
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        const errorParams = new URLSearchParams({
          error: 'exchange_failed',
          error_description: exchangeError.message
        })
        return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams}`)
      }

      if (data.session) {
        // If we have consent data from signup, update the user metadata
        if (acceptedTerms !== null || dataConsent !== null) {
          try {
            console.log('Updating user metadata with consent data:', {
              accepted_terms: acceptedTerms === 'true',
              data_consent: dataConsent === 'true'
            })
            
            const { error: updateError } = await supabase.auth.updateUser({
              data: {
                accepted_terms: acceptedTerms === 'true',
                data_consent: dataConsent === 'true',
              }
            })
            
            if (updateError) {
              console.error('Error updating user metadata:', updateError)
              // Don't fail the auth flow, but log the error
            }
          } catch (metadataError) {
            console.error('Error updating user metadata:', metadataError)
            // Don't fail the auth flow for metadata errors
          }
        }
        
        console.log('Auth successful, redirecting to:', next)
        return NextResponse.redirect(`${origin}${next}`)
      }
    } catch (err) {
      console.error('Unexpected error during auth:', err)
      const errorParams = new URLSearchParams({
        error: 'unexpected_error',
        error_description: 'An unexpected error occurred during authentication'
      })
      return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams}`)
    }
  }

  // No code provided
  console.error('No authorization code provided')
  const errorParams = new URLSearchParams({
    error: 'no_code',
    error_description: 'No authorization code was provided'
  })
  return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams}`)
}

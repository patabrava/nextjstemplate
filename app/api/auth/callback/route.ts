
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Auth callback received:', {
    code: code ? 'present' : 'missing',
    error,
    errorDescription,
    origin,
    next,
    fullUrl: request.url
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

'use client'

import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-md p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        
        <div className="mb-6 space-y-2">
          <p className="text-gray-600">
            There was a problem signing you in. Please try again.
          </p>
          
          {error && (
            <div className="rounded bg-red-50 p-3 text-sm">
              <p className="font-medium text-red-800">Error: {error}</p>
              {errorDescription && (
                <p className="text-red-600">{errorDescription}</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link href="/sign-in">
            <Button className="w-full">Try Again</Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>If this problem persists, please check:</p>
          <ul className="mt-2 space-y-1 text-left">
            <li>• Your internet connection</li>
            <li>• Browser cookies are enabled</li>
            <li>• Try clearing browser cache</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

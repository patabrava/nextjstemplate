/**
 * Auth utilities for managing OAuth flows and redirect URIs
 */

/**
 * Get the correct redirect URI based on environment
 * Ensures consistent redirect URI across different environments
 */
export function getRedirectUri(): string {
  if (typeof window === 'undefined') {
    // Server side - use environment variable or default
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    return `${baseUrl}/api/auth/callback`
  }
  
  // Client side - use current origin
  return `${window.location.origin}/api/auth/callback`
}

/**
 * Get the complete redirect URL with next parameter
 */
export function getRedirectUrlWithNext(nextPath: string = '/dashboard'): string {
  const baseRedirectUri = getRedirectUri()
  return `${baseRedirectUri}?next=${encodeURIComponent(nextPath)}`
}

/**
 * Validate redirect URI format
 */
export function validateRedirectUri(uri: string): boolean {
  try {
    const url = new URL(uri)
    // Must be http/https
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false
    }
    // Must end with /api/auth/callback
    if (!url.pathname.endsWith('/api/auth/callback')) {
      return false
    }
    return true
  } catch {
    return false
  }
}

/**
 * Debug helper to log OAuth configuration
 */
export function debugOAuthConfig() {
  if (typeof window !== 'undefined') {
    const redirectUri = getRedirectUri()
    const debugInfo = {
      currentOrigin: window.location.origin,
      currentHref: window.location.href,
      currentHostname: window.location.hostname,
      currentPort: window.location.port,
      currentProtocol: window.location.protocol,
      redirectUri,
      isValidRedirectUri: validateRedirectUri(redirectUri),
      environment: process.env.NODE_ENV || 'unknown',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      // Check for common mismatch causes
      potentialIssues: {
        hasTrailingSlash: redirectUri.endsWith('/'),
        usesIP: redirectUri.includes('127.0.0.1'),
        hasWrongPort: !redirectUri.includes(':3000'),
        hasHttps: redirectUri.startsWith('https:')
      }
    }
    
    console.log('🔍 DETAILED OAuth Debug Configuration:', debugInfo)
    
    // Log potential issues
    if (debugInfo.potentialIssues.hasTrailingSlash) {
      console.warn('⚠️ Redirect URI has trailing slash - this may cause mismatch')
    }
    if (debugInfo.potentialIssues.usesIP) {
      console.warn('⚠️ Using IP address instead of localhost - this may cause mismatch')
    }
    if (debugInfo.potentialIssues.hasWrongPort) {
      console.warn('⚠️ Missing or wrong port in redirect URI')
    }
    if (debugInfo.potentialIssues.hasHttps) {
      console.warn('⚠️ Using HTTPS in development - should be HTTP for localhost')
    }
    
    return debugInfo
  }
  return null
}

"use client";

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface UserInfo {
  id: string
  email: string
  user_metadata?: {
    name?: string
    avatar_url?: string
    full_name?: string
  }
}

export default function UserProfile({ mini }: { mini?: boolean }) {
  const supabase = createClient()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        setError(error.message)
        setLoading(false)
        return
      }
      setUser(data.user as UserInfo)
      setLoading(false)
    }
    getUser()
  }, [supabase])

  const userName = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const userImage = user?.user_metadata?.avatar_url

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/sign-in'
  }

  if (loading) {
    return (
      <div className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
        {!mini && <span className="text-sm">Loading...</span>}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}>
        <div className="text-red-500 text-sm flex-1">
          {mini ? "Error" : error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}>
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}>
      <Avatar>
        {userImage ? (
          <AvatarImage src={userImage} alt="User Avatar" />
        ) : (
          <AvatarFallback>
            {userName && userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      {!mini && (
        <div className="flex items-center gap-2">
          <p className="font-medium text-md">{userName}</p>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

interface UserInfo {
  id: string
  name: string
  image?: string | null | undefined
  email: string
}

export default function UserProfile({ mini }: { mini?: boolean }) {
  const supabase = createClient()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        setLoading(false)
        return
      }
      setUser(data.user as UserInfo)
      setLoading(false)
    }
    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/sign-in'
  }

  if (error) {
    return (
      <div
        className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}
      >
        <div className="text-red-500 text-sm flex-1">
          {mini ? "Error" : error}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}
        >
          <Avatar>
            {loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <>
                {userInfo?.image ? (
                  <AvatarImage src={userInfo?.image} alt="User Avatar" />
                ) : (
                  <AvatarFallback>
                    {userInfo?.name && userInfo.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </>
            )}
          </Avatar>
          {mini ? null : (
            <div className="flex items-center gap-2">
              <p className="font-medium text-md">
                {loading ? "Loading..." : userInfo?.name || "User"}
              </p>
              {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/settings?tab=profile">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings?tab=billing">
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

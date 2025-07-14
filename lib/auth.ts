import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const auth = {
  api: {
    getSession: async ({ headers }: { headers: Headers }) => {
      const supabase = await createClient();
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          return null;
        }

        if (!session) {
          return null;
        }

        return {
          session: {
            userId: session.user.id,
            user: session.user,
            ...session
          }
        };
      } catch (error) {
        console.error('Session retrieval error:', error);
        return null;
      }
    },
    
    getUser: async () => {
      const supabase = await createClient();
      
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('User retrieval error:', error);
          return null;
        }

        return user;
      } catch (error) {
        console.error('User retrieval error:', error);
        return null;
      }
    }
  }
};

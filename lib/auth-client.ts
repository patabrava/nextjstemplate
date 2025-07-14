"use client";

import { createClient } from '@/lib/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Types for the expected interface
interface AuthSession {
  data?: {
    user: User | null;
  } | null;
}

interface CheckoutParams {
  products: string[];
  slug: string;
}

interface UpdateUserParams {
  name?: string;
  image?: string;
}

interface CustomerOrder {
  id: string;
  product?: {
    name: string;
  };
  createdAt: string;
  totalAmount: number;
  currency: string;
  status: string;
  subscription?: {
    status: string;
    endedAt?: string;
  };
  items: Array<{
    label: string;
    amount: number;
  }>;
}

interface CustomerState {
  data: {
    hasSubscription: boolean;
    subscription?: any;
  };
}

interface Organization {
  id: string;
  name: string;
}

class SupabaseAuthClient {
  private supabase = createClient();

  // Get current session
  async getSession(): Promise<AuthSession> {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) throw error;
      return { data: { user: data.session?.user || null } };
    } catch (error) {
      console.error('Error getting session:', error);
      return { data: { user: null } };
    }
  }

  // Handle checkout - redirect to pricing/payment page for now
  async checkout(params: CheckoutParams): Promise<void> {
    try {
      // For now, redirect to a checkout URL or handle via webhook
      // In a real implementation, this would integrate with your payment provider
      const checkoutUrl = `/pricing?product=${params.products[0]}&slug=${params.slug}`;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      throw new Error('Checkout failed');
    }
  }

  // Update user profile
  async updateUser(params: UpdateUserParams): Promise<void> {
    try {
      const updates: any = {};
      if (params.name) updates.full_name = params.name;
      if (params.image) updates.avatar_url = params.image;

      const { error } = await this.supabase.auth.updateUser({
        data: updates
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Customer management methods
  customer = {
    // Open customer portal - placeholder implementation
    portal: async (): Promise<void> => {
      try {
        // In a real implementation, this would open a customer portal
        // For now, redirect to settings page
        window.location.href = '/dashboard/settings';
      } catch (error) {
        console.error('Customer portal error:', error);
        throw new Error('Failed to open customer portal');
      }
    },

    // Get customer state
    state: async (): Promise<CustomerState> => {
      try {
        // Placeholder implementation - in real app, check subscription status
        return {
          data: {
            hasSubscription: false,
            subscription: null
          }
        };
      } catch (error) {
        console.error('Error getting customer state:', error);
        throw error;
      }
    },

    orders: {
      // List customer orders
      list: async (params: any = {}): Promise<{ data: CustomerOrder[] }> => {
        try {
          // Placeholder implementation - in real app, fetch from database
          return { data: [] };
        } catch (error) {
          console.error('Error listing orders:', error);
          return { data: [] };
        }
      }
    }
  };

  // React hook for listing organizations
  useListOrganizations() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Placeholder implementation - in real app, fetch organizations from database
      const fetchOrganizations = async () => {
        try {
          setLoading(true);
          // Mock data for now
          setOrganizations([]);
        } catch (error) {
          console.error('Error fetching organizations:', error);
          setOrganizations([]);
        } finally {
          setLoading(false);
        }
      };

      fetchOrganizations();
    }, []);

    return { data: organizations, loading };
  }
}

// Export singleton instance
export const authClient = new SupabaseAuthClient();
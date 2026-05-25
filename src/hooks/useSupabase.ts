"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(*), users(username, avatar_url, rank)')
          .eq('status', 'published')
          .eq('is_approved', true);

        if (error) throw error;
        setProducts(data as unknown as Product[]);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown neural error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useTransactions(userId: string) {
  const [transactions, setTransactions] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchTransactions() {
      const { data, error } = await supabase
        .from('transactions')
        .select('*, products(*)')
        .eq('user_id', userId);

      if (!error && data) setTransactions(data);
      setLoading(false);
    }

    fetchTransactions();
  }, [userId]);

  return { transactions, loading };
}

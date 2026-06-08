"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "./supabase";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { fetchTrustedRole } from "./authz";
import type { UserRole } from "./authz";
export type { UserRole } from "./authz";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const applySession = async (session: Session | null) => {
      setLoading(true);
      setSession(session);
      setUser(session?.user ?? null);
      try {
        const trustedRole = await fetchTrustedRole(
          session?.user?.email,
          session?.user?.user_metadata?.role,
        );
        if (!cancelled) setRole(trustedRole);
      } catch {
        // Fail closed: if the permissions sheet cannot be read, do not grant
        // dashboard access based on self-declared metadata.
        if (!cancelled) setRole(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name, role } },
    });
    return { error };
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <AuthContext.Provider value={{ user, session, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

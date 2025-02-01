"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return {
    session,
    isAuthenticated,
    isLoading,
    signIn: () => signIn("google"),
    signOut,
  };
}
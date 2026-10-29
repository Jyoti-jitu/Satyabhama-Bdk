'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';
import { dataStore } from './data/store';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string) => boolean;
  loginAsDemo: (role: UserRole, doctorId?: string) => void;
  logout: () => void;
  isAdmin: boolean;
  isDoctor: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => false,
  loginAsDemo: () => {},
  logout: () => {},
  isAdmin: false,
  isDoctor: false,
});

export const AUTH_STORAGE_KEY = 'satyabhama_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse auth user', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string): boolean => {
    const existing = dataStore.getUserByEmail(email);
    if (existing && existing.active_status) {
      setUser(existing);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(existing));
      dataStore.addAuditLog(
        existing.id,
        existing.full_name,
        existing.role,
        'LOGIN',
        'user_profiles',
        existing.id,
        `User ${existing.full_name} logged in successfully.`
      );
      return true;
    }
    return false;
  };

  const loginAsDemo = (role: UserRole, doctorId?: string) => {
    let demoUser: UserProfile | undefined;
    if (role === 'doctor') {
      if (doctorId) {
        demoUser = dataStore.getUsers().find((u) => u.doctor_id === doctorId);
      }
      if (!demoUser) {
        demoUser = dataStore.getUsers().find((u) => u.role === 'doctor');
      }
    } else if (role === 'super_admin' || role === 'clinic_admin') {
      demoUser = dataStore.getUsers().find((u) => u.role === 'super_admin');
    } else {
      demoUser = dataStore.getUsers().find((u) => u.role === 'content_editor');
    }

    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
      dataStore.addAuditLog(
        demoUser.id,
        demoUser.full_name,
        demoUser.role,
        'LOGIN',
        'user_profiles',
        demoUser.id,
        `Staff demo login as ${demoUser.role} (${demoUser.full_name}).`
      );

      if (demoUser.role === 'doctor') {
        router.push('/dashboard/doctor');
      } else {
        router.push('/dashboard/admin');
      }
    }
  };

  const logout = () => {
    if (user) {
      dataStore.addAuditLog(
        user.id,
        user.full_name,
        user.role,
        'LOGOUT',
        'user_profiles',
        user.id,
        `User ${user.full_name} logged out.`
      );
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    router.push('/login');
  };

  const isAdmin = user?.role === 'super_admin' || user?.role === 'clinic_admin';
  const isDoctor = user?.role === 'doctor';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginAsDemo,
        logout,
        isAdmin,
        isDoctor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { createContext, useCallback, useContext, useRef } from 'react';

type RefreshFn = () => Promise<void> | void;

type RefreshContextType = {
  registerRefresh: (fn: RefreshFn) => () => void; 
  triggerRefresh: () => Promise<void>;
};

const RefreshContext = createContext<RefreshContextType | null>(null);

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const refreshFnsRef = useRef<Set<RefreshFn>>(new Set());

  const registerRefresh = useCallback((fn: RefreshFn) => {
    refreshFnsRef.current.add(fn);
    // cleanup function
    return () => {
      refreshFnsRef.current.delete(fn);
    };
  }, []);

  const triggerRefresh = useCallback(async () => {
    const fns = Array.from(refreshFnsRef.current);
    await Promise.all(fns.map((fn) => fn()));
  }, []);

  return (
    <RefreshContext.Provider value={{ registerRefresh, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefreshContext() {
  const ctx = useContext(RefreshContext);
  if (!ctx) throw new Error('useRefreshContext must be used within RefreshProvider');
  return ctx;
}
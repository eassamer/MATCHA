// app/contexts/navigation-context.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

// Define the Navigation Context
const NavigationContext = createContext({
  activePath: "",
  setActivePath: (path: string) => {},
});

// Navigation Provider Component
export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  return (
    <NavigationContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </NavigationContext.Provider>
  );
}

// Custom hook to use navigation context
export function useNavigation() {
  return useContext(NavigationContext);
}

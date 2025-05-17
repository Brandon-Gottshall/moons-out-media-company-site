"use client";

import { useEffect } from "react";
import { initArcViewportFix } from "./arc-viewport-fix";

export default function ViewportProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize the Arc browser viewport fix
    initArcViewportFix();
  }, []);

  return <>{children}</>;
} 
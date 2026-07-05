"use client";

import { useEffect } from "react";
import { initMonitoring } from "@/lib/monitoring";

// Mounts once in the root layout and attaches global error listeners.
export default function MonitoringInit() {
  useEffect(() => {
    initMonitoring();
  }, []);
  return null;
}

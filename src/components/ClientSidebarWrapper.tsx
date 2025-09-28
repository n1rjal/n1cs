"use client";

import type * as React from "react";
import Sidebar from "./Sidebar";

interface ClientSidebarWrapperProps {
  children: React.ReactNode;
}

export default function ClientSidebarWrapper({
  children,
}: ClientSidebarWrapperProps) {
  return <Sidebar>{children}</Sidebar>;
}

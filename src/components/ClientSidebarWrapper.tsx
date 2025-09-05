"use client";

import Sidebar from "./Sidebar";
import * as React from "react";

interface ClientSidebarWrapperProps {
  children: React.ReactNode;
}

export default function ClientSidebarWrapper({
  children,
}: ClientSidebarWrapperProps) {
  return <Sidebar>{children}</Sidebar>;
}

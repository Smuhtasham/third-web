// components/TanStackQueryProvider.tsx
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";

type TanStackQueryProviderProps = {
  children: ReactNode;
};

// Initialize the QueryClient
const queryClient = new QueryClient();

const TanStackQueryProvider = ({ children }: TanStackQueryProviderProps) => {
  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThirdwebProvider>
  );
};

export default TanStackQueryProvider;

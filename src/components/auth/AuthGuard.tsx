"use client"

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import MiddlewareLoader from '../shared/middleware-loader';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check for the cookie on client side
      const cookies = document.cookie.split(';');
      const hasToken = cookies.some(cookie => 
        cookie.trim().startsWith('client_token_user=')
      );

      console.log('🔍 Client Auth Check:', { hasToken, pathname });

      if (!hasToken) {
        console.log('❌ No token found → redirecting to login');
        router.push(`/auth/login?redirect=${pathname}`);
        setIsLoading(false);
        return;
      }

      console.log('✅ Token found → access granted');
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MiddlewareLoader/>
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
}

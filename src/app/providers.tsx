'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth-ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth/client';

function AuthLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      social={{
        providers: ['google', 'github'],
      }}
      redirectTo="/"
      Link={AuthLink}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
import { isAuthenticated, logout } from '@/lib/actions/auth.action';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import LogoutButton from '@/components/Logoutbutton'; // NEW: Client button component

const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  return (
    <div className='root-layout'>
      <nav className='flex justify-between items-center p-4'>
        <Link href="/" className='flex items-center gap-2'>
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">Prepwise</h2>
        </Link>

        {isUserAuthenticated ? (
          <LogoutButton />
        ) : (
          <Link href="/sign-in" className='text-sm text-blue-600 hover:underline'>
            Login
          </Link>
        )}
      </nav>

      {children}
    </div>
  );
};

export default Rootlayout;

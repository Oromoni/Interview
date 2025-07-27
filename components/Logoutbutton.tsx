'use client';

import { logout } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { FaRegUser } from 'react-icons/fa6';

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
      router.push('/sign-in');
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      title="Logout"
      className="text-xl text-gray-700 hover:text-red-500 transition"
    >
      <FaRegUser color='white' />
    </button>
  );
};

export default LogoutButton;

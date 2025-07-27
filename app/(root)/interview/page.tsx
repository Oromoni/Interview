import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';
import React from 'react';

const Page = async () => {
  const user = await getCurrentUser();

  // Optional: Handle unauthenticated state
  if (!user) {
    return <p>You must be signed in to access this page.</p>;
  }

  return (
    <>
      <h3>Interview Generation</h3>

      <Agent
        userName={user.name}
        userId={user.id}
        profileImage={user.profileURL}
        type="generate"
      />
    </>
  );
};

export default Page;

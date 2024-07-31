import React, { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const FeedLayout = ({ children }: Props) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default FeedLayout;

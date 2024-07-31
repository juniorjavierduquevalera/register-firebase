'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from '../../utils/decodeToken'; 
import { logout } from '../../utils/logout'; 

interface User {
  email: string;
  [key: string]: any;
}

const Feed = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decoded = decodeToken<User>(token);
      if (decoded) {
        setUser(decoded);
      } else {
        console.error('Failed to decode token');
      }
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <h1>Welcome, {user.email}</h1>
      <p>This is the feed page.</p>
      <button onClick={logout} className='mt-4 px-4 py-2 bg-gray-800 text-white rounded'>
        Logout
      </button>
    </div>
  );
};

export default Feed;

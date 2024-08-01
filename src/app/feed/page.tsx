'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from '../../utils/decodeToken'; 
import { logout } from '../../utils/logout';
import { db, collection, getDocs, query, where } from '../../firebase/firebaseConfig'; 

interface User {
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
  [key: string]: any;
}

const Feed = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      try {
        console.log('Fetching data for userId:', userId);
        const q = query(collection(db, 'users'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log('User data from Firestore:', userData);
            setUser({
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              uid: userData.uid,
              ...userData
            });
          });
        } else {
          console.error('No such document exists with the UID:', userId);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching user data:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    const token = Cookies.get('token');
    if (token) {
      const decoded = decodeToken<{ user_id: string; email: string }>(token);
      if (decoded) {
        console.log('Decoded token:', decoded);
        fetchUserData(decoded.user_id);
      } else {
        console.error('Failed to decode token');
      }
    } else {
      console.error('No token found');
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <h1>Welcome, {user.firstName} {user.lastName}</h1>
      <h2>{user.email}</h2>
      <p>This is the feed page.</p>
      <button onClick={logout} className='mt-4 px-4 py-2 bg-gray-800 text-white rounded'>
        Logout
      </button>
    </div>
  );
};

export default Feed;

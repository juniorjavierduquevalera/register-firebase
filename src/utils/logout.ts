import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const logout = () => {
  Cookies.remove('token');
  window.location.href = '/login'; // Redirigir al usuario a la página de login
};

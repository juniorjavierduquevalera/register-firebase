'use client';
import React, { FC, useState, useEffect } from 'react';
import { createUser } from "../actions/userActions"; // Asegúrate de que la ruta sea correcta

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface Status {
  type: 'success' | 'error';
  message: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest('form');
    if (!form) return;

    const formData = new FormData(form);

    setLoading(true);
    setStatus(null);
    try {
      await createUser(formData);
      setStatus({ type: 'success', message: 'Registration successful!' });
    } catch (error) {
      console.error("Error creating user:", error);
      if (error instanceof Error) {
        setStatus({ type: 'error', message: error.message });
      } else {
        setStatus({ type: 'error', message: 'An unknown error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <button className={className} onClick={handleClick} {...props} disabled={loading}>
        {loading ? 'Loading...' : children}
      </button>
      {status && (
        <p className={status.type === 'success' ? 'success-message' : 'error-message'}>
          {status.message}
        </p>
      )}
    </>
  );
};

export default Button;

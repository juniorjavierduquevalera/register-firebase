import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import * as admin from 'firebase-admin';

// Inicializar Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export async function middleware(req: NextRequest) {
  console.log('Middleware ejecutándose');
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  console.log('Token encontrado:', token);

  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Token verificado:', decodedToken);
    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Proteger rutas específicas
export const config = {
  matcher: ['/feed/:path*'],
};

import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error:", error.message);
      return NextResponse.json({ message: "Failed to log in. Please check your credentials and try again." }, { status: 401 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ message: "An unknown error occurred. Please try again." }, { status: 500 });
    }
  }
}

// Nuevas opciones de configuración
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = 'auto';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';
export const maxDuration = 5;

// Configuración específica de bodyParser
export const api = {
  bodyParser: {
    sizeLimit: '1mb', // Ajusta según tus necesidades
  },
};


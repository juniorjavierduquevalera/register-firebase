import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

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
};



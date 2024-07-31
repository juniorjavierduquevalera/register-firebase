import { NextRequest, NextResponse } from 'next/server';
import { db, auth } from '../../../firebase/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    // Registrar usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar usuario en Firestore
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    return NextResponse.json({ message: 'User created successfully', user: { firstName, lastName, email } }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing request:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}


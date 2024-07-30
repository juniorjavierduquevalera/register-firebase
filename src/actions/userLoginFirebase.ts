// actions/userLoginFirebase.ts
"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";

export const userLoginFirebase = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validar que todos los campos estén presentes
  if (!email || !password) {
    throw new Error("All fields are required.");
  }

  // Validar formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Devolver solo la información esencial como un objeto plano
    return { message: 'Login successful', email: userCredential.user.email };
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error:", error.message);
      throw new Error("Failed to log in. Please check your credentials and try again.");
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred. Please try again.");
    }
  }
};

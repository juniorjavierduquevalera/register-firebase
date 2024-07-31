"use server";

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
    const response = await fetch("https://register-firebase.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return { message: 'Login successful', token: data.token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw new Error(error.message || "An unknown error occurred. Please try again.");
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred. Please try again.");
    }
  }
};

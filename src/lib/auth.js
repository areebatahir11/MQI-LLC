import { cookies } from "next/headers";
import { randomUUID } from "crypto";

/*
  ================================
  SIMPLE IN-MEMORY AUTH SYSTEM
  ================================
  ⚠️ Note:
  - Ye development ke liye perfect hai
  - Production me DB use karna better hota hai
*/

let adminUser = {
  email: "admin@mqi.com",
  password: "123456",
};

let activeSessions = {};


export async function login(email, password) {
  if (email === adminUser.email && password === adminUser.password) {
    const token = randomUUID();

    activeSessions[token] = {
      email,
      createdAt: Date.now(),
    };

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      path: "/",
    });

    return { success: true };
  }

  return { success: false, message: "Invalid email or password" };
}


export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token || !activeSessions[token]) return null;

  const session = activeSessions[token];
  const now = Date.now();

  if (now - session.createdAt > 20 * 60 * 1000) {
    delete activeSessions[token];
    return null;
  }

  return {
    email: session.email,
    role: "admin",
  };
}


export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token && activeSessions[token]) {
    delete activeSessions[token];
  }

  cookieStore.delete("session");
}


export function updateAdminCredentials(newEmail, newPassword) {
  adminUser = {
    email: newEmail,
    password: newPassword,
  };
}


export function getAdminEmail() {
  return adminUser.email;
}
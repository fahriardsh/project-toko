// src/app/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('user');
  cookieStore.set('user', '', { expires: new Date(0) });
  redirect('/login');
  // try {
  //   const cookieStore = await cookies();
  //   cookieStore.delete('user');
  //   cookieStore.set('user', '', { expires: new Date(0) });
  //   redirect('/login');
  // } catch (error) {
  //   console.error("Error during logout:", error);
  //   // Handle the error appropriately (e.g., redirect to an error page)
  // }
}
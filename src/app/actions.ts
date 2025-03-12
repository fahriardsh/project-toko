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

// export async function profile() {
//     const cookieStore = await cookies();
//     const userCookie = cookieStore.get('user');
//     const user = JSON.parse(userCookie!.value);
//   return user.username;
// }

// export async function profile() {
//   const cookieStore = await cookies();
//   const userCookie = cookieStore.get('user');

//   if (!userCookie || !userCookie.value) {
//     return null; // Or some default value or error handling
//   }

//   try {
//     const user = JSON.parse(userCookie.value);
//     return user.username;
//   } catch (error) {
//     console.error("Error parsing user cookie:", error);
//     return null; // Or some default value or error handling
//   }
// }
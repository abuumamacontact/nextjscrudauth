'use server';

import { neon } from '@neondatabase/serverless';
import { hexclaveServerApp } from '@/hexclave/server';

export async function getUserDetails(userId: string | undefined) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  if (!userId) {
    return null;
  }

  const sql = neon(process.env.DATABASE_URL!);
  const [user] =
    await sql`SELECT * FROM neon_auth.users_sync WHERE id = ${userId};`;
  return user;
}

export async function getUserId() {
  const user = await hexclaveServerApp.getUser(); //get user details from Neon
  const userId = user?.id;

  if (!userId) return;

  return userId;
}

export async function getUserEmail(): Promise<string | null> {
  const user = await hexclaveServerApp.getUser();

  if (!user || !user.primaryEmail) {
    return null;
  }

  return user.primaryEmail;
}
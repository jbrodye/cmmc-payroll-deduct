import { page } from '$app/stores';

export const load = async ({ fetch }) => {
  const res = await fetch("/api/transaction");
  const transactions = await res.json();
 
  return {
   transactions,
  };
 };
import { page } from '$app/stores';

export const load = async ({ fetch }) => {
  const response = await fetch("/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      "op": {
        "action": "read",
        "data": { "count": 5 }
      }
    })
  });

  const transactions = await response.json();
  
  return {
    transactions
  };
 };
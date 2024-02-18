// https://github.com/jeffroche/nextjs-django-auth-example/blob/master/www/auth.tsx

import { apiLoginUrl } from "@/lib/urls";

export async function fetchNewTokens(username: string, password: string) {
  const url = await apiLoginUrl();
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  return response;
}

export async function login(username: string, password: string) {
  const response = await fetchNewTokens(username, password);
  if (!response.ok) {
    return null;
  }
  const payload = await response.json();
  return payload;
}
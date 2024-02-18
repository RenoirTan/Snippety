"use server";

// https://github.com/jeffroche/nextjs-django-auth-example/blob/master/www/auth.tsx

const API_BASE = process.env.BACKEND_URL;

export async function fetchNewTokens(username: string, password: string) {
  const url = API_BASE + "/api/token/";
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
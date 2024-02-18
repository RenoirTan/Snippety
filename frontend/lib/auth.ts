// https://github.com/jeffroche/nextjs-django-auth-example/blob/master/www/auth.tsx

import { apiLoginUrl, apiLogoutUrl } from "@/lib/urls";
import { postJson } from "@/lib/fetching";

export async function fetchNewTokens(username: string, password: string) {
  const url = await apiLoginUrl();
  const response = await postJson(url, true, { username, password });
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

export async function logout() {
  return await postJson(await apiLogoutUrl(), true, {});
}
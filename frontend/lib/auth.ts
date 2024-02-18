// https://github.com/jeffroche/nextjs-django-auth-example/blob/master/www/auth.tsx

import { apiLoginUrl, apiLogoutUrl, apiRefreshTokenUrl } from "@/lib/urls";
import { fetchJson } from "@/lib/fetching";

export async function fetchNewTokens(username: string, password: string) {
  const url = await apiLoginUrl();
  const response = await fetchJson(url, "POST", true, { username, password });
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
  return await fetchJson(await apiLogoutUrl(), "POST", true, {});
}

export async function refreshTokens() {
  return await fetchJson(await apiRefreshTokenUrl(), "POST", true, {});
}
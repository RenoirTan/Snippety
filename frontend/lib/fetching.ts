import { redirect } from "next/navigation";
import { refreshTokens } from "./auth";

export async function fetchJson(
  url: string,
  method: string,
  includeCredentials: boolean,
  data: any
): Promise<Response> {
  return await fetch(url, {
    method,
    body: method == "GET" ? null : JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: includeCredentials ? "include" : undefined
  });
}

async function fetchProtectedJsonInner(
  attemptsLeft: number,
  url: string,
  method: string,
  data: any
): Promise<Response | null> {
  if (attemptsLeft <= 0) {
    return null;
  }

  const response = await fetchJson(url, method, true, data);
  if (response.status === 401) { // unauthorised
    await refreshTokens(); // try and refresh tokens
    return fetchProtectedJsonInner(attemptsLeft - 1, url, method, data);
  }
  return response;
}

export async function fetchProtectedJson(url: string, method: string, data: any) {
  const response = await fetchProtectedJsonInner(2, url, method, data);
  if (!response) {
    redirect("/login");
  }
  return response;
}
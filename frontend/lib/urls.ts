"use server";

const API_BASE = process.env.BACKEND_URL;

export async function fixPath(path: string): Promise<string> {
  let processed = path;
  if (!processed.match(/^\/+/g)) {
    processed = "/" + processed;
  }
  if (!processed.match(/\/+$/g)) {
    processed += "/";
  }
  return processed;
}

export async function makeApiUrl(path?: string | null): Promise<string> {
  const domain = (API_BASE || "").replace(/\/+$/g, "");
  return domain + await fixPath(path || "/");
}

export const apiLoginUrl = async () => await makeApiUrl("/dj-rest-auth/login/");
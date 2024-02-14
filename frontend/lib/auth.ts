"use server";

// https://github.com/jeffroche/nextjs-django-auth-example/blob/master/www/auth.tsx

export async function fetchNewTokens(username: string, password: string) {
  const url = process.env.BACKEND_URL + "/api/token/";
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

export async function formLogin(
  prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const username = formData.get("username")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const response = await fetchNewTokens(username, password);
  if (response.status !== 200) {
    return "Could not fetch tokens.";
  }

  const result = await response.json();
  const accessToken = await result["access"] || "";
  const refreshToken = await result["refresh"] || "";
  console.log(accessToken, refreshToken);
  return null;
}
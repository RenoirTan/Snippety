export async function postJson(url: string, includeCredentials: boolean, data: any) {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: includeCredentials ? "include" : undefined
  });
}
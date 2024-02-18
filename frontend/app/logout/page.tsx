"use client";

import { apiLogoutUrl } from "@/lib/urls";

export default function Page() {
  async function doLogout(event: React.MouseEvent<HTMLButtonElement>) {
    const url = await apiLogoutUrl();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    console.log(response);
  }

  return (
    <>
      <button onClick={doLogout}>Logout</button>
    </>
  );
}
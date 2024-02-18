"use client";

import { logout } from "@/lib/auth";

export default function Page() {
  async function doLogout(event: React.MouseEvent<HTMLButtonElement>) {
    await logout();
  }

  return (
    <>
      <button onClick={doLogout}>Logout</button>
    </>
  );
}
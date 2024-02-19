"use client";

import { useAuth } from "@/lib/auth-provider";
import { useEffect, useState } from "react";

export default function Page() {
  const { getProtectedJson } = useAuth();
  const [data, setData] = useState<any[] | null>(null);
  useEffect(() => {
    if (data === null) {
      getProtectedJson("http://localhost:8000/users/")
        .then(async (res) => {
          if (res) {
            const parsed = await res.json();
            setData(parsed);
          }
        });
    }
  }, [data]);
  if (data) {
    return <ul>
      {data.map((user: any) =>
        <li key={user.username}>{user.username}</li>
      )}
    </ul>;
  } else {
    return <p>No data</p>;
  }
}
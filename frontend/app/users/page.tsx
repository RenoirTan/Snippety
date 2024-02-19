"use client";

import { useAuth } from "@/lib/auth-provider";
import { apiUsersListUrl } from "@/lib/urls";
import { useEffect, useState } from "react";

export default function Page() {
  const { getProtectedJson } = useAuth();
  const [data, setData] = useState<any[] | null>(null);
  useEffect(() => {
    if (data === null) {
      (async () => {
        // apparently calling server functions here is allowed???
        const url = await apiUsersListUrl();
        const response = await getProtectedJson(url);
        if (response) {
          const parsed = await response.json();
          setData(parsed);
        }
      })();
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
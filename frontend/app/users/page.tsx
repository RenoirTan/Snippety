"use client";

import { getUsersList } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[] | null>(null);
  useEffect(() => {
    if (data === null) {
      (async () => {
        // apparently calling server functions here is allowed???
        const response = await getUsersList();
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
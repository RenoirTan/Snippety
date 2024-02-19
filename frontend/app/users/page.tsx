"use client";

import { useAuth } from "@/lib/auth-provider";
import { useEffect, useState } from "react";

export default function Page() {
  const { getProtectedJson } = useAuth();
  const [response, setResponse] = useState<Response | null>(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    getProtectedJson("http://localhost:8000/users/")
      .then(async (res) => {
        setResponse(response);
        if (res) {
          const parsed = await res.json();
          console.log(parsed);
          setData(parsed);
        }
      });
  }, []);
  if (!response) {
    return <p>No response</p>;
  } else if (response.ok) {
    return (
      <ul>
        {data.map((user: any) =>
          <li key={user.username}>{user.username}</li>
        )}
      </ul>
    );
  } else {
    return <p>{response.status}</p>
  }
}
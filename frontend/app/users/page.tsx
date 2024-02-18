import { getUsersList } from "@/lib/data";

export default async function Page() {
  const response = await getUsersList();
  if (response.ok) {
    const usersList = await response.json();
    return (
      <ul>
        {usersList.map((u: any) => {
          <li key={u.username}>{u.username}</li>
        })}
      </ul>
    );
  } else {
    return (
      <p>Could not get users.</p>
    );
  }
}
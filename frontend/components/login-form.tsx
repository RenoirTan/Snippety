"use client";

import { formLogin } from "@/lib/auth";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [state, dispatch] = useFormState(formLogin, null);

  return (
    <form action={dispatch}>
      {state && <p>{state}</p>}
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
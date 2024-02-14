"use client";

import { login } from "@/lib/auth";
import React from "react";

export default function LoginForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = event.target.elements["username"].value || "";
    const password = event.target.elements["password"].value || "";

    console.log(await login(username, password));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
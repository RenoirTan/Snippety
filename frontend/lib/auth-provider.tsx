// adapted from https://github.com/jeffroche/nextjs-django-auth-example
// not used tho

import React, { createContext, useContext, useState } from "react";

export type AuthContextType = {
  authenticated: boolean;
  login: (username: string, password: string) => Promise<Response>;
  logout: () => Promise<void>;
  getProtectedJson: (url: string) => Promise<Response | null>;
  postProtectedJson: (url: string, data: any) => Promise<Response | null>;
};

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  async login(username, password) {
    return fetchNewTokenPair(username, password);
  },
  async logout() { },
  async getProtectedJson(url) {
    return null;
  },
  async postProtectedJson(url, data) {
    return null;
  }
});

export function useAuth() {
  return useContext(AuthContext);
}

async function fetchNewToken() {
  const url = "http://localhost:8000/dj-rest-auth/token/refresh/";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
}

async function fetchNewTokenPair(username: string, password: string) {
  const url = "http://localhost:8000/dj-rest-auth/login/";
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
}

async function abandonTokens() {
  const url = await "http://localhost:8000/dj-rest-auth/logout/";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
}

export default function AuthProvider({ children }: { children: React.ReactNode; }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function refreshToken() {
    const response = await fetchNewToken();
    if (!response.ok) {
      setAuthenticated(false);
      return;
    }

    const { access } = await response.json();
    setAccessToken(access);
  }

  async function login(username: string, password: string) {
    const response = await fetchNewTokenPair(username, password);
    if (response.ok) {
      const { access } = await response.json();
      setAccessToken(access);
      setAuthenticated(true);
    }
    return response;
  }

  async function logout() {
    setAccessToken(null);
    setAuthenticated(false);
    await abandonTokens();
  }

  async function getProtectedJson(url: string) {
    for (let i = 2; i > 0; i--) {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include"
      });
      if (response.status !== 401) {
        return response;
      }
      await refreshToken();
    }
    return null;
  }

  async function postProtectedJson(url: string, data: any) {
    for (let i = 2; i > 0; i--) {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      if (response.status !== 401) {
        return response;
      }
      await refreshToken();
    }
    return null;
  }

  const value = {
    authenticated,
    login,
    logout,
    getProtectedJson,
    postProtectedJson
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
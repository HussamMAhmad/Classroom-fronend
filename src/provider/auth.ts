import React from "react";
import { AuthProvider } from "@refinedev/core";

// to keep the example short and simple, we didn't send a request, and we save the token in localStorage.
// in real world, you should send a request and token should be saved in more secure place.
export const authProvider: AuthProvider = {
  login: async ({name , email, password , role}) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/sign-in/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password , role }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("email", data.email);
        return {
          success: true,
        };
      }

      return {
        success: false,
        error: {
          name: "Login Failed",
          message:
            data.message || "Invalid email or password. Please try again.",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Network Error",
          message:
            "Unable to connect to the server. Please check your internet connection and try again.",
        },
      };
    }
  },
  check: async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      return {
        authenticated: false,
      };
    }

    return {
      authenticated: true,
    };
  },
  logout: async () => {
    localStorage.removeItem("email");
    return {
      success: true,
    };
  },
  getIdentity: async () => {
    const email = localStorage.getItem("email");
    return {
      email,
    };
  },
  register: async () => {
    throw new Error("Not implemented");
  },
  onError: async () => {
    throw new Error("Not implemented");
  },
};

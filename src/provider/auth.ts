import React from "react";
import { AuthProvider } from "@refinedev/core";
import { BACKEND_BASE_URL } from "@/constants";

export const authProvider: AuthProvider = {
  login: async ({ name, email, password }) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          redirectTo: "/",
          successNotification: {
            message: "successfully logged in",
            description: "Welcome back to the admin panel",
          },
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
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/get-session`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (!response.ok) {
        return { authenticated: false, redirectTo: "/login" };
      }
      const data = await response.json();

      if (data && data.user) {
        return { authenticated: true };
      }

      return { authenticated: false, redirectTo: "/login" };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },
  logout: async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        return {
          success: true,
          redirectTo: "/login",
        };
      }
      return {
        success: false,
        error: {
          name: "Logout Failed",
          message: "Unable to logout. Please try again.",
        },
      };
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        success: false,
        error: {
          name: "Logout Failed",
          message: "Unable to logout due to a network error.",
        },
      };
    }
  },
  getIdentity: async () => {
    const email = localStorage.getItem("email");
    return {
      email,
    };
  },
  register: async ({ name, email, password, role }) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/sign-up/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          redirectTo: "/",
          successNotification: {
            message: "successfully registered",
            description: "Welcome back to the admin panel",
          },
        };
      }

      return {
        success: false,
        error: {
          name: "SignUp Failed",
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
  onError: async () => {
    throw new Error("Not implemented");
  },
};

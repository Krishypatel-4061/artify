// Placeholder Authentication Service for Artify Cloud
import { User } from "./database.service";
import Cookies from "js-cookie";

class AuthService {
  private get defaultUser(): User {
    return {
      id: "68c2e21d-1618-4b16-845a-bf6ee1cc3c80",
      name: "CyberPunkDude",
      email: "artist@artify.cloud",
      role: "artist",
    };
  }

  async getCurrentUser(): Promise<User | null> {
    if (typeof window !== "undefined") {
      const stored = Cookies.get("mock_auth_user");
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } else {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const stored = cookieStore.get("mock_auth_user")?.value;
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (err) {
        // next/headers might fail if not in a server component context
      }
      return null;
    }
  }

  async login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "artist@artify.cloud") {
          const user = this.defaultUser;
          if (typeof window !== "undefined") {
            Cookies.set("mock_auth_user", JSON.stringify(user), { expires: 7 });
          }
          resolve(user);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          Cookies.remove("mock_auth_user");
        }
        resolve();
      }, 300);
    });
  }
}

export const auth = new AuthService();

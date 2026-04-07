import { createContext, ReactNode, useContext, useState } from "react";
import { defaultUser, UserProfile } from "../data/user";

type AuthContextValue = {
  isLoggedIn: boolean;
  user: UserProfile;
  login: (email: string, password: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  user: defaultUser,
  login: () => null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const login = (email: string, password: string): string | null => {
    if (!email.trim()) return "Preencha o e-mail.";
    if (!email.includes("@")) return "E-mail invalido.";
    if (!password.trim()) return "Preencha a senha.";
    if (password.length < 3) return "Senha deve ter ao menos 3 caracteres.";

    setUser({ ...defaultUser, email: email.trim() });
    setIsLoggedIn(true);
    return null;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

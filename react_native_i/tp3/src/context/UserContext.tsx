import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Application, DEFAULT_APPLICATIONS } from "../data/applications";
import { DEFAULT_PROFILE } from "../data/profile";

type UserProfile = {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  github: string;
  devto: string;
  email: string;
  location: string;
};

type UserContextValue = {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  addApplication: (app: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
};

const UserContext = createContext<UserContextValue>({
  profile: DEFAULT_PROFILE,
  updateProfile: () => {},
  applications: [],
  setApplications: () => {},
  addApplication: () => {},
  updateApplication: () => {},
});

const APPS_STORAGE_KEY = "@applications";
const PROFILE_STORAGE_KEY = "@profile";

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [applications, setApplicationsState] =
    useState<Application[]>(DEFAULT_APPLICATIONS);

  useEffect(() => {
    AsyncStorage.getItem(APPS_STORAGE_KEY).then((stored) => {
      if (stored) {
        setApplicationsState(JSON.parse(stored));
      }
    });
    AsyncStorage.getItem(PROFILE_STORAGE_KEY).then((stored) => {
      if (stored) {
        setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(stored) });
      }
    });
  }, []);

  const persistApplications = (apps: Application[]) => {
    setApplicationsState(apps);
    AsyncStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const addApplication = (app: Application) => {
    persistApplications([...applications, app]);
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    persistApplications(
      applications.map((app) => (app.id === id ? { ...app, ...updates } : app)),
    );
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        applications,
        setApplications: persistApplications,
        addApplication,
        updateApplication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}


import { User, UserRole } from "@/types";
import { mockUsers } from "./data";

export interface Credentials {
  email: string;
  password?: string;
}

export interface SignUpCredentials extends Credentials {
  name: string;
  role: UserRole;
}

const AUTH_STORAGE_KEY = 'synergy-ems-auth-user';
const API_BASE_URL = 'http://localhost:8080/api/auth';

// --- Auth State ---

let currentUser: User | null = null;
const listeners: ((user: User | null) => void)[] = [];

if (typeof window !== 'undefined') {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }
}

function notifyListeners() {
  listeners.forEach(listener => listener(currentUser));
}

// --- Auth Functions ---

/**
 * Signs a user in by calling the backend.
 * @param credentials The user's email and password.
 * @returns A promise that resolves with the User object.
 */
export const mockSignIn = async (credentials: Credentials): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Invalid email or password.' }));
        throw new Error(errorData.message || 'Invalid email or password.');
    }

    const user: User = await response.json();
    currentUser = user;
    try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (error) {
        console.error("Failed to save user to localStorage", error);
    }
    notifyListeners();
    return user;
};

/**
 * Signs a new user up by calling the backend.
 * @param credentials The new user's details.
 * @returns A promise that resolves with the new User object.
 */
export const mockSignUp = async (credentials: SignUpCredentials): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unexpected error occurred.' }));
        throw new Error(errorData.message || 'An unexpected error occurred.');
    }

    const newUser: User = await response.json();
    
    // Also log the user in after successful signup
    currentUser = newUser;
     try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (error) {
        console.error("Failed to save user to localStorage", error);
    }
    notifyListeners();
    
    return newUser;
};

/**
 * Simulates a user signing out.
 * @returns A promise that resolves when sign-out is complete.
 */
export const mockSignOut = (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            currentUser = null;
            try {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            } catch (error) {
                console.error("Failed to remove user from localStorage", error);
            }
            notifyListeners();
            resolve();
        }, 300);
    });
};


/**
 * Simulates a listener for auth state changes, like Firebase's onAuthStateChanged.
 * @param callback The function to call when the auth state changes.
 * @returns An unsubscribe function.
 */
export const onMockAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
  // Immediately call the listener with the current user state
  callback(currentUser);

  // Add the listener to the list
  listeners.push(callback);

  // Return an unsubscribe function
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

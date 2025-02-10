"use client";
import { useAuth } from "../contexts/AuthContext";

export const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
};

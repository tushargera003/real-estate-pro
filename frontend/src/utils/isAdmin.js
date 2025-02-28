import { jwtDecode } from "jwt-decode";

export const isAdmin = () => {
  const token = localStorage.getItem("token");

  if (!token) return false; // Token nahi hai toh admin nahi hai

  try {
    const decoded = jwtDecode(token);
    return decoded.isAdmin; // Token me isAdmin check karo
  } catch (error) {
    return false; // Invalid token
  }
};

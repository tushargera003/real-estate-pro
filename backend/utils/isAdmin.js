import jwtDecode from "jwt-decode";

export const isAdmin = () => {
  const token = localStorage.getItem("token");

  if (!token) return false; // Agar token nahi hai toh admin nahi hai

  try {
    const decoded = jwtDecode(token);
    return decoded.isAdmin; // Token ke andar isAdmin hai ya nahi check karo
  } catch (error) {
    return false; // Agar token invalid hai toh admin nahi hai
  }
};

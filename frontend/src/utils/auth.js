export const checkAdmin = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    if (!token) return false;
  
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/is-admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await res.json();
      return data.isAdmin || false;
    } catch (error) {
      return false;
    }
  };
  
  export const checkUserAuth = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    
    if (!token) return false;
  
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await res.json();
      return data.isAuthenticated || false;
    } catch (error) {
      return false;
    }
  };
  
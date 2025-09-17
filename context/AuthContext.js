import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedToken = await AsyncStorage.getItem("token");
        const storedRole = await AsyncStorage.getItem("userRole");
        const storedCompanyName = await AsyncStorage.getItem("companyName");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedName = await AsyncStorage.getItem("name");
        const supplier = await AsyncStorage.getItem("supplier");
        

        if (storedUserId && storedToken) {
          setUser({
            id: storedUserId,
            token: storedToken,
            role: storedRole,
            companyName: storedCompanyName,
            email: storedEmail,
            name: storedName,
            supplier:supplier
          });
        }
      } catch (err) {
        console.log("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userId, token, role, companyName, email, name, supplier) => {
    try {
      await AsyncStorage.multiSet([
        ["userId", userId],
        ["token", token],
        ["userRole", role],
        ["companyName", companyName],
        ["userEmail", email],
        ["name", name],
        ["supplier",supplier]
      ]);

      setUser({ id: userId, token, role, companyName, email, name, supplier });
    } catch (err) {
      console.log("Error saving user:", err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "userId",
        "token",
        "userRole",
        "companyName",
        "userEmail",
        "name",
      ]);
      setUser(null);
    } catch (err) {
      console.log("Error clearing storage:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

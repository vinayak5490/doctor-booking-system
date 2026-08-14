import React, { createContext, useContext, useState, useEffect} from 'react';
// import { children } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL =
      import.meta.env.VITE_API_URL ||
      "https://doctor-booking-system-gxud.onrender.com";

    //check authentication status when app loads
    useEffect(()=>{
        checkAuth();
    }, []);

    const checkAuth = async()=>{
        try {
            const res = await fetch(`/api/auth/me`, {
                method: "GET",
                credentials: "include", //Essential for sending HttpOnly cookie
            });

            const data = await res.json();
            if(data.success){
                setAdmin(data.admin);
            }else{
                setAdmin(null);
            }
        } catch (error) {
            setAdmin(null);
        }finally{
            setLoading(false);
        }
    };

    const login = async (email, password)=>{
        const res = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if(data.success){
            setAdmin(data.admin);
        }
        return data;
    };

    const logout = async()=>{
        await fetch(`/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        setAdmin(null);
    };

    return(
        <AuthContext.Provider value={{ admin, loading, login, logout, checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

//3. custom hook (Added this)
export const useAuth = () => useContext(AuthContext);

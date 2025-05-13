import React, {createContext, useContext, useState, useEffect} from 'react';
import {supabase} from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    console.log('Login started', email, password); // ✅ check if it's triggered

    const {user, error} = await supabase.auth.signIn({email, password});

    if (error) {
      console.error('Login error:', error.message);
      throw error;
    }

    console.log('User logged in:', user);
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const signup = async (email, password, name) => {
    const {user, error} = await supabase.auth.signUp(
      {email, password},
      {data: {full_name: name}},
    );
    if (error) throw error;
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  };

  const checkUser = async () => {
    const {
      data: {user},
      error,
    } = await supabase.auth.getUser();
    if (!error) {
      setUser(user);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{user, login, signup, logout, loading, checkUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

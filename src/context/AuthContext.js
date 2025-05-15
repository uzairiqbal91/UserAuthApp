import React, {createContext, useContext, useState, useEffect} from 'react';
import {supabase} from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        throw new Error(error.message);  // Throw error if there's any
      }
  
      console.log('User logged in:', user);  // You can also log user data here
      return user;  // Return the user object if login is successful
    } catch (err) {
      console.error('Login failed:', err.message);
      throw err;  // Re-throw error so it can be caught in the LoginScreen
    }
  };

  const signup = async (email, password, name) => {
    try {
      // Step 1: Sign up the user via Supabase auth
      const { user, error: signupError } = await supabase.auth.signUp(
        { email, password },
        { data: { full_name: name } }
      );
  
      if (signupError) throw signupError;
  
      // Step 2: Save the user data into the `profiles` table
      const { error: insertError } = await supabase
        .from('profiles')
        .upsert([
          {
            email: user.email,
            full_name: user.user_metadata.full_name,
          }
        ]);
  
      if (insertError) throw insertError;
  
      console.log('User signed up and profile created');
    } catch (err) {
      console.error('Sign up failed:', err.message);
    }
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

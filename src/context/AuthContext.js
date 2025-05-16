import React, { createContext, useContext, useState, useEffect } from 'react';
import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth

import firestore from '@react-native-firebase/firestore'; // Import Firestore
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Store user in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Fetch user additional data from Firestore
      const userData = await firestore().collection('users').doc(user.uid).get();
      setUser({ ...user, ...userData.data() }); // Merge user data with Firestore info

      return user;
    } catch (err) {
      console.error('Login failed:', err.message);
      throw err;  // Throw the error so it can be caught in the LoginScreen
    }
  };

  // Signup function
  const signup = async (email, password, name) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);

      // Save additional user data in Firestore
      await firestore().collection('users').doc(user.uid).set({
        name: name,
        email: email,
      });

      // Save user in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (err) {
      console.error('Sign up failed:', err.message);
      throw err;  // Handle sign-up error (e.g., email already in use)
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  // Load user from AsyncStorage when the app starts
  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set user if found in AsyncStorage
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to load user:', err.message);
      setLoading(false);
    }
  };

  // Check user session when app loads
  const checkUser = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);  // If logged in, set user in state
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();  // Load user when the app starts
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

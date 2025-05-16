import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Signup: create user + Firestore doc
  const signup = async (email, password, name) => {
    try {
      const { user: firebaseUser } = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('users').doc(firebaseUser.uid).set({
        name,
        email,
      });

      const fullUser = { ...firebaseUser.toJSON(), name };
      await AsyncStorage.setItem('user', JSON.stringify(fullUser));
      setUser(fullUser);

      return fullUser;
    } catch (err) {
      console.error('Sign up failed:', err.message);
      throw err;
    }
  };

  // 🔐 Login: fetch user profile from Firestore
  const login = async (email, password) => {
    try {
      const { user: firebaseUser } = await auth().signInWithEmailAndPassword(email, password);
      const profile = await firestore().collection('users').doc(firebaseUser.uid).get();

      const fullUser = { ...firebaseUser.toJSON(), ...profile.data() };
      await AsyncStorage.setItem('user', JSON.stringify(fullUser));
      setUser(fullUser);

      return fullUser;
    } catch (err) {
      console.error('Login failed:', err.message);
      throw err;
    }
  };

  // 🔓 Logout: sign out and clear storage
  const logout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  // 📥 Load user from local storage
  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Load user failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Check Firebase session + Firestore
  const checkUser = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const profile = await firestore().collection('users').doc(currentUser.uid).get();
      const fullUser = { ...currentUser.toJSON(), ...profile.data() };
      setUser(fullUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

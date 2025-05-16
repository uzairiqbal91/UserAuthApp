import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name) => {
    try {
      const { user: firebaseUser } = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('users').doc(firebaseUser.uid).set({ name, email });

      const fullUser = { ...firebaseUser.toJSON(), name, email };
      await AsyncStorage.setItem('user', JSON.stringify(fullUser));
      setUser(fullUser);

      return fullUser;
    } catch (err) {
      console.error('Signup Error:', err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const { user: firebaseUser } = await auth().signInWithEmailAndPassword(email, password);

      const doc = await firestore().collection('users').doc(firebaseUser.uid).get();
      if (!doc.exists) {
        throw new Error('User profile missing in Firestore');
      }

      const profile = doc.data();
      const fullUser = { ...firebaseUser.toJSON(), ...profile };
      await AsyncStorage.setItem('user', JSON.stringify(fullUser));
      setUser(fullUser);

      return fullUser;
    } catch (err) {
      console.error('Login Error:', err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

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

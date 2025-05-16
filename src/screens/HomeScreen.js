import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.greeting}>Welcome, {user.name || 'User'}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  greeting: { fontSize: 20, color: '#666' },
  email: { fontSize: 16, color: '#999' },
});

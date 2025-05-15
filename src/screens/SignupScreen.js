import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.includes('@')) newErrors.email = 'Invalid email';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signup(email, password, name); // Sign up the user
      navigation.navigate('Home'); // Navigate to Home screen if sign-up is successful
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      {loading ? <ActivityIndicator /> : <TouchableOpacity onPress={handleSignup}><Text>Sign Up</Text></TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 12, marginBottom: 6, fontSize: 16, color: '#000' },
  errorText: { color: 'red', marginBottom: 10, fontSize: 14 },
});

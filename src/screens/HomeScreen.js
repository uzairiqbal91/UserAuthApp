import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import {useAuth} from '../context/AuthContext';

export default function HomeScreen({navigation}) {
  const {user, logout} = useAuth();
  const name = user?.user_metadata?.full_name || 'User';

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://i.pravatar.cc/150?u=' + user?.email}}
        style={styles.avatar}
      />
      <Text style={styles.greeting}>Welcome,</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.logoutButton}>
        <Button
          title="Logout"
          color="#000"
          onPress={() => {
            logout();
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {fontSize: 20, color: '#666'},
  name: {fontSize: 28, fontWeight: 'bold', marginBottom: 4},
  email: {fontSize: 16, color: '#999'},
  avatar: {width: 100, height: 100, borderRadius: 50, marginBottom: 20},
  logoutButton: {marginTop: 40, width: '60%'},
});

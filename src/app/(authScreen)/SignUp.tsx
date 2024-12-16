import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, Colorss } from '@/Styles/style';
import { useRouter } from 'expo-router';
import { FontAwesome, Zocial } from '@expo/vector-icons';
import AuthServices from '@/Services/AuthService';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSignUpButton = async () => {
    if (!(email && password)) {
      setError(true);
      return;
    }
    await AuthServices.loginAccount({email , password}).then((response)=>{
      if(response){
        console.log(response)
      }
    })
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.header1}>Sign </Text>
        <Text style={styles.header}>Up</Text>
      </View>

      {/* Email Input Field */}
      <View style={styles.inputWrapper}>
        <Zocial name="email" size={20} color={colors.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input Field */}
      <View style={styles.inputWrapper}>
        <FontAwesome name="lock" size={20} color={colors.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry
        />
      </View>

      {/* Error Message */}
      {error && (
        <Text style={{ color: colors.primary, fontSize: 14, marginBottom: 10 }}>
          Please fill all the fields
        </Text>
      )}

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUpButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Don't have any Account ? </Text>
        <TouchableOpacity onPress={() => router.push('/(authScreen)')}>
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 20,
    fontFamily : "railway"
  },
  header1: {
    fontSize: 30,
    fontWeight: '400',
    color: Colorss.DARK_GRAY,
    marginBottom: 20,
    fontFamily : "railway-bold"
  },
  inputWrapper: {
    width: '100%',
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  loginText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
});


import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, Colorss } from '@/Styles/style';
import { useRouter } from 'expo-router';
import { FontAwesome, AntDesign, Zocial } from '@expo/vector-icons';
import AuthServices from '@/Services/AuthService';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/Store/locationSlice';

export default function SignInScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const res = await AuthServices.getCurrentUser();
        if (res) {
          router.push("/(tabs)/(Home)");
        }
      } catch (error) {
        console.log("User not found:", error);
      }
    };
  
    checkCurrentUser(); 
  }, [])
  


  const handleRegisterButton = async () => {
    setIsDisabled(true)
    if (!(username && email && password)) {
      setError(true);
      setIsDisabled(false)
      return;
    }
    await AuthServices.createAccount({ username, email, password }).then((res) => {
      if (res) {
        dispatch(SetUser({name : username , email : res.email || "" ,  uid : res.uid}))
        setIsDisabled(false)
        router.push("/(tabs)/(Home)")
        console.log("account successful created ")
      }
    }).catch((error) => {
      setIsDisabled(false)
      console.log("erro agya ", error)
    })
  };

  const handleInputChange = (setter: any, value: string) => {
    setError(false);
    setter(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.header1}> Get</Text>
        <Text style={styles.header}> Started </Text>
      </View>

      {/* Input with icon */}
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={20} color={colors.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={username}
          onChangeText={(e) => handleInputChange(setUsername, e)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Zocial name="email" size={20} color={colors.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(e) => handleInputChange(setEmail, e)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color={colors.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(e) => handleInputChange(setPassword, e)}
          secureTextEntry
        />
      </View>

      {error && (
        <Text style={{ color: colors.primary, fontSize: 14, marginBottom: 10 }}>
          Please fill all the fields
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegisterButton}
      activeOpacity={isDisabled ? 1 : 0.5} 
      disabled={isDisabled}  
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(authScreen)/SignUp')}>
          <Text style={styles.loginText}>Sign Up</Text>
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
    fontFamily: "railway"
  },
  header1: {
    fontSize: 30,
    fontWeight: '400',
    color: Colorss.DARK_GRAY,
    marginBottom: 20,
    fontFamily: 'railway-bold'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
  },
});

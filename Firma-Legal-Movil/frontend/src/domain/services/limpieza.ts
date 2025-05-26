import React, { useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export const limpieza = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  setEmail('')
  setPassword('')
  
  return {
    setEmail,
    setPassword,
  }
}
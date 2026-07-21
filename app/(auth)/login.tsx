import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';
import { showAlert } from '../../lib/alert';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      showAlert('Falta preencher', 'Introduz o email e a password.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      showAlert('Não foi possível entrar', error.message);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', data.user.id)
      .single();

    setLoading(false);
    router.replace(profile?.username ? '/(tabs)' : '/(auth)/username');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-extrabold text-gray-900 mb-1">Bem-vindo de volta 👋</Text>
        <Text className="text-gray-500 font-medium mb-8">Entra para continuares a aprender LGP</Text>

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-4 flex-row items-center">
          <Mail size={20} color={Colors.primary} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 font-medium"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6 flex-row items-center">
          <Lock size={20} color={Colors.primary} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 font-medium"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          className="rounded-3xl p-5 items-center mb-4"
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.85}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-extrabold text-base">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500 font-medium">Ainda não tens conta? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text className="font-bold" style={{ color: Colors.primary }}>Regista-te</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

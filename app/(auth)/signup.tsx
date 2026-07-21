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

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password) {
      showAlert('Falta preencher', 'Introduz o email e a password.');
      return;
    }
    if (password !== confirmPassword) {
      showAlert('As passwords não coincidem', 'Confirma a password novamente.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      showAlert('Não foi possível criar a conta', error.message);
      return;
    }

    if (!data.session) {
      // Confirmação de email está ativa nas definições do projeto Supabase
      showAlert(
        'Confirma o teu email',
        'Enviámos um link de confirmação para o teu email. Confirma para poderes entrar.'
      );
      router.replace('/(auth)/login');
      return;
    }

    router.replace('/(auth)/username');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-extrabold text-gray-900 mb-1">Criar conta 🤟</Text>
        <Text className="text-gray-500 font-medium mb-8">Guarda o teu progresso e compara com amigos</Text>

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

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-4 flex-row items-center">
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

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6 flex-row items-center">
          <Lock size={20} color={Colors.primary} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 font-medium"
            placeholder="Confirmar password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          className="rounded-3xl p-5 items-center mb-4"
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.85}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-extrabold text-base">Criar conta</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500 font-medium">Já tens conta? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="font-bold" style={{ color: Colors.primary }}>Entra</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

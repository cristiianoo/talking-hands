import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { supabase } from '../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Função de Login
  async function fazerLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor preenche todos os campos.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Erro no Login', error.message);
    } else {
      router.back(); // Volta para a aplicação!
    }
  }

  // Função de Criar Conta
  async function criarConta() {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor preenche todos os campos.');
      return;
    }

    setLoading(true);
    // Aqui usamos uma funcionalidade brutal do Supabase: metadata!
    // Enviamos já um username provisório (parte do email) que o trigger na BD vai apanhar
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: email.split('@')[0], // Ex: "joao@mail.com" vira "joao"
        }
      }
    });
    setLoading(false);

    if (error) {
      Alert.alert('Erro ao Criar Conta', error.message);
    } else {
      Alert.alert('Sucesso!', 'Conta criada. Verifica o teu email ou faz login diretamente.');
      router.back();
    }
  }

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      {/* Botão de Voltar */}
      <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mb-8">
        <ArrowLeft size={24} color="#4B5563" />
      </TouchableOpacity>

      <Text className="text-4xl font-black text-gray-900 mb-2">Junta-te à Comunidade</Text>
      <Text className="text-lg text-gray-500 mb-10">Cria conta para guardares o teu progresso, ganhares XP e adicionares amigos.</Text>

      {/* Inputs */}
      <View className="mb-6">
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200 mb-4">
          <Mail size={20} color="#9CA3AF" />
          <TextInput 
            placeholder="O teu Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            className="flex-1 ml-3 text-base text-gray-900"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
          <Lock size={20} color="#9CA3AF" />
          <TextInput 
            placeholder="Password (mínimo 6 letras)"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="flex-1 ml-3 text-base text-gray-900"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* Botões */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} className="my-4" />
      ) : (
        <View className="gap-4">
          <TouchableOpacity 
            onPress={fazerLogin}
            className="bg-primary rounded-full py-4 items-center shadow-sm"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-lg">Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={criarConta}
            className="bg-white border-2 border-primary rounded-full py-4 items-center"
            activeOpacity={0.8}
          >
            <Text className="text-primary font-bold text-lg">Criar Conta</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
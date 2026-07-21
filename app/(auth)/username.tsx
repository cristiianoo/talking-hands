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
import { useRouter } from 'expo-router';
import { AtSign } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { showAlert } from '../../lib/alert';

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export default function ChooseUsername() {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    const normalized = username.trim().toLowerCase();

    if (!USERNAME_REGEX.test(normalized)) {
      showAlert(
        'Username inválido',
        'Usa 3 a 20 caracteres: letras minúsculas, números ou underscore.'
      );
      return;
    }

    if (!session) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ username: normalized })
      .eq('id', session.user.id);
    setLoading(false);

    if (error) {
      if (error.code === '23505') {
        showAlert('Username indisponível', 'Já existe alguém com esse username. Tenta outro.');
      } else {
        showAlert('Não foi possível guardar', error.message);
      }
      return;
    }

    router.replace('/(tabs)');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-extrabold text-gray-900 mb-1">Escolhe o teu username 🤟</Text>
        <Text className="text-gray-500 font-medium mb-8">
          É como os teus amigos te vão encontrar para comparar streaks e XP
        </Text>

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6 flex-row items-center">
          <AtSign size={20} color={Colors.primary} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 font-medium"
            placeholder="username"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <TouchableOpacity
          className="rounded-3xl p-5 items-center"
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.85}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-extrabold text-base">Continuar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

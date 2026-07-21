import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LogIn } from 'lucide-react-native';
import { Colors } from '../constants/colors';

type AuthGateProps = {
  message: string;
};

// Usar em ecrãs/secções que exigem conta (Social, Favoritos),
// nunca no layout raiz — o resto da app continua acessível sem login.
export default function AuthGate({ message }: AuthGateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 bg-background">
      <View className="bg-blue-50 rounded-full w-16 h-16 items-center justify-center mb-4">
        <LogIn size={28} color={Colors.primary} />
      </View>
      <Text className="text-lg font-bold text-gray-900 text-center mb-2">Precisas de entrar</Text>
      <Text className="text-gray-500 text-center mb-6">{message}</Text>
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity className="rounded-3xl px-8 py-4" style={{ backgroundColor: Colors.primary }}>
          <Text className="text-white font-extrabold">Entrar ou criar conta</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

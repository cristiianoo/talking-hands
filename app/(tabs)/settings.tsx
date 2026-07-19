import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Definições ⚙️</Text>
      <Text className="text-gray-600">
        Página para o Modo Escuro, Créditos e Sobre a Aplicação.
      </Text>
    </SafeAreaView>
  );
}
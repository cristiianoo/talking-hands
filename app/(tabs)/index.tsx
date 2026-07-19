import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Olá! 👋</Text>
      <Text className="text-lg text-gray-600 mb-8">Pronto para aprender LGP hoje?</Text>
      
      {/* Esqueleto da Palavra Diária que tinhas na PAP */}
      <View className="bg-primary/10 p-6 rounded-2xl border border-primary/20 items-center justify-center h-48">
        <Text className="text-xl font-semibold text-primary">Palavra Diária</Text>
        <Text className="text-gray-500 mt-2">Em breve, a BD virá para aqui!</Text>
      </View>
    </SafeAreaView>
  );
}
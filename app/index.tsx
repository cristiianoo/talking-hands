import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-4xl font-bold text-primary mb-4">
        🤟 Talking Hands
      </Text>
      <Text className="text-lg text-gray-600 text-center px-6">
        Aprender Língua Gestual Portuguesa nunca foi tão fácil!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
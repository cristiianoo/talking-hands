import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flame, Hexagon, User } from 'lucide-react-native';
import { Colors } from '../constants/colors';

export default function TopBar() {
  const insets = useSafeAreaInsets(); // Calcula o tamanho da notch/bateria automaticamente

  return (
    <View 
      className="flex-row items-center justify-between px-6 pb-4 bg-background border-b border-gray-100"
      style={{ paddingTop: insets.top + 16 }} 
    >
      <View className="flex-row items-center gap-6">
        <View className="flex-row items-center">
          <Flame size={24} color={Colors.accent} fill={Colors.accent} />
          <Text className="text-accent font-extrabold text-lg ml-1">12</Text>
        </View>
        <View className="flex-row items-center">
          <Hexagon size={24} color={Colors.primary} fill={Colors.primary} />
          <Text className="text-primary font-extrabold text-lg ml-1">450</Text>
        </View>
      </View>
      
      <TouchableOpacity className="bg-gray-100 p-2.5 rounded-full border border-gray-200">
        <User size={20} color="#4B5563" />
      </TouchableOpacity>
    </View>
  );
}
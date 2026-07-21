import { View, Text, ScrollView } from 'react-native';
import { Flame } from 'lucide-react-native';
import { Colors } from '../../constants/colors';

export default function Social() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text className="text-3xl font-extrabold text-gray-900 mb-6">Amigos 👥</Text>

        <View className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          {/* Amigo 1 */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
              <View>
                <Text className="font-bold text-gray-900 text-lg">João Silva</Text>
                <Text className="text-gray-500 text-sm">2550 XP</Text>
              </View>
            </View>
            <View className="flex-row items-center bg-orange-50 px-3 py-1.5 rounded-full">
              <Flame size={18} color={Colors.accent} fill={Colors.accent} />
              <Text className="text-accent font-bold ml-1">45</Text>
            </View>
          </View>

          {/* Tu */}
          <View className="flex-row items-center justify-between mb-6 bg-blue-50 -mx-6 px-6 py-3 border-y border-blue-100">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-primary rounded-full mr-4 items-center justify-center">
                <Text className="text-white font-bold text-lg">Tu</Text>
              </View>
              <View>
                <Text className="font-bold text-gray-900 text-lg">Estudante</Text>
                <Text className="text-gray-500 text-sm">450 XP</Text>
              </View>
            </View>
            <View className="flex-row items-center bg-orange-50 px-3 py-1.5 rounded-full">
              <Flame size={18} color={Colors.accent} fill={Colors.accent} />
              <Text className="text-accent font-bold ml-1">12</Text>
            </View>
          </View>

          {/* Amigo 2 */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
              <View>
                <Text className="font-bold text-gray-900 text-lg">Maria Costa</Text>
                <Text className="text-gray-500 text-sm">320 XP</Text>
              </View>
            </View>
            <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full">
              <Flame size={18} color="#9CA3AF" />
              <Text className="text-gray-500 font-bold ml-1">2</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
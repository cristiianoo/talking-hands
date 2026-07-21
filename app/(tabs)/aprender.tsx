import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Check, Lock, Play } from 'lucide-react-native';
import { Colors } from '../../constants/colors';

export default function Aprender() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        
        <View className="mb-8 mt-2">
          <Text className="text-3xl font-extrabold text-gray-900">Percurso 🎯</Text>
          <Text className="text-gray-500 mt-2 text-base">Completa os níveis para dominares a LGP.</Text>
        </View>

        {/* Nível 1 - Concluído (Verde) */}
        <View className="flex-row items-center mb-8 opacity-60">
          <View className="bg-success rounded-full w-14 h-14 items-center justify-center mr-4 shadow-sm">
            <Check size={28} color="white" strokeWidth={3} />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">Nível 1</Text>
            <Text className="text-gray-500">Saudações</Text>
          </View>
        </View>

        <View className="absolute left-[52px] top-[140px] bottom-[180px] w-1 bg-gray-200 -z-10 rounded-full" />

        {/* Nível 2 - Atual */}
        <TouchableOpacity activeOpacity={0.8} className="flex-row items-center mb-8">
          <View className="bg-primary rounded-full w-16 h-16 items-center justify-center mr-4 shadow-md border-4 border-blue-100">
            <Play size={28} color="white" fill="white" />
          </View>
          <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <Text className="text-xl font-bold text-gray-900 mb-1">Nível 2</Text>
            <Text className="text-gray-500 mb-3">Meses e Dias</Text>
            
            <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <View className="w-[30%] h-full bg-success rounded-full" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Nível 3 - Bloqueado */}
        <View className="flex-row items-center mb-8 opacity-50">
          <View className="bg-gray-200 rounded-full w-14 h-14 items-center justify-center mr-4">
            <Lock size={24} color="#9CA3AF" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">Nível 3</Text>
            <Text className="text-gray-500">Cores</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
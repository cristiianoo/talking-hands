import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowRight, Target } from 'lucide-react-native';
import { Colors } from '../../constants/colors';

export default function Home() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        
        <View className="mb-8 mt-2">
          <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">O teu progresso</Text>
          <Text className="text-3xl font-extrabold text-gray-900">Olá, Estudante 👋</Text>
        </View>

        {/* NÍVEL ATUAL */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900">Continuar a Aprender</Text>
        </View>

        <TouchableOpacity className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8" activeOpacity={0.7}>
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="font-extrabold text-gray-900 text-xl">Nível 2</Text>
              <Text className="text-gray-500 font-medium mt-1">Meses e Dias</Text>
            </View>
            <View className="bg-blue-50 rounded-full w-12 h-12 items-center justify-center">
              <ArrowRight size={24} color={Colors.primary} />
            </View>
          </View>
          <View className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <View className="w-[30%] h-full bg-success rounded-full" />
          </View>
          <Text className="text-xs text-gray-500 font-bold mt-3 uppercase text-right">3 de 10 concluídos</Text>
        </TouchableOpacity>

        {/* DESAFIO DIÁRIO */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900">Desafio Diário</Text>
        </View>

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex-row items-center">
          <View className="bg-orange-50 p-3 rounded-2xl mr-4">
            <Target size={28} color={Colors.accent} />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-gray-900 text-lg">Acerta 5 gestos</Text>
            <Text className="text-gray-500 text-sm">Ganha 20 XP extras!</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
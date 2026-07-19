import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, PlayCircle, ArrowRight } from 'lucide-react-native';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        
        {/* HEADER */}
        <View className="mb-8 mt-2">
          <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">
            O teu resumo diário
          </Text>
          <Text className="text-3xl font-extrabold text-gray-900">
            Olá, Estudante 👋
          </Text>
        </View>

        {/* PALAVRA DIÁRIA */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">Palavra Diária</Text>
            <Sparkles size={20} color="#4CAF50" />
          </View>
          
          <TouchableOpacity 
            className="bg-primary rounded-[32px] p-6 flex-row items-center justify-between shadow-sm"
            activeOpacity={0.8}
          >
            <View className="flex-1">
              <Text className="text-white/80 font-medium mb-1">19 de Julho</Text>
              <Text className="text-3xl font-black text-white mb-3">Aprender</Text>
              <View className="bg-white/20 self-start px-4 py-1.5 rounded-full">
                <Text className="text-white font-bold text-xs">Ver vídeo do gesto</Text>
              </View>
            </View>
            <View className="bg-white rounded-full p-3 shadow-sm ml-4">
              <PlayCircle size={36} color="#4CAF50" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        </View>

        {/* NÍVEL ATUAL (Continue Learning) */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900">Continuar a Aprender</Text>
        </View>

        <TouchableOpacity 
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
          activeOpacity={0.7}
        >
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="font-extrabold text-gray-900 text-xl">Nível 2</Text>
              <Text className="text-gray-500 font-medium mt-1">Meses e Dias</Text>
            </View>
            <View className="bg-green-50 rounded-full w-12 h-12 items-center justify-center">
              <ArrowRight size={24} color="#4CAF50" />
            </View>
          </View>
          
          <View className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <View className="w-[30%] h-full bg-primary rounded-full" />
          </View>
          <Text className="text-xs text-gray-500 font-bold mt-3 uppercase text-right">3 de 10 concluídos</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
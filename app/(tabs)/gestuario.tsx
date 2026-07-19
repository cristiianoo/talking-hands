import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Play } from 'lucide-react-native';

export default function Gestuario() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      
      {/* HEADER FIXO: Título e Barra de Pesquisa */}
      <View className="px-6 pt-2 pb-4 bg-background">
        <Text className="text-3xl font-extrabold text-gray-900 mb-6">Gestuário 📖</Text>
        
        {/* Barra de Pesquisa */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
          <Search size={20} color="#9CA3AF" />
          <TextInput 
            placeholder="Procurar um gesto..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-base text-gray-900 font-medium"
          />
        </View>
      </View>

      {/* FILTROS (Scroll Horizontal) */}
      <View className="mb-2">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
        >
          <TouchableOpacity className="bg-primary px-5 py-2 rounded-full mr-3 shadow-sm">
            <Text className="text-white font-bold">Todos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white border border-gray-200 px-5 py-2 rounded-full mr-3">
            <Text className="text-gray-600 font-bold">Letras</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white border border-gray-200 px-5 py-2 rounded-full mr-3">
            <Text className="text-gray-600 font-bold">Números</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-200 px-5 py-2 rounded-full mr-3">
            <Text className="text-gray-600 font-bold">Cores</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* LISTA DE GESTOS (Grelha) */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <View className="flex-row flex-wrap justify-between">
          
          {/* Card de Gesto 1 */}
          <TouchableOpacity 
            className="w-[48%] bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm items-center"
            activeOpacity={0.7}
          >
            {/* Espaço para a Thumbnail do Vídeo/Imagem */}
            <View className="w-full h-24 bg-gray-100 rounded-2xl items-center justify-center mb-3">
              <Play size={24} color="#9CA3AF" fill="#9CA3AF" />
            </View>
            <Text className="font-bold text-gray-900 text-lg">Amarelo</Text>
            <Text className="text-xs text-gray-500 font-medium mt-1">Cores</Text>
          </TouchableOpacity>

          {/* Card de Gesto 2 */}
          <TouchableOpacity 
            className="w-[48%] bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm items-center"
            activeOpacity={0.7}
          >
            <View className="w-full h-24 bg-gray-100 rounded-2xl items-center justify-center mb-3">
              <Play size={24} color="#9CA3AF" fill="#9CA3AF" />
            </View>
            <Text className="font-bold text-gray-900 text-lg">Azul</Text>
            <Text className="text-xs text-gray-500 font-medium mt-1">Cores</Text>
          </TouchableOpacity>

          {/* Card de Gesto 3 */}
          <TouchableOpacity 
            className="w-[48%] bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm items-center"
            activeOpacity={0.7}
          >
            <View className="w-full h-24 bg-gray-100 rounded-2xl items-center justify-center mb-3">
              <Play size={24} color="#9CA3AF" fill="#9CA3AF" />
            </View>
            <Text className="font-bold text-gray-900 text-lg">Boa Tarde</Text>
            <Text className="text-xs text-gray-500 font-medium mt-1">Saudações</Text>
          </TouchableOpacity>

          {/* Card de Gesto 4 */}
          <TouchableOpacity 
            className="w-[48%] bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm items-center"
            activeOpacity={0.7}
          >
            <View className="w-full h-24 bg-gray-100 rounded-2xl items-center justify-center mb-3">
              <Play size={24} color="#9CA3AF" fill="#9CA3AF" />
            </View>
            <Text className="font-bold text-gray-900 text-lg">Bom Dia</Text>
            <Text className="text-xs text-gray-500 font-medium mt-1">Saudações</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
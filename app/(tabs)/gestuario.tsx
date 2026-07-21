import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Search, Play } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { useState } from 'react';

const MEUS_GESTOS = [
  { id: 1, nome: 'A', categoria: 'Letras' },
  { id: 2, nome: 'B', categoria: 'Letras' },
  { id: 3, nome: '1', categoria: 'Números' },
  { id: 4, nome: 'Amarelo', categoria: 'Cores' },
  { id: 5, nome: 'Bom Dia', categoria: 'Saudações' },
];

export default function Gestuario() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [textoPesquisa, setTextoPesquisa] = useState('');
  // Se a categoria for 'Todos', mostra tudo. Senão, filtra só os que têm a categoria igual à que escolheste.
  const gestosFiltrados = MEUS_GESTOS
    // 1º Passo: Filtrar por Categoria
    .filter(gesto => categoriaAtiva === 'Todos' ? true : gesto.categoria === categoriaAtiva)
    // 2º Passo: Filtrar por Texto da Pesquisa (tudo em letras minúsculas para não falhar se escreveres 'aMaReLo')
    .filter(gesto => gesto.nome.toLowerCase().includes(textoPesquisa.toLowerCase()));
    
  return (
    <View className="flex-1 bg-background">
      
      <View className="px-6 pt-2 pb-4 bg-background">
        <Text className="text-3xl font-extrabold text-gray-900 mb-6">Gestuário 📖</Text>
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
          <Search size={20} color="#9CA3AF" />
          <TextInput 
            placeholder="Procurar um gesto..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-base text-gray-900 font-medium"
            value={textoPesquisa}
            onChangeText={setTextoPesquisa}
          />
        </View>
      </View>

      <View className="mb-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}>
          <TouchableOpacity 
            onPress={() => setCategoriaAtiva('Todos')}
            className={`px-5 py-2 rounded-full mr-3 shadow-sm ${categoriaAtiva === 'Todos' ? 'bg-primary border border-transparent' : 'bg-white border border-gray-200'}`}>
            <Text className={`font-bold ${categoriaAtiva === 'Todos' ? 'text-white' : 'text-gray-600'}`}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setCategoriaAtiva('Letras')}
            className={`px-5 py-2 rounded-full mr-3 shadow-sm ${categoriaAtiva === 'Letras' ? 'bg-primary border border-transparent' : 'bg-white border border-gray-200'}`}>
            <Text className={`font-bold ${categoriaAtiva === 'Letras' ? 'text-white' : 'text-gray-600'}`}>Letras</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setCategoriaAtiva('Números')}
            className={`px-5 py-2 rounded-full mr-3 shadow-sm ${categoriaAtiva === 'Números' ? 'bg-primary border border-transparent' : 'bg-white border border-gray-200'}`}>
            <Text className={`font-bold ${categoriaAtiva === 'Números' ? 'text-white' : 'text-gray-600'}`}>Números</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setCategoriaAtiva('Saudações')}
            className={`px-5 py-2 rounded-full mr-3 shadow-sm ${categoriaAtiva === 'Saudações' ? 'bg-primary border border-transparent' : 'bg-white border border-gray-200'}`}>
            <Text className={`font-bold ${categoriaAtiva === 'Saudações' ? 'text-white' : 'text-gray-600'}`}>Saudações</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <View className="flex-row flex-wrap justify-between">
          {gestosFiltrados.map((gesto) => (
            <TouchableOpacity 
              key={gesto.id} 
              className="w-[48%] bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm items-center" 
              activeOpacity={0.7}
            >
              <View className="w-full h-24 bg-gray-100 rounded-2xl items-center justify-center mb-3">
                <Play size={24} color="#9CA3AF" fill="#9CA3AF" />
              </View>
              {/* Aqui a magia acontece: metemos a variável do nome e categoria! */}
              <Text className="font-bold text-gray-900 text-lg">{gesto.nome}</Text>
              <Text className="text-xs text-gray-500 font-medium mt-1">{gesto.categoria}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Search, Play } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Gestuario() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [textoPesquisa, setTextoPesquisa] = useState('');
  
  // Estados para a Base de Dados
  const [gestos, setGestos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados ao Supabase quando a página abre
  useEffect(() => {
    async function fetchGestos() {
      try {
        const { data, error } = await supabase
          .from('gestures')
          .select('id, name, categories(name)');

        if (error) throw error;

        // Formata os dados da nuvem
        if (data) {
          const formatados = data.map((g: any) => ({
            id: g.id,
            nome: g.name,
            categoria: g.categories?.name
          }));
          setGestos(formatados);
        }
      } catch (error) {
        console.error("Erro ao buscar gestos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGestos();
  }, []);

  // O Filtro Duplo
  const gestosFiltrados = gestos
    .filter(gesto => categoriaAtiva === 'Todos' ? true : gesto.categoria === categoriaAtiva)
    .filter(gesto => gesto.nome.toLowerCase().includes(textoPesquisa.toLowerCase()));

  return (
    <View className="flex-1 bg-background">
      
      {/* CABEÇALHO E PESQUISA */}
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

      {/* FILTROS (Abas) */}
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

      {/* LISTA DE CARTÕES / LOADING */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
        ) : (
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
                <Text className="font-bold text-gray-900 text-lg">{gesto.nome}</Text>
                <Text className="text-xs text-gray-500 font-medium mt-1">{gesto.categoria}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
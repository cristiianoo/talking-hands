import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Moon, Bell, Info, Heart, ChevronRight, LogOut, ShieldCheck } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { useState } from 'react';
import { useRouter } from 'expo-router'; // 1. Importamos o router

export default function Settings() {
  const router = useRouter(); // 2. Inicializamos o router

  // Estados para os botões "Toggle" (interruptores)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        
        {/* SECÇÃO: Conta / Autenticação (A NOSSA NOVA PORTA DE ENTRADA) */}
        <TouchableOpacity 
          onPress={() => router.push('/login')}
          className="bg-accent rounded-3xl p-6 mb-8 flex-row items-center justify-between shadow-sm"
          activeOpacity={0.8}
        >
          <View>
            <Text className="text-white font-black text-xl mb-1">Cria o teu Perfil</Text>
            <Text className="text-white/80 font-medium">Guarda a tua Streak e XP!</Text>
          </View>
          <ChevronRight size={24} color="white" />
        </TouchableOpacity>

        {/* SECÇÃO: Preferências */}
        <Text className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-3 ml-2">Preferências</Text>
        <View className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-8 overflow-hidden">
          
          {/* Modo Escuro */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-50">
            <View className="flex-row items-center">
              <View className="bg-blue-50 p-2.5 rounded-xl mr-4">
                <Moon size={20} color={Colors.primary} />
              </View>
              <Text className="font-bold text-gray-900 text-lg">Modo Escuro</Text>
            </View>
            <Switch 
              value={isDarkMode} 
              onValueChange={setIsDarkMode} 
              trackColor={{ false: '#E5E7EB', true: Colors.success }}
            />
          </View>

          {/* Lembrete Diário */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <View className="bg-orange-50 p-2.5 rounded-xl mr-4">
                <Bell size={20} color={Colors.accent} />
              </View>
              <View>
                <Text className="font-bold text-gray-900 text-lg">Lembretes Diários</Text>
                <Text className="text-gray-500 text-xs">Não percas o teu Streak</Text>
              </View>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications}
              trackColor={{ false: '#E5E7EB', true: Colors.success }}
            />
          </View>
        </View>

        {/* SECÇÃO: Sobre a Talking Hands */}
        <Text className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-3 ml-2">Sobre</Text>
        <View className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-8 overflow-hidden">
          
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50" activeOpacity={0.7}>
            <View className="flex-row items-center">
              <View className="bg-teal-50 p-2.5 rounded-xl mr-4">
                <Info size={20} color={Colors.secondary} />
              </View>
              <Text className="font-bold text-gray-900 text-lg">O que é a LGP?</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50" activeOpacity={0.7}>
            <View className="flex-row items-center">
              <View className="bg-red-50 p-2.5 rounded-xl mr-4">
                <Heart size={20} color={Colors.danger} />
              </View>
              <Text className="font-bold text-gray-900 text-lg">Créditos</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4" activeOpacity={0.7}>
            <View className="flex-row items-center">
              <View className="bg-gray-100 p-2.5 rounded-xl mr-4">
                <ShieldCheck size={20} color="#4B5563" />
              </View>
              <Text className="font-bold text-gray-900 text-lg">Política de Privacidade</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

        </View>

        {/* Botão de Terminar Sessão */}
        <TouchableOpacity className="flex-row items-center justify-center p-4 mb-4" activeOpacity={0.7}>
          <LogOut size={20} color={Colors.danger} />
          <Text className="font-bold text-danger text-lg ml-2">Terminar Sessão</Text>
        </TouchableOpacity>
        
        <Text className="text-center text-gray-400 text-xs mt-4">Talking Hands v0.4.0 (Open Source)</Text>
      </ScrollView>
    </View>
  );
}
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Moon, Bell, Info, Heart, ChevronRight, LogOut, ShieldCheck, User } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';

type Profile = {
  username: string | null;
  current_streak: number;
  total_xp: number;
};

export default function Settings() {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }

    setLoadingProfile(true);
    supabase
      .from('profiles')
      .select('username, current_streak, total_xp')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        setProfile(data);
        setLoadingProfile(false);
      });
  }, [session]);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>

        {/* SECÇÃO: Conta / Autenticação */}
        {session ? (
          <View className="bg-accent rounded-3xl p-6 mb-8 shadow-sm">
            <View className="flex-row items-center mb-1">
              <User size={20} color="white" />
              <Text className="text-white font-black text-xl ml-2">
                {loadingProfile ? '...' : profile?.username ?? 'Sem username ainda'}
              </Text>
            </View>
            <Text className="text-white/80 font-medium">
              {loadingProfile
                ? ''
                : `${profile?.total_xp ?? 0} XP · ${profile?.current_streak ?? 0} dias seguidos`}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            className="bg-accent rounded-3xl p-6 mb-8 flex-row items-center justify-between shadow-sm"
            activeOpacity={0.8}
          >
            <View>
              <Text className="text-white font-black text-xl mb-1">Cria o teu Perfil</Text>
              <Text className="text-white/80 font-medium">Guarda a tua Streak e XP!</Text>
            </View>
            <ChevronRight size={24} color="white" />
          </TouchableOpacity>
        )}

        {/* SECÇÃO: Preferências */}
        <Text className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-3 ml-2">Preferências</Text>
        <View className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-8 overflow-hidden">

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

        {/* Terminar sessão só aparece com sessão ativa */}
        {session && (
          <TouchableOpacity
            className="flex-row items-center justify-center p-4 mb-4"
            activeOpacity={0.7}
            onPress={handleSignOut}
          >
            <LogOut size={20} color={Colors.danger} />
            <Text className="font-bold text-danger text-lg ml-2">Terminar Sessão</Text>
          </TouchableOpacity>
        )}

        <Text className="text-center text-gray-400 text-xs mt-4">Talking Hands v0.4.0 (Open Source)</Text>
      </ScrollView>
    </View>
  );
}

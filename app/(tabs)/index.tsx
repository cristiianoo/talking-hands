import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ArrowRight, Target, Flame } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

type LevelRow = { id: string; title: string; order_index: number };

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function Home() {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<LevelRow | null>(null);
  const [challengeDone, setChallengeDone] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);

    const { data: levelsData } = await supabase
      .from('levels')
      .select('id, title, order_index')
      .order('order_index');

    if (session) {
      const [{ data: profile }, { data: progress }, { data: done }] = await Promise.all([
        supabase.from('profiles').select('username').eq('id', session.user.id).single(),
        supabase.from('user_level_progress').select('level_id').eq('user_id', session.user.id),
        supabase
          .from('daily_challenge_completions')
          .select('challenge_date')
          .eq('user_id', session.user.id)
          .eq('challenge_date', todayStr())
          .maybeSingle(),
      ]);

      setUsername(profile?.username ?? null);
      const completedIds = new Set((progress ?? []).map((p) => p.level_id));
      setCurrentLevel((levelsData ?? []).find((l) => !completedIds.has(l.id)) ?? null);
      setChallengeDone(!!done);
    } else {
      setUsername(null);
      setCurrentLevel((levelsData ?? [])[0] ?? null);
      setChallengeDone(false);
    }

    setLoading(false);
  }, [session]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>

        <View className="mb-8 mt-2">
          <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">O teu progresso</Text>
          <Text className="text-3xl font-extrabold text-gray-900">
            Olá, {username ?? 'Explorador'} 👋
          </Text>
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900">Continuar a Aprender</Text>
        </View>

        {currentLevel ? (
          <TouchableOpacity
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8"
            activeOpacity={0.7}
            onPress={() => router.push(`/(tabs)/aprender/${currentLevel.id}`)}
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-extrabold text-gray-900 text-xl">{currentLevel.title}</Text>
                <Text className="text-gray-500 font-medium mt-1">Toca para continuar</Text>
              </View>
              <View className="bg-blue-50 rounded-full w-12 h-12 items-center justify-center">
                <ArrowRight size={24} color={Colors.primary} />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8">
            <Text className="text-gray-500 text-center">Já completaste todos os níveis disponíveis! 🎉</Text>
          </View>
        )}

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900">Desafio Diário</Text>
        </View>

        <TouchableOpacity
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex-row items-center"
          activeOpacity={0.7}
          onPress={() => router.push('/challenge')}
        >
          <View className={`p-3 rounded-2xl mr-4 ${challengeDone ? 'bg-orange-50' : 'bg-orange-50'}`}>
            {challengeDone ? (
              <Flame size={28} color={Colors.accent} fill={Colors.accent} />
            ) : (
              <Target size={28} color={Colors.accent} />
            )}
          </View>
          <View className="flex-1">
            <Text className="font-bold text-gray-900 text-lg">
              {challengeDone ? 'Já treinaste hoje!' : 'Acerta 3 gestos'}
            </Text>
            <Text className="text-gray-500 text-sm">
              {challengeDone ? 'Volta amanhã para continuar a sequência' : 'Ganha 10 XP extras!'}
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

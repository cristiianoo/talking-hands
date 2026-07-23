import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Check, Lock, Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';

type LevelRow = { id: string; title: string; order_index: number };

export default function Aprender() {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);
  const [levels, setLevels] = useState<LevelRow[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: levelsData } = await supabase
      .from('levels')
      .select('id, title, order_index')
      .order('order_index');
    setLevels(levelsData ?? []);

    if (session) {
      const { data: progress } = await supabase
        .from('user_level_progress')
        .select('level_id')
        .eq('user_id', session.user.id);
      setCompletedIds(new Set((progress ?? []).map((p) => p.level_id)));
    } else {
      setCompletedIds(new Set());
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

  // Desbloqueio sequencial: o primeiro nível não concluído é o atual,
  // os que vêm depois ficam bloqueados.
  const firstIncompleteIndex = levels.findIndex((l) => !completedIds.has(l.id));

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View className="mb-8 mt-2">
          <Text className="text-3xl font-extrabold text-gray-900">Percurso 🎯</Text>
          <Text className="text-gray-500 mt-2 text-base">Completa os níveis para dominares a LGP.</Text>
        </View>

        {levels.length === 0 && (
          <Text className="text-gray-500 text-center mt-10">Ainda não há níveis criados.</Text>
        )}

        {levels.map((level, index) => {
          const isCompleted = completedIds.has(level.id);
          const isCurrent = index === firstIncompleteIndex;

          if (isCompleted) {
            return (
              <View key={level.id} className="flex-row items-center mb-8 opacity-60">
                <View className="bg-success rounded-full w-14 h-14 items-center justify-center mr-4 shadow-sm">
                  <Check size={28} color="white" strokeWidth={3} />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-900">{level.title}</Text>
                  <Text className="text-gray-500">Concluído</Text>
                </View>
              </View>
            );
          }

          if (isCurrent) {
            return (
              <TouchableOpacity
                key={level.id}
                activeOpacity={0.8}
                className="flex-row items-center mb-8"
                onPress={() => router.push(`/(tabs)/aprender/${level.id}`)}
              >
                <View className="bg-primary rounded-full w-16 h-16 items-center justify-center mr-4 shadow-md border-4 border-blue-100">
                  <Play size={28} color="white" fill="white" />
                </View>
                <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <Text className="text-xl font-bold text-gray-900 mb-1">{level.title}</Text>
                  <Text className="text-gray-500">Toca para começar</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <View key={level.id} className="flex-row items-center mb-8 opacity-50">
              <View className="bg-gray-200 rounded-full w-14 h-14 items-center justify-center mr-4">
                <Lock size={24} color="#9CA3AF" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900">{level.title}</Text>
                <Text className="text-gray-500">Bloqueado</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

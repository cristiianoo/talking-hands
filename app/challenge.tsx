import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Flame } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Colors } from '../constants/colors';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { showAlert } from '../lib/alert';

type ChallengeSign = {
  item_index: number;
  sign_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  options: string[];
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyChallenge() {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);

  const [loading, setLoading] = useState(true);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [items, setItems] = useState<ChallengeSign[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);
  const [newStreak, setNewStreak] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      if (!session) {
        setLoading(false);
        return;
      }

      const { data: done } = await supabase
        .from('daily_challenge_completions')
        .select('challenge_date')
        .eq('user_id', session.user.id)
        .eq('challenge_date', todayStr())
        .maybeSingle();

      if (done) {
        setAlreadyDone(true);
        setLoading(false);
        return;
      }

      const { data: challenge } = await supabase.rpc('get_daily_challenge');

      const withOptions: ChallengeSign[] = [];
      for (const c of challenge ?? []) {
        const { data: opts } = await supabase.rpc('get_challenge_options', { p_sign_id: c.sign_id });
        withOptions.push({ ...c, options: (opts ?? []).map((o: any) => o.label) });
      }
      setItems(withOptions);
      setLoading(false);
    }
    load();
  }, [session]);

  const item = items[current];

  // Chamado sempre, independentemente do loading — regras dos hooks.
  const player = useVideoPlayer(item?.media_type === 'video' ? item.media_url : null, (p) => {
    p.loop = true;
  });

  async function handleAnswer(label: string) {
    if (feedback || !item) return;
    setSelected(label);

    const { data: isCorrect } = await supabase.rpc('check_daily_answer', {
      p_sign_id: item.sign_id,
      p_guess: label,
    });

    if (isCorrect) {
      setFeedback('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setFeedback('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  async function handleNext() {
    if (feedback !== 'correct') {
      setSelected(null);
      setFeedback(null);
      return;
    }

    if (current + 1 < items.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setFeedback(null);
      return;
    }

    if (session) {
      const { error } = await supabase
        .from('daily_challenge_completions')
        .insert({ user_id: session.user.id, challenge_date: todayStr() });

      if (error && error.code !== '23505') {
        showAlert('Não foi possível guardar', error.message);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('current_streak')
        .eq('id', session.user.id)
        .single();
      setNewStreak(profile?.current_streak ?? null);
    }
    setFinished(true);
  }

  if (!session) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <Text className="text-gray-500 text-center mb-6">Precisas de entrar para fazeres o desafio diário.</Text>
        <TouchableOpacity className="rounded-3xl px-8 py-4" style={{ backgroundColor: Colors.primary }} onPress={() => router.back()}>
          <Text className="text-white font-extrabold">Fechar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  if (alreadyDone) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="bg-orange-50 rounded-full w-20 h-20 items-center justify-center mb-6">
          <Flame size={40} color={Colors.accent} fill={Colors.accent} />
        </View>
        <Text className="text-2xl font-extrabold text-gray-900 mb-2 text-center">Já treinaste hoje! 🔥</Text>
        <Text className="text-gray-500 text-center mb-8">Volta amanhã para manteres a sequência.</Text>
        <TouchableOpacity className="rounded-3xl px-8 py-4" style={{ backgroundColor: Colors.primary }} onPress={() => router.back()}>
          <Text className="text-white font-extrabold">Fechar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (finished) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="bg-orange-50 rounded-full w-20 h-20 items-center justify-center mb-6">
          <Flame size={40} color={Colors.accent} fill={Colors.accent} />
        </View>
        <Text className="text-2xl font-extrabold text-gray-900 mb-2 text-center">Desafio completo! 🎉</Text>
        <Text className="text-gray-500 text-center mb-8">
          {newStreak !== null ? `Sequência atual: ${newStreak} dias` : 'Streak atualizada'} · +10 XP
        </Text>
        <TouchableOpacity className="rounded-3xl px-8 py-4" style={{ backgroundColor: Colors.primary }} onPress={() => router.back()}>
          <Text className="text-white font-extrabold">Fechar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!item) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <Text className="text-gray-500 text-center">Ainda não há palavras suficientes para o desafio de hoje.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <X size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-gray-500 font-bold">{current + 1} / {items.length}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="items-center px-6 mb-6" style={{ height: 260 }}>
        {item.media_type === 'video' ? (
          <VideoView player={player} style={{ width: '100%', height: '100%', borderRadius: 24 }} nativeControls />
        ) : (
          <View className="w-full h-full bg-gray-100 rounded-3xl items-center justify-center">
            <Text className="text-gray-400">Imagem do gesto</Text>
          </View>
        )}
      </View>

      <Text className="text-xl font-bold text-gray-900 text-center mb-6 px-6">Qual o significado deste gesto?</Text>

      <View className="px-6">
        {item.options.map((label) => {
          const isSelected = selected === label;
          const showCorrect = feedback === 'correct' && isSelected;
          const showWrong = feedback === 'wrong' && isSelected;

          return (
            <TouchableOpacity
              key={label}
              disabled={!!feedback}
              onPress={() => handleAnswer(label)}
              className={`rounded-2xl p-4 mb-3 border-2 ${
                showCorrect ? 'bg-green-50 border-success' : showWrong ? 'bg-red-50 border-danger' : 'bg-white border-gray-100'
              }`}
            >
              <Text className="font-bold text-gray-900 text-center">{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {feedback && (
        <View className="px-6 mt-2">
          <Text className={`text-center font-bold mb-3 ${feedback === 'correct' ? 'text-success' : 'text-danger'}`}>
            {feedback === 'correct' ? 'Certo! 🎉' : 'Errado. Tenta novamente.'}
          </Text>
          <TouchableOpacity className="rounded-3xl p-4 items-center" style={{ backgroundColor: Colors.primary }} onPress={handleNext}>
            <Text className="text-white font-extrabold">
              {feedback === 'correct' ? (current + 1 < items.length ? 'Continuar' : 'Terminar') : 'Tentar outra vez'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

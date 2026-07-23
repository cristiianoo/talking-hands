import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Colors } from '../../../constants/colors';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';
import { showAlert } from '../../../lib/alert';

type Option = { id: string; label: string };
type Question = {
  id: string;
  sign: { media_url: string; media_type: 'image' | 'video' };
  options: Option[];
};

export default function LevelQuiz() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const router = useRouter();
  const session = useAuthStore((s) => s.session);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('questions')
        .select('id, order_index, signs ( media_url, media_type ), question_options ( id, label )')
        .eq('level_id', levelId)
        .order('order_index');

      setQuestions(
        (data ?? []).map((q: any) => ({
          id: q.id,
          sign: q.signs,
          options: q.question_options,
        }))
      );
      setLoading(false);
    }
    load();
  }, [levelId]);

  const question = questions[current];

  // Chamado sempre, independentemente do loading — regras dos hooks.
  const player = useVideoPlayer(
    question?.sign?.media_type === 'video' ? question.sign.media_url : null,
    (p) => {
      p.loop = true;
    }
  );

  async function handleAnswer(optionId: string) {
    if (feedback) return;

    setSelected(optionId);
    const { data: isCorrect } = await supabase.rpc('check_answer', { option_id: optionId });

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

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setFeedback(null);
      return;
    }

    if (session) {
      const { error } = await supabase
        .from('user_level_progress')
        .insert({ user_id: session.user.id, level_id: levelId });

      if (error && error.code !== '23505') {
        showAlert('Não foi possível guardar o progresso', error.message);
      }
    }
    setFinished(true);
  }

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  if (finished) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="bg-success rounded-full w-20 h-20 items-center justify-center mb-6">
          <CheckCircle2 size={40} color="white" />
        </View>
        <Text className="text-2xl font-extrabold text-gray-900 mb-2 text-center">Parabéns! 🎉</Text>
        <Text className="text-gray-500 text-center mb-8">
          Completaste todas as perguntas{session ? ' e ganhaste XP' : ''}.
        </Text>
        <TouchableOpacity
          className="rounded-3xl px-8 py-4"
          style={{ backgroundColor: Colors.primary }}
          onPress={() => router.replace('/(tabs)/aprender')}
        >
          <Text className="text-white font-extrabold">Voltar ao percurso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!question) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <Text className="text-gray-500 text-center">Este nível ainda não tem perguntas.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <X size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-gray-500 font-bold">
          {current + 1} / {questions.length}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="h-2 bg-gray-100 mx-6 rounded-full overflow-hidden mb-6">
        <View
          className="h-full bg-primary rounded-full"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </View>

      <View className="items-center px-6 mb-6" style={{ height: 260 }}>
        {question.sign.media_type === 'video' ? (
          <VideoView
            player={player}
            style={{ width: '100%', height: '100%', borderRadius: 24 }}
            nativeControls
          />
        ) : (
          <View className="w-full h-full bg-gray-100 rounded-3xl items-center justify-center">
            <Text className="text-gray-400">Imagem do gesto</Text>
          </View>
        )}
      </View>

      <Text className="text-xl font-bold text-gray-900 text-center mb-6 px-6">
        Qual o significado deste gesto?
      </Text>

      <View className="px-6">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id;
          const showCorrect = feedback === 'correct' && isSelected;
          const showWrong = feedback === 'wrong' && isSelected;

          return (
            <TouchableOpacity
              key={opt.id}
              disabled={!!feedback}
              onPress={() => handleAnswer(opt.id)}
              className={`rounded-2xl p-4 mb-3 border-2 ${
                showCorrect
                  ? 'bg-green-50 border-success'
                  : showWrong
                  ? 'bg-red-50 border-danger'
                  : 'bg-white border-gray-100'
              }`}
            >
              <Text className="font-bold text-gray-900 text-center">{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {feedback && (
        <View className="px-6 mt-2">
          <Text
            className={`text-center font-bold mb-3 ${
              feedback === 'correct' ? 'text-success' : 'text-danger'
            }`}
          >
            {feedback === 'correct' ? 'Certo! 🎉' : 'Errado. Tenta novamente.'}
          </Text>
          <TouchableOpacity
            className="rounded-3xl p-4 items-center"
            style={{ backgroundColor: Colors.primary }}
            onPress={handleNext}
          >
            <Text className="text-white font-extrabold">
              {feedback === 'correct'
                ? current + 1 < questions.length
                  ? 'Continuar'
                  : 'Terminar'
                : 'Tentar outra vez'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

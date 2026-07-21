import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Flame, UserPlus, Check, X } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import AuthGate from '../../components/AuthGate';
import { showAlert } from '../../lib/alert';
import { Link } from 'expo-router';

type LeaderboardEntry = {
  id: string;
  username: string | null;
  avatar_id: string;
  total_xp: number;
  current_streak: number;
};

type PendingRequest = {
  requester_id: string;
  requester_username: string | null;
};

export default function Social() {
  const session = useAuthStore((s) => s.session);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [pending, setPending] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [sending, setSending] = useState(false);

  const loadData = useCallback(async () => {
    if (!session) return;
    setLoading(true);

    const [{ data: board }, { data: requests }] = await Promise.all([
      supabase.rpc('get_friends_leaderboard'),
      // Assume o nome de FK gerado por omissão pelo Postgres.
      // Se der erro, confirma o nome real em Database > friendships > Foreign Keys.
      supabase
        .from('friendships')
        .select('requester_id, profiles!friendships_requester_id_fkey(username)')
        .eq('addressee_id', session.user.id)
        .eq('status', 'pending'),
    ]);

    setLeaderboard(board ?? []);
    setPending(
      (requests ?? []).map((r: any) => ({
        requester_id: r.requester_id,
        requester_username: r.profiles?.username ?? null,
      }))
    );
    setLoading(false);
  }, [session]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleAddFriend() {
    if (!session || !usernameInput.trim()) return;

    setSending(true);
    const { data: target, error: findError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', usernameInput.trim())
      .maybeSingle();

    if (findError || !target) {
      setSending(false);
      showAlert('Não encontrado', 'Não existe nenhum utilizador com esse username.');
      return;
    }

    if (target.id === session.user.id) {
      setSending(false);
      showAlert('Ups', 'Não podes adicionar-te a ti próprio.');
      return;
    }

    const { error: insertError } = await supabase
      .from('friendships')
      .insert({ requester_id: session.user.id, addressee_id: target.id });

    setSending(false);

    if (insertError) {
      showAlert('Não foi possível enviar o pedido', insertError.message);
      return;
    }

    setUsernameInput('');
    showAlert('Pedido enviado', 'Assim que for aceite, aparece no teu leaderboard.');
  }

  async function respondToRequest(requesterId: string, accept: boolean) {
    if (!session) return;

    if (accept) {
      await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('requester_id', requesterId)
        .eq('addressee_id', session.user.id);
    } else {
      await supabase
        .from('friendships')
        .delete()
        .eq('requester_id', requesterId)
        .eq('addressee_id', session.user.id);
    }

    loadData();
  }

  if (!session) {
    return <AuthGate message="Cria uma conta para guardares o teu streak e compares XP com amigos." />;
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text className="text-3xl font-extrabold text-gray-900 mb-6">Amigos 👥</Text>

        {!loading && !leaderboard.find((e) => e.id === session.user.id)?.username && (
          <Link href="/(auth)/username" asChild>
            <TouchableOpacity className="bg-orange-50 rounded-3xl p-4 mb-6 flex-row items-center justify-between">
              <Text className="text-gray-900 font-bold flex-1 mr-2">
                Escolhe um username para os teus amigos te encontrarem
              </Text>
              <Text className="font-bold" style={{ color: Colors.accent }}>Definir</Text>
            </TouchableOpacity>
          </Link>
        )}

        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6">
          <Text className="font-bold text-gray-900 mb-3">Adicionar amigo</Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-gray-50 rounded-2xl px-4 py-3 mr-3 text-gray-900 font-medium"
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              value={usernameInput}
              onChangeText={setUsernameInput}
            />
            <TouchableOpacity
              className="rounded-2xl p-3"
              style={{ backgroundColor: Colors.primary }}
              onPress={handleAddFriend}
              disabled={sending}
            >
              {sending ? <ActivityIndicator color="#fff" /> : <UserPlus size={20} color="#fff" />}
            </TouchableOpacity>
          </View>
        </View>

        {pending.length > 0 && (
          <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6">
            <Text className="font-bold text-gray-900 mb-3">Pedidos pendentes</Text>
            {pending.map((req) => (
              <View key={req.requester_id} className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-900 font-medium">{req.requester_username ?? 'Utilizador'}</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    className="bg-green-50 rounded-full p-2 mr-2"
                    onPress={() => respondToRequest(req.requester_id, true)}
                  >
                    <Check size={18} color={Colors.success} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-50 rounded-full p-2"
                    onPress={() => respondToRequest(req.requester_id, false)}
                  >
                    <X size={18} color={Colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          {loading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : leaderboard.length <= 1 ? (
            <Text className="text-gray-500 text-center py-4">
              Ainda não tens amigos por aqui. Adiciona alguém pelo username para comparares XP e streaks.
            </Text>
          ) : (
            leaderboard.map((entry) => {
              const isMe = entry.id === session.user.id;
              return (
                <View
                  key={entry.id}
                  className={`flex-row items-center justify-between mb-4 ${
                    isMe ? '-mx-6 px-6 py-3 bg-blue-50 border-y border-blue-100' : ''
                  }`}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-12 h-12 rounded-full mr-4 items-center justify-center ${
                        isMe ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      {isMe && <Text className="text-white font-bold text-lg">Tu</Text>}
                    </View>
                    <View>
                      <Text className="font-bold text-gray-900 text-lg">
                        {entry.username ?? (isMe ? 'Tu' : 'Utilizador')}
                      </Text>
                      <Text className="text-gray-500 text-sm">{entry.total_xp} XP</Text>
                    </View>
                  </View>
                  <View
                    className={`flex-row items-center px-3 py-1.5 rounded-full ${
                      entry.current_streak > 0 ? 'bg-orange-50' : 'bg-gray-100'
                    }`}
                  >
                    <Flame
                      size={18}
                      color={entry.current_streak > 0 ? Colors.accent : '#9CA3AF'}
                      fill={entry.current_streak > 0 ? Colors.accent : 'none'}
                    />
                    <Text
                      className={`font-bold ml-1 ${
                        entry.current_streak > 0 ? 'text-accent' : 'text-gray-500'
                      }`}
                    >
                      {entry.current_streak}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Colors } from '../../../constants/colors';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';
import { showAlert } from '../../../lib/alert';

type SignDetail = {
  id: string;
  label: string;
  media_url: string;
  media_type: 'image' | 'video';
};

export default function SignDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const session = useAuthStore((s) => s.session);

  const [sign, setSign] = useState<SignDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Chamado sempre, independentemente do loading — regras dos hooks.
  // Com source a null enquanto não há dados, não tenta tocar nada.
  const player = useVideoPlayer(sign?.media_type === 'video' ? sign.media_url : null, (p) => {
    p.loop = true;
  });

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('signs')
        .select('id, label, media_url, media_type')
        .eq('id', id)
        .single();
      setSign(data as SignDetail | null);

      if (session) {
        const { data: fav } = await supabase
          .from('favorites')
          .select('sign_id')
          .eq('user_id', session.user.id)
          .eq('sign_id', id)
          .maybeSingle();
        setIsFavorite(!!fav);
      }
      setLoading(false);
    }
    load();
  }, [id, session]);

  async function toggleFavorite() {
    if (!session) {
      showAlert('Precisas de entrar', 'Cria uma conta para guardares favoritos.');
      return;
    }
    if (isFavorite) {
      await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('sign_id', id as string);
    } else {
      await supabase.from('favorites').insert({ user_id: session.user.id, sign_id: id as string });
    }
    setIsFavorite(!isFavorite);
  }

  if (loading || !sign) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold text-gray-900">{sign.label}</Text>
        <TouchableOpacity onPress={toggleFavorite} className="p-2 -mr-2">
          <Heart
            size={24}
            color={isFavorite ? Colors.danger : '#9CA3AF'}
            fill={isFavorite ? Colors.danger : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {sign.media_type === 'video' ? (
          <VideoView
            player={player}
            style={{ width: '100%', aspectRatio: 3 / 4, borderRadius: 24 }}
            allowsFullscreen
            nativeControls
          />
        ) : (
          <Image
            source={{ uri: sign.media_url }}
            style={{ width: '100%', aspectRatio: 1, borderRadius: 24 }}
            contentFit="contain"
          />
        )}
      </View>
    </View>
  );
}

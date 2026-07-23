import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Search, Play, Heart } from 'lucide-react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';
import { showAlert } from '../../../lib/alert';

type SignRow = {
  id: string;
  type: 'letter' | 'number' | 'word';
  label: string;
  media_url: string;
  media_type: 'image' | 'video';
  sign_categories: { category_id: string }[];
};

type CategoryRow = { id: string; name: string };

const TYPE_TABS: { key: SignRow['type']; label: string }[] = [
  { key: 'letter', label: 'Letras' },
  { key: 'number', label: 'Números' },
  { key: 'word', label: 'Palavras' },
];

export default function Gestuario() {
  const router = useRouter();
  const session = useAuthStore((s) => s.session);

  const [activeType, setActiveType] = useState<SignRow['type']>('letter');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [search, setSearch] = useState('');

  const [signs, setSigns] = useState<SignRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);

    const [{ data: signsData }, { data: categoriesData }] = await Promise.all([
      supabase
        .from('signs')
        .select('id, type, label, media_url, media_type, sign_categories ( category_id )'),
      supabase.from('categories').select('id, name'),
    ]);

    setSigns((signsData as any) ?? []);
    setCategories(categoriesData ?? []);

    if (session) {
      const { data: favData } = await supabase
        .from('favorites')
        .select('sign_id')
        .eq('user_id', session.user.id);
      setFavoriteIds(new Set((favData ?? []).map((f) => f.sign_id)));
    } else {
      setFavoriteIds(new Set());
    }

    setLoading(false);
  }, [session]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function toggleFavorite(signId: string) {
    if (!session) {
      showAlert('Precisas de entrar', 'Cria uma conta para guardares favoritos.');
      return;
    }

    const isFav = favoriteIds.has(signId);
    if (isFav) {
      await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('sign_id', signId);
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        next.delete(signId);
        return next;
      });
    } else {
      await supabase.from('favorites').insert({ user_id: session.user.id, sign_id: signId });
      setFavoriteIds((prev) => new Set(prev).add(signId));
    }
  }

  // Dois níveis de filtro distintos: type (Letras/Números/Palavras) e,
  // só dentro de Palavras, categoria (Saudações, Cores, etc via sign_categories)
  const filtered = signs
    .filter((s) => s.type === activeType)
    .filter(
      (s) =>
        activeType !== 'word' ||
        !activeCategory ||
        s.sign_categories?.some((sc) => sc.category_id === activeCategory)
    )
    .filter((s) => (onlyFavorites ? favoriteIds.has(s.id) : true))
    .filter((s) => s.label.toLowerCase().includes(search.toLowerCase()));

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
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={() => setOnlyFavorites((v) => !v)}>
            <Heart
              size={20}
              color={onlyFavorites ? Colors.danger : '#9CA3AF'}
              fill={onlyFavorites ? Colors.danger : 'none'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
        >
          {TYPE_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => {
                setActiveType(tab.key);
                setActiveCategory(null);
              }}
              className={`px-5 py-2 rounded-full mr-3 shadow-sm ${
                activeType === tab.key ? 'bg-primary border border-transparent' : 'bg-white border border-gray-200'
              }`}
            >
              <Text className={`font-bold ${activeType === tab.key ? 'text-white' : 'text-gray-600'}`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {activeType === 'word' && (
        <View className="mb-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
          >
            <TouchableOpacity
              onPress={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full mr-2 ${!activeCategory ? 'bg-secondary' : 'bg-gray-100'}`}
            >
              <Text className={`font-medium text-sm ${!activeCategory ? 'text-white' : 'text-gray-600'}`}>
                Todas
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full mr-2 ${
                  activeCategory === cat.id ? 'bg-secondary' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`font-medium text-sm ${
                    activeCategory === cat.id ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
        ) : filtered.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">Nada por aqui ainda.</Text>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {filtered.map((sign) => (
              <TouchableOpacity
                key={sign.id}
                className="w-[48%] bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm items-center"
                activeOpacity={0.7}
                onPress={() => router.push(`/(tabs)/gestuario/${sign.id}`)}
              >
                <TouchableOpacity
                  className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-1.5"
                  onPress={() => toggleFavorite(sign.id)}
                >
                  <Heart
                    size={16}
                    color={favoriteIds.has(sign.id) ? Colors.danger : '#9CA3AF'}
                    fill={favoriteIds.has(sign.id) ? Colors.danger : 'none'}
                  />
                </TouchableOpacity>

                <View className="w-full h-24 bg-gray-100 rounded-2xl items-center justify-center mb-3 overflow-hidden">
                  {sign.media_type === 'image' ? (
                    <Image
                      source={{ uri: sign.media_url }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="contain"
                    />
                  ) : (
                    <Play size={24} color="#9CA3AF" fill="#9CA3AF" />
                  )}
                </View>
                <Text className="font-bold text-gray-900 text-lg">{sign.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

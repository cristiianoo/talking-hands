import { Tabs } from 'expo-router';
import { Home, BookOpen, GraduationCap, Users, Settings } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import TopBar from '../../components/TopBar';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: true, // Ligar o cabeçalho
        header: () => <TopBar />, // Dizer que o cabeçalho é a nossa Top Bar em TODAS as abas!
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color }) => <Home size={24} color={color} /> }} />
      <Tabs.Screen name="aprender" options={{ title: 'Aprender', tabBarIcon: ({ color }) => <GraduationCap size={24} color={color} /> }} />
      <Tabs.Screen name="gestuario" options={{ title: 'Gestuário', tabBarIcon: ({ color }) => <BookOpen size={24} color={color} /> }} />
      <Tabs.Screen name="social" options={{ title: 'Social', tabBarIcon: ({ color }) => <Users size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Definições', tabBarIcon: ({ color }) => <Settings size={24} color={color} /> }} />
    </Tabs>
  );
}
import { Tabs } from 'expo-router';
import { Home, BookOpen, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho superior feio
        tabBarActiveTintColor: '#4CAF50', // A tua cor primária (Verde)
        tabBarInactiveTintColor: '#9CA3AF', // Cinzento quando não selecionado
        tabBarStyle: {
          backgroundColor: '#F9FAFB',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="gestuario"
        options={{
          title: 'Gestuário',
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Definições',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
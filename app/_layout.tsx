import "../global.css";
import { Slot } from "expo-router";

export default function RootLayout() {
  // O <Slot /> é onde o Expo vai renderizar a nossa página 'index.tsx'
  return <Slot />;
}
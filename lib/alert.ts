import { Alert, Platform } from 'react-native';

// Alert.alert é um no-op na web — isto garante feedback em todas as plataformas
export function showAlert(title: string, message?: string) {
  if (Platform.OS === 'web') {
    window.alert(message ? `${title}\n\n${message}` : title);
  } else {
    Alert.alert(title, message);
  }
}

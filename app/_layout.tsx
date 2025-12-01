// app/_layout.tsx
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Tüm ekranlar bu SafeAreaView içinde olacak → her cihazda mükemmel durur */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0F2027' }} edges={['top', 'bottom', 'left', 'right']}>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="quiz" />
          <Stack.Screen name="results" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
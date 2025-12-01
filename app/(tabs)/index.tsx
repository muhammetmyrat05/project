import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [selectedTest, setSelectedTest] = useState<number | null>(null);

  const handleStartQuiz = () => {
    if (name.trim() && group.trim() && selectedTest !== null) {
      router.push({
        pathname: '/quiz',
        params: { name, group, test: selectedTest }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#0F2027' }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Quiz Application</Text>
              <Text style={styles.subtitle}>Choose a test and start</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Class / Group</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your class or group"
                  placeholderTextColor="#94A3B8"
                  value={group}
                  onChangeText={setGroup}
                />
              </View>

              {/* TEST SEÇİMİ */}
              <Text style={[styles.label, { marginTop: 4 }]}>Choose Test</Text>

              <View style={styles.testContainer}>
                {[1, 2, 3].map((test) => (
                  <TouchableOpacity
                    key={test}
                    style={[
                      styles.testButton,
                      selectedTest === test && styles.testButtonSelected
                    ]}
                    onPress={() => setSelectedTest(test)}
                  >
                    <Text style={styles.testButtonText}>Test {test} (50 Questions)</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  (!name.trim() || !group.trim() || selectedTest === null) && styles.buttonDisabled
                ]}
                onPress={handleStartQuiz}
                disabled={!name.trim() || !group.trim() || selectedTest === null}
              >
                <Text style={styles.buttonText}>Start Quiz</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Before Starting</Text>
              <Text style={styles.infoText}>
                • Total 3 tests available{'\n'}
                • Each test contains 50 questions{'\n'}
                • All questions must be answered{'\n'}
                • Results will be shown at the end
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 48 },
  title: { fontSize: 36, fontWeight: '700', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#94A3B8', textAlign: 'center' },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginBottom: 8 },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  testContainer: {
    marginBottom: 20,
  },
  testButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  testButtonSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: { backgroundColor: '#10B981', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { backgroundColor: '#6B7280', opacity: 0.5 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  infoText: { fontSize: 14, color: '#CBD5E1', lineHeight: 24 },
});

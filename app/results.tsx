// app/results.tsx – ŞİFRELİ "Yeni Teste Başla" BUTONU (cyber123)

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { questions as q1, correctAnswers as a1 } from '@/data/test1';
import { questions as q2, correctAnswers as a2 } from '@/data/test2';
import { questions as q3, correctAnswers as a3 } from '@/data/test3';

type OptionKey = 'A' | 'B' | 'C' | 'D';

export default function ResultsScreen() {
  const router = useRouter();
  const { name, group, test, score, total, answers } = useLocalSearchParams();

  const testNumber = test ? parseInt(test as string) : 1;
  const userAnswers: Record<number, OptionKey> = answers ? JSON.parse(answers as string) : {};
  const scoreNum = parseInt(score as string);
  const totalNum = parseInt(total as string);
  const percentage = Math.round((scoreNum / totalNum) * 100);

  const questions = testNumber === 2 ? q2 : testNumber === 3 ? q3 : q1;
  const correctAnswers = testNumber === 2 ? a2 : testNumber === 3 ? a3 : a1;

  // Şifre sistemi
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const CORRECT_PASSWORD = 'cyber123';

  const handleNewTest = () => {
    if (password === CORRECT_PASSWORD) {
      router.replace('/');
    } else {
      Alert.alert('Password incorrect', 'Enter the correct password, please', [{ text: 'OK' }]);
      setPassword('');
    }
  };

  const performance = () => {
    if (percentage >= 90) return { text: "Excellent", color: "#10B981" };
    if (percentage >= 70) return { text: "Good", color: "#22C55E" };
    if (percentage >= 50) return { text: "Fair", color: "#F59E0B" };
    return { text: "Needs Improvement", color: "#EF4444" };
  };

  const getOptionText = (questionId: number, key: OptionKey | undefined) => {
    if (!key) return "— (Unanswered)";
    const q = questions.find(qq => qq.id === questionId);
    return q ? `${key} (${q.options[key]})` : `${key} (?)`;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#0F2027' }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
          {/* Tüm önceki içerik aynı kalır (skor, performans, cevap listesi vs.) */}
          <View style={styles.header}>
            <Text style={styles.title}>Quiz Completed!</Text>
            <View style={styles.studentInfo}>
              <Text style={styles.studentText}>{name} • {group}</Text>
              <Text style={styles.studentText}>Test {testNumber} • {totalNum} Questions</Text>
            </View>
          </View>

          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{percentage}</Text>
              <Text style={styles.scorePercent}>%</Text>
            </View>
          </View>

          <View style={styles.performanceContainer}>
            <View style={[styles.performanceCard, { borderColor: performance().color, backgroundColor: `${performance().color}20` }]}>
              <Text style={[styles.performanceText, { color: performance().color }]}>
                {performance().text}
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Correct</Text>
              <Text style={styles.summaryValueCorrect}>{scoreNum}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Incorrect / Unanswered</Text>
              <Text style={styles.summaryValueWrong}>{totalNum - scoreNum}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryRowLast]}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>{totalNum}</Text>
            </View>
          </View>

          <View style={styles.answersContainer}>
            <Text style={styles.answersTitle}>Answer Control</Text>
            {questions.map((q, index) => {
              const userAnswer = userAnswers[q.id];
              const correct = correctAnswers.find(a => a.questionId === q.id)?.correctAnswer;
              const isCorrect = userAnswer === correct;

              return (
                <View key={q.id} style={[styles.answerItem, isCorrect ? styles.answerCorrect : styles.answerWrong]}>
                  <View style={styles.answerHeader}>
                    <Text style={styles.questionNumber}>Question {index + 1}</Text>
                    {isCorrect ? <Text style={styles.correctIcon}>Correct</Text> : <Text style={styles.wrongIcon}>Incorrect</Text>}
                  </View>
                  <Text style={styles.answerQuestion}>{q.question}</Text>
                  <View style={styles.answerDetails}>
                    <Text style={styles.answerText}>
                      Your answer: <Text style={isCorrect ? styles.correctText : styles.wrongText}>
                        {getOptionText(q.id, userAnswer)}
                      </Text>
                    </Text>
                    {!isCorrect && correct && (
                      <Text style={styles.answerText}>
                        Correct answer: <Text style={styles.correctText}>
                          {getOptionText(q.id, correct)}
                        </Text>
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* ŞİFRELİ BUTON */}
        <View style={styles.fixedButtonContainer}>
          {!showPasswordInput ? (
            <TouchableOpacity
              style={styles.lockedButton}
              onPress={() => setShowPasswordInput(true)}
            >
              <Text style={styles.lockedButtonText}>Start the new test</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.passwordBox}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter Password..."
                placeholderTextColor="#94A3B8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleNewTest}
                autoFocus
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.fullWidthButton} onPress={handleNewTest}>
                  <Text style={styles.fullWidthButtonText}>Enter</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => { 
                    setShowPasswordInput(false); 
                    setPassword(''); 
                  }}
                >
                  <Text style={styles.fullWidthButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  header: { alignItems: 'center', paddingTop: 20 },
  title: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginBottom: 16 },
  studentInfo: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16 },
  studentText: { fontSize: 18, color: '#E2E8F0', textAlign: 'center', fontWeight: '600' },
  scoreContainer: { alignItems: 'center', marginVertical: 30 },
  scoreCircle: { width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(16,185,129,0.2)', borderWidth: 12, borderColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  scoreText: { fontSize: 64, fontWeight: '900', color: '#10B981' },
  scorePercent: { fontSize: 28, color: '#94A3B8', marginTop: -10 },
  performanceContainer: { alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  performanceCard: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 40, minWidth: 260, alignItems: 'center', borderWidth: 2 },
  performanceText: { fontSize: 21, fontWeight: '800' },
  summaryCard: { marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', marginBottom: 30 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  summaryRowLast: { borderBottomWidth: 0 },
  summaryLabel: { fontSize: 17, color: '#94A3B8', fontWeight: '600' },
  summaryValueCorrect: { fontSize: 17, color: '#10B981', fontWeight: '700' },
  summaryValueWrong: { fontSize: 17, color: '#EF4444', fontWeight: '700' },
  summaryValue: { fontSize: 17, color: '#FFFFFF', fontWeight: '700' },
  answersContainer: { marginHorizontal: 20, marginBottom: 20 },
  answersTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 16, textAlign: 'center' },
  answerItem: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  answerCorrect: { borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.12)' },
  answerWrong: { borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.12)' },
  answerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  questionNumber: { fontSize: 15, color: '#94A3B8', fontWeight: '600' },
  correctIcon: { fontSize: 18, color: '#10B981', fontWeight: '800' },
  wrongIcon: { fontSize: 18, color: '#EF4444', fontWeight: '800' },
  answerQuestion: { fontSize: 16, color: '#E2E8F0', marginBottom: 10, lineHeight: 22 },
  answerDetails: { gap: 6 },
  answerText: { fontSize: 15, color: '#CBD5E1' },
  correctText: { color: '#10B981', fontWeight: '700' },
  wrongText: { color: '#EF4444', fontWeight: '700' },

    fixedButtonContainer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    paddingHorizontal: 20, 
    paddingVertical: 20,
    paddingBottom: 50,  // ← iPhone home bar, Samsung gesture bar için güvenli alan
    backgroundColor: 'rgba(15,32,39,0.98)', 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  lockedButton: { 
    backgroundColor: '#10B981', 
    paddingVertical: 18, 
    borderRadius: 16, 
    alignItems: 'center' 
  },
  lockedButtonText: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#FFFFFF' 
  },
  passwordBox: { 
    width: '100%', 
    alignItems: 'center' 
  },
  passwordInput: { 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    width: '100%', 
    padding: 18, 
    borderRadius: 16, 
    color: '#FFFFFF', 
    fontSize: 18, 
    textAlign: 'center', 
    borderWidth: 2, 
    borderColor: '#10B981',
    marginBottom: 16
  },
  buttonRow: { 
    flexDirection: 'row', 
    gap: 12, 
    width: '100%' 
  },
  fullWidthButton: { 
    flex: 1, 
    backgroundColor: '#10B981', 
    paddingVertical: 18, 
    borderRadius: 16, 
    alignItems: 'center' 
  },
  cancelButton: { 
    flex: 1, 
    backgroundColor: '#EF4444', 
    paddingVertical: 18, 
    borderRadius: 16, 
    alignItems: 'center' 
  },
  fullWidthButtonText: { 
    color: '#FFFFFF', 
    fontWeight: '800', 
    fontSize: 18 
  },
  smallButton: { flex: 1, backgroundColor: '#10B981', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  smallButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { questions as q1, correctAnswers as a1 } from '@/data/test1';
import { questions as q2, correctAnswers as a2 } from '@/data/test2';
import { questions as q3, correctAnswers as a3 } from '@/data/test3';

export default function QuizScreen() {
  const router = useRouter();
  const { name, group, test } = useLocalSearchParams();
  const testNumber = test ? parseInt(test as string) : 1;

  const questions = testNumber === 2 ? q2 : testNumber === 3 ? q3 : q1;
  const correctAnswers = testNumber === 2 ? a2 : testNumber === 3 ? a3 : a1;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (showResult) {
      const score = Object.keys(answers).reduce((acc, qId) => {
        const correct = correctAnswers.find(a => a.questionId === parseInt(qId));
        return answers[parseInt(qId)] === correct?.correctAnswer ? acc + 1 : acc;
      }, 0);

      router.replace({
        pathname: '/results',
        params: {
          name,
          group,
          test: testNumber,
          score,
          total: questions.length,
          answers: JSON.stringify(answers),
        },
      });
    }
  }, [showResult]);

  const handleAnswer = (option: 'A' | 'B' | 'C' | 'D') => {
    setSelectedOption(option);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
  };

  const goNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(answers[questions[currentQuestionIndex + 1].id] || null);
    } else if (answeredCount === questions.length) {
      setShowResult(true);
    }
  };

  const goPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(answers[questions[currentQuestionIndex - 1].id] || null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#0F2027' }}>
        <View style={styles.header}>
          <Text style={styles.studentName}>{name}</Text>
          <Text style={styles.studentGroup}>{group} • Test {testNumber}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(answeredCount / questions.length) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>Answered: {answeredCount} / {questions.length}</Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.questionCard}>
            <View style={styles.questionNumber}>
              <Text style={styles.questionNumberText}>Question {currentQuestionIndex + 1}</Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsContainer}>
              {(['A', 'B', 'C', 'D'] as const).map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.optionButtonSelected
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <View style={[styles.optionCircle, selectedOption === option && styles.optionCircleSelected]}>
                    <Text style={[styles.optionLetter, selectedOption === option && styles.optionLetterSelected]}>
                      {option}
                    </Text>
                  </View>
                  <Text style={[styles.optionText, selectedOption === option && styles.optionTextSelected]}>
                    {currentQuestion.options[option]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.answeredInfo}>
              <View style={styles.answeredCard}>
                <Text style={styles.answeredText}>
                  Answered: {answeredCount} / {questions.length}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={[styles.navButton, styles.previousButton, currentQuestionIndex === 0 && styles.navButtonDisabled]} onPress={goPrevious} disabled={currentQuestionIndex === 0}>
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              answeredCount === questions.length ? styles.finishButton : styles.nextButton,
              (!selectedOption && !answers[currentQuestion.id]) && styles.navButtonDisabled
            ]}
            onPress={goNext}
            disabled={(!selectedOption && !answers[currentQuestion.id])}
          >
            <Text style={styles.navButtonText}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  studentName: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  studentGroup: { fontSize: 15, color: '#94A3B8', marginTop: 4, fontWeight: '600' },
  progressContainer: { gap: 10, marginTop: 16 },
  progressBar: { height: 10, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 8 },
  progressText: { fontSize: 13, color: '#94A3B8', textAlign: 'center', fontWeight: '600' },
  content: { flex: 1 },
  scrollContent: { 
  paddingHorizontal: 20, 
  paddingBottom: 150   // ← alttaki butonlara yer aç
  },
  questionCard: { backgroundColor: 'rgba(255,255,255,0.09)', borderRadius: 20, padding: 24, marginVertical: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  questionNumber: { backgroundColor: '#10B981', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginBottom: 16 },
  questionNumberText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  questionText: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', lineHeight: 28 },
  optionsContainer: { gap: 14, marginTop: 20 },
  optionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 18, borderWidth: 2, borderColor: 'rgba(255,255,255,0.12)' },
  optionButtonSelected: { backgroundColor: 'rgba(16,185,129,0.25)', borderColor: '#10B981' },
  optionCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  optionCircleSelected: { backgroundColor: '#10B981' },
  optionLetter: { fontSize: 20, fontWeight: '800', color: '#94A3B8' },
  optionLetterSelected: { color: '#FFFFFF' },
  optionText: { flex: 1, fontSize: 16.5, color: '#E2E8F0', lineHeight: 24 },
  optionTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  answeredInfo: { marginTop: 20, alignSelf: 'center' },
  answeredCard: { backgroundColor: 'rgba(16,185,129,0.15)', borderColor: '#10B981', borderWidth: 2, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 32, minWidth: 180, alignItems: 'center' },
  answeredText: { fontSize: 17, fontWeight: '800', color: '#10B981' },
  navigationButtons: { 
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row',
  paddingHorizontal: 20,
  paddingVertical: 16,
  paddingBottom: 50,  // ← BURASI ÇOK ÖNEMLİ!
  gap: 14,
  backgroundColor: 'rgba(15,32,39,0.98)',
  borderTopWidth: 1,
  borderTopColor: 'rgba(255,255,255,0.1)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 10,
},
navButton: { flex: 1, paddingVertical: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  previousButton: { backgroundColor: 'rgba(255,255,255,0.12)' },
  nextButton: { backgroundColor: '#3B82F6' },
  finishButton: { backgroundColor: '#10B981' },
  navButtonDisabled: { opacity: 0.4 },
  navButtonText: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
});
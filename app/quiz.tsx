import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { questions } from '@/data/quizData';

type OptionKey = 'A' | 'B' | 'C' | 'D';

export default function QuizScreen() {
  const router = useRouter();
  const { name, group } = useLocalSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, OptionKey>>({});

  const handleAnswer = (answer: OptionKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    router.push({
      pathname: '/results',
      params: {
        name,
        group,
        answers: JSON.stringify(userAnswers)
      }
    });
  };

  const question = questions[currentQuestion];
  const selectedAnswer = userAnswers[question.id];
  const answeredCount = Object.keys(userAnswers).length;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{name}</Text>
            <Text style={styles.studentGroup}>{group}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              Soru {currentQuestion + 1} / {questions.length}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.questionCard}>
            <View style={styles.questionNumber}>
              <Text style={styles.questionNumberText}>
                Soru {currentQuestion + 1}
              </Text>
            </View>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          <View style={styles.optionsContainer}>
            {(['A', 'B', 'C', 'D'] as OptionKey[]).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.optionButtonSelected
                ]}
                onPress={() => handleAnswer(option)}
              >
                <View style={[
                  styles.optionCircle,
                  selectedAnswer === option && styles.optionCircleSelected
                ]}>
                  <Text style={[
                    styles.optionLetter,
                    selectedAnswer === option && styles.optionLetterSelected
                  ]}>
                    {option}
                  </Text>
                </View>
                <Text style={[
                  styles.optionText,
                  selectedAnswer === option && styles.optionTextSelected
                ]}>
                  {question.options[option]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.answeredInfo}>
            <Text style={styles.answeredText}>
              Cevaplanmış: {answeredCount} / {questions.length}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.previousButton,
              currentQuestion === 0 && styles.navButtonDisabled
            ]}
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <Text style={styles.navButtonText}>Önceki</Text>
          </TouchableOpacity>

          {currentQuestion < questions.length - 1 ? (
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                !selectedAnswer && styles.navButtonDisabled
              ]}
              onPress={handleNext}
              disabled={!selectedAnswer}
            >
              <Text style={styles.navButtonText}>Sonraki</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.finishButton,
                answeredCount < questions.length && styles.navButtonDisabled
              ]}
              onPress={handleFinish}
              disabled={answeredCount < questions.length}
            >
              <Text style={styles.navButtonText}>Bitir</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  studentInfo: {
    marginBottom: 16,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  studentGroup: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  questionNumber: {
    backgroundColor: '#10B981',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  questionNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10B981',
  },
  optionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionCircleSelected: {
    backgroundColor: '#10B981',
  },
  optionLetter: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94A3B8',
  },
  optionLetterSelected: {
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#CBD5E1',
    lineHeight: 24,
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  answeredInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    alignItems: 'center',
  },
  answeredText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: 'rgba(15, 32, 39, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  nextButton: {
    backgroundColor: '#3B82F6',
  },
  finishButton: {
    backgroundColor: '#10B981',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

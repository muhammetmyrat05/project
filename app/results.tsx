import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { questions, correctAnswers } from '@/data/quizData';
import { CheckCircle, XCircle } from 'lucide-react-native';

type OptionKey = 'A' | 'B' | 'C' | 'D';

export default function ResultsScreen() {
  const router = useRouter();
  const { name, group, answers: answersString } = useLocalSearchParams();
  const userAnswers = JSON.parse(answersString as string) as Record<number, OptionKey>;

  const results = questions.map(question => {
    const correctAnswer = correctAnswers.find(a => a.questionId === question.id)?.correctAnswer;
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer === correctAnswer;

    return {
      question,
      userAnswer,
      correctAnswer,
      isCorrect
    };
  });

  const correctCount = results.filter(r => r.isCorrect).length;
  const incorrectCount = results.length - correctCount;
  const percentage = Math.round((correctCount / results.length) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { text: 'Mükemmel!', color: '#10B981' };
    if (percentage >= 75) return { text: 'Çok İyi!', color: '#3B82F6' };
    if (percentage >= 60) return { text: 'İyi', color: '#F59E0B' };
    if (percentage >= 50) return { text: 'Geçer', color: '#F59E0B' };
    return { text: 'Geliştirilmeli', color: '#EF4444' };
  };

  const grade = getGrade();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Test Sonuçları</Text>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{name}</Text>
              <Text style={styles.studentGroup}>{group}</Text>
            </View>
          </View>

          <View style={styles.scoreCard}>
            <View style={[styles.scoreCircle, { borderColor: grade.color }]}>
              <Text style={[styles.scorePercentage, { color: grade.color }]}>
                %{percentage}
              </Text>
              <Text style={[styles.scoreGrade, { color: grade.color }]}>
                {grade.text}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <CheckCircle size={24} color="#10B981" />
                </View>
                <Text style={styles.statValue}>{correctCount}</Text>
                <Text style={styles.statLabel}>Doğru</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                  <XCircle size={24} color="#EF4444" />
                </View>
                <Text style={styles.statValue}>{incorrectCount}</Text>
                <Text style={styles.statLabel}>Yanlış</Text>
              </View>
            </View>
          </View>

          <View style={styles.answersSection}>
            <Text style={styles.sectionTitle}>Cevaplarınız</Text>
            {results.map((result, index) => (
              <View
                key={result.question.id}
                style={[
                  styles.answerCard,
                  result.isCorrect ? styles.answerCardCorrect : styles.answerCardIncorrect
                ]}
              >
                <View style={styles.answerHeader}>
                  <View style={styles.answerHeaderLeft}>
                    <Text style={styles.questionNumber}>Soru {index + 1}</Text>
                    {result.isCorrect ? (
                      <CheckCircle size={20} color="#10B981" />
                    ) : (
                      <XCircle size={20} color="#EF4444" />
                    )}
                  </View>
                </View>

                <Text style={styles.answerQuestion}>
                  {result.question.question}
                </Text>

                <View style={styles.answerDetails}>
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Sizin Cevabınız:</Text>
                    <View style={[
                      styles.answerBadge,
                      result.isCorrect ? styles.answerBadgeCorrect : styles.answerBadgeIncorrect
                    ]}>
                      <Text style={[
                        styles.answerBadgeText,
                        result.isCorrect ? styles.answerBadgeTextCorrect : styles.answerBadgeTextIncorrect
                      ]}>
                        {result.userAnswer} - {result.question.options[result.userAnswer]}
                      </Text>
                    </View>
                  </View>

                  {!result.isCorrect && (
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>Doğru Cevap:</Text>
                      <View style={[styles.answerBadge, styles.answerBadgeCorrect]}>
                        <Text style={[styles.answerBadgeText, styles.answerBadgeTextCorrect]}>
                          {result.correctAnswer} - {result.question.options[result.correctAnswer!]}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.restartButtonText}>Yeni Test Başlat</Text>
          </TouchableOpacity>
        </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  studentInfo: {
    alignItems: 'center',
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  studentGroup: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  scoreCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: '700',
  },
  scoreGrade: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  answersSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  answerCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  answerCardCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  answerCardIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  answerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  answerQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 24,
  },
  answerDetails: {
    gap: 8,
  },
  answerRow: {
    gap: 8,
  },
  answerLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  answerBadge: {
    padding: 10,
    borderRadius: 8,
  },
  answerBadgeCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  answerBadgeIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  answerBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  answerBadgeTextCorrect: {
    color: '#10B981',
  },
  answerBadgeTextIncorrect: {
    color: '#EF4444',
  },
  restartButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

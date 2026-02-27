import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { QUIZ_QUESTIONS, FACULTIES } from '../data/appData';

export default function QuizScreen({ navigation }) {
  const [current, setCurrent]       = useState(0);
  const [answers, setAnswers]       = useState([]);
  const [selected, setSelected]     = useState(null);
  const [result, setResult]         = useState(null);

  const q        = QUIZ_QUESTIONS[current];
  const progress = ((current) / QUIZ_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, q.options[selected].faculties];

    if (current < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      const scores = {};
      newAnswers.flat().forEach(fid => { scores[fid] = (scores[fid] || 0) + 1; });
      const topId  = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(FACULTIES.find(f => f.id === topId));
    }
  };

  const reset = () => {
    setCurrent(0); setAnswers([]); setSelected(null); setResult(null);
  };

  /* ── Result screen ── */
  if (result) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.resultWrap}>
        <Text style={styles.resultEmoji}>🎉</Text>
        <Text style={styles.resultTitle}>Your Perfect Match!</Text>
        <Text style={styles.resultSub}>Based on your answers, we recommend:</Text>

        <View style={[styles.resultCard, { borderTopColor: result.color, borderTopWidth: 6 }]}>
          <Text style={styles.resultFacIcon}>{result.icon}</Text>
          <Text style={styles.resultFacName}>{result.name}</Text>
          <Text style={styles.resultFacDesc}>{result.description}</Text>

          <View style={styles.divider} />
          <Text style={styles.topLabel}>Top Recommended Courses:</Text>
          {result.courses.slice(0, 3).map(c => (
            <View key={c.id} style={styles.courseRow}>
              <View style={[styles.dot, { backgroundColor: result.color }]} />
              <Text style={styles.courseRowText}>{c.name}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.exploreBtn, { backgroundColor: result.color }]}
          onPress={() => { setResult(null); navigation.navigate('HomeTab', { screen: 'Faculty', params: { faculty: result } }); }}>
          <Text style={styles.exploreBtnText}>Explore {result.icon} {result.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.retakeBtn} onPress={reset}>
          <Text style={styles.retakeBtnText}>↺  Retake Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  /* ── Question screen ── */
  return (
    <View style={styles.container}>

      {/* Progress */}
      <View style={styles.progressWrap}>
        <Text style={styles.progressLabel}>Question {current + 1} of {QUIZ_QUESTIONS.length}</Text>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.quizContent}>

        <View style={styles.questionCard}>
          <Text style={styles.qNum}>Q{current + 1}</Text>
          <Text style={styles.qText}>{q.question}</Text>
        </View>

        <View style={styles.optionsWrap}>
          {q.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.optionCard, selected === i && styles.optionSelected]}
              onPress={() => setSelected(i)}
              activeOpacity={0.85}>
              <View style={[styles.optCircle, selected === i && styles.optCircleSelected]}>
                <Text style={[styles.optLetter, selected === i && styles.optLetterSelected]}>
                  {String.fromCharCode(65 + i)}
                </Text>
              </View>
              <Text style={[styles.optText, selected === i && styles.optTextSelected]}>
                {opt.text}
              </Text>
              {selected === i && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Next button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.nextBtn, selected === null && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selected === null}>
          <Text style={styles.nextBtnText}>
            {current === QUIZ_QUESTIONS.length - 1 ? '🎯  See My Results' : 'Next Question →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },

  progressWrap: {
    padding: SPACING.lg, paddingBottom: SPACING.sm,
    backgroundColor: COLORS.cardBg, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  progressLabel: { fontSize: 12, color: COLORS.midGray, fontWeight: '600', marginBottom: SPACING.sm },
  progressBg: { height: 6, backgroundColor: COLORS.lightGray, borderRadius: RADIUS.full, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.accent, borderRadius: RADIUS.full },

  quizContent: { padding: SPACING.lg, paddingBottom: 120 },
  questionCard: { backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.lg },
  qNum: { color: COLORS.accent, fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: SPACING.sm },
  qText: { color: COLORS.white, fontSize: 20, fontWeight: '700', lineHeight: 30 },

  optionsWrap: { gap: 12 },
  optionCard: {
    backgroundColor: COLORS.cardBg, borderRadius: RADIUS.md, padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: COLORS.border,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  optionSelected: { borderColor: COLORS.accent, backgroundColor: '#E9456008' },
  optCircle: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.lightGray,
    justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md, flexShrink: 0,
  },
  optCircleSelected: { backgroundColor: COLORS.accent },
  optLetter: { fontSize: 14, fontWeight: '800', color: COLORS.midGray },
  optLetterSelected: { color: COLORS.white },
  optText: { flex: 1, fontSize: 14, color: COLORS.darkGray, lineHeight: 21, fontWeight: '500' },
  optTextSelected: { color: COLORS.primary, fontWeight: '700' },
  checkmark: { fontSize: 18, color: COLORS.accent, marginLeft: SPACING.sm },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: SPACING.lg, backgroundColor: COLORS.cardBg,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  nextBtn: {
    backgroundColor: COLORS.accent, borderRadius: RADIUS.full, paddingVertical: SPACING.md,
    alignItems: 'center', elevation: 5,
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10,
  },
  nextBtnDisabled: { backgroundColor: COLORS.midGray, elevation: 0, shadowOpacity: 0 },
  nextBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '800' },

  /* Result */
  resultWrap: { padding: SPACING.lg, paddingBottom: SPACING.xxl, alignItems: 'center', paddingTop: 48 },
  resultEmoji: { fontSize: 72, marginBottom: SPACING.md },
  resultTitle: { fontSize: 28, fontWeight: '900', color: COLORS.primary, marginBottom: SPACING.sm },
  resultSub: { fontSize: 14, color: COLORS.midGray, textAlign: 'center', marginBottom: SPACING.lg },
  resultCard: {
    backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg,
    width: '100%', alignItems: 'center', marginBottom: SPACING.lg,
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 16,
  },
  resultFacIcon: { fontSize: 52, marginBottom: SPACING.sm },
  resultFacName: { fontSize: 18, fontWeight: '800', color: COLORS.primary, textAlign: 'center', marginBottom: SPACING.sm, lineHeight: 26 },
  resultFacDesc: { fontSize: 13, color: COLORS.darkGray, textAlign: 'center', lineHeight: 20 },
  divider: { width: '100%', height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.md },
  topLabel: { fontSize: 13, fontWeight: '700', color: COLORS.primary, alignSelf: 'flex-start', marginBottom: SPACING.sm },
  courseRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: SPACING.sm },
  courseRowText: { fontSize: 13, color: COLORS.darkGray },
  exploreBtn: {
    width: '100%', borderRadius: RADIUS.full, paddingVertical: SPACING.md,
    alignItems: 'center', marginBottom: SPACING.md, elevation: 4,
  },
  exploreBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  retakeBtn: { paddingVertical: SPACING.md, alignItems: 'center' },
  retakeBtnText: { color: COLORS.midGray, fontSize: 14, fontWeight: '600' },
});

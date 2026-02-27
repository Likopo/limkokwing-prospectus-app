import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Alert,
  Linking,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

const MAX_RATING = 6;

export default function CourseDetailScreen({ route, navigation }) {
  const { course, facultyColor } = route.params;

  const [rating, setRating] = useState(0);
  const [totalPresses, setTotalPresses] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Animations
  const scaleAnim   = useRef(new Animated.Value(1)).current;
  const shakeAnim   = useRef(new Animated.Value(0)).current;
  const pulseAnim   = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  /* ── helpers ── */
  const animateProgress = (toVal) => {
    Animated.timing(progressAnim, {
      toValue: toVal,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  const handleRate = () => {
    if (rating >= MAX_RATING) {
      // shake & alert
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10,  duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8,   duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8,  duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0,   duration: 50, useNativeDriver: true }),
      ]).start();
      Alert.alert('Maximum Rating Reached!', '⭐ This course has already received the maximum rating of 6.', [{ text: 'OK' }]);
      return;
    }

    const next = rating + 1;
    setRating(next);
    setTotalPresses(p => p + 1);
    animateProgress(next / MAX_RATING);

    // bounce stars
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.25, useNativeDriver: true, speed: 50 }),
      Animated.spring(scaleAnim, { toValue: 1,    useNativeDriver: true, speed: 30 }),
    ]).start();

    if (next === MAX_RATING) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,   duration: 500, useNativeDriver: true }),
        ]),
        { iterations: 4 },
      ).start();
    }
  };

  const getRatingLabel = () => {
    const labels = ['Tap the button below to rate this course', 'Getting Started 🌱',
      'Looks Interesting 👀', 'Pretty Good! 👍', 'Really Great! 🔥', 'Almost Perfect! 💫', 'PERFECT SCORE! 🏆'];
    return labels[rating] || '';
  };

  /* ── Progress bar width ── */
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── Hero image ── */}
      <View style={styles.imageWrap}>
        <Image source={{ uri: course.image }} style={styles.heroImg} resizeMode="cover" />
        <View style={styles.imgOverlay} />
        <View style={styles.heroContent}>
          <View style={[styles.lvlBadge, { backgroundColor: facultyColor }]}>
            <Text style={styles.lvlText}>{course.level}</Text>
          </View>
          <Text style={styles.heroTitle}>{course.name}</Text>
          <Text style={styles.heroDuration}>⏱  Duration: {course.duration}</Text>
        </View>
      </View>

      <View style={styles.body}>

        {/* Tags */}
        <View style={styles.tagRow}>
          {course.tags.map(t => (
            <View key={t} style={[styles.tag, { borderColor: facultyColor }]}>
              <Text style={[styles.tagText, { color: facultyColor }]}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About This Programme</Text>
          <Text style={styles.cardText}>{course.description}</Text>
        </View>

        {/* Video */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📹  Course Preview Video</Text>
          {!showVideo ? (
            <TouchableOpacity
              style={[styles.videoThumb, { borderColor: facultyColor + '60', backgroundColor: facultyColor + '10' }]}
              onPress={() => setShowVideo(true)}
              activeOpacity={0.8}>
              <View style={[styles.playBtn, { backgroundColor: facultyColor }]}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
              <Text style={[styles.videoLabel, { color: facultyColor }]}>Tap to preview this course</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.videoBox}>
              <Text style={styles.videoBoxTitle}>🎬  Course Video URL:</Text>
              <Text style={[styles.videoUrl, { color: facultyColor }]} onPress={() => Linking.openURL(course.videoUrl)}>
                {course.videoUrl}
              </Text>
              <Text style={styles.videoHint}>
                💡  To play this video natively, install{' '}
                <Text style={{ fontWeight: '700' }}>expo-av</Text> and replace this component.
              </Text>
              <TouchableOpacity onPress={() => setShowVideo(false)}>
                <Text style={[styles.closeVideo, { color: facultyColor }]}>✕  Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ══ Rating Card ══ */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Rate This Course</Text>
          <Text style={styles.ratingSubtitle}>{getRatingLabel()}</Text>

          {/* Stars */}
          <Animated.View style={[styles.starsRow, { transform: [{ scale: scaleAnim }, { translateX: shakeAnim }] }]}>
            {Array.from({ length: MAX_RATING }).map((_, i) => (
              <Animated.Text
                key={i}
                style={[
                  styles.star,
                  {
                    color: i < rating ? COLORS.starFilled : COLORS.starEmpty,
                    transform: [{ scale: i < rating ? pulseAnim : 1 }],
                  },
                ]}>
                ★
              </Animated.Text>
            ))}
          </Animated.View>

          {/* Score */}
          <View style={[styles.scoreBox, { borderColor: rating > 0 ? facultyColor : COLORS.border }]}>
            <Text style={[styles.scoreNum, { color: rating > 0 ? facultyColor : COLORS.midGray }]}>
              {rating}
            </Text>
            <Text style={styles.scoreMax}>/ {MAX_RATING}</Text>
          </View>

          <Text style={styles.ratedTimes}>
            You have rated this course {totalPresses} time{totalPresses !== 1 ? 's' : ''}
          </Text>

          {/* Rate button */}
          <TouchableOpacity
            style={[styles.rateBtn, { backgroundColor: rating >= MAX_RATING ? COLORS.midGray : facultyColor }]}
            onPress={handleRate}
            activeOpacity={0.85}>
            <Text style={styles.rateBtnText}>
              {rating === 0
                ? '⭐  Rate This Course'
                : rating >= MAX_RATING
                ? '🏆  Maximum Rating Reached!'
                : `⭐  Rate Again  (${rating} / ${MAX_RATING})`}
            </Text>
          </TouchableOpacity>

          {/* Progress bar */}
          <View style={styles.progressBg}>
            <Animated.View style={[styles.progressFill, { width: progressWidth, backgroundColor: facultyColor }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>0</Text>
            <Text style={styles.progressLabel}>Max: {MAX_RATING}</Text>
          </View>
        </View>

        {/* Entry Requirements */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋  Entry Requirements</Text>
          <Text style={styles.cardText}>
            {course.level === 'Degree'
              ? '• Minimum 4 C grades and 2 D passes (COSC/LGCSE)\n• C grade or better in relevant subject\n• Diploma in relevant field from recognised institution'
              : '• Minimum 3 C grades and 2 D passes (COSC/LGCSE)\n• At least a D in English Language\n• Portfolio submission may be required for creative programmes'}
          </Text>
        </View>

        {/* Back button */}
        <TouchableOpacity
          style={[styles.backBtn, { borderColor: facultyColor }]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.backBtnText, { color: facultyColor }]}>← Back to Courses</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },

  imageWrap: { height: 280, position: 'relative' },
  heroImg: { width: '100%', height: 280 },
  imgOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 190,
    backgroundColor: 'rgba(26,26,46,0.75)',
  },
  heroContent: { position: 'absolute', bottom: SPACING.lg, left: SPACING.lg, right: SPACING.lg },
  lvlBadge: { alignSelf: 'flex-start', borderRadius: RADIUS.full, paddingHorizontal: 12, paddingVertical: 4, marginBottom: SPACING.sm },
  lvlText: { color: COLORS.white, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  heroTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', lineHeight: 28, marginBottom: 4 },
  heroDuration: { color: 'rgba(255,255,255,0.75)', fontSize: 13 },

  body: { padding: SPACING.lg, paddingBottom: SPACING.xxl },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: SPACING.md },
  tag: { borderWidth: 1.5, borderRadius: RADIUS.full, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: { fontSize: 12, fontWeight: '600' },

  card: {
    backgroundColor: COLORS.cardBg, borderRadius: RADIUS.md, padding: SPACING.md,
    marginBottom: SPACING.md, elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8,
  },
  cardTitle: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginBottom: SPACING.sm },
  cardText: { fontSize: 14, color: COLORS.darkGray, lineHeight: 22 },

  videoThumb: {
    height: 160, borderRadius: RADIUS.md, borderWidth: 1.5, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center', gap: 12,
  },
  playBtn: {
    width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 6,
  },
  playIcon: { color: COLORS.white, fontSize: 22, marginLeft: 4 },
  videoLabel: { fontSize: 13, fontWeight: '600' },
  videoBox: { backgroundColor: COLORS.lightGray, borderRadius: RADIUS.sm, padding: SPACING.md, gap: 8 },
  videoBoxTitle: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  videoUrl: { fontSize: 12, textDecorationLine: 'underline' },
  videoHint: { fontSize: 12, color: COLORS.midGray, fontStyle: 'italic' },
  closeVideo: { fontSize: 13, fontWeight: '700', marginTop: 4 },

  /* Rating */
  ratingCard: {
    backgroundColor: COLORS.cardBg, borderRadius: RADIUS.lg, padding: SPACING.lg,
    marginBottom: SPACING.md, alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.09, shadowRadius: 12,
  },
  ratingTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primary, marginBottom: 4 },
  ratingSubtitle: { fontSize: 13, color: COLORS.midGray, marginBottom: SPACING.md, textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 6, marginBottom: SPACING.md },
  star: { fontSize: 38 },
  scoreBox: {
    flexDirection: 'row', alignItems: 'baseline', borderWidth: 2,
    borderRadius: RADIUS.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, marginBottom: SPACING.sm,
  },
  scoreNum: { fontSize: 44, fontWeight: '900', lineHeight: 54 },
  scoreMax: { fontSize: 18, color: COLORS.midGray, fontWeight: '600', marginLeft: 4 },
  ratedTimes: { fontSize: 12, color: COLORS.midGray, marginBottom: SPACING.md },
  rateBtn: {
    borderRadius: RADIUS.full, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md,
    marginBottom: SPACING.md, elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.18, shadowRadius: 8,
    minWidth: 240, alignItems: 'center',
  },
  rateBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  progressBg: {
    width: '100%', height: 8, backgroundColor: COLORS.lightGray, borderRadius: RADIUS.full, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: RADIUS.full },
  progressLabels: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  progressLabel: { fontSize: 11, color: COLORS.midGray },

  backBtn: { borderWidth: 2, borderRadius: RADIUS.full, paddingVertical: SPACING.md, alignItems: 'center', marginTop: SPACING.sm },
  backBtnText: { fontSize: 14, fontWeight: '700' },
});

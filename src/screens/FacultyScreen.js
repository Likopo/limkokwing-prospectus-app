import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function FacultyScreen({ route, navigation }) {
  const { faculty } = route.params;

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: faculty.color }]}>
        <Text style={styles.headerIcon}>{faculty.icon}</Text>
        <Text style={styles.headerTitle}>{faculty.name}</Text>
        <Text style={styles.headerDesc}>{faculty.description}</Text>
        <View style={styles.statsRow}>
          {[
            { num: faculty.courses.length, label: 'Courses' },
            { num: faculty.courses.filter(c => c.level === 'Degree').length, label: 'Degrees' },
            { num: faculty.courses.filter(c => c.level === 'Diploma').length, label: 'Diplomas' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <View style={styles.statItem}>
                <Text style={styles.statNum}>{s.num}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              {i < arr.length - 1 && <View style={styles.statDiv} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* ── Courses ── */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.listLabel}>All Programmes</Text>

        {faculty.courses.map(course => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => navigation.navigate('CourseDetail', { course, facultyColor: faculty.color })}
            activeOpacity={0.88}>

            <Image source={{ uri: course.image }} style={styles.courseImg} resizeMode="cover" />
            <View style={styles.imgOverlay} />

            {/* level badge */}
            <View style={[styles.levelBadge, { backgroundColor: faculty.color }]}>
              <Text style={styles.levelBadgeText}>{course.level}</Text>
            </View>

            <View style={styles.courseBody}>
              <View style={styles.tagRow}>
                {course.tags.slice(0, 2).map(t => (
                  <View key={t} style={styles.tag}>
                    <Text style={styles.tagText}>{t}</Text>
                  </View>
                ))}
                <Text style={styles.duration}>⏱ {course.duration}</Text>
              </View>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDesc} numberOfLines={2}>{course.description}</Text>
              <View style={styles.courseFooter}>
                <Text style={[styles.viewMore, { color: faculty.color }]}>
                  View Details & Rate →
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },

  header: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  headerIcon: { fontSize: 48, marginBottom: SPACING.sm },
  headerTitle: {
    color: COLORS.white, fontSize: 17, fontWeight: '800',
    textAlign: 'center', marginBottom: SPACING.sm, lineHeight: 25,
  },
  headerDesc: {
    color: 'rgba(255,255,255,0.8)', fontSize: 13,
    textAlign: 'center', lineHeight: 20, marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  statItem: { alignItems: 'center', paddingHorizontal: SPACING.lg },
  statNum: { color: COLORS.white, fontSize: 22, fontWeight: '900' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' },
  statDiv: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: 4 },

  list: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  listLabel: { fontSize: 16, fontWeight: '800', color: COLORS.primary, marginBottom: SPACING.md },

  courseCard: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.cardBg,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  courseImg: { width: '100%', height: 175 },
  imgOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 175,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  levelBadge: {
    position: 'absolute', top: 14, right: 14,
    borderRadius: RADIUS.full, paddingHorizontal: 12, paddingVertical: 4,
  },
  levelBadgeText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },

  courseBody: { padding: SPACING.md },
  tagRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm, flexWrap: 'wrap', gap: 6 },
  tag: { backgroundColor: COLORS.lightGray, borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 3 },
  tagText: { fontSize: 10, color: COLORS.darkGray, fontWeight: '600' },
  duration: { fontSize: 11, color: COLORS.midGray, marginLeft: 'auto' },
  courseName: {
    fontSize: 16, fontWeight: '800', color: COLORS.primary,
    marginBottom: 4, lineHeight: 22,
  },
  courseDesc: { fontSize: 13, color: COLORS.darkGray, lineHeight: 19, marginBottom: SPACING.md },
  courseFooter: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: SPACING.sm },
  viewMore: { fontSize: 13, fontWeight: '700' },
});

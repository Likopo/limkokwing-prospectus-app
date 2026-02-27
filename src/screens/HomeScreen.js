import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING, RADIUS } from '../theme';
import { FACULTIES } from '../data/appData';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero ── */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🏆  Lesotho's Most Award-Winning University</Text>
          </View>
          <Text style={styles.heroTitle}>LIMKOKWING</Text>
          <Text style={styles.heroSubtitle}>UNIVERSITY OF CREATIVE TECHNOLOGY</Text>
          <Text style={styles.heroTagline}>
            30,000+ creative minds  ·  150+ countries  ·  3 continents
          </Text>
          <TouchableOpacity
            style={styles.quizBtn}
            onPress={() => navigation.navigate('Quiz')}
            activeOpacity={0.85}>
            <Text style={styles.quizBtnText}>🎯  Find Your Perfect Course</Text>
          </TouchableOpacity>
        </View>

        {/* ── Faculties ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Faculties</Text>
          <Text style={styles.sectionSub}>
            Explore {FACULTIES.length} faculties and world-class programmes
          </Text>

          {FACULTIES.map(faculty => (
            <TouchableOpacity
              key={faculty.id}
              style={[styles.facultyCard, { borderLeftColor: faculty.color }]}
              onPress={() => navigation.navigate('Faculty', { faculty })}
              activeOpacity={0.85}>
              <View style={[styles.iconWrap, { backgroundColor: faculty.color + '22' }]}>
                <Text style={styles.icon}>{faculty.icon}</Text>
              </View>
              <View style={styles.facultyInfo}>
                <Text style={styles.facultyName}>{faculty.name}</Text>
                <Text style={styles.facultyDesc} numberOfLines={2}>
                  {faculty.description}
                </Text>
                <View style={styles.facultyFooter}>
                  <View style={[styles.chip, { backgroundColor: faculty.color + '18' }]}>
                    <Text style={[styles.chipText, { color: faculty.color }]}>
                      {faculty.courses.length} Courses
                    </Text>
                  </View>
                  <Text style={styles.arrow}>Explore →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Quiz CTA ── */}
        <TouchableOpacity
          style={styles.ctaBanner}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.9}>
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Not sure which course suits you?</Text>
            <Text style={styles.ctaSub}>
              Take our 5-minute Career Guide Quiz for a personalised recommendation.
            </Text>
          </View>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>📍  Moshoeshoe Road, Maseru Central, Lesotho</Text>
          <Text style={styles.footerText}>📞  +266 2231 5767  ·  Toll Free: 80022066</Text>
          <Text style={styles.footerText}>🌐  www.limkokwing.ac.ls</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },

  /* hero */
  hero: {
    backgroundColor: COLORS.primary,
    paddingTop: 56,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  heroBadge: {
    backgroundColor: '#E9456022',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E9456050',
  },
  heroBadgeText: { color: COLORS.accent, fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
  heroTitle: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 5,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: COLORS.midGray,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  heroTagline: {
    color: COLORS.midGray,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  quizBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    elevation: 6,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  quizBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },

  /* section */
  section: { padding: SPACING.lg },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: COLORS.primary, marginBottom: 4 },
  sectionSub: { fontSize: 13, color: COLORS.midGray, marginBottom: SPACING.lg },

  /* faculty card */
  facultyCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: { fontSize: 26 },
  facultyInfo: { flex: 1 },
  facultyName: { fontSize: 14, fontWeight: '700', color: COLORS.primary, marginBottom: 4, lineHeight: 20 },
  facultyDesc: { fontSize: 12, color: COLORS.midGray, lineHeight: 18, marginBottom: SPACING.sm },
  facultyFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chip: { borderRadius: RADIUS.full, paddingHorizontal: SPACING.sm, paddingVertical: 3 },
  chipText: { fontSize: 11, fontWeight: '600' },
  arrow: { fontSize: 12, color: COLORS.accent, fontWeight: '700' },

  /* CTA */
  ctaBanner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    elevation: 4,
  },
  ctaTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  ctaSub: { color: COLORS.midGray, fontSize: 12, lineHeight: 18 },
  ctaArrow: { color: COLORS.accent, fontSize: 28, fontWeight: '900', marginLeft: SPACING.md },

  /* footer */
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 48,
  },
  footerText: { fontSize: 12, color: COLORS.midGray, marginBottom: 4, lineHeight: 20 },
});

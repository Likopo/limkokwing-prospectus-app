# 🎓 Limkokwing University Prospectus App (Expo)

A React Native **Expo** app for Limkokwing University of Creative Technology.

---

## ✅ Requirements

- **Node.js** v18+ (you have v24 ✅)
- **Expo Go** app on your phone  
  → Android: https://play.google.com/store/apps/details?id=host.exp.exponent  
  → iOS: https://apps.apple.com/app/expo-go/id982107779

---

## 🚀 How to Run (3 steps)

### Step 1 — Install dependencies
Open a terminal in this folder and run:

```bash
npm install
```

### Step 2 — Start the Expo dev server

```bash
npx expo start
```

This will show a **QR code** in your terminal.

### Step 3 — Open on your device

- **Android phone:** Open the **Expo Go** app → tap "Scan QR Code" → scan
- **iPhone:** Open the **Camera app** → scan the QR code → tap the notification
- **Android emulator:** Press `a` in the terminal (Android Studio must be running)
- **iOS simulator (Mac only):** Press `i` in the terminal

> **That's it!** The app will load on your device.

---

## 📁 Project Structure

```
LimkokwingExpo/
├── App.js                          ← Navigation root
├── expo-entry.js                   ← Expo entry point
├── app.json                        ← Expo config
├── package.json
├── babel.config.js
└── src/
    ├── data/
    │   └── appData.js              ← All 5 faculties × 5 courses + quiz data
    ├── screens/
    │   ├── HomeScreen.js           ← Faculty list + hero
    │   ├── FacultyScreen.js        ← Courses under a faculty
    │   ├── CourseDetailScreen.js   ← Course info + ⭐ rating system
    │   └── QuizScreen.js          ← Career guide quiz
    └── theme/
        └── index.js               ← Colors, spacing, radii
```

---

## 🏫 Faculties & Courses

| # | Faculty | Courses |
|---|---------|---------|
| 1 | 🎨 Design Innovation | Creative Advertising, Graphic Design, Fashion, Interior, Product Design |
| 2 | 📡 Communication, Media & Broadcasting | Prof. Communication, Broadcasting & Journalism, TV & Film, PR, Journalism |
| 3 | 💼 Business & Globalization | Int'l Business, Entrepreneurship, HRM, Business Mgmt, Marketing |
| 4 | 🏛️ Architecture & Built Environment | Architectural Technology, Urban Planning, Landscape, Construction Mgmt, QS |
| 5 | 💻 ICT | Software Engineering, Business IT, IT Degree, Multimedia, IT Diploma |

---

## ⭐ Rating System Rules

| Rule | Detail |
|------|--------|
| Initial rating | **0** for every course |
| How to rate | Tap the **"Rate This Course"** button |
| Each press | Increases rating by **+1** |
| Maximum | **6** — button disables, shake animation + alert shown |
| Visual feedback | Stars fill up, progress bar animates, score updates |

---

## 🎯 Career Quiz

- 5 questions covering interests, subjects, career goals, and working style
- Each answer maps to one or more faculty IDs
- Result shows the faculty with the highest score + top 3 recommended courses
- One tap to navigate directly to that faculty

---

## 🔧 Troubleshooting

**"Unable to find expo in this project"**  
→ Make sure you ran `npm install` first, then use `npx expo start`

**Slow / crashes on first load**  
→ Try `npx expo start --clear` to clear the Metro bundler cache

**QR code won't scan**  
→ Make sure your phone and computer are on the **same Wi-Fi network**

**Port conflict error**  
→ Run `npx expo start --port 8082`

---

## 📞 University Contact

- 📍 Moshoeshoe Road, Maseru Central, PO Box 8971, Maseru 100, Lesotho  
- 📞 +266 2231 5767  ·  Toll Free: 80022066  
- 🌐 www.limkokwing.ac.ls

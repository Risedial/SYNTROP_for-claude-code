# User Manual
## First Aid Study PWA

**App URL:** https://cpr-first-aid.vercel.app
**Target:** Alberta Standard First Aid Level C CPR & AED (St. John Ambulance Alberta)

---

## Getting Started

1. Open https://cpr-first-aid.vercel.app on your phone.
2. The app opens immediately to a quiz question — no setup required.
3. *(Optional)* Add to your home screen for offline use and standalone app experience:
   - **Android Chrome:** Tap the browser menu → "Add to Home Screen"
   - **iOS Safari:** Tap the Share button → "Add to Home Screen"
4. After your first visit, the app works fully offline.

---

## Study Tab

The Study tab is your primary tool. It runs an adaptive drill session.

### How questions appear
- Questions are sorted by how much attention they need: newer and weaker questions appear first.
- The algorithm (not you) decides what to study. There is no topic filter.
- Question order within each tier is randomized using a session seed, so the same question never appears consecutively within its tier.

### Answering questions
- Tap the answer you believe is correct.
- **Answer quickly but deliberately.** Responses submitted in under 2 seconds are flagged as "fast-tap" (low confidence). Fast-tap answers do not count toward your mastery streak and the question repeats later in the same session.
- After each answer, a brief explanation is shown.

### Question states
Each question progresses through five states based on your performance:

| State | Meaning |
|-------|---------|
| New | Never seen |
| Active | Seen but not yet showing mastery |
| Near-Mastery | 2 consecutive correct — getting there |
| Mastered | 3 consecutive correct across 2+ sessions with no reversals |
| Maintenance | Mastered; reviewed every 10 sessions to prevent forgetting |

### Demotion
- A deliberate wrong answer (≥2s response time) on a Mastered or Maintenance question immediately demotes it back to Active.
- A fast-tap wrong answer on a Maintenance question only repeats the question in the current session (no demotion).

---

## Skills Tab

Browse the 12 practical assessment skills for the hands-on component of your certification.

Each skill shows:
- **Step-by-step instructions** — exactly as required in the practical assessment
- **Common errors** — what evaluators look for
- **Self-assessment checklist** — check off each step as you practice

The skills tab is available offline.

---

## Progress Tab

Track your readiness for the written exam.

### Estimated Exam Score
A percentage calculated as the question-count-weighted average of per-topic mastery. This is the most accurate predictor of your written exam performance.

Formula: `sum(topic_mastery% × topic_question_count) / total_questions`

### Topic Color Grid
All 11 topics shown with color coding:

| Color | Meaning |
|-------|---------|
| Red | Below 50% mastery |
| Yellow | 50–80% mastery |
| Green | Above 80% mastery |

### Ready to Test Banner
A banner appears when:
- Your estimated score is ≥80%, AND
- Every topic is above 75% mastery

This is your signal that you are ready for the written exam.

### Top 3 Weakest Topics
The three topics with the lowest mastery percentages, ordered weakest-first. Focus your next session on these.

---

## Settings Tab

### Cloud Backup
Your progress automatically saves to a secure cloud backup every 60 seconds when changes have been made.

**Save to Cloud:** Force an immediate save (useful before putting your phone away).

**Restore from Backup:** Fetches your last cloud backup and overwrites local data. Use this if you cleared your browser data or switched devices.

> **Note:** Cloud backup requires Upstash Redis to be configured. If the save/restore buttons show an error, the Redis credentials may not be set — see the Deployment Guide.

---

## FAQ

**Q: Do I need an internet connection to study?**
After your first visit, no. The app is fully offline-capable. The only feature requiring internet is cloud sync.

**Q: My progress disappeared after clearing browser data. How do I restore it?**
Go to Settings → tap "Restore from Backup". Your last cloud backup will be restored.

**Q: Why does the same question keep appearing?**
The algorithm surfaces questions based on your performance. If a question keeps appearing, it means you've missed it recently or it hasn't reached Near-Mastery yet. Answer it correctly twice in a row to advance it.

**Q: Can I choose which topic to study?**
No — the algorithm controls the session. This is by design: adaptive drilling is more effective than self-selected topic review.

**Q: What counts as "mastered"?**
3 consecutive correct answers across at least 2 different study sessions, with no wrong answers in the last 5 attempts on that question.

**Q: I answered correctly but the question didn't advance.**
If your response time was under 2 seconds, it was flagged as a fast-tap and excluded from the streak. Read the question before answering.

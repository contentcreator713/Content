// Pure study logic: no DOM access, so it can run in the browser and under Node tests.
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.FAALogic = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  const TOPICS = [
    { id: "regs", name: "Regulations (Part 107)" },
    { id: "airspace", name: "Airspace" },
    { id: "weather", name: "Weather" },
    { id: "performance", name: "Loading & Performance" },
    { id: "ops", name: "Operations & Emergencies" },
    { id: "adm", name: "Aeronautical Decision-Making" },
    { id: "physio", name: "Physiology & Medical" },
    { id: "nav", name: "Charts & Navigation" },
    { id: "comms", name: "Airport Ops & Communications" }
  ];

  // Knowledge test format: 60 questions, 2 hours, 70% (42 of 60) to pass.
  const EXAM = { questionCount: 60, minutes: 120, passPercent: 70 };

  // FAA ACS areas of operation with the published share of test items (ACS Appendix 1).
  // `count` is the mock-exam quota for each area. Each quota sits inside its ACS range.
  // Area V (Operations) covers radio, airports, emergencies, ADM, physiology, and maintenance.
  // Charts and navigation are included here because airport data and charts fall under Task B.
  const ACS_AREAS = [
    { id: "I", name: "Regulations", range: [15, 25], topics: ["regs"], count: 12 },
    { id: "II", name: "Airspace", range: [15, 25], topics: ["airspace"], count: 12 },
    { id: "III", name: "Weather", range: [11, 16], topics: ["weather"], count: 8 },
    { id: "IV", name: "Loading & Performance", range: [7, 11], topics: ["performance"], count: 5 },
    { id: "V", name: "Operations", range: [35, 45], topics: ["ops", "adm", "physio", "nav", "comms"], count: 23 }
  ];

  function topicIds() {
    return TOPICS.map((t) => t.id);
  }

  function topicName(id) {
    const t = TOPICS.find((x) => x.id === id);
    return t ? t.name : id;
  }

  // Fisher-Yates shuffle. Accepts an rng so tests can be deterministic.
  function shuffle(items, rng = Math.random) {
    const a = items.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  // Display order for a question's four choices, e.g. [2, 0, 3, 1].
  // Display slot k shows original choice order[k], so the stored answer index
  // still works for grading. This stops learners memorising answer positions.
  function choiceOrder(rng) {
    return shuffle([0, 1, 2, 3], rng);
  }

  // Practice set: filter by topic (or explicit ids), shuffle, cap at count.
  function buildPractice(bank, options = {}) {
    const { topic = "all", count = Infinity, ids = null, rng } = options;
    let pool = bank;
    if (ids) {
      const wanted = new Set(ids);
      pool = pool.filter((q) => wanted.has(q.id));
    } else if (topic !== "all") {
      pool = pool.filter((q) => q.topic === topic);
    }
    const shuffled = shuffle(pool, rng);
    return Number.isFinite(count) ? shuffled.slice(0, count) : shuffled;
  }

  // Mock exam: draws each ACS area's quota from its topics, then shuffles the set.
  // If an area runs short, the gap is filled from unused questions so the exam still has 60.
  function buildExam(bank, rng) {
    const picked = [];
    const used = new Set();
    for (const area of ACS_AREAS) {
      const pool = shuffle(bank.filter((q) => area.topics.includes(q.topic)), rng);
      for (const q of pool.slice(0, area.count)) {
        picked.push(q);
        used.add(q.id);
      }
    }
    if (picked.length < EXAM.questionCount) {
      const rest = shuffle(bank.filter((q) => !used.has(q.id)), rng);
      for (const q of rest.slice(0, EXAM.questionCount - picked.length)) picked.push(q);
    }
    return shuffle(picked, rng).slice(0, EXAM.questionCount);
  }

  // answers: { [questionId]: chosenIndex }. Unanswered questions count as missed.
  // Integer math is used for the pass check to avoid floating-point error.
  function grade(questions, answers) {
    let correct = 0;
    const missed = [];
    const byTopic = {};
    for (const q of questions) {
      const row = byTopic[q.topic] || (byTopic[q.topic] = { total: 0, correct: 0 });
      row.total += 1;
      if (answers[q.id] === q.answer) {
        correct += 1;
        row.correct += 1;
      } else {
        missed.push(q.id);
      }
    }
    const total = questions.length;
    const passed = total > 0 && correct * 100 >= EXAM.passPercent * total;
    const percent = total ? Math.round((correct / total) * 1000) / 10 : 0;
    return { total, correct, percent, passed, missed, byTopic };
  }

  // stats: { [questionId]: { seen, correct, lastCorrect, lastSeen } }
  function recordAnswer(stats, id, isCorrect, when = Date.now()) {
    const prev = stats[id] || { seen: 0, correct: 0, lastCorrect: null, lastSeen: null };
    return {
      ...stats,
      [id]: {
        seen: prev.seen + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        lastCorrect: isCorrect,
        lastSeen: when
      }
    };
  }

  // Questions whose most recent answer was wrong.
  function missedIds(stats) {
    return Object.keys(stats).filter((id) => stats[id] && stats[id].lastCorrect === false);
  }

  function summarize(bank, stats) {
    const topics = {};
    for (const t of TOPICS) {
      topics[t.id] = { id: t.id, name: t.name, total: 0, attempts: 0, correct: 0 };
    }
    for (const q of bank) {
      const row = topics[q.topic];
      if (!row) continue;
      row.total += 1;
      const s = stats[q.id];
      if (s) {
        row.attempts += s.seen;
        row.correct += s.correct;
      }
    }
    let attempts = 0;
    let correct = 0;
    for (const row of Object.values(topics)) {
      attempts += row.attempts;
      correct += row.correct;
    }
    const seenQuestions = bank.filter((q) => stats[q.id] && stats[q.id].seen > 0).length;
    return {
      topics,
      attempts,
      correct,
      accuracy: attempts ? Math.round((correct / attempts) * 1000) / 10 : null,
      seenQuestions,
      missed: missedIds(stats).length
    };
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  // 3725 -> "1:02:05"; 125 -> "02:05"
  function formatTime(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
  }

  // Returns a list of problems. An empty list means the question is valid.
  function validateQuestion(q, validTopics = topicIds()) {
    const problems = [];
    if (!q || typeof q.id !== "string" || !q.id) problems.push("missing id");
    if (!validTopics.includes(q.topic)) problems.push(`unknown topic "${q.topic}"`);
    if (typeof q.question !== "string" || !q.question.trim()) problems.push("missing question text");
    if (!Array.isArray(q.choices) || q.choices.length !== 4) {
      problems.push("needs exactly 4 choices");
    } else {
      if (q.choices.some((c) => typeof c !== "string" || !c.trim())) problems.push("empty choice");
      if (new Set(q.choices).size !== q.choices.length) problems.push("duplicate choices");
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
      problems.push("answer index must be 0-3");
    }
    if (typeof q.explanation !== "string" || !q.explanation.trim()) problems.push("missing explanation");
    return problems;
  }

  return {
    TOPICS,
    EXAM,
    ACS_AREAS,
    topicIds,
    topicName,
    shuffle,
    choiceOrder,
    buildPractice,
    buildExam,
    grade,
    recordAnswer,
    missedIds,
    summarize,
    formatTime,
    validateQuestion
  };
});

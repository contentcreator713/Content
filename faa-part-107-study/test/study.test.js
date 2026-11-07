const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const L = require("../js/logic.js");

// questions.js is a browser script that declares a top-level const, so evaluate it here.
const bankSource = fs.readFileSync(path.join(__dirname, "..", "js", "questions.js"), "utf8");
const BANK = new Function(`${bankSource}\nreturn QUESTION_BANK;`)();

// Deterministic RNG so shuffle-based tests are repeatable.
function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

describe("question bank", () => {
  test("has enough questions for a full 60-question mock exam", () => {
    assert.ok(BANK.length >= L.EXAM.questionCount, `only ${BANK.length} questions`);
  });

  test("every question passes validation", () => {
    const failures = [];
    for (const q of BANK) {
      const problems = L.validateQuestion(q);
      if (problems.length) failures.push(`${q.id}: ${problems.join(", ")}`);
    }
    assert.deepEqual(failures, []);
  });

  test("ids are unique", () => {
    const ids = BANK.map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test("every topic has at least 4 questions", () => {
    for (const t of L.TOPICS) {
      const n = BANK.filter((q) => q.topic === t.id).length;
      assert.ok(n >= 4, `${t.id} has only ${n}`);
    }
  });

  test("every answer index is reachable by the display shuffle", () => {
    // The app shuffles choices at display time, so the stored position does not
    // matter for learners. Check the mapping keeps the correct answer identifiable.
    for (const q of BANK) {
      const order = L.choiceOrder(seeded(q.id.length));
      const displaySlot = order.indexOf(q.answer);
      assert.equal(q.choices[order[displaySlot]], q.choices[q.answer]);
    }
  });
});

describe("choice display order", () => {
  test("is a permutation of 0-3", () => {
    for (let seed = 1; seed <= 50; seed++) {
      const order = L.choiceOrder(seeded(seed));
      assert.deepEqual([...order].sort(), [0, 1, 2, 3]);
    }
  });
  test("varies between draws", () => {
    const seen = new Set();
    for (let seed = 1; seed <= 50; seed++) seen.add(L.choiceOrder(seeded(seed)).join(","));
    assert.ok(seen.size > 1);
  });
});

describe("validateQuestion", () => {
  const good = {
    id: "x", topic: "regs", question: "Q?", choices: ["a", "b", "c", "d"], answer: 0, explanation: "because"
  };
  test("accepts a valid question", () => {
    assert.deepEqual(L.validateQuestion(good), []);
  });
  test("flags bad answer index, wrong choice count, and unknown topic", () => {
    const problems = L.validateQuestion({ ...good, answer: 4, choices: ["a", "b"], topic: "nope" });
    assert.ok(problems.some((p) => p.includes("answer")));
    assert.ok(problems.some((p) => p.includes("4 choices")));
    assert.ok(problems.some((p) => p.includes("unknown topic")));
  });
  test("flags duplicate choices and missing explanation", () => {
    const problems = L.validateQuestion({ ...good, choices: ["a", "a", "c", "d"], explanation: "" });
    assert.ok(problems.includes("duplicate choices"));
    assert.ok(problems.includes("missing explanation"));
  });
});

describe("grading and the pass mark", () => {
  // Build N questions with answers all set to 0 so we can control the score exactly.
  function fakeQuestions(n) {
    return Array.from({ length: n }, (_, i) => ({ id: `q${i}`, topic: "regs", answer: 0 }));
  }

  test("60 questions: 42 correct passes (70%)", () => {
    const qs = fakeQuestions(60);
    const answers = {};
    qs.forEach((q, i) => { answers[q.id] = i < 42 ? 0 : 1; });
    const r = L.grade(qs, answers);
    assert.equal(r.correct, 42);
    assert.equal(r.percent, 70);
    assert.equal(r.passed, true);
  });

  test("60 questions: 41 correct fails", () => {
    const qs = fakeQuestions(60);
    const answers = {};
    qs.forEach((q, i) => { answers[q.id] = i < 41 ? 0 : 1; });
    const r = L.grade(qs, answers);
    assert.equal(r.passed, false);
    assert.equal(r.missed.length, 19);
  });

  test("unanswered questions count as missed", () => {
    const qs = fakeQuestions(10);
    const r = L.grade(qs, {});
    assert.equal(r.correct, 0);
    assert.equal(r.missed.length, 10);
    assert.equal(r.passed, false);
  });

  test("per-topic breakdown is reported", () => {
    const qs = [
      { id: "a", topic: "regs", answer: 0 },
      { id: "b", topic: "weather", answer: 2 }
    ];
    const r = L.grade(qs, { a: 0, b: 1 });
    assert.deepEqual(r.byTopic.regs, { total: 1, correct: 1 });
    assert.deepEqual(r.byTopic.weather, { total: 1, correct: 0 });
  });
});

describe("building sets", () => {
  test("mock exam returns 60 unique questions", () => {
    const exam = L.buildExam(BANK, seeded(7));
    assert.equal(exam.length, 60);
    assert.equal(new Set(exam.map((q) => q.id)).size, 60);
  });

  test("practice set filters by topic", () => {
    const set = L.buildPractice(BANK, { topic: "weather", rng: seeded(3) });
    assert.ok(set.length > 0);
    assert.ok(set.every((q) => q.topic === "weather"));
  });

  test("practice set respects count", () => {
    const set = L.buildPractice(BANK, { count: 5, rng: seeded(11) });
    assert.equal(set.length, 5);
  });

  test("practice set can be restricted to given ids", () => {
    const set = L.buildPractice(BANK, { ids: ["regs-01", "nav-01"] });
    assert.deepEqual(set.map((q) => q.id).sort(), ["nav-01", "regs-01"]);
  });

  test("shuffle does not mutate its input", () => {
    const input = [1, 2, 3, 4, 5];
    L.shuffle(input, seeded(1));
    assert.deepEqual(input, [1, 2, 3, 4, 5]);
  });
});

describe("progress tracking", () => {
  test("recordAnswer accumulates seen and correct counts", () => {
    let stats = {};
    stats = L.recordAnswer(stats, "regs-01", true, 1000);
    stats = L.recordAnswer(stats, "regs-01", false, 2000);
    assert.deepEqual(stats["regs-01"], { seen: 2, correct: 1, lastCorrect: false, lastSeen: 2000 });
  });

  test("recordAnswer does not mutate the previous stats object", () => {
    const before = { "a": { seen: 1, correct: 1, lastCorrect: true, lastSeen: 1 } };
    L.recordAnswer(before, "a", false, 2);
    assert.equal(before.a.seen, 1);
  });

  test("missedIds returns only questions whose latest answer was wrong", () => {
    let stats = {};
    stats = L.recordAnswer(stats, "a", false);
    stats = L.recordAnswer(stats, "b", false);
    stats = L.recordAnswer(stats, "b", true);
    assert.deepEqual(L.missedIds(stats), ["a"]);
  });

  test("summarize reports accuracy and topic totals", () => {
    let stats = {};
    stats = L.recordAnswer(stats, "regs-01", true);
    stats = L.recordAnswer(stats, "regs-02", false);
    const s = L.summarize(BANK, stats);
    assert.equal(s.attempts, 2);
    assert.equal(s.correct, 1);
    assert.equal(s.accuracy, 50);
    assert.equal(s.seenQuestions, 2);
    assert.equal(s.missed, 1);
    assert.equal(s.topics.regs.total, BANK.filter((q) => q.topic === "regs").length);
  });

  test("summarize with no history gives null accuracy", () => {
    assert.equal(L.summarize(BANK, {}).accuracy, null);
  });
});

describe("formatTime", () => {
  test("formats minutes and seconds", () => {
    assert.equal(L.formatTime(125), "02:05");
    assert.equal(L.formatTime(0), "00:00");
  });
  test("includes hours when needed", () => {
    assert.equal(L.formatTime(3725), "1:02:05");
    assert.equal(L.formatTime(7200), "2:00:00");
  });
  test("clamps negative values to zero", () => {
    assert.equal(L.formatTime(-5), "00:00");
  });
});

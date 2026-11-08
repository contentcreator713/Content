// UI controller. Depends on QUESTION_BANK (questions.js) and FAALogic (logic.js).
(function () {
  "use strict";

  const L = window.FAALogic;
  const BANK = QUESTION_BANK;
  const STORAGE_KEY = "faa107.progress.v1";
  const app = document.getElementById("app");

  // Reference figures. Verify against 14 CFR Part 107 before relying on them.
  const KEY_NUMBERS = [
    ["Maximum altitude", "400 ft AGL", "Within 400 ft of a structure, up to 400 ft above its top"],
    ["Maximum groundspeed", "87 knots (100 mph)", ""],
    ["Maximum takeoff weight", "Under 55 lb", "Includes payload"],
    ["FAA registration threshold", "Over 250 g (0.55 lb)", "Part 48"],
    ["Minimum age for certificate", "16", ""],
    ["sUAS per remote pilot", "1 at a time", "107.35"],
    ["Minimum visibility", "3 statute miles", "107.51"],
    ["Cloud clearance", "500 ft below, 2,000 ft horizontal", "107.51"],
    ["Daylight operations", "30 min before sunrise to 30 min after sunset", "107.29"],
    ["Night operations", "Updated training and anti-collision lights visible 3 SM", "107.29"],
    ["Alcohol", "8 hours from drinking, BAC below 0.04", "107.27"],
    ["Recurrent training", "Every 24 calendar months", "Part 107 certification"],
    ["Accident report", "Within 10 days if serious injury, loss of consciousness, or over $500 damage", "107.9"],
    ["Knowledge test", "60 questions, 2 hours, 70% (42 correct) to pass", "FAA ACS Appendix 1"],
    ["VFR sectional chart scale", "1:500,000", ""],
    ["Standard sea-level conditions", "29.92 inHg and 15°C", ""],
    ["Standard lapse rate", "About 2°C per 1,000 ft", ""],
    ["Satellites for a 3-D GPS fix", "4", ""]
  ];

  let stats = loadStats();
  let screen = "home";           // home | setup | practice | exam | results | reference
  let setupState = { topic: "all", count: "10" };
  let practice = null;           // { title, questions, index, answers, revealed }
  let exam = null;               // { questions, index, answers, endsAt, timerId }
  let result = null;             // graded result for the results screen

  // ---------- helpers ----------

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  // Storage can be blocked (private mode, disabled site data). Fail quietly.
  function loadStats() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function saveStats() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      /* progress then lasts only for this page visit */
    }
  }

  // Attach a fresh random choice order to each question for one session.
  function withOrder(questions) {
    return questions.map((q) => ({ ...q, order: L.choiceOrder() }));
  }

  // ---------- navigation ----------

  function go(next) {
    screen = next;
    render();
    window.scrollTo(0, 0);
  }

  function startPractice(title, questions) {
    stopTimer();
    if (!questions.length) return;
    practice = { title, questions: withOrder(questions), index: 0, answers: {}, revealed: false };
    go("practice");
  }

  function startPracticeFromSetup() {
    const count = setupState.count === "all" ? Infinity : Number(setupState.count);
    const questions = L.buildPractice(BANK, { topic: setupState.topic, count });
    const label = setupState.topic === "all" ? "Mixed practice" : L.topicName(setupState.topic);
    startPractice(label, questions);
  }

  function startReview() {
    const ids = L.missedIds(stats);
    if (!ids.length) return;
    const questions = L.buildPractice(BANK, { ids });
    startPractice("Review missed", questions);
  }

  function startExam() {
    stopTimer();
    const questions = withOrder(L.buildExam(BANK));
    exam = {
      questions,
      index: 0,
      answers: {},
      endsAt: Date.now() + L.EXAM.minutes * 60 * 1000,
      timerId: null
    };
    exam.timerId = setInterval(tickExam, 1000);
    go("exam");
  }

  function stopTimer() {
    if (exam && exam.timerId) clearInterval(exam.timerId);
    if (exam) exam.timerId = null;
  }

  function tickExam() {
    if (!exam) return;
    const remaining = (exam.endsAt - Date.now()) / 1000;
    const el = document.getElementById("timer");
    if (remaining <= 0) {
      finishExam(true);
      return;
    }
    if (el) {
      el.textContent = L.formatTime(remaining);
      el.classList.toggle("low", remaining <= 300);
    }
  }

  function abandonExam() {
    if (!window.confirm("Leave the mock exam? Your answers will not be recorded.")) return;
    stopTimer();
    exam = null;
    go("home");
  }

  function finishExam(timedOut) {
    if (!exam) return;
    const unanswered = exam.questions.length - Object.keys(exam.answers).length;
    if (!timedOut && unanswered > 0 &&
        !window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
      return;
    }
    stopTimer();
    const graded = L.grade(exam.questions, exam.answers);
    exam.questions.forEach((q) => {
      stats = L.recordAnswer(stats, q.id, exam.answers[q.id] === q.answer);
    });
    saveStats();
    result = {
      ...graded,
      mode: "exam",
      title: "Mock exam",
      questions: exam.questions,
      answers: exam.answers,
      timedOut: Boolean(timedOut)
    };
    exam = null;
    go("results");
  }

  // ---------- practice actions ----------

  function choosePractice(k) {
    if (!practice || practice.revealed) return;
    const q = practice.questions[practice.index];
    const original = q.order[k];
    const isCorrect = original === q.answer;
    practice.answers[q.id] = original;
    practice.revealed = true;
    stats = L.recordAnswer(stats, q.id, isCorrect);
    saveStats();
    render();
  }

  function nextPractice() {
    if (!practice || !practice.revealed) return;
    practice.index += 1;
    practice.revealed = false;
    if (practice.index >= practice.questions.length) {
      result = {
        ...L.grade(practice.questions, practice.answers),
        mode: "practice",
        title: practice.title,
        questions: practice.questions,
        answers: practice.answers,
        timedOut: false
      };
      practice = null;
      go("results");
      return;
    }
    render();
  }

  function exitPractice() {
    practice = null;
    go("home");
  }

  // ---------- exam actions ----------

  function chooseExam(k) {
    if (!exam) return;
    const q = exam.questions[exam.index];
    exam.answers[q.id] = q.order[k];
    render();
  }

  function gotoExam(i) {
    if (!exam) return;
    exam.index = Math.max(0, Math.min(exam.questions.length - 1, i));
    render();
  }

  // ---------- views ----------

  function viewHome() {
    const s = L.summarize(BANK, stats);
    const missed = s.missed;
    const topics = L.TOPICS.map((t) => {
      const row = s.topics[t.id];
      const pct = row.attempts ? Math.round((row.correct / row.attempts) * 100) : 0;
      const label = row.attempts ? `${pct}% · ${row.attempts} answered` : "not started";
      return `
        <div class="topic-row">
          <div class="topic-head"><span>${esc(t.name)}</span><span class="muted">${esc(label)}</span></div>
          <div class="bar" aria-hidden="true"><div class="fill" style="width:${pct}%"></div></div>
        </div>`;
    }).join("");

    return `
      <section class="card">
        <h2>Your progress</h2>
        <div class="stats">
          <div class="stat"><span class="stat-num">${s.seenQuestions}</span><span class="stat-label">of ${BANK.length} questions seen</span></div>
          <div class="stat"><span class="stat-num">${s.accuracy === null ? "—" : s.accuracy + "%"}</span><span class="stat-label">accuracy</span></div>
          <div class="stat"><span class="stat-num">${missed}</span><span class="stat-label">currently missed</span></div>
        </div>
      </section>

      <section class="card">
        <h2>Study</h2>
        <div class="actions">
          <button class="primary" data-action="go-setup">Practice by topic</button>
          <button class="primary" data-action="start-exam">Mock exam (60 questions, 2 hours)</button>
          <button data-action="start-review" ${missed ? "" : "disabled"}>Review missed (${missed})</button>
          <button data-action="go-reference">Key numbers</button>
        </div>
      </section>

      <section class="card">
        <h2>By topic</h2>
        ${topics}
      </section>

      <section class="card danger-zone">
        <button class="link" data-action="reset">Reset all progress</button>
      </section>`;
  }

  function viewSetup() {
    const topicOptions = [`<option value="all">All topics</option>`]
      .concat(L.TOPICS.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`))
      .join("");
    const countOptions = [["10", "10 questions"], ["20", "20 questions"], ["40", "40 questions"], ["all", "All questions"]]
      .map(([v, label]) => `<option value="${v}" ${setupState.count === v ? "selected" : ""}>${label}</option>`)
      .join("");

    return `
      <section class="card">
        <h2>Practice by topic</h2>
        <p class="muted">You get instant feedback and an explanation after each answer.</p>
        <div class="field">
          <label for="topic">Topic</label>
          <select id="topic" data-setup="topic">${topicOptions.replace(`value="${setupState.topic}"`, `value="${setupState.topic}" selected`)}</select>
        </div>
        <div class="field">
          <label for="count">Number of questions</label>
          <select id="count" data-setup="count">${countOptions}</select>
        </div>
        <div class="actions">
          <button class="primary" data-action="start-practice">Start practice</button>
          <button data-action="go-home">Back</button>
        </div>
      </section>`;
  }

  function viewPractice() {
    const total = practice.questions.length;
    const q = practice.questions[practice.index];
    const chosen = practice.answers[q.id];
    const revealed = practice.revealed;

    const choices = q.order.map((orig, k) => {
      let cls = "choice";
      if (revealed) {
        if (orig === q.answer) cls += " correct";
        else if (orig === chosen) cls += " wrong";
      }
      return `
        <button class="${cls}" data-action="choose" data-k="${k}" ${revealed ? "disabled" : ""}>
          <span class="key">${k + 1}</span><span>${esc(q.choices[orig])}</span>
        </button>`;
    }).join("");

    let feedback = "";
    if (revealed) {
      const ok = chosen === q.answer;
      feedback = `
        <div class="feedback ${ok ? "ok" : "bad"}" role="status">
          <strong>${ok ? "Correct." : "Not quite."}</strong> ${esc(q.explanation)}
          ${q.ref ? `<div class="ref">Reference: ${esc(q.ref)}</div>` : ""}
        </div>`;
    }

    const isLast = practice.index + 1 >= total;
    return `
      <section class="card">
        <div class="progress-row">
          <span class="muted">${esc(practice.title)} · Question ${practice.index + 1} of ${total}</span>
          <button class="link" data-action="exit-practice">Exit</button>
        </div>
        <span class="tag">${esc(L.topicName(q.topic))}</span>
        <p class="question-text">${esc(q.question)}</p>
        <div class="choices">${choices}</div>
        ${feedback}
        <div class="controls">
          <span class="muted small">Keys 1–4 answer · Enter continues</span>
          ${revealed ? `<button class="primary" data-action="next">${isLast ? "See results" : "Next question"}</button>` : ""}
        </div>
      </section>`;
  }

  function viewExam() {
    const total = exam.questions.length;
    const q = exam.questions[exam.index];
    const sel = exam.answers[q.id];
    const answered = Object.keys(exam.answers).length;
    const remaining = (exam.endsAt - Date.now()) / 1000;

    const choices = q.order.map((orig, k) => `
      <button class="choice ${sel === orig ? "selected" : ""}" data-action="exam-choose" data-k="${k}">
        <span class="key">${k + 1}</span><span>${esc(q.choices[orig])}</span>
      </button>`).join("");

    const grid = exam.questions.map((x, i) => {
      const cls = ["dot", i === exam.index ? "current" : "", exam.answers[x.id] !== undefined ? "done" : ""].join(" ");
      return `<button class="${cls}" data-action="exam-goto" data-i="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`;
    }).join("");

    return `
      <section class="card">
        <div class="progress-row">
          <span class="timer ${remaining <= 300 ? "low" : ""}" id="timer">${L.formatTime(remaining)}</span>
          <span class="muted">${answered} of ${total} answered</span>
          <button class="link" data-action="exit-exam">Abandon</button>
        </div>
        <span class="tag">${esc(L.topicName(q.topic))}</span>
        <p class="muted small">Question ${exam.index + 1} of ${total}</p>
        <p class="question-text">${esc(q.question)}</p>
        <div class="choices">${choices}</div>
        <div class="controls">
          <button data-action="exam-prev" ${exam.index === 0 ? "disabled" : ""}>Previous</button>
          <button class="primary" data-action="submit-exam">Submit exam</button>
          <button data-action="exam-next" ${exam.index >= total - 1 ? "disabled" : ""}>Next</button>
        </div>
        <div class="grid" aria-label="Question navigator">${grid}</div>
      </section>`;
  }

  function viewResults() {
    const r = result;
    const isExam = r.mode === "exam";
    const passCount = Math.ceil((L.EXAM.passPercent * r.total) / 100);

    const verdict = isExam
      ? (r.passed ? `<span class="verdict pass">PASS</span>` : `<span class="verdict fail">NOT YET</span>`)
      : "";

    const topicRows = Object.entries(r.byTopic).map(([id, row]) => `
      <tr>
        <td>${esc(L.topicName(id))}</td>
        <td>${row.correct} / ${row.total}</td>
      </tr>`).join("");

    const missedItems = r.questions
      .filter((q) => r.answers[q.id] !== q.answer)
      .map((q) => {
        const yours = r.answers[q.id] === undefined ? "No answer" : q.choices[r.answers[q.id]];
        return `
          <div class="missed-item">
            <span class="tag">${esc(L.topicName(q.topic))}</span>
            <p><strong>${esc(q.question)}</strong></p>
            <p class="small">Your answer: <span class="muted">${esc(yours)}</span></p>
            <p class="small">Correct answer: <strong>${esc(q.choices[q.answer])}</strong></p>
            <p class="small">${esc(q.explanation)}</p>
            ${q.ref ? `<div class="ref">Reference: ${esc(q.ref)}</div>` : ""}
          </div>`;
      }).join("");

    const missedTotal = r.missed.length;

    return `
      <section class="card">
        <h2>${isExam ? "Mock exam results" : esc(r.title) + " complete"}</h2>
        ${isExam ? `<p>${verdict}${r.timedOut ? ` <span class="muted small">Time ran out.</span>` : ""}</p>` : ""}
        <div class="score">${r.correct} / ${r.total} <span class="muted small">(${r.percent}%)</span></div>
        ${isExam ? `<p class="muted">Passing score is ${L.EXAM.passPercent}% (${passCount} of ${r.total}).</p>` : ""}
        <div class="actions">
          <button class="primary" data-action="start-exam">New mock exam</button>
          <button data-action="start-review" ${L.missedIds(stats).length ? "" : "disabled"}>Review missed questions</button>
          <button data-action="go-home">Home</button>
        </div>
      </section>

      <section class="card">
        <h2>By topic</h2>
        <table>
          <thead><tr><th>Topic</th><th>Correct</th></tr></thead>
          <tbody>${topicRows}</tbody>
        </table>
      </section>

      <section class="card">
        <h2>Missed questions (${missedTotal})</h2>
        ${missedTotal ? missedItems : `<p class="muted">Nothing missed. Well done.</p>`}
      </section>`;
  }

  function viewReference() {
    const rows = KEY_NUMBERS.map(([label, value, note]) => `
      <tr>
        <td>${esc(label)}</td>
        <td><strong>${esc(value)}</strong>${note ? `<div class="ref">${esc(note)}</div>` : ""}</td>
      </tr>`).join("");

    return `
      <section class="card">
        <h2>Key numbers</h2>
        <p class="muted small">Quick reference for memorising. Confirm each figure against 14 CFR Part 107.</p>
        <table>
          <thead><tr><th>Item</th><th>Value</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
      <div class="actions"><button data-action="go-home">Back to home</button></div>`;
  }

  const VIEWS = {
    home: viewHome,
    setup: viewSetup,
    practice: viewPractice,
    exam: viewExam,
    results: viewResults,
    reference: viewReference
  };

  function render() {
    // Guard against a view whose state was cleared.
    if (screen === "practice" && !practice) screen = "home";
    if (screen === "exam" && !exam) screen = "home";
    if (screen === "results" && !result) screen = "home";
    app.innerHTML = VIEWS[screen]();
  }

  // ---------- events ----------

  const ACTIONS = {
    "go-home": () => go("home"),
    "go-setup": () => go("setup"),
    "go-reference": () => go("reference"),
    "start-practice": () => startPracticeFromSetup(),
    "start-exam": () => startExam(),
    "start-review": () => startReview(),
    "choose": (el) => choosePractice(Number(el.dataset.k)),
    "next": () => nextPractice(),
    "exit-practice": () => exitPractice(),
    "exam-choose": (el) => chooseExam(Number(el.dataset.k)),
    "exam-goto": (el) => gotoExam(Number(el.dataset.i)),
    "exam-prev": () => gotoExam(exam.index - 1),
    "exam-next": () => gotoExam(exam.index + 1),
    "submit-exam": () => finishExam(false),
    "exit-exam": () => abandonExam(),
    "reset": () => {
      if (!window.confirm("Erase all saved progress in this browser?")) return;
      stats = {};
      saveStats();
      go("home");
    }
  };

  app.addEventListener("click", (event) => {
    const el = event.target.closest("[data-action]");
    if (!el || el.disabled) return;
    const handler = ACTIONS[el.dataset.action];
    if (handler) handler(el);
  });

  // Also handle header buttons outside #app.
  document.querySelector(".site-header").addEventListener("click", (event) => {
    const el = event.target.closest("[data-action]");
    if (el && ACTIONS[el.dataset.action]) ACTIONS[el.dataset.action](el);
  });

  app.addEventListener("change", (event) => {
    const el = event.target;
    if (el.dataset.setup === "topic") setupState.topic = el.value;
    if (el.dataset.setup === "count") setupState.count = el.value;
  });

  document.addEventListener("keydown", (event) => {
    if (event.target.matches && event.target.matches("select, input, textarea")) return;
    const key = event.key;
    // Enter on a focused button already fires its click, so skip it here to avoid a double advance.
    const onButton = event.target.tagName === "BUTTON";
    if (screen === "practice" && practice) {
      if (/^[1-4]$/.test(key)) choosePractice(Number(key) - 1);
      else if (key === "Enter" && practice.revealed && !onButton) nextPractice();
    } else if (screen === "exam" && exam) {
      if (/^[1-4]$/.test(key)) chooseExam(Number(key) - 1);
      else if (key === "ArrowRight") gotoExam(exam.index + 1);
      else if (key === "ArrowLeft") gotoExam(exam.index - 1);
    }
  });

  render();
})();

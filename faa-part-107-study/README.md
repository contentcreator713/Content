# FAA Part 107 Study App

A small, offline-friendly practice app for the FAA **Part 107 remote pilot knowledge test**.
No frameworks and no build step: plain HTML, CSS, and JavaScript.

## Features

- **Practice by topic**: 10, 20, or 40 questions, or all of them, filtered by topic, with instant feedback and an explanation after each answer.
- **Mock exam**: 60 random questions in a 2-hour timer, with a question navigator, pass mark of 70% (42 correct), and an auto-submit when time runs out.
- **Review missed**: practice only the questions you most recently got wrong.
- **Progress**: accuracy by topic, questions seen, and missed count. Saved in your browser's `localStorage`.
- **Key numbers**: a quick-reference table of the figures most often tested (400 ft AGL, 87 knots, 55 lb, 3 SM visibility, and so on).
- Keyboard shortcuts in practice and exam: `1`–`4` to answer, `Enter` to continue, arrow keys to move in the exam.
- Responsive layout that works on phones, with light and dark themes that follow the system setting.

## Running it

Option 1: open `index.html` directly in a browser.

Option 2 (recommended, avoids any browser file restrictions):

```bash
cd faa-part-107-study
npm start          # serves on http://localhost:8080
```

## Tests

```bash
npm test
```

The test suite (Node's built-in test runner, no dependencies) checks that:

- every question is well formed (4 choices, a valid answer index, a known topic, an explanation);
- question IDs are unique and every topic has enough questions;
- a mock exam draws 60 unique questions;
- the pass mark is exactly 42 of 60, with integer math;
- progress tracking, the time formatter, and the choice shuffle behave correctly.

## Project layout

```
faa-part-107-study/
├── index.html          App shell
├── styles.css          Layout and themes
├── js/
│   ├── questions.js    Question bank (QUESTION_BANK)
│   ├── logic.js        Pure study logic: grading, sets, progress, timer (no DOM)
│   └── app.js          UI controller and rendering
├── test/
│   └── study.test.js   Node tests for the bank and the logic
└── package.json
```

## Adding or fixing questions

Each entry in `js/questions.js` looks like this:

```js
{
  id: "regs-21",              // unique
  topic: "regs",              // one of: regs, airspace, weather, performance, ops, adm, physio, nav, comms
  question: "…",
  choices: ["…", "…", "…", "…"],  // exactly 4, no duplicates
  answer: 2,                  // index of the correct choice (0-3)
  explanation: "…",
  ref: "107.xx"               // optional citation
}
```

Choices are shuffled on screen each time, so the stored `answer` position does not matter to learners. Run `npm test` after any change.

## Important caveats

- **These are original practice questions**, written from the Part 107 rules and common study-guide topics. They are **not** the FAA's actual test items, and the real exam will differ.
- **Verify before you rely on anything.** Check answers against [14 CFR Part 107](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107) and the current FAA *Remote Pilot Study Guide* (FAA-G-8082-22). Rules change, and a few questions cite general aviation references (for example, the AIM or PHAK) rather than a specific Part 107 section.
- Progress is stored only in the browser you use. Clearing site data erases it.

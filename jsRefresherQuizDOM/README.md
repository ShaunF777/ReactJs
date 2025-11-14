# JavaScript Quiz Suite (DOM UI)

A modular quiz application built with vanilla JavaScript and ES modules.  
Quizzes are authored as simple JSON files and rendered into the browser using a reusable DOM-based quiz builder.  
The app shows a history of answered questions, explanations, and a shared status/console log.

---

## 🚀 Quick Start

1. Clone or copy the project folder.
2. Open `index.html` with a local server (recommended: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code).
3. Click a quiz button to load its JSON file, answer questions, and see results.

---

## 📂 File & Folder Structure
```bash
jsRefresherQuiz/ 
├─ index.html 
├─ styles.css 
├─ main.js 
└─ quizzes/ 
    ├─ quizBuilder.js 
    ├─ quiz1.json 
    ├─ quiz2.json 
    └─ quiz3.json
```
### index.html
- The single page shell.
- Contains quiz buttons 
```html
<button data-quiz="./quizzes/quizN.json">
```
- Shared UI sections:
  - `#status` — shows current quiz progress.
  - `#console` — logs answers and results.
  - `#quiz-container` — where the quiz UI is rendered.

### styles.css
- Provides styling for buttons, quiz container, history items, and logs.
- Keeps the UI clean and readable.

### main.js
- Top-level orchestrator.
- Imports `quizBuilder.js`.
- Attaches click handlers to quiz buttons.
- On click:
  1. Fetches the JSON file.
  2. Extracts `{ title, questions }`.
  3. Calls `buildQuiz({ container, setStatus, log, title, questions })`.
  4. Awaits the result and displays summary in status/console.

### quizzes/quizBuilder.js
- Reusable quiz renderer.
- Accepts a config object:
```js
buildQuiz({ container, setStatus, log, title, questions })
```
- Renders DOM UI: header, input row, and history list.
- Tracks state: current index, correct count, ended flag.
- Returns a Promise resolving to:
```json
{ "quiz": "Quiz Title", "correct": 3, "total": 5, "score": 60, "cancelled": false }
```
### quizzes/quizN.json
- Defines quiz content.
- Structure:
```json
{
  "title": "Quiz N - Topic",
  "questions": [
    {
      "id": 1,
      "prompt": "Question text...",
      "answer": "expectedAnswer",
      "explanation": "Explanation shown after answering."
    }
  ]
}
```
---
## 📝 Authoring New Quizzes
1. Create a new JSON file in `quizzes/`, e.g. `quiz4.json`.
2. Add a button in `index.html`:
```html
<button data-quiz="./quizzes/quiz4.json">Quiz 4 - Objects</button>
```
3. Follow the JSON format:
```json
{
  "title": "Quiz 4 - Objects",
  "questions": [
    {
      "id": 1,
      "prompt": "Which syntax creates a new object literal?",
      "answer": "{}",
      "explanation": "Objects are created with curly braces: {}."
    }
  ]
}
```
4. Reload the page and click the new button.
---
## 🔧 Customization Notes
- **Case sensitivity**: Answers are matched exactly. To allow case-insensitive matching, change the comparison in `quizBuilder.js`:
```js
const isCorrect = normalized.toLowerCase() === q.answer.toLowerCase();
```
- **Multiple-choice questions**: Extend JSON with `"type": "mcq"` and `"choices": [...]`, then update `quizBuilder.js` to render buttons instead of a text input.
- **Styling**: Adjust `styles.css` for colors, spacing, or layout changes.
- **Persistence**: To save results, extend `log()` in `main.js` to also write to `localStorage`.
---
## 📌 Context Snippets (for AI chats)
### Contract between main.js and quizBuilder.js
```bash
- main.js fetches JSON at button's data-quiz path.
- JSON must contain: { title: string, questions: [ { id, prompt, answer, explanation } ] }.
- main.js calls buildQuiz({ container, setStatus, log, title, questions }).
- buildQuiz returns a Promise resolving to: { quiz, correct, total, score, cancelled }.
```

### Quiz JSON Example
```json
{
  "title": "Quiz 2 - Variables & Operators",
  "questions": [
    {
      "id": 1,
      "prompt": "Which keyword declares a block-scoped variable that can be reassigned?",
      "answer": "let",
      "explanation": "Use let for block-scoped mutable variables."
    }
  ]
}
```
### Add-Quiz Checklist
```bash
1. Add quizzes/quizN.json
2. Add a button to index.html: <button data-quiz="./quizzes/quizN.json">Quiz N</button>
3. Run index.html via local server and click the button.
```
---

## ✅ Summary
- **index.html**: UI shell with buttons and shared containers.
- **main.js**: Orchestrator, fetches JSON, calls builder, logs results.
- **quizBuilder.js**: Reusable DOM renderer, manages quiz state.
- **quizN.json**: Quiz content, easy to duplicate and edit.
This structure makes it simple to add new quizzes or change behavior by editing JSON or the builder logic.

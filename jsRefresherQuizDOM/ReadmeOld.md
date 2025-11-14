Project Overview
A small, modular quiz app that runs ES module quizzes in the browser using a DOM-based UI.
Goals: simple authoring (questions as JSON), dynamic loading, a shared UI that shows history and logs, and a reusable renderer (quizBuilder.js) so you only supply question data for new quizzes.

Quick Start
- Place the project folder in your workspace.
- Open index.html with a local server (recommended: Live Server in VS Code) or any web server that serves files over http://.
- Click a quiz button to fetch its JSON, render the quiz in the shared container, answer questions, and see results in the status and console areas.
Notes:
- Use <script type="module"> (already used in index.html).
- Prompts and alerts are not used — the UI is DOM-driven and shows a history of answered questions.

File Structure
- index.html
- The single page shell. Contains the buttons for each quiz, the shared status and console sections, and the shared quiz container element.
- styles.css
- Styles for the page, quiz UI, history items, buttons and status.
- main.js
- Top-level orchestrator. Fetches JSON when a button is clicked, calls the builder, passes shared helpers and the container, and logs results.
- quizzes/quizBuilder.js
- Reusable renderer. Accepts a questions array and title and renders the quiz UI into the given container. Returns a result object when completed.
- quizzes/quiz1.json (example)
- JSON file with the quiz title and questions array. Duplicate and edit to add quizzes.
- quizzes/quiz2.json, quiz3.json, ...
- Additional quizzes you create using the same JSON format.
Example tree
import-quiz/
├─ index.html
├─ styles.css
├─ main.js
└─ quizzes/
   ├─ quizBuilder.js
   ├─ quiz1.json
   ├─ quiz2.json
   └─ quiz3.json



How It Works
- main.js responsibilities
- Static-imports quizBuilder.js so the builder code is available.
- Attaches click handlers to the buttons (each button's data-quiz points at a .json file).
- On click: fetch JSON → get { title, questions } → call buildQuiz({ container, setStatus, log, title, questions }) → await result → display summary in status/console.
- Keeps page-level helpers: setStatus (updates #status) and log (appends to #console <pre>).
- quizBuilder.js responsibilities
- Accepts a config object: { container, setStatus, log, title, questions }.
- Renders a header, question-history list, and input row (text input + submit).
- Manages internal state: index, correct count, endedByUser flag.
- Appends every answered question to the history so you can see previous questions and answers.
- Returns a Promise that resolves to a result object: { quiz, correct, total, score, cancelled }.
- quiz JSON format (quizN.json)
- Must be valid JSON: an object with "title" and "questions".
- Each question object:
- id: numeric identifier
- prompt: question text shown to the user
- answer: exact expected string (case-sensitive by default)
- explanation: short explanation shown in history
Example quiz JSON
{
  "title": "Quiz 1 - Imports & Exports",
  "questions": [
    {
      "id": 1,
      "prompt": "Fill the keyword used before a declaration to make it a named export:",
      "answer": "export",
      "explanation": "Named exports use export before declarations."
    }
  ]
}



Adding New Quizzes (step-by-step)
- Create a JSON file in quizzes/, e.g. quizzes/quiz4.json, following the example structure.
- Add a button in index.html:
<button data-quiz="./quizzes/quiz4.json">Quiz 4 - Your Topic</button>


- Start the quiz from the page. main.js will fetch the JSON and call the builder automatically.
Optional tweaks
- Case-insensitive matching: change the comparison in quizBuilder.js from exact equality to lowercase comparison.
- Multiple-choice support: add a "type" and "choices" field per question and extend the builder to render buttons for choices.
- Persist history: implement localStorage writes inside log() or in quizBuilder before appending items.

Copyable Context Snippets
Use these sections when you want to paste context into a new AI chat to continue development or add quizzes.
Core contract (what main.js expects)
- main.js fetches a JSON at a button's data-quiz path.
- JSON must contain: { title: string, questions: [ { id, prompt, answer, explanation }... ] }.
- main.js calls buildQuiz({ container, setStatus, log, title, questions }).
- buildQuiz returns a Promise resolving to: { quiz, correct, total, score, cancelled }.


Quiz JSON example (copyable)
{
  "title": "Quiz 2 - Variables Values & Operators",
  "questions": [
    {
      "id": 1,
      "prompt": "Which keyword declares a block-scoped variable that can be reassigned?",
      "answer": "let",
      "explanation": "Use let for block-scoped mutable variables."
    }
  ]
}


Minimal add-quiz checklist (copyable)
1. Add quizzes/quizN.json
2. Add a button to index.html: <button data-quiz="./quizzes/quizN.json">Quiz N</button>
3. Open index.html via local server and click the button.




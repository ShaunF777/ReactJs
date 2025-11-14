// main.js
// Top-level orchestrator: loads the quizBuilder and fetches question JSON when a button is pressed.

// DOM references
const statusEl = document.getElementById('status');
const consoleEl = document.getElementById('console');
const quizContainer = document.getElementById('quiz-container');

// helpers to pass to the builder
function setStatus(msg) {
  statusEl.textContent = msg;
}

function log(...args) {
  consoleEl.textContent += args.join(' ') + '\n';
}

// Load the quiz builder module once at startup using a static import.
// This keeps main.js linear and easy to read: first load builder, then attach handlers.
// Using static import at top-level ensures bundlers or module loaders can reason about dependencies.
import { buildQuiz } from './quizzes/quizBuilder.js';

// Attach click handlers to each quiz button
document.querySelectorAll('button[data-quiz]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const jsonPath = btn.getAttribute('data-quiz'); // e.g. "./quizzes/quiz1.json"

    // UI guards and clear previous output
    btn.disabled = true;
    setStatus(`Loading questions from ${jsonPath}...`);
    consoleEl.textContent = '';
    quizContainer.innerHTML = '';

    try {
      // Fetch the questions JSON. We fetch instead of static import because JSON
      // is easy to edit and we avoid bundler-specific JSON import configs.
      const resp = await fetch(jsonPath);
      if (!resp.ok) throw new Error(`Failed to fetch ${jsonPath}: ${resp.status} ${resp.statusText}`);
      const payload = await resp.json();

      // Expect the JSON to contain a "title" and "questions" array
      const { title = 'Untitled Quiz', questions = [] } = payload;

      setStatus(`Starting ${title} (${questions.length} questions)`);
      log(`Fetched ${jsonPath} — ${questions.length} questions`);

      // Call the reusable builder, passing the shared container and helpers
      const result = await buildQuiz({
        container: quizContainer,
        setStatus,
        log,
        title,
        questions
      });

      // Show the returned result in the shared console and status
      if (result && typeof result === 'object') {
        setStatus(`Result: ${result.score ?? '—'} (${result.correct ?? 0}/${result.total ?? '—'})`);
        log('Result object: ' + JSON.stringify(result, null, 2));
      } else {
        setStatus('Quiz finished with no result object.');
      }
    } catch (err) {
      setStatus('Error loading or running quiz. See console.');
      consoleEl.textContent = `Error: ${err.message}\n${err.stack}`;
      console.error(err);
    } finally {
      btn.disabled = false;
    }
  });
});
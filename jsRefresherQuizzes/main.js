// main.js
// Responsible for loading quiz modules on demand and wiring UI feedback.

// Utility: simple on-page "console" + status updater
const statusEl = document.getElementById('status');
const consoleEl = document.getElementById('console');

function setStatus(msg) {
  statusEl.textContent = msg;
}

function log(...args) {
  consoleEl.textContent += args.join(' ') + '\n';
}

// Attach click handlers for every button that has a data-quiz path
document.querySelectorAll('button[data-quiz]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const path = btn.getAttribute('data-quiz');

    // Guard UI while loading
    btn.disabled = true;
    setStatus(`Loading ${path}...`);
    consoleEl.textContent = ''; // clear previous output

    try {
      // Dynamic import of the quiz module when needed
      const module = await import(path);

      // Module contract: must export either default async function or named 'startQuiz'
      const start = module.startQuiz ?? module.default;
      if (typeof start !== 'function') {
        throw new Error('Quiz module must export an async function named startQuiz or default');
      }

      setStatus('Quiz loaded. Running...');
      // Call the quiz and await its result (module handles prompts/DOM/UI)
      const result = await start({ setStatus, log });

      // Result is an optional object with summary details
      if (result && typeof result === 'object') {
        setStatus(`Completed: ${result.score ?? '—'} (${result.correct ?? 0}/${result.total ?? '—'})`);
        log('Result:', JSON.stringify(result, null, 2));
      } else {
        setStatus('Quiz completed.');
      }
    } catch (err) {
      consoleEl.textContent = `Error: ${err.message}\n${err.stack}`;
      setStatus('Error loading or running quiz. See console output.');
    } finally {
      btn.disabled = false;
    }
  });
});
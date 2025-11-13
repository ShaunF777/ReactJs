// quiz.js
// Simple interactive quiz that asks you to type the correct import/export keyword or syntax fragment.
// Intended to be run in a browser (use <script type="module" src="quiz.js"></script>).

// -- Data: array of question objects --
// 'questions' is an array; each element is an object with properties:
// id: numeric id for the question
// prompt: text shown to the user
// answer: exact case-sensitive expected reply
// explanation: short explanation shown after answering
const questions = [
  {
    id: 1,
    prompt:
      'To make a named variable or function available to other files you put a keyword before its declaration. Fill the single word keyword (example: "let", "const" are NOT correct):',
    answer: 'export',
    explanation:
      'Named exports use the export keyword before a declaration, e.g. export let apiKey = "..." ;'
  },
  {
    id: 2,
    prompt:
      'To export a single default value from a file you use two words. Fill the two-word phrase exactly (lowercase, space separated):',
    answer: 'export default',
    explanation:
      'Default exports use export default value;. Only one default per file.'
  },
  {
    id: 3,
    prompt:
      'When importing named exports you put the exported names inside these two characters. Type the two-character string (no spaces):',
    answer: '{}',
    explanation:
      'Named imports use curly braces: import { apiKey } from "./util.js";'
  },
  {
    id: 4,
    prompt:
      'When importing a default export you do NOT use the characters from question 3. You import the default using a single identifier. Type the single word that is used in example: import ____ from "./util.js"; (the correct reply is the placeholder word used in the import statement):',
    answer: 'apiKey',
    explanation:
      'Default imports are written like: import apiKey from "./util.js"; You may name it anything.'
  },
  {
    id: 5,
    prompt:
      'To import every named export from a module into one object you use this pattern: import * as ____ from "./util.js"; Fill the single identifier used as the aggregated object:',
    answer: 'utils',
    explanation:
      'import * as utils from "./util.js"; then access exports as utils.apiKey; default is utils.default.'
  },
  {
    id: 6,
    prompt:
      'To rename an imported binding when importing a named export you use a two-letter keyword between the original name and the local name. Type that keyword (lowercase):',
    answer: 'as',
    explanation:
      'Use import { abc as content } from "./util.js"; to alias abc to content locally.'
  },
  {
    id: 7,
    prompt:
      'In vanilla browser JavaScript you must include this attribute on the script tag to enable import/export. Fill the attribute value (exact string):',
    answer: 'module',
    explanation:
      'Use <script type="module" src="app.js"></script> so the browser treats the script as an ES module.'
  },
  {
    id: 8,
    prompt:
      'When importing from a plain .js file in vanilla JavaScript you typically must include this part of the path that is sometimes omitted in React builds. Fill the extension including the dot (example: .ts is NOT correct):',
    answer: '.js',
    explanation:
      'In vanilla JS you normally import with the extension: import { foo } from "./util.js"; build tools often let React omit it.'
  },
  {
    id: 9,
    prompt:
      'A single file can export both a default and multiple named exports. Type the word that must be unique (single allowed per file) when exporting the main export (one word):',
    answer: 'default',
    explanation:
      'Only one default export is allowed per file; named exports can be many.'
  }
];

// -- ask(question) --
// Shows a prompt(), checks the answer, shows feedback via alert().
// Returns true when the answer exactly matches question.answer.
function ask(question) {
  const reply = prompt(`Q${question.id}: ${question.prompt}`).trim();
  if (reply === '') {
    alert('No answer entered. Try again.');
    return false;
  }
  const isCorrect = reply === question.answer;
  if (isCorrect) {
    alert(`Correct! ${question.explanation}`);
  } else {
    alert(
      `Not quite. Your answer: "${reply}". Expected: "${question.answer}".\nExplanation: ${question.explanation}`
    );
  }
  return isCorrect;
}

// -- runQuiz() (IIFE)(immediately-invoked function expression) --
// Drives the quiz: shows intro, loops questions, tallies score,
// prints annotated example snippets to the console, and shows final score.
(async function runQuiz() {
  alert(
    'Import/Export Syntax Quick Quiz\n\nYou will be asked a few short questions. Answers are case-sensitive and must match exactly.'
  );

  let correct = 0;
  for (const q of questions) {
    try {
      const ok = ask(q);
      if (ok) correct++;
    } catch (e) {
      // If prompt is blocked or cancelled, exit gracefully
      console.warn('Quiz aborted or blocked by the browser.', e);
      alert('Quiz aborted or blocked by the browser.');
      return;
    }
  }

  const score = Math.round((correct / questions.length) * 100);
  alert(`Quiz complete. Score: ${correct}/${questions.length} (${score}%)`);

  // Provide annotated examples you can copy into separate files (app.js and util.js)
  const examples = `
Annotated examples (copy these into separate files for hands-on testing):

-- util.js (named export) --
export let apiKey = "adnasdasflak1";

-- app.js (import named) --
import { apiKey } from "./util.js";
console.log(apiKey);

-- util-default.js (default export) --
export default "adnasdasflak1";

-- app-default.js (import default) --
import apiKey from "./util-default.js";
console.log(apiKey);

-- util-mixed.js (default + named) --
export default "Shaun";
export let apiKey = "adnasdasflak1";
export let abc = "ABC";

-- app-mixed.js (import everything) --
import * as util from "./util-mixed.js";
console.log(util.default, util.apiKey, util.abc);

Notes:
- In vanilla HTML include <script type="module" src="app.js"></script>.
- In React projects the bundler usually handles module loading and extensions.
`;
  // Show examples in console to avoid long alert
  console.log(examples);
  alert('Examples and explanations printed to the console for copy/paste.');
})();
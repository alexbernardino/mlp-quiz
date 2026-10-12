import { questions } from "./questions.js";

const root = document.querySelector("#quiz-root");
const sections = ["Perceptrons & MLPs", "Activations & outputs", "Backpropagation & training"];
let answers = Array(questions.length).fill(null);
let current = 0;
let finished = false;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function score() {
  return answers.reduce((total, choice, index) => total + Number(choice === questions[index].answer), 0);
}

function visual(section) {
  if (section === "Perceptrons & MLPs") {
    const inputs = [[34, 58], [34, 110]];
    const hidden = [[116, 34], [116, 84], [116, 134]];
    const outputs = [[198, 58], [198, 110]];
    const links = (from, to) => from.flatMap(a => to.map(b => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#8ca6df" stroke-width="1.3"/>`)).join("");
    const nodes = (points, fill) => points.map(point => `<circle cx="${point[0]}" cy="${point[1]}" r="9" fill="${fill}" stroke="#315fc7" stroke-width="1.5"/>`).join("");
    return `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="Illustrative multilayer perceptron with input, hidden and output units">
      <rect width="240" height="170" fill="#f4f1e8"/>
      ${links(inputs, hidden)}${links(hidden, outputs)}
      ${nodes(inputs, "#fffdf8")}${nodes(hidden, "#dce5f8")}${nodes(outputs, "#315fc7")}
      <text x="17" y="17">Input</text><text x="98" y="17">Hidden</text><text x="180" y="17">Output</text>
      <text x="59" y="162" class="visual-caption">Illustrative MLP architecture</text>
    </svg>`;
  }
  if (section === "Activations & outputs") {
    return `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="Schematic sigmoid and rectified linear activation curves">
      <rect width="240" height="170" fill="#f4f1e8"/>
      <path d="M16 125H108M60 30V135M132 125H224M174 30V135" fill="none" stroke="#a4a9b2"/>
      <path d="M18 121C44 120 44 83 62 80S82 41 106 40" fill="none" stroke="#315fc7" stroke-width="3"/>
      <path d="M134 125H174L222 40" fill="none" stroke="#178464" stroke-width="3"/>
      <text x="37" y="24">Sigmoid</text><text x="158" y="24">ReLU</text>
      <text x="100" y="139">s</text><text x="217" y="139">s</text>
      <text x="52" y="162" class="visual-caption">Illustrative activation shapes</text>
    </svg>`;
  }
  return `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="Forward computation followed by backward propagation of derivatives">
    <rect width="240" height="170" fill="#f4f1e8"/>
    <text x="73" y="24">Forward pass</text>
    <path d="M38 60H197" fill="none" stroke="#315fc7" stroke-width="2.5"/>
    <path d="M188 54L199 60L188 66" fill="none" stroke="#315fc7" stroke-width="2.5"/>
    <circle cx="38" cy="60" r="7" fill="#fffdf8" stroke="#315fc7"/><circle cx="115" cy="60" r="7" fill="#dce5f8" stroke="#315fc7"/><circle cx="199" cy="60" r="7" fill="#315fc7"/>
    <text x="20" y="85">Input</text><text x="96" y="85">Units</text><text x="185" y="85">Loss</text>
    <path d="M199 118H39" fill="none" stroke="#cf4d45" stroke-width="2.5"/>
    <path d="M49 112L38 118L49 124" fill="none" stroke="#cf4d45" stroke-width="2.5"/>
    <text x="57" y="146">Backward derivatives</text>
    <text x="45" y="163" class="visual-caption">Two passes, one computation graph</text>
  </svg>`;
}

function renderQuestion() {
  const q = questions[current];
  const choice = answers[current];
  const answered = choice !== null;
  root.innerHTML = `<div class="quiz-layout">
    <aside class="lesson-rail" aria-label="Learning path">
      <p class="eyebrow">Learning path</p>
      <h2>MLP structure, prediction and learning</h2>
      <ol>${sections.map((section, index) => `<li class="${q.section === section ? "active" : ""}" ${q.section === section ? 'aria-current="step"' : ""}><span>0${index + 1}</span>${escapeHtml(section)}</li>`).join("")}</ol>
      <div class="rail-note"><p>Answer first, then read the explanation. Your responses stay in this browser tab; nothing is submitted.</p></div>
    </aside>
    <section class="question-stage" aria-label="Quiz question">
      <p class="setup-note"><strong>Chapter scope:</strong> Slides 149–179. Follow the loss and averaging conventions stated in each question. Choose one best answer, then check the explanation.</p>
      <div class="progress-row"><span>Question ${current + 1} of ${questions.length}</span><div class="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${current + 1}"><div style="width:${((current + 1) / questions.length) * 100}%"></div></div><strong>${score()} points</strong></div>
      <article class="question-card">
        <div class="question-top"><div><p class="question-label">${escapeHtml(q.category)}</p><h2 id="question-title" tabindex="-1">${escapeHtml(q.prompt)}</h2></div>${visual(q.section)}</div>
        <div class="answers" role="group" aria-label="Answer choices">${q.options.map((option, index) => {
          const status = answered ? (index === q.answer ? "answer-correct" : index === choice ? "answer-wrong" : "") : "";
          const mark = answered && index === q.answer ? "✓" : answered && index === choice ? "×" : String.fromCharCode(65 + index);
          return `<button type="button" data-choice="${index}" ${answered ? "disabled" : ""} aria-pressed="${choice === index}" class="${status}"><span aria-hidden="true">${mark}</span>${escapeHtml(option)}</button>`;
        }).join("")}</div>
        ${answered ? `<div class="feedback ${choice === q.answer ? "correct" : "incorrect"}" role="status" tabindex="-1"><strong>${choice === q.answer ? "Correct." : "Not quite."}</strong><p>${escapeHtml(q.explanation)}</p><div class="try-it"><b>Check it:</b> ${escapeHtml(q.activity)}</div></div>` : ""}
        <div class="card-actions"><button type="button" class="secondary" data-action="previous" ${current === 0 ? "disabled" : ""}>← Previous</button><button type="button" class="primary" data-action="next" ${!answered ? "disabled" : ""}>${current === questions.length - 1 ? "See results" : "Next question →"}</button></div>
      </article>
    </section>
  </div>`;
}

function renderResults() {
  const total = score();
  const summary = sections.map(section => {
    const indices = questions.map((question, index) => question.section === section ? index : -1).filter(index => index >= 0);
    const correct = indices.filter(index => answers[index] === questions[index].answer).length;
    return `<li><span>${escapeHtml(section)}</span><strong>${correct} / ${indices.length}</strong></li>`;
  }).join("");
  root.innerHTML = `<section class="results" aria-labelledby="results-title">
    <p class="eyebrow">Quiz complete</p>
    <div class="score-ring" style="--score:${(total / questions.length) * 360}deg"><span>${total}/${questions.length}</span></div>
    <h2 id="results-title" tabindex="-1">${total} out of ${questions.length} correct</h2>
    <p>Review the explanations and short calculations to connect the forward pass, loss derivatives and weight updates.</p>
    <ul class="section-results">${summary}</ul>
    <div class="result-actions"><button type="button" class="secondary" data-action="review">Review answers</button><button type="button" class="primary" data-action="restart">Restart quiz</button></div>
  </section>`;
}

function render(focusTarget) {
  if (finished) renderResults(); else renderQuestion();
  if (focusTarget) root.querySelector(focusTarget)?.focus();
}

root.addEventListener("click", event => {
  const choiceButton = event.target.closest("[data-choice]");
  if (choiceButton && answers[current] === null) {
    answers[current] = Number(choiceButton.dataset.choice);
    render(".feedback");
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "previous" && current > 0) {
    current -= 1;
    render("#question-title");
  } else if (action === "next" && answers[current] !== null) {
    if (current === questions.length - 1) {
      finished = true;
      render("#results-title");
    } else {
      current += 1;
      render("#question-title");
    }
  } else if (action === "review") {
    finished = false;
    current = 0;
    render("#question-title");
  } else if (action === "restart") {
    answers = Array(questions.length).fill(null);
    current = 0;
    finished = false;
    render("#question-title");
  }
});

render();


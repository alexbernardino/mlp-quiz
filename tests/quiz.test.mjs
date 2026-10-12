import { test } from "node:test";
import assert from "node:assert/strict";
import { questions } from "../questions.js";

test("question bank covers three MLP sections with unique prompts", () => {
  assert.equal(questions.length, 18);
  assert.deepEqual(
    ["Perceptrons & MLPs", "Activations & outputs", "Backpropagation & training"].map(
      section => questions.filter(question => question.section === section).length
    ),
    [6, 6, 6]
  );
  assert.equal(new Set(questions.map(question => question.prompt)).size, questions.length);
  assert.deepEqual([0, 1, 2, 3].map(answer => questions.filter(question => question.answer === answer).length), [5, 4, 4, 5]);
});

test("every question has one valid answer and substantive feedback", () => {
  for (const question of questions) {
    assert.equal(question.options.length, 4, question.prompt);
    assert.equal(new Set(question.options).size, 4, question.prompt);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, question.prompt);
    assert.ok(question.options.every(option => typeof option === "string" && option.trim().length > 0), question.prompt);
    assert.ok(question.explanation.length > 90, question.prompt);
    assert.ok(question.activity.length > 35, question.prompt);
  }
});

test("core topics and source references stay within slides 149–179", () => {
  const categories = new Set(questions.map(question => question.category));
  for (const category of [
    "Threshold units", "Perceptron update", "Separability", "Hidden units", "Affine stacks",
    "Universal approximation", "Forward pass", "Sigmoid derivative", "ReLU at zero",
    "Regression setup", "Classification setup", "Weight gradient", "Output sensitivity",
    "Hidden recursion", "Mini-batch averaging", "Momentum update"
  ]) {
    assert.ok(categories.has(category), category);
  }
  for (const question of questions) {
    assert.ok(question.slides.length > 0, question.prompt);
    assert.ok(question.slides.every(slide => Number.isInteger(slide) && slide >= 149 && slide <= 179), question.prompt);
  }
});

test("the quiz does not introduce later-course topics", () => {
  assert.doesNotMatch(JSON.stringify(questions), /convolution|image analysis|pooling|kernel ridge|support vector|random forest/i);
  assert.ok(questions.every(question => !/^check it:/i.test(question.activity)), "Activities should not duplicate the interface label");
});

test("answer locking, navigation, scoring, review and restart work together", async () => {
  const listeners = new Map();
  const root = {
    innerHTML: "",
    addEventListener: (name, handler) => listeners.set(name, handler),
    querySelector: () => ({ focus() {} })
  };
  const previousDocument = globalThis.document;
  globalThis.document = { querySelector: () => root };
  try {
    await import("../quiz.js");
    const click = (kind, value) => listeners.get("click")({
      target: { closest: selector => selector === `[data-${kind}]` ? { dataset: { [kind]: value } } : null }
    });
    assert.match(root.innerHTML, /Question 1 of 18/);
    assert.match(root.innerHTML, /data-action="next" disabled/);
    click("action", "next");
    assert.match(root.innerHTML, /Question 1 of 18/);

    const wrong = (questions[0].answer + 1) % 4;
    click("choice", String(wrong));
    assert.match(root.innerHTML, /Not quite\./);
    assert.match(root.innerHTML, /0 points/);
    click("choice", String(questions[0].answer));
    assert.match(root.innerHTML, /0 points/, "An answer cannot be changed after feedback");
    click("action", "next");
    assert.match(root.innerHTML, /Question 2 of 18/);
    click("action", "previous");
    assert.match(root.innerHTML, /Not quite\./, "The previous answer is preserved");
    click("action", "next");

    for (let index = 1; index < questions.length; index += 1) {
      click("choice", String(questions[index].answer));
      click("action", "next");
    }
    assert.match(root.innerHTML, /17 out of 18 correct/);
    assert.match(root.innerHTML, /5 \/ 6/);
    assert.equal((root.innerHTML.match(/6 \/ 6/g) || []).length, 2);
    click("action", "review");
    assert.match(root.innerHTML, /Question 1 of 18/);
    assert.match(root.innerHTML, /17 points/);
    for (let index = 0; index < questions.length; index += 1) click("action", "next");
    click("action", "restart");
    assert.match(root.innerHTML, /Question 1 of 18/);
    assert.match(root.innerHTML, /0 points/);
    assert.doesNotMatch(root.innerHTML, /class="feedback/);
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

